(async () => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const {loadJSON, ensureFragment} = window.FieldNotesLoader;
  const [chapters, pdfs, examples, routes] = await Promise.all([
    loadJSON('data/chapters.json'), loadJSON('data/pdfs.json'),
    loadJSON('data/examples.json'), loadJSON('data/routes.json')
  ]);
  const byId = new Map(chapters.map(chapter => [chapter.id, chapter]));
  const panels = () => $$('.page-view');
  let renderVersion = 0;
  const input = $('#search');
  const main = $('#main');
  const sidebar = $('#sidebar');
  const menuButton = $('#menu-toggle');
  const media = window.matchMedia('(max-width: 780px)');
  const pdfUrls = new Map();
  const aliases = {rl:'reinforcement-learning','q-learning':'reinforcement-learning',ppo:'reinforcement-learning',home:'contents',concepts:'contents',neuron:'neurons-and-layers',feedforward:'forward-pass',backprop:'backpropagation','parameter-count':'neurons-and-layers',initialization:'gradient-flow',adam:'adam-adamw',adamw:'adam-adamw',rmsprop:'adaptive-scaling',adagrad:'adaptive-scaling',bfgs:'bfgs-lbfgs',clipping:'training-diagnosis',augmentation:'augmentation-noise','noise-injection':'augmentation-noise',dropout:'sparsity-and-dropout',stacking:'ensembles',autoencoder:'autoencoders',transformer:'transformers',gnn:'graphs',gat:'graphs'};
  let current = 'learning-objective';
  let beforeSearch = '#learning-objective';
  let searchTimer;
  let toastTimer;
  let observer;
  let lastTrigger;
  const escape = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function parseRoute() {
    const raw = location.hash.slice(1) || 'learning-objective';
    const [id, query] = raw.split('?');
    return {id:aliases[id] || id, params:new URLSearchParams(query || '')};
  }
  function setMenu(open, focusSearch = false) {
    document.body.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    if (media.matches) {
      $('.app').inert = open;
      $('.mobilebar').inert = open;
    }
    if (open) (focusSearch ? input : $('#close-menu')).focus();
    else if (media.matches && document.activeElement && sidebar.contains(document.activeElement)) menuButton.focus();
  }
  function updateNavigation(id) {
    const chapter = byId.get(id);
    $$('.main-nav a').forEach(a => {
      a.removeAttribute('aria-current');
      if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current','page');
    });
    $$('.chapter-nav a').forEach(a => {
      a.removeAttribute('aria-current');
      if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current','page');
    });
    if (chapter) {
      $$('.part-nav').forEach(d => {d.open = Number(d.dataset.part) === chapter.part;});
      const active = $('.chapter-nav a[aria-current]');
      if (active) requestAnimationFrame(() => {
        const nav = $('.chapter-nav'), item = active.getBoundingClientRect(), box = nav.getBoundingClientRect();
        if (item.bottom > box.bottom) nav.scrollTop += item.bottom - box.bottom + 12;
        if (item.top < box.top) nav.scrollTop -= box.top - item.top + 12;
      });
    }
  }
  function highlighted(text, query) {
    if (!query) return escape(text);
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index < 0) return escape(text);
    return escape(text.slice(0,index)) + '<mark>' + escape(text.slice(index,index+query.length)) + '</mark>' + escape(text.slice(index+query.length));
  }
  function renderSearch(query) {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const results = chapters.map(chapter => {
      const haystack = (chapter.title + ' ' + chapter.summary + ' ' + chapter.search).toLowerCase();
      const score = terms.reduce((value, term) => value + (chapter.title.toLowerCase().includes(term) ? 12 : chapter.summary.toLowerCase().includes(term) ? 5 : 1),0);
      return {chapter, match:terms.every(term => haystack.includes(term)), score};
    }).filter(row => row.match).sort((a,b) => b.score-a.score || a.chapter.position-b.chapter.position);
    $('#search-count').textContent = terms.length ? `${results.length} ${results.length === 1 ? 'chapter' : 'chapters'} for “${query}”` : 'Search explanations, equations and concepts across all chapters.';
    $('#search-results').innerHTML = !terms.length ? '<p class="empty">Try “bias variance”, “backpropagation”, “forget gate” or “weight decay”.</p>' : results.length ? results.map(({chapter}) => {
      const body = chapter.search;
      const first = body.toLowerCase().indexOf(terms[0]);
      const start = Math.max(0, first-55);
      let snippet = first >= 0 ? (start ? '… ' : '') + body.slice(start,start+210) + ' …' : chapter.summary;
      const calculations = (chapter.derivations || []).filter(d => terms.every(term => (d.title+' '+d.search).toLowerCase().includes(term)));
      calculations.sort((a,b) => terms.filter(t => b.title.toLowerCase().includes(t)).length - terms.filter(t => a.title.toLowerCase().includes(t)).length);
      const calculation = calculations[0];
      const href = '#'+chapter.id+(calculation ? '?derivation='+encodeURIComponent(calculation.slug) : '');
      return `<a class="search-result" href="${href}"><small>Part ${chapter.part} · ${escape(chapter.partTitle)}</small><h2>${highlighted(chapter.title,query)}</h2><p>${highlighted(snippet,terms[0])}</p>${calculation ? '<span class="result-calculation">Open calculation · '+escape(calculation.title)+'</span>' : ''}</a>`;
    }).join('') : '<p class="empty">No matching chapter. Try a shorter term or browse the contents.</p>';
  }
  function watchHeadings(panel) {
    if (observer) observer.disconnect();
    const headings = $$('.lesson-body h2, .implementation h2',panel);
    if (!headings.length || !('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => a.boundingClientRect.top-b.boundingClientRect.top);
      if (!visible.length) return;
      const key = visible[0].target.dataset.section;
      $$('.onpage a',panel).forEach(a => a.classList.toggle('active',a.dataset.section === key));
    },{rootMargin:'-4% 0px -67% 0px',threshold:0});
    headings.forEach(heading => observer.observe(heading));
  }
  async function render(moveFocus = false) {
    const version = ++renderVersion;
    let {id,params} = parseRoute();
    if (!byId.has(id) && !['contents','sources','search'].includes(id)) id='contents';
    const changed = current !== id;
    current = id;
    const target = id === 'search' ? document.getElementById('search-results-view') : await ensureFragment(id, routes[id], main);
    if (version !== renderVersion) return;
    panels().forEach(panel => {panel.hidden = panel !== target;});
    document.getElementById('reader-loading').hidden = true;
    window.TheoryVisuals?.init(target);
    window.ReinforcementVisual?.init(target);
    document.title = (byId.get(id)?.title || (id==='contents'?'Contents':id==='sources'?'Sources & examples':'Search')) + ' · ML Theory Notes';
    updateNavigation(id);
    if (id === 'search') {
      const query = params.get('q') || '';
      input.value = query;
      renderSearch(query);
    } else {
      input.value = '';
      beforeSearch = '#' + id;
    }
    setMenu(false);
    const derivation = params.get('derivation');
    const section = params.get('section');
    if (derivation) {
      const calculation = $$('details.derivation',target).find(item => item.dataset.derivation === derivation);
      if (calculation) {
        calculation.open = true;
        requestAnimationFrame(() => {
          calculation.scrollIntoView({block:'start'});
          $('summary',calculation)?.focus({preventScroll:true});
        });
      }
    } else if (section) {
      const heading = $$('[data-section]',target).find(element => element.dataset.section === section && /^H[23]$/.test(element.tagName));
      requestAnimationFrame(() => {
        if (heading) {heading.scrollIntoView({block:'start'}); heading.tabIndex=-1; heading.focus({preventScroll:true});}
      });
    } else if (changed || moveFocus) {
      window.scrollTo(0,0);
      if (moveFocus && id !== 'search') $('h1',target)?.focus({preventScroll:true});
    }
    watchHeadings(target);
  }
  function notify(message) {
    const notice = $('#toast');
    notice.textContent=message;
    notice.hidden=false;
    clearTimeout(toastTimer);
    toastTimer=setTimeout(() => {notice.hidden=true;},2500);
  }
  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
      else {
        const area=document.createElement('textarea');
        area.value=text;area.style.cssText='position:fixed;top:-5000px';document.body.append(area);area.select();
        const success=document.execCommand('copy');area.remove();
        if (!success) throw new Error('Clipboard blocked');
      }
      notify('Code copied');
    } catch (_) {notify('Clipboard unavailable. Select the code to copy it.');}
  }
  function download(blob,name) {
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();
    setTimeout(() => URL.revokeObjectURL(url),15000);
  }
  function pdfUrl(key) {
    return new URL(pdfs[key].url, location.href).href;
  }
  document.addEventListener('click',async event => {
    const pdf=event.target.closest('[data-pdf]');
    if (pdf) {
      const key=pdf.dataset.pdf;
      const a=document.createElement('a');
      a.href=pdfUrl(key)+(pdf.dataset.download ? '' : '#page='+(pdf.dataset.page||'1'));
      if (pdf.dataset.download) a.download=pdfs[key].name;
      else {a.target='_blank';a.rel='noopener noreferrer';}
      document.body.append(a);a.click();a.remove();return;
    }
    const example=event.target.closest('[data-example]');
    if (example) {
      const response = await fetch(examples[example.dataset.example]);
      if (!response.ok) {notify('Could not load this example'); return;}
      const text = await response.text();
      if (example.dataset.action==='copy') copyText(text);
      else download(new Blob([text],{type:'text/x-python'}),example.dataset.example+'.py');
      return;
    }
    const figure=event.target.closest('[data-figure]');
    if (figure) {
      const src=$('img',figure);
      $('#dialog-image').src=src.src;
      $('#dialog-image').alt=src.alt;
      $('#dialog-caption').textContent=figure.closest('figure').querySelector('figcaption').textContent;
      lastTrigger=figure;
      $('#figure-dialog').showModal();return;
    }
    const close=event.target.closest('#close-figure');
    if(close)$('#figure-dialog').close();
    const anchor=event.target.closest('a[href^="#"]');
    if (anchor && anchor.getAttribute('href')===location.hash && anchor.getAttribute('href')!=='#main') render(true);
  });
  $('#figure-dialog').addEventListener('close',() => lastTrigger?.focus());
  $('#figure-dialog').addEventListener('click',event => {
    if(event.target === $('#figure-dialog')) {
      const box=event.target.getBoundingClientRect();
      if(event.clientX<box.left || event.clientX>box.right || event.clientY<box.top || event.clientY>box.bottom)event.target.close();
    }
  });
  menuButton.addEventListener('click',() => setMenu(!document.body.classList.contains('menu-open')));
  $('#close-menu').addEventListener('click',() => setMenu(false));
  $('#scrim').addEventListener('click',() => setMenu(false));
  media.addEventListener('change',() => {setMenu(false);$('.app').inert=false;$('.mobilebar').inert=false;});
  input.addEventListener('input',() => {
    clearTimeout(searchTimer);
    searchTimer=setTimeout(() => {
      const query=input.value.trim();
      if (!query) {
        history.replaceState(null,'',beforeSearch);
        render(false);return;
      }
      history.replaceState(null,'','#search?q='+encodeURIComponent(query));
      const activeMenu=document.body.classList.contains('menu-open');
      render(false);
      if(activeMenu && media.matches)setMenu(true,true);
      else input.focus();
    },150);
  });
  input.addEventListener('keydown',event => {
    if(event.key==='Enter') {event.preventDefault();clearTimeout(searchTimer);history.replaceState(null,'','#search?q='+encodeURIComponent(input.value.trim()));render(true);$('#search-results-view h1').focus({preventScroll:true});}
    if(event.key==='Escape') {event.preventDefault();input.value='';history.replaceState(null,'',beforeSearch);render(true);}
  });
  document.addEventListener('keydown',event => {
    const typing=event.target.matches('input,textarea,select,[contenteditable=true]');
    if(event.key==='/' && !typing && !$('#figure-dialog').open){event.preventDefault();if(media.matches)setMenu(true,true);else input.focus();}
    if(event.key==='Escape' && document.body.classList.contains('menu-open'))setMenu(false);
    if(event.key==='Tab' && document.body.classList.contains('menu-open') && media.matches) {
      const focusable=$$('a,button,input,summary',sidebar).filter(element => element.offsetParent!==null && !element.disabled);
      const first=focusable[0], last=focusable[focusable.length-1];
      if(event.shiftKey && document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey && document.activeElement===last){event.preventDefault();first.focus();}
    }
  });
  let printedDetails = [];
  window.addEventListener('beforeprint',() => {
    const panel = document.getElementById(current);
    printedDetails = panel ? $$('details.derivation',panel).map(d => [d,d.open]) : [];
    printedDetails.forEach(([d]) => {d.open=true;});
  });
  window.addEventListener('afterprint',() => {printedDetails.forEach(([d,open]) => {d.open=open;});});
  window.addEventListener('hashchange',() => render(true));
  document.documentElement.classList.replace('no-js','js');
  await render(false);
})().catch(error => window.FieldNotesLoader.failure(error));
