(() => {
  'use strict';
  document.documentElement.classList.replace('no-js', 'js');
  const portable = document.body.dataset.portable === 'true';
  const topicIds = (window.DSA_SEARCH || []).map(topic => topic.id);
  const state = new Map();
  let noticeTimer;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const valueText = value => value === null ? 'None' : String(value);
  function rowHTML(row) {
    const n = row.values.length;
    const positions = [];
    if (row.marks['-1']) positions.push(-1);
    for (let i = 0; i < n; i++) positions.push(i);
    if (row.marks[String(n)] && n) positions.push(n);
    const cells = positions.map(i => {
      const boundary = i < 0 || i === n;
      const labels = row.marks[String(i)] || [];
      const classes = ['cell', boundary ? 'boundary' : '', labels.length ? 'marked' : '', row.active.includes(i) ? 'active' : '', row.done.includes(i) ? 'done' : ''].filter(Boolean).join(' ');
      return `<div class="${classes}"><span class="cell-index">${row.indexed === false ? "&nbsp;" : i}</span><span class="cell-value">${boundary ? 'outside' : esc(valueText(row.values[i]))}</span><span class="cell-marks">${labels.map(s=>`<span>${esc(s)}</span>`).join('')}</span></div>`;
    }).join('');
    return `<div class="array-row"><p class="array-label">${esc(row.label)}</p><div class="cells-scroll"><div class="cells">${n ? cells : '<span class="empty-array">[ ] empty</span>'}</div></div></div>`;
  }
  function stop(trace) {
    const s = state.get(trace);
    if (s.timer) clearInterval(s.timer);
    s.timer = null;
    trace.querySelector('[data-action=play]').textContent = 'Play';
    trace.querySelector('[data-action=play]').setAttribute('aria-pressed', 'false');
  }
  function render(trace) {
    const s = state.get(trace);
    const frame = s.data.frames[s.index];
    const screen = trace.querySelector('.trace-frame');
    screen.innerHTML = `<p class="trace-text">${esc(frame.text)}</p>${frame.rows.map(rowHTML).join('')}<div class="state-grid">${Object.entries(frame.state).map(([key,val])=>`<span>${esc(key)} = <b>${esc(val)}</b></span>`).join('')}</div>`;
    trace.querySelector('[data-step]').textContent = `${s.index + 1} / ${s.data.frames.length}`;
    trace.querySelector('[data-action=previous]').disabled = s.index === 0;
    trace.querySelector('[data-action=next]').disabled = s.index === s.data.frames.length - 1;
    trace.querySelector('.scrubber').value = s.index;
    if (s.index === s.data.frames.length - 1) stop(trace);
  }
  document.querySelectorAll('.trace').forEach(trace => {
    const data = window.DSA_TRACES[trace.dataset.trace];
    if (!data) return;
    state.set(trace, {data, index: 0, timer: null});
    trace.querySelector('.scrubber').max = data.frames.length - 1;
    trace.addEventListener('click', event => {
      const button = event.target.closest('[data-action]');
      if (!button) return;
      const s = state.get(trace);
      switch (button.dataset.action) {
        case 'previous': stop(trace); s.index = Math.max(0, s.index - 1); render(trace); break;
        case 'next': stop(trace); s.index = Math.min(s.data.frames.length - 1, s.index + 1); render(trace); break;
        case 'reset': stop(trace); s.index = 0; render(trace); break;
        case 'play':
          if (s.timer) { stop(trace); break; }
          if (s.index === s.data.frames.length - 1) { s.index = 0; render(trace); }
          button.textContent = 'Pause'; button.setAttribute('aria-pressed', 'true');
          s.timer = setInterval(() => { s.index++; render(trace); }, 1800);
          break;
      }
    });
    trace.querySelector('.scrubber').addEventListener('input', event => { stop(trace); state.get(trace).index = Number(event.target.value); render(trace); });
    render(trace);
  });
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (!entry.isIntersecting && state.has(entry.target)) stop(entry.target); });
  });
  state.forEach((_, trace) => observer.observe(trace));
  document.addEventListener('visibilitychange', () => { if (document.hidden) state.forEach((_, t) => stop(t)); });
  function notify(text) {
    const notice = document.querySelector('.notice');
    notice.textContent = text; notice.hidden = false;
    clearTimeout(noticeTimer); noticeTimer = setTimeout(() => notice.hidden = true, 2200);
  }
  document.addEventListener('click', async event => {
    const button = event.target.closest('[data-copy]');
    if (!button) return;
    const code = document.getElementById(button.dataset.copy).textContent;
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(code);
      else {
        const area = document.createElement('textarea');
        area.value = code; area.style.cssText = 'position:fixed;top:0;left:-9999px'; document.body.append(area); area.select();
        const copied = document.execCommand('copy'); area.remove();
        if (!copied) throw new Error('Copy failed');
      }
      notify('Code copied');
    } catch (_) { notify('Select the code and copy it manually'); }
  });
  const menu = document.getElementById('menu-toggle');
  function closeMenu() { document.body.classList.remove('menu-open'); menu.setAttribute('aria-expanded', 'false'); }
  menu.addEventListener('click', () => { const open = !document.body.classList.contains('menu-open'); document.body.classList.toggle('menu-open', open); menu.setAttribute('aria-expanded', String(open)); });
  document.querySelector('.close-menu').addEventListener('click', closeMenu);
  document.querySelector('.scrim').addEventListener('click', closeMenu);
  document.querySelector('.sidebar').addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  const search = document.getElementById('search');
  const results = document.querySelector('.search-results');
  search.addEventListener('input', () => {
    const q = search.value.toLowerCase().trim();
    results.hidden = !q;
    if (!q) { results.replaceChildren(); return; }
    const words = q.split(/\s+/);
    const matches = [];
    for (const topic of window.DSA_SEARCH || []) {
      for (const section of topic.sections) {
        const text = `${topic.title} ${section.title} ${section.text}`.toLowerCase();
        if (words.every(w => text.includes(w))) {
          const score = words.filter(w => section.title.toLowerCase().includes(w)).length * 10 + words.filter(w => topic.title.toLowerCase().includes(w)).length;
          matches.push({...section, topic: topic.title, id: topic.id, score});
        }
      }
    }
    matches.sort((a,b)=>b.score-a.score);
    results.innerHTML = matches.length ? matches.slice(0,9).map(m=>`<a href="${portable ? '#' + m.anchor : (document.body.dataset.root === 'true' ? 'topics/' : '') + m.id + '.html#' + m.anchor}"><small>${esc(m.topic)}</small>${esc(m.title)}</a>`).join('') : '<p>No matching section</p>';
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') { closeMenu(); search.value = ''; results.hidden = true; }
    if (event.key === '/' && !event.target.matches('input,textarea')) { event.preventDefault(); document.body.classList.add('menu-open'); menu.setAttribute('aria-expanded','true'); search.focus(); }
  });
  function route() {
    if (!portable) return;
    state.forEach((_, t) => stop(t));
    const hash = decodeURIComponent(location.hash.slice(1));
    if (hash === 'main') { document.getElementById('main').setAttribute('tabindex', '-1'); document.getElementById('main').focus(); return; }
    const topic = topicIds.find(id => hash === id || hash.startsWith(id + '--')) || topicIds[0];
    document.querySelectorAll('[data-topic-view]').forEach(node => node.hidden = node.dataset.topicView !== topic);
    document.querySelectorAll('[data-topic-link]').forEach(a => {
      if (a.dataset.topicLink === topic) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
    });
    document.title = `${(window.DSA_SEARCH || []).find(t => t.id === topic).title} · Python DSA`;
    requestAnimationFrame(() => {
      const target = document.getElementById(hash);
      if (target && hash.includes('--')) { target.scrollIntoView({block:'start'}); }
      else window.scrollTo(0,0);
    });
  }
  window.addEventListener('hashchange',route); route();
  document.querySelector('[data-print]')?.addEventListener('click', () => window.print());
  let openedForPrint = [];
  window.addEventListener('beforeprint', () => {
    openedForPrint = [...document.querySelectorAll('.all-steps:not([open])')]; openedForPrint.forEach(d=>d.open=true);
  });
  window.addEventListener('afterprint', () => { openedForPrint.forEach(d=>d.open=false); openedForPrint=[]; });
  document.querySelectorAll('.all-steps').forEach(details=>{
    if (!window.DSA_TRACES) details.open = true;
  });
})();
