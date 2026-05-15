# Giacomo Scanavini personal website

This is a static multi-page website built with HTML, CSS, and JavaScript.

## Files

- `index.html` — hub page
- `about.html` — about page
- `press.html` — press and news page
- `publications.html` — searchable publications page
- `photography.html` — work-in-progress photography page
- `css/styles.css` — shared styling and page-specific color hues
- `js/main.js` — typing animation, JSON loading, search, filters, footer year
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
<h1
  class="typing-title"
  data-title="Press & News"
  data-accent-start="8"
  data-typing-mode="typo"
></h1>
```

The attributes mean:

- `data-title` — the final title to type.
- `data-accent-start` — the character index where the colored part begins.
- `data-typing-mode="normal"` — type the title normally.
- `data-typing-mode="typo"` — type a planned typo, backspace only the local mistake, and finish the correct title.

The animation runs once on page load and repeats every 60 seconds.

## Editing notes

The JavaScript file is heavily commented. Start there if you want to understand how the typing effect, JSON loading, search, and filters work.


## Data loading note

The Press and Publications pages try to load `data/news.json` and `data/publications.json`. If your browser blocks local JSON loading when opening files directly, the JavaScript now uses built-in fallback data so the lists still display. Running a local server is still the cleanest preview method.
