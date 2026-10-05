(() => {
  'use strict';
  const NS='http://www.w3.org/2000/svg';
  const palette=['#356650','#92663c','#547c99','#8b6b91'];
  const fixed=(x,n=4)=>Number.isFinite(x)?x.toFixed(n):'undefined';
  const soft=(z,l)=>Math.sign(z)*Math.max(Math.abs(z)-l,0);
  const sigmoid=x=>x>=0?1/(1+Math.exp(-x)):Math.exp(x)/(1+Math.exp(x));
  function compute(type,values={}) {
    if(type==='sigmoid') {const z=Number(values.z??0),p=sigmoid(z);return {z,p,gradient:p*(1-p)};}
    if(type==='gd') {const step=Number(values.step??0.5),factor=1-step;return {step,factor,errors:Array.from({length:26},(_,t)=>Math.abs(factor)**t),stable:step>0&&step<2};}
    if(type==='shrink') {const lambda=Number(values.lambda??1);return {lambda,ridge:0.5/(1+lambda),lasso:soft(0.5,lambda)};}
    if(type==='memory') {const f=Number(values.f??0.9);return {f,halfLife:Math.log(0.5)/Math.log(f),retained:f**50};}
    if(type==='attention') {
      const temperature=Number(values.temperature??1),hide=Boolean(values.hide);
      const logits=[1/Math.sqrt(2)/temperature,0,hide?-Infinity:1/Math.sqrt(2)/temperature];
      const max=Math.max(...logits),exp=logits.map(x=>Math.exp(x-max)),sum=exp.reduce((a,b)=>a+b,0),weights=exp.map(x=>x/sum);
      return {temperature,hide,weights,output:[weights[0]+weights[2],2*weights[1]+weights[2]]};
    }
    if(type==='graph') {
      const layer=Number(values.layer??8),mode=values.mode??'symmetric';
      const adj=[[1,1,0],[1,1,1],[0,1,1]],degree=[2,3,2];
      const A=adj.map((row,i)=>row.map((x,j)=>x/(mode==='row'?degree[i]:Math.sqrt(degree[i]*degree[j]))));
      const history=[[2,1,4]];
      for(let t=1;t<=30;t++)history.push(A.map(row=>row.reduce((a,b,j)=>a+b*history[t-1][j],0)));
      return {layer,mode,history,values:history[layer]};
    }
    throw new Error('Unknown visualization');
  }
  function el(tag,attrs={},text='') {
    const node=document.createElementNS(NS,tag);
    for(const [key,value] of Object.entries(attrs))node.setAttribute(key,String(value));
    if(text!=='')node.textContent=text;
    return node;
  }
  function chart(svg,{xmin=0,xmax=1,ymin=0,ymax=1,xlabel='',ylabel='',series=[],points=[],bars=null,xTicks=5,yTicks=4,marker=null,xTickValues=null}) {
    svg.replaceChildren();
    const width=640,height=300,left=60,right=19,top=27,bottom=56;
    const X=x=>left+(x-xmin)/(xmax-xmin)*(width-left-right);
    const Y=y=>height-bottom-(y-ymin)/(ymax-ymin)*(height-top-bottom);
    const title=el('title',{},`${ylabel} against ${xlabel}`);svg.append(title);
    for(let i=0;i<=yTicks;i++) {
      const y=ymin+(ymax-ymin)*i/yTicks;
      svg.append(el('line',{x1:left,x2:width-right,y1:Y(y),y2:Y(y),stroke:'#dde5d6','stroke-width':1}));
      svg.append(el('text',{x:left-10,y:Y(y)+4,'text-anchor':'end',class:'axis-text'},Number(y.toFixed(3)).toString()));
    }
    for(const x of (xTickValues??Array.from({length:xTicks+1},(_,i)=>xmin+(xmax-xmin)*i/xTicks))) {
      svg.append(el('text',{x:X(x),y:height-bottom+22,'text-anchor':'middle',class:'axis-text'},Number(x.toFixed(2)).toString()));
    }
    svg.append(el('line',{x1:left,x2:width-right,y1:height-bottom,y2:height-bottom,stroke:'#9dac93','stroke-width':1.2}));
    svg.append(el('text',{x:left,y:15,class:'axis-title'},ylabel));
    svg.append(el('text',{x:(left+width-right)/2,y:height-8,'text-anchor':'middle',class:'axis-title'},xlabel));
    if(marker!==null) svg.append(el('line',{x1:X(marker),x2:X(marker),y1:top,y2:height-bottom,stroke:'#8f9e80','stroke-dasharray':'4 4'}));
    if(bars)bars.forEach((b,i)=>{
      const bw=60;
      svg.append(el('rect',{x:X(i+1)-bw/2,y:Y(b),width:bw,height:Y(0)-Y(b),rx:3,fill:palette[i]}));
      svg.append(el('text',{x:X(i+1),y:Y(b)-9,'text-anchor':'middle',class:'bar-value'},fixed(b,3)));
    });
    series.forEach((s,i)=>{
      const d=s.data.map(([x,y],j)=>`${j?'L':'M'}${X(x).toFixed(2)},${Y(Math.min(ymax,Math.max(ymin,y))).toFixed(2)}`).join(' ');
      svg.append(el('path',{d,fill:'none',stroke:palette[s.color??i],'stroke-width':2.6,'stroke-dasharray':s.dash??'','stroke-linecap':'round','stroke-linejoin':'round'}));
    });
    points.forEach(p=>svg.append(el('circle',{cx:X(p.x),cy:Y(p.y),r:4.5,fill:palette[p.color??0],stroke:'#fff','stroke-width':2})));
  }
  function read(box) {
    const values={};box.querySelectorAll('[data-value]').forEach(input=>values[input.dataset.value]=input.type==='checkbox'?input.checked:input.value);return values;
  }
  function draw(box) {
    const type=box.dataset.visual,values=read(box),result=compute(type,values),svg=box.querySelector('svg'),out=box.querySelector('.visual-output');
    box.querySelectorAll('input[type=range]').forEach(input=>{
      const output=box.querySelector(`[data-range-output="${input.dataset.value}"]`);
      if(output)output.textContent=input.value;
    });
    const seq=(min,max,n,fn)=>Array.from({length:n+1},(_,i)=>{const x=min+(max-min)*i/n;return[x,fn(x)];});
    if(type==='sigmoid') {
      chart(svg,{xmin:-8,xmax:8,ymin:0,ymax:1,xlabel:'Pre-activation z',ylabel:'Value',xTicks:4,series:[{data:seq(-8,8,160,sigmoid)},{data:seq(-8,8,160,x=>sigmoid(x)*(1-sigmoid(x)))}],points:[{x:result.z,y:result.p},{x:result.z,y:result.gradient,color:1}]});
      out.textContent=`At z = ${fixed(result.z,2)}: sigmoid = ${fixed(result.p)}; derivative = ${fixed(result.gradient)}. The largest derivative is 0.25 at zero.`;
    } else if(type==='gd') {
      chart(svg,{xmin:0,xmax:25,ymin:-12,ymax:6,xTicks:5,yTicks:3,xlabel:'Optimizer steps t',ylabel:'log₁₀ |error / initial error|',series:[{data:result.errors.map((x,i)=>[i,x===0?-12:Math.log10(x)])}]});
      let status=result.step===1?'Exact convergence in one update':result.stable?'Contracting error':result.step===0?'No movement':result.step===2?'Constant magnitude; alternating sign':'Diverging magnitude';
      if(result.step>1&&result.step<2)status+='; alternating sign';
      out.textContent=`${status}. Each step multiplies signed error by ${fixed(result.factor,2)}. The plot clips values below 10⁻¹²; zero error is shown at this floor.`;
    } else if(type==='shrink') {
      chart(svg,{xmin:-4,xmax:4,ymin:-4,ymax:4,xTicks:4,yTicks:4,xlabel:'Unregularized coordinate z',ylabel:'Regularized coefficient',series:[{data:seq(-4,4,80,x=>x),color:2,dash:'5 5'},{data:seq(-4,4,160,x=>x/(1+result.lambda)),color:0},{data:seq(-4,4,160,x=>soft(x,result.lambda)),color:1}]});
      out.textContent=`For z = 0.5 and λ = ${fixed(result.lambda,2)}: Ridge = ${fixed(result.ridge)}, LASSO = ${fixed(result.lasso)}. This comparison uses an orthonormal design and the stated sum-loss convention.`;
    } else if(type==='memory') {
      chart(svg,{xmin:0,xmax:100,ymin:0,ymax:1,xTicks:5,xlabel:'Steps after a write',ylabel:'Retained direct-path fraction',series:[{data:seq(0,100,100,k=>result.f**k)}],points:[{x:50,y:result.retained}]});
      out.textContent=`Forget gate f = ${fixed(result.f,3)}: half-life = ${fixed(result.halfLife,2)} steps; after 50 steps, ${fixed(100*result.retained,2)}% remains along the direct path. Gates are held constant; new writes and other gradient routes are excluded.`;
    } else if(type==='attention') {
      chart(svg,{xmin:0.5,xmax:3.5,ymin:0,ymax:1,xTicks:3,xTickValues:[1,2,3],xlabel:'Key position',ylabel:'Normalized attention weight',bars:result.weights});
      out.textContent=`Weights = [${result.weights.map(x=>fixed(x)).join(', ')}]; sum = ${fixed(result.weights.reduce((a,b)=>a+b,0))}. Value mixture = [${result.output.map(x=>fixed(x)).join(', ')}]. ${result.hide?'The third key is masked before normalization.':'At temperature 1 this reproduces the chapter’s example.'}`;
    } else if(type==='graph') {
      chart(svg,{xmin:0,xmax:30,ymin:0,ymax:4,xTicks:6,xlabel:'Linear propagation layers',ylabel:'Raw node feature',marker:result.layer,series:[0,1,2].map(i=>({data:result.history.map((x,t)=>[t,x[i]]),color:i})),points:result.values.map((y,i)=>({x:result.layer,y,color:i}))});
      out.textContent=`After ${result.layer} layers: [${result.values.map(x=>fixed(x)).join(', ')}]. ${result.mode==='row'?'Row-normalized diffusion approaches the common stationary average 15/7.':'Symmetric diffusion approaches a degree-weighted subspace; unequal raw node values can remain.'} This is the three-node path with self-loops, without learned weights or nonlinearities.`;
    }
    box.dataset.result=JSON.stringify(result);
  }
  function init(root = document) {
    root.querySelectorAll('.interactive-visual').forEach(box => {
      if (box.dataset.initialized) return;
      box.dataset.initialized = 'true';
      box.addEventListener('input', () => draw(box));
      box.addEventListener('change', () => draw(box));
      box.querySelector('[data-reset-visual]')?.addEventListener('click', () => {
        box.querySelectorAll('input,select').forEach(input => {
          if (input.type === 'checkbox') input.checked = input.defaultChecked;
          else input.value = input.dataset.default ?? input.defaultValue;
        });
        draw(box);
      });
      draw(box);
    });
  }
  window.TheoryVisuals = {compute, init};
})();
