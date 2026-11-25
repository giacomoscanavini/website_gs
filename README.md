# Giacomo Scanavini — personal website

Static HTML, CSS, and JavaScript website with three main pages:

- `index.html` — About
- `research.html` — Research and publications
- `projects.html` — Side projects

## Reference guides

All seven reference guides are self-contained HTML files, linked directly from Side projects.
The latest uploaded version of each file has replaced the earlier version.

- `projects/linear-algebra.html` — Linear Algebra
- `projects/numerical-methods.html` — Numerical Methods
- `projects/statistics.html` — Statistics
- `projects/hypothesis_testing.html` — Hypothesis Testing
- `projects/linear-regression.html` — Linear Regression
- `projects/time-series-analysis.html` — Time Series Analysis
- `projects/sql-field-notes.html` — SQL Field Notes, including Squid Game solutions

## Other projects

- `projects/zone_typer/` — playable Zone Typer game
- SQL Squid Game — original DataLemur challenge and repository linked from the portfolio
  - The “My solutions” link points to `projects/sql-field-notes.html#squid-game`

The earlier modular SQL reader is excluded because SQL Field Notes contains the
same notes and solutions in one self-contained HTML file. The distribution also
excludes Git history, macOS metadata, an unused loader and reader stylesheet,
and the duplicate Linear Regression HTML file.

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
