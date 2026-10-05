# Color update validation

## Input and preservation

- Source: `website_gs_refactored_download.zip`
- All 916 original files remain in the package
- 910 original files are byte-identical
- Six entry-page shells have only palette attributes, theme metadata, and stylesheet/script references added
- The original body markup of each changed shell is preserved
- Existing chapter fragments, SQL code, mathematical derivations, figures, PDFs, search data, reader application scripts, and the typing game are unchanged
- No font files are included or added by this update

## Current checks

- 1,920 preservation, asset-path, and sampled contrast checks passed
- 39 sampled text/background combinations across the three palettes were checked, with a minimum calculated ratio of 4.62:1
- 87 browser checks passed across the portfolio, the two readers, and the publication story
- Browser checks include all three palettes, desktop/mobile widths, reader search, SQL language tabs and method-to-example navigation, expandable ML calculations, the seven existing visual calculations, palette-dialog selection, Escape dismissal, and focus return
- No uncaught JavaScript errors were recorded in the passing browser run
- Nine preference-logic tests passed for defaults, storage, query parameters, invalid values, unavailable storage, and cross-tab updates
- Nine local HTTP responses matched the corresponding files byte-for-byte
- Five new CSS files parsed without top-level syntax errors
- The appearance script passed a Node syntax check and the preference tests
- The separate comparison page passed 31 interaction/image-loading and mobile-width checks

## Limits

Browser screenshots and interactive checks used Chromium with locally injected styles/scripts and file-backed responses for reader fetches, because direct browser network navigation is restricted in the working environment. The existing portfolio page-transition script was omitted from this screenshot harness because it depends on a normal page URL. Its delivered file is byte-identical to the preceding site. Reader scripts and the new appearance script were executed.

Persistence tests use an isolated JavaScript context with a shared storage mock. Local HTTP requests were checked separately, but no public website deployment was performed.

The sampled contrast checks are not a complete accessibility certification. Photographs, scientific figures, plot series, and the game retain their original colors. This edition does not claim a new correctness review of the SQL or machine-learning content.
