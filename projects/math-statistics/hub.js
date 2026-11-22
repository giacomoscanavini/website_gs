const filter = document.getElementById('library-search')
const cards = Array.from(document.querySelectorAll('#library-grid .library-item'))
const empty = document.getElementById('library-empty')
const count = document.getElementById('library-filter-count')

function updateLibraryFilter() {
  const query = filter.value.trim().toLocaleLowerCase()
  let visible = 0

  for (const card of cards) {
    const searchable = `${card.dataset.search || ''} ${card.textContent}`.toLocaleLowerCase()
    const show = !query || searchable.includes(query)
    card.hidden = !show
    if (show) visible += 1
  }

  empty.hidden = visible !== 0
  count.textContent = query ? `${visible} of ${cards.length} notebooks` : ''
}

filter.addEventListener('input', updateLibraryFilter)
