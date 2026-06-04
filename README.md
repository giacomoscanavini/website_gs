# Giacomo Scanavini personal website

Static personal website package.

Open `index.html` directly or preview with a static server. The publication section does not require a build step.

## Structure

- `index.html` — About, bio, roles, and contact links.
- `research.html` — Research snapshot, focus areas, selected papers, and full publication archive.
- `projects.html` — Project page with the playable Zone Typer project.
- `assets/data/publications.js` — Publication data used by the research page.
- `js/publications.js` — Renders selected publications, archive entries, and publication metrics from the publication data file.
- `js/navigation.js` — Page navigation controls and swipe/keyboard behavior.
- `css/base.css` — Shared theme, layout, navigation, typography, controls, and footer.
- `css/about.css` — About-page layout, portrait, roles, and contact cards.
- `css/research.css` — Research metrics, focus cards, publication cards, and archive.
- `css/projects.css` — Project cards, thumbnails, and project links.
- `projects/zone_typer/` — Local playable Zone Typer project.

## Changes in this package

- Footer content is left-aligned on all main pages.
- Footer separator line has been removed.
- Publications were removed from `research.html` and are rendered from `assets/data/publications.js`.
- Unused placeholder project cards, placeholder assets, unused logos, and unused news data were removed.
- Redundant theme setup and unused CSS blocks were removed.

## Fix in this package

- Replaced local `fetch()` loading with a plain script data file so publications render when the site is opened directly from disk.
- Removed the unused JSON data file to keep one publication data source.
