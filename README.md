# Giacomo Scanavini personal website

This is a static multi-page website built with HTML, CSS, and JavaScript.

## Files

- `index.html` — hub page
- `about.html` — about page
- `press.html` — press and news page
- `publications.html` — searchable publications page
- `photography.html` — work-in-progress photography page
- `css/styles.css` — shared styling
- `js/main.js` — typing animation, search, filters
- `data/news.json` — press/news/profile entries
- `data/publications.json` — publication entries

## Preview locally

Because the list pages load JSON files, open the folder through a local server rather than double-clicking the HTML files.

From inside this folder, run:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Typing animation

Each subpage title has a line like:

```html
<h1 class="typing-title" data-title="Press & News" data-typing-mode="typo"></h1>
```

`data-typing-mode` can be:

- `normal` — types the title normally
- `typo` — creates a planned typo, deletes it, then types the correct title

The animation runs once on page load and repeats every 60 seconds.
