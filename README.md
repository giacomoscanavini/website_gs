# Giacomo Scanavini — personal website

Static HTML, CSS, and JavaScript website with three main pages:

- `index.html` — About
- `research.html` — Research and publications, including the EEG–pupil paper story
- `projects.html` — Side projects: Linear Algebra, Numerical Methods, Zone Typer, and SQL Squid Game

## Included projects

- `projects/linear-algebra.html` — the supplied standalone Linear Algebra guide, linked directly from Side projects
- `projects/numerical-methods.html` — the supplied standalone Numerical Methods guide, linked directly from Side projects
- `projects/zone_typer/` — the playable Zone Typer project
- `projects/sql-field-notes/` — the SQL solutions reader used by the SQL Squid Game project link, with its routed content, search, code examples, and downloadable game solutions

Legacy DSA and ML readers, the older mathematics/statistics hub and its other guides, unused entry pages, unused assets, unused CSS rules, and duplicate unused source/data exports were excluded.

## Preview and publish

From the directory containing `website_gs` run:

```sh
python -m http.server 8000
```

Then open `http://localhost:8000/website_gs/index.html`.
The main portfolio pages and Linear Algebra and Numerical Methods guides can also be opened directly as files, but the modular SQL reader requires an HTTP server because it fetches page fragments.

To publish, deploy the contents of `website_gs/` and preserve the directory structure. External links and Google Fonts require internet access. No build step or framework is needed.
