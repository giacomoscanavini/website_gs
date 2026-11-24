# Giacomo Scanavini — personal website

Static HTML, CSS, and JavaScript website with three main pages:

- `index.html` — About
- `research.html` — Research and publications
- `projects.html` — Side projects

## Reference guides

All six reference guides are self-contained HTML files, linked directly from Side projects.
The latest uploaded version of each file has replaced the earlier version.

- `projects/linear-algebra.html` — Linear Algebra
- `projects/numerical-methods.html` — Numerical Methods
- `projects/statistics.html` — Statistics
- `projects/linear-regression.html` — Linear Regression
- `projects/time-series-analysis.html` — Time Series Analysis
- `projects/sql-field-notes.html` — SQL Field Notes, including Squid Game solutions

## Other projects

- `projects/zone_typer/` — playable Zone Typer game
- SQL Squid Game — original DataLemur challenge and repository linked from the portfolio
  - The “My solutions” link points to `projects/sql-field-notes.html#squid-game`

The earlier modular SQL reader is excluded because the supplied SQL Field Notes HTML
contains its notes and solutions without requiring separate content files.
Older unused DSA/ML notes and unused legacy assets remain excluded.

## Preview and publish

From the directory containing `website_gs`, run:

```sh
python -m http.server 8000
```

Then open `http://localhost:8000/website_gs/index.html`.
The main portfolio pages and guides can also be opened directly as local HTML files.

To publish, deploy the contents of `website_gs/` and preserve the directory structure.
Google Fonts and other external links require internet access.
No build step or framework is needed.
