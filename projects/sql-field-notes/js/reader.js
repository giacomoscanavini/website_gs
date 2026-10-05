(async () => {
  'use strict';
  const root = document.documentElement;
  const {loadJSON, ensureFragment, failure} = window.FieldNotesLoader;
  const [notePages, methods, routes, searchIndex] = await Promise.all([
    loadJSON('data/pages.json'), loadJSON('data/methods.json'),
    loadJSON('data/routes.json'), loadJSON('data/search.json')
  ]);
  const methodMap = new Map(methods.map(m => [m.id,m]));
  const pages = [...notePages, ...methods.map(m => ({id:'m-'+m.id,title:m.label,group:'methods',summary:m.description,number:'',tags:[m.aliases,m.example,m.category],method:m}))];
  const byId = new Map(pages.map(p => [p.id, p]));
  const groups = {
    methods: {title:'Method explorer',entry:'methods',description:'SQL and pandas syntax linked to saved solutions'},
    sqlbolt: {title:'SQLBolt', entry:'sqlbolt', description:'Lessons and worked examples in SQL and pandas'},
    practice: {title:'Leetcode problems', entry:'practice', description:'SQL 50 and 15 additional solved problems'},
    murder: {title:'SQL Murder City', entry:'murder-city', description:'The investigation, step by step'},
    squid: {title:'SQL Squid Game', entry:'squid-game', description:'Solutions to all nine levels'},
    reference: {title:'Reference', entry:'reference', description:'SQL–pandas patterns, setup and source notes'}
  };
  const main = document.getElementById('main-content');
  const input = document.getElementById('search');
  const home = document.getElementById('home');
  const directory = document.getElementById('collection-view');
  const searchView = document.getElementById('search-view');
  const sidebar = document.getElementById('sidebar');
  const menu = document.getElementById('menu-toggle');
  const explorer = document.getElementById('methods');
  const methodInput = document.getElementById('method-search');
  const methodCategory = document.getElementById('method-category');
  const allPanels = () => [home, directory, searchView, explorer, ...main.querySelectorAll(':scope > article.article')];
  let routeVersion = 0;
  const searchText = new Map(pages.map(p => [p.id, (p.method ? p.title+' '+p.tags.join(' ')+' '+p.summary : p.title+' '+p.tags.join(' ')+' '+(searchIndex[p.id] || '')).toLowerCase()]));
  let current = 'methods';
  let group = 'methods';
  let searchTimer;
  let noticeTimer;
  let beforeSearch = '#methods';
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function updateNavigation(nextGroup) {
    group = nextGroup || group;
    document.querySelectorAll('[data-nav-group]').forEach(n => { n.hidden = n.dataset.navGroup !== group; });
    document.querySelectorAll('[data-collection]').forEach(a => {
      a.removeAttribute('aria-current');
      if (a.dataset.collection === group && current !== 'home' && current !== 'search') a.setAttribute('aria-current', 'true');
    });
    document.querySelectorAll('.page-nav a').forEach(a => {
      a.removeAttribute('aria-current');
      let active = a.getAttribute('href') === '#'+current;
      const selectedMethod = byId.get(current)?.method;
      if (current === 'methods' || selectedMethod) {
        const params = new URLSearchParams((location.hash.split('?')[1] || ''));
        const cat = selectedMethod ? selectedMethod.category : params.get('cat');
        const lang = selectedMethod ? selectedMethod.lang : (params.get('lang') || 'all');
        const href = a.getAttribute('href');
        if (cat && href.startsWith('#methods?')) {
          const linkParams = new URLSearchParams(href.split('?')[1]);
          active = linkParams.get('cat') === cat && linkParams.get('lang') === lang;
        }
      }
      if (active) a.setAttribute('aria-current', 'page');
    });
    const active = document.querySelector('.page-nav a[aria-current]');
    if (active) requestAnimationFrame(() => {
      const scroll = document.getElementById('page-nav');
      const ar = active.getBoundingClientRect(), sr = scroll.getBoundingClientRect();
      if (ar.bottom > sr.bottom) scroll.scrollTop += ar.bottom - sr.bottom + 16;
      if (ar.top < sr.top) scroll.scrollTop -= sr.top - ar.top + 16;
    });
  }
  function setMenu(open, returnFocus = false) {
    document.body.classList.toggle('menu-open', open);
    menu.setAttribute('aria-expanded', String(open));
    const mobile = matchMedia('(max-width:780px)').matches;
    if (mobile) {
      sidebar.inert = !open;
      document.querySelector('.app').inert = open;
      document.querySelector('.mobile-header').inert = open;
    }
    if (open) { sidebar.setAttribute('role', 'dialog'); sidebar.setAttribute('aria-modal', 'true'); input.focus(); }
    else { sidebar.removeAttribute('role'); sidebar.removeAttribute('aria-modal'); if (returnFocus) menu.focus(); }
  }
  menu.addEventListener('click', () => setMenu(true));
  document.getElementById('close-menu').addEventListener('click', () => setMenu(false, true));
  document.getElementById('scrim').addEventListener('click', () => setMenu(false, true));
  const breakpoint = matchMedia('(max-width:780px)');
  const resize = () => { if (!breakpoint.matches) {setMenu(false); sidebar.inert = false; document.querySelector('.app').inert = false; document.querySelector('.mobile-header').inert = false;} else if (!document.body.classList.contains('menu-open')) sidebar.inert = true; };
  breakpoint.addEventListener('change', resize);
  function notice(message) {
    clearTimeout(noticeTimer);
    const box = document.getElementById('notification');
    box.textContent = message; box.hidden = false;
    noticeTimer = setTimeout(() => { box.hidden = true; }, 2200);
  }
  async function copyText(text, button) {
    let ok = false;
    try {
      if (!navigator.clipboard || !isSecureContext) throw new Error('Use local clipboard fallback');
      await navigator.clipboard.writeText(text); ok = true;
    } catch (_) {
      const field = document.createElement('textarea');
      const focus = document.activeElement;
      field.value = text; field.style.cssText = 'position:fixed;left:-9999px;top:0';
      document.body.append(field); field.focus(); field.select();
      try { ok = document.execCommand('copy'); } catch (_) {}
      field.remove(); if (focus && focus.focus) focus.focus({preventScroll:true});
    }
    if (ok) {button.textContent = 'Copied'; setTimeout(() => {button.textContent = 'Copy';}, 1600);}
    else notice('Select the code and copy it with your keyboard');
  }
  function selectTab(button, focus = false) {
    const pair = button.closest('.code-pair');
    pair.querySelectorAll('[role=tab]').forEach(tab => {
      const selected = tab === button;
      tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = !selected;
    });
    if (focus) button.focus({preventScroll:true});
  }
  document.querySelectorAll('.code-pair').forEach(pair => selectTab(pair.querySelector('[role=tab]')));
  document.addEventListener('click', event => {
    const tab = event.target.closest('[role=tab]');
    if (tab) selectTab(tab);
    const copy = event.target.closest('[data-copy]');
    if (copy) {
      const pair = copy.closest('.code-pair');
      const code = pair ? pair.querySelector('.code-panel:not([hidden]) pre code') : copy.closest('.codebox').querySelector('pre code');
      if (code) copyText(code.textContent, copy);
    }
    const a = event.target.closest('a[href^="#"]');
    if (!a) return;
    if (a.classList.contains('skip-link')) {event.preventDefault(); main.focus(); main.scrollIntoView(); return;}
    clearTimeout(searchTimer);
    setMenu(false);
    if (a.hash === location.hash) {event.preventDefault(); route(false, true);}
  });
  document.addEventListener('keydown', event => {
    const target = document.activeElement;
    if (target.getAttribute('role') === 'tab' && ['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) {
      event.preventDefault();
      const tabs = [...target.closest('[role=tablist]').querySelectorAll('[role=tab]')];
      const n = tabs.indexOf(target);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length-1 : (n+(event.key === 'ArrowRight' ? 1 : -1)+tabs.length)%tabs.length;
      selectTab(tabs[next], true);
    }
    const editing = /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable;
    if (event.key === '/' && !editing) {event.preventDefault(); if (breakpoint.matches) setMenu(true); input.focus(); input.select();}
    if (event.key === 'Escape') {
      clearTimeout(searchTimer);
      if (document.body.classList.contains('menu-open')) setMenu(false, true);
      else if (current === 'search') {location.hash = beforeSearch; input.blur();}
    }
    if (event.key === 'Tab' && document.body.classList.contains('menu-open')) {
      const focusable = [...sidebar.querySelectorAll('a,button,input')].filter(el => el.offsetParent !== null && !el.disabled);
      const first = focusable[0], last = focusable[focusable.length-1];
      if (event.shiftKey && target === first) {event.preventDefault(); last.focus();}
      else if (!event.shiftKey && target === last) {event.preventDefault(); first.focus();}
    }
  });
  function listRow(p) {
    const title = p.group === 'practice' ? p.title.replace(/^\d+\s*[·.:]\s*/, '') : p.title;
    return `<a href="#${esc(p.id)}"><span class="index-num">${esc(p.number || '')}</span><span>${esc(title)}</span></a>`;
  }
  function renderDirectory(key) {
    const info = groups[key];
    const notes = pages.filter(p => p.group === key);
    document.getElementById('page-nav').scrollTop = 0;
    let content;
    let intro = esc(info.description);
    if (key === 'practice') {
      const topics = [...new Set(notes.map(p => p.studyTopic))];
      intro = '<a href="https://leetcode.com/studyplan/top-sql-50/" target="_blank" rel="noopener noreferrer">SQL 50</a>, in study-plan order, followed by 15 additional problems from your archive';
      content = topics.map(topic => `<section class="study-topic"><h2>${esc(topic)}</h2><div class="directory-list">${notes.filter(p => p.studyTopic === topic).map(listRow).join('')}</div></section>`).join('');
    } else {
      content = `<div class="directory-list">${notes.map(listRow).join('')}</div>`;
    }
    directory.innerHTML = `<div class="breadcrumb"><a href="#home">Contents</a></div><h1>${esc(info.title)}</h1><p class="intro">${intro}</p>${content}`;
  }
  function renderSearch(query) {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) {
      document.getElementById('result-count').textContent = '';
      document.getElementById('search-results').innerHTML = '<p class="search-tip">Search by topic, problem number or SQL syntax.</p>'; return;
    }
    const matches = pages.filter(p => terms.every(term => searchText.get(p.id).includes(term))).map(p => ({p,score:terms.reduce((n,t) => n+(p.title.toLowerCase().includes(t)?10:0)+(p.tags.join(' ').toLowerCase().includes(t)?3:0),0)})).sort((a,b) => b.score-a.score).map(x => x.p);
    document.getElementById('result-count').textContent = `${matches.length} ${matches.length === 1 ? 'result' : 'results'} for “${query}”`;
    document.getElementById('search-results').innerHTML = matches.length ? matches.map(p => `<a class="result-link" href="#${esc(p.id)}"><small>${esc(p.method ? (p.method.lang === 'sql' ? 'MySQL reference' : 'pandas reference') : groups[p.group].title)}${p.number ? ' / '+esc(p.number) : ''}</small><strong>${esc(p.title)}</strong><p>${esc(p.summary)}</p></a>`).join('') : '<p class="empty-state">No matching notes. Try a different topic or problem number.</p>';
  }
  async function route(typing = false, focus = false) {
    const version = ++routeVersion;
    let raw = location.hash.slice(1) || 'methods';
    const index = raw.indexOf('?');
    const rawId = index < 0 ? raw : raw.slice(0,index);
    let id;
    try {id = decodeURIComponent(rawId);} catch (_) {id = 'home';}
    const params = new URLSearchParams(index < 0 ? '' : raw.slice(index+1));
    const aliases = {top:'home', saved:'home', notes:'reference', 'main-content':'home'};
    id = aliases[id] || id;
    let panel;
    if (id === 'methods') {
      input.value = ''; renderMethods(params); panel = explorer; group = 'methods';
      document.title = 'SQL & pandas reference · SQL Field Notes';
    } else if (id === 'search') {
      input.value = params.get('q') || ''; renderSearch(input.value); panel = searchView;
      document.title = 'Search · SQL Field Notes';
    } else if (['sqlbolt','practice','reference'].includes(id)) {
      input.value = ''; renderDirectory(id); panel = directory; group = id;
      document.title = groups[id].title+' · SQL Field Notes';
    } else if (byId.has(id)) {
      input.value = '';
      panel = await ensureFragment(id, routes[id], main);
      if (version !== routeVersion) return;
      panel.querySelectorAll('.code-pair').forEach(pair => selectTab(pair.querySelector('[role=tab]')));
      group = byId.get(id).group;
      document.title = byId.get(id).title+' · SQL Field Notes';
    } else {id = 'home'; input.value = ''; panel = home; document.title = 'SQL Field Notes · Giacomo Scanavini';}
    clearCodeJump();
    current = id;
    allPanels().forEach(p => {p.hidden = p !== panel;});
    document.getElementById('reader-loading').hidden = true;
    updateNavigation(group);
    if (params.get('code')) requestAnimationFrame(() => jumpToCode(panel, params));
    if (!typing) {window.scrollTo({top:0,behavior:'instant'}); if (focus) {const h = panel.querySelector('h1'); if (h) {h.tabIndex = -1; h.focus({preventScroll:true});}}}
  }
  function applySearch() {
    const query = input.value.trim();
    if (current !== 'search') {beforeSearch = location.hash || '#methods'; history.pushState(null,'','#search'+(query?'?q='+encodeURIComponent(query):''));}
    else history.replaceState(null,'','#search'+(query?'?q='+encodeURIComponent(query):''));
    route(true);
  }
  input.addEventListener('input', () => {clearTimeout(searchTimer); searchTimer = setTimeout(applySearch, 130);});
  input.addEventListener('keydown', event => {if(event.key === 'Enter'){event.preventDefault(); clearTimeout(searchTimer); applySearch(); setMenu(false); main.focus(); window.scrollTo({top:0,behavior:'instant'});}});
  window.addEventListener('hashchange', () => {clearTimeout(searchTimer); route(false, true);});
  window.addEventListener('popstate', () => {clearTimeout(searchTimer); route(false, false);});
  let printDetails = [];
  window.addEventListener('beforeprint', () => {const active = byId.has(current) ? document.getElementById(current) : null; printDetails = active ? [...active.querySelectorAll('details:not([open])')] : []; printDetails.forEach(d => {d.open = true;});});
  window.addEventListener('afterprint', () => {printDetails.forEach(d => {d.open = false;});});

  let methodLang = 'all';
  let methodQuery = '';
  let methodCat = 'all';
  function renderMethods(params) {
    methodLang = ['sql','pd','all'].includes(params.get('lang')) ? params.get('lang') : 'all';
    methodQuery = params.get('q') || '';
    methodCat = params.get('cat') || 'all';
    methodInput.value = methodQuery;
    document.querySelectorAll('[data-method-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.methodLang === methodLang)));
    const categories = [...new Set(methods.filter(m => methodLang==='all'||m.lang===methodLang).map(m=>m.category))];
    if (!categories.includes(methodCat)) methodCat='all';
    methodCategory.innerHTML = '<option value="all">All categories</option>'+categories.map(c=>`<option value="${esc(c)}">${esc(c)}</option>`).join('');
    methodCategory.value=methodCat;
    const terms=methodQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const matched=methods.filter(m => (methodLang==='all'||m.lang===methodLang) && (methodCat==='all'||m.category===methodCat) && terms.every(t=>(m.label+' '+m.example+' '+m.description+' '+m.category+' '+m.aliases).toLowerCase().includes(t)));
    document.getElementById('method-count').textContent=matched.length+' '+(matched.length===1?'entry':'entries')+' · '+matched.filter(m=>m.pageCount).length+' with saved examples';
    let output='';
    for (const lang of ['sql','pd']) {
      const subset=matched.filter(m=>m.lang===lang);
      for (const category of [...new Set(subset.map(m=>m.category))]) {
        const rows=subset.filter(m=>m.category===category);
        output+=`<section class="method-section"><h2><span class="language-tag ${lang}">${lang==='sql'?'MySQL':'pandas'}</span>${esc(category)}</h2><div class="method-table">`+rows.map(m=>`<a class="method-row" href="#m-${m.id}"><div class="method-card-top"><strong>${esc(m.label)}</strong><small class="${m.pageCount?'':'no-uses'}">${m.pageCount ? m.pageCount+' '+(m.pageCount===1?'note':'notes')+' ↗' : 'Reference ↗'}</small></div><span class="method-desc">${esc(m.description)}</span><code>${esc(m.example)}</code></a>`).join('')+'</div></section>';
      }
    }
    document.getElementById('method-results').innerHTML=output||'<p class="empty-state">No matching method. Try another term or select Both languages.</p>';
  }
  function filterMethods(push=false) {
    const params=new URLSearchParams();
    if(methodLang!=='all')params.set('lang',methodLang);
    if(methodCat!=='all')params.set('cat',methodCat);
    if(methodInput.value.trim())params.set('q',methodInput.value.trim());
    history[push?'pushState':'replaceState'](null,'','#methods'+(params.toString()?'?'+params.toString():''));
    renderMethods(params);
    updateNavigation('methods');
  }
  methodInput.addEventListener('input',()=>filterMethods());
  methodCategory.addEventListener('change',()=>{methodCat=methodCategory.value;filterMethods();});
  document.querySelectorAll('[data-method-lang]').forEach(b=>b.addEventListener('click',()=>{methodLang=b.dataset.methodLang;methodCat='all';filterMethods();}));
  function clearCodeJump() {
    document.getElementById('jump-context')?.remove();
    document.querySelectorAll('.code-targeted').forEach(el=>{el.classList.remove('code-targeted');el.style.backgroundImage='';});
  }
  function jumpToCode(panel,params) {
    const target=document.getElementById(params.get('code'));
    if(!target || target.tagName!=='PRE' || !panel.contains(target))return;
    for(let el=target.parentElement;el && el!==panel;el=el.parentElement) if(el.tagName==='DETAILS')el.open=true;
    const tabPanel=target.closest('.code-panel');
    if(tabPanel){const tab=document.getElementById(tabPanel.getAttribute('aria-labelledby'));if(tab)selectTab(tab);}
    const line=Math.min(target.textContent.split('\n').length,Math.max(1,Number.parseInt(params.get('line')||'1',10)||1));
    const method=methodMap.get(params.get('method'));
    const context=document.createElement('div');context.className='jump-context';context.id='jump-context';
    context.innerHTML=`<span>${method ? esc(method.label)+' · ' : ''}Matching code · line ${line}</span><a href="${method?'#m-'+method.id:'#methods'}">← Back to reference</a>`;
    const box=target.closest('.code-pair,.codebox')||target;box.before(context);
    target.classList.add('code-targeted');
    const style=getComputedStyle(target),height=parseFloat(style.lineHeight)||23,pad=parseFloat(style.paddingTop)||18;
    const top=pad+(line-1)*height;
    target.style.backgroundImage=`linear-gradient(to bottom, transparent ${top}px, #3b5d3b ${top}px, #3b5d3b ${top+height}px, transparent ${top+height}px)`;
    const offset=breakpoint.matches?85:26;
    // Keep the language controls visible for the jump, with the match highlighted below
    window.scrollTo({top:Math.max(0,context.getBoundingClientRect().top+window.scrollY-offset),behavior:'instant'});
    target.focus({preventScroll:true});
  }

  await route(); resize(); root.classList.remove('no-js'); root.classList.add('js');
})().catch(error => window.FieldNotesLoader.failure(error));
