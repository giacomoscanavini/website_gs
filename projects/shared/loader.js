(() => {
  'use strict';
  const pending = new Map();

  async function loadJSON(path) {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Cannot load ${path} (${response.status})`);
    return response.json();
  }

  async function ensureFragment(id, path, container) {
    const existing = document.getElementById(id);
    if (existing) return existing;
    if (!path) throw new Error(`Unknown page: ${id}`);
    if (!pending.has(path)) {
      pending.set(path, (async () => {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Cannot load ${path} (${response.status})`);
        const template = document.createElement('template');
        template.innerHTML = await response.text();
        const element = template.content.firstElementChild;
        if (!element || element.id !== id) throw new Error(`Invalid page: ${path}`);
        element.hidden = true;
        container.append(element);
        return element;
      })().catch(error => {
        pending.delete(path);
        throw error;
      }));
    }
    return pending.get(path);
  }

  function failure(error) {
    console.error(error);
    const box = document.getElementById('reader-loading');
    if (!box) return;
    box.hidden = false;
    box.setAttribute('role', 'alert');
    box.textContent = location.protocol === 'file:'
      ? 'Open this reader through a web server, not by double-clicking index.html. From website_gs run: python -m http.server 8000, then open http://localhost:8000/projects.html'
      : 'A reader file could not be loaded. Keep the full folder structure together and reload this page.';
  }

  window.addEventListener('unhandledrejection', event => failure(event.reason));
  window.FieldNotesLoader = {loadJSON, ensureFragment, failure};
})();
