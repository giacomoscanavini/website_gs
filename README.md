# Giacomo Scanavini Personal Website

Static multi-page website built with HTML, CSS, and JavaScript.

## Pages

- `index.html` — hub page
- `about.html` — biography, education, roles
- `press.html` — press, news, profile items
- `publications.html` — searchable publication list plus Google Scholar link
- `photography.html` — work-in-progress photography page
- `contact.html` — direct contact form

## Project structure

```text
css/styles.css
js/main.js
data/news.json
data/publications.json
```

## Preview locally

The site now contains fallback data for quick double-click previews, but the cleanest way to preview is still:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Contact form note

The direct contact form uses FormSubmit:

```html
action="https://formsubmit.co/scanavini.giacomo@gmail.com"
```

FormSubmit usually requires first-time email confirmation. For a production website, you may later replace this with Netlify Forms, Formspree, a custom backend, or another service.


## Editing content

- Add or edit news in `data/news.json`.
- Add or edit publications in `data/publications.json`.
- If you want double-click previews to remain fully populated without a local server, also update the `FALLBACK_DATA` object in `js/main.js`.

## Design notes

- Each page uses `body data-section="..."` to choose its accent color.
- Section titles use `data-title`, `data-accent-start`, and `data-typing-mode` for the typing effect.
- Navigation and layout are intentionally minimal and commented for learning.


## Latest changes
- About page now uses a polaroid-style portrait placeholder and logo-based roles from the uploaded CV.
- Header typing mode is random on each cycle: clean typing or planned local typo correction.
- Publications are grouped alphabetically by broad field on the All view, and sorted by publication year descending within each group.
- Press/news entries are sorted chronologically descending and include the Yale defense Instagram post.
