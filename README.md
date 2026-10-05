# Website · Linen & Ink

See [README_LINEN_AND_INK.md](README_LINEN_AND_INK.md) for the finalized color system
and deployment instructions, and [README_FIELD_NOTES.md](README_FIELD_NOTES.md)
for the modular reader structure.

---

# Giacomo Scanavini — personal website

A static website built with HTML, CSS and JavaScript.

## This update

The main site now uses a slightly deeper sage-green canvas, warm off-white panels, dark green text,
and quieter shadows. Inter and DM Mono are retained, with lighter heading weights and
more relaxed line spacing. Research badges, search fields, links and controls use the
same light palette. The publication story also has a matching sage background.

The navigation label is now **Side projects**. The filename `projects.html` is unchanged,
so existing links still work. The Zone Typer game and all original image assets are unchanged.

## Background refinement

The page backdrop is one step deeper, using `#d5e2ce`, `#e2ebd9` and `#d8e3ce`
for the soft gradient. The SQL sidebar uses `#dce8d4`. Reading surfaces, content
panels, typography, page structure, links, scripts and game styling are unchanged.

The updated pages were previewed at 1440px and 390px with no horizontal page overflow.
HTML content and scripts are unchanged, verified against the preceding archive after
excluding style blocks and browser theme-color metadata. Browser previews used in-memory
HTML with embedded local resources; external fonts and cross-page navigation were not tested
in this color-only refinement.

## SQL Field Notes

The renamed SQL reference is `projects/sql-field-notes.html`.
The first Side projects entry has **Open notes** and **SQL 50** links.
The existing SQL Squid Game entry also has a **My solutions** link.
The notebook links back to Side projects.

All 96 notes, 353 code blocks, 9 tables and the Leetcode SQL 50 sequence are preserved.
The standalone HTML download contains the same notebook but returns to the public
Side projects page; the copy in this site uses a relative return link.

## Preview and publish

Extract the archive and open `website_gs/index.html` or `website_gs/projects.html`.
Merge the files inside `website_gs` into your existing website folder, keeping the
same relative paths, then deploy through your usual hosting workflow.
No framework, package installation or build command is needed.

Keep your existing `.git` directory when merging. This publishing archive excludes Git
history and macOS metadata. It includes the original website files and assets.
No font binaries are included; the existing Google Fonts stylesheet links remain in place.
The live website has not been changed.

## Checks from the preceding full-site update

- About, Research and Side projects navigation labels and local asset paths verified
- All 96 SQL notes, 353 code blocks, 9 tables and the SQL 50 sequence are unchanged
- SQL Field Notes entry, SQL 50 shortcut, Squid Game walkthrough hook and return link verified
- JavaScript syntax checks passed for the site and notebook
- Primary body, muted, green-link and warm-accent text exceed 4.5:1 against tested light surfaces
- Three main pages checked at 320–1440 pixels; no horizontal overflow or preview script errors
- Publication search still finds matching research entries
- All 96 notebook routes, SQL 50 directory, tabs, Copy, search and mobile navigation checked
- 28 original assets, data files, scripts and game files checked unchanged

Browser previews rendered from in-memory HTML because local file and HTTP navigation are blocked in this environment
Cross-file links checked against the packaged paths and notebook routes
Remote websites and external font loading not checked
SQL and pandas algorithms preserved, not re-executed for this visual update.

The earlier notebook validation record is in `projects/sql-field-notes-validation.md`.
