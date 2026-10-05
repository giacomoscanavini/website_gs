(() => {
  'use strict';
  const target = document.body.dataset.target;
  if (!target) return;
  const next = new URL(target, location.href);
  next.search = location.search;
  next.hash = location.hash;
  location.replace(next.href);
})();
