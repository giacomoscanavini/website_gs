# SQL notebook validation record

This record is retained from the supplied SQL website bundle, before the site integration and sage-theme update. Those checks were not rerun for this visual-only revision.

---

# Validation — SQL 50 navigation update

## Changes

The visible section label is now “Leetcode problems”. Its 50 problems follow the SQL 50 sequence across the sidebar, directory, document order, metadata, and previous/next navigation. Seven small topic headings reproduce the plan's grouping. Existing `#practice` and article addresses are retained.

## Checks executed for this update

- All 50 exercise IDs match the intended sequence, with no missing or duplicate entries
- All seven topic groups match across the directory and sidebar
- Every previous/next destination was checked, and all 50 Next links were followed in Chromium
- All 96 article routes load successfully
- The updated section label appears in the sidebar, breadcrumbs, directory, and search results
- Search by problem number, language tabs, mobile navigation, and a JavaScript-disabled reading mode passed
- Desktop and mobile screenshots were inspected, with no page-wide horizontal overflow in the tested mobile views
- All 770 existing DOM IDs remain intact and unique, and internal links and ARIA targets resolve
- No JavaScript page errors occurred during the completed browser checks

## Content preservation

All **353 code blocks** and **9 tables** were compared with the previous HTML and are unchanged. Existing problem titles, solutions, explanations, and game content were retained. The standalone HTML and `sql/index.html` in the ZIP are byte-identical.

The prior pandas and SQLBolt execution checks were **not rerun** because no solution code changed. The prior validation record is retained below as a record of the previous revision, not as a new test run.

## Ordering sources

LeetCode SQL 50 study plan: https://leetcode.com/studyplan/top-sql-50/

The official overview was accessible, but its dynamically rendered question list was not exposed to the text reader. The complete ordered IDs and topic groups were corroborated against the public categorized index at https://github.com/shivam349/leetcode-sql-50 and the numbered table at https://github.com/arshbibhaw/LeetCode-SQL-50-Study-Plan. No solutions were copied from those indexes.

## Deployment limits

Browser checks used the exact generated HTML in Chromium. They do not verify your production hosting policy or deploy the site. Your live website and OneNote bundle were not changed.

---

# Prior content-validation record — not rerun in this update

# Validation

## Practice content

The website retains all 50 practice problems and all 96 article IDs. The employee-reporting submission is associated with 1731. The email-validation problem remains 1517.

The 90 published practice Python blocks consist of the 50 main implementations and 40 additional implementations. All parse successfully. Each is self-contained with its required imports.

The code checks executed the text extracted from the generated HTML, including code inside expandable sections. This verifies the actual copyable text, rather than only a separate source module.

## Executed checks

**130 pandas fixture checks passed**, covering all 50 practice problems and the additional implementations. Of these, 93 apply the earlier study-kit fixtures to the published implementations, and 37 add targeted regression checks.

The targeted checks include missing join matches, repeated transactions, a transaction with a missing amount, zero attendance, unsorted date strings, calendar gaps, leap day, paired machine/process keys, decimal rounding, direct-report counts, single-character and empty names, case-sensitive email domains, and condition-token boundaries.

DataFrame comparisons ignore indexes and equivalent numeric dtypes. They preserve ordering where the task specifies it and otherwise compare row sets with multiplicity. The deletion exercise is checked for in-place mutation and a None return value.

**59 SQLBolt SQLite/pandas comparisons passed** using the retained synthetic fixtures. The displayed SQLBolt code was also compared with the previous HTML and its text is unchanged. These fixtures are illustrative data, not real film or city statistics.

## Interface checks

Chromium checks passed for all 96 article routes, 180 practice language-panel/copy checks, and searches for 1731, 1517, 1667, 1581 and 1280. The tab/copy sweep uses DOM-dispatched interactions and a mocked clipboard sink; representative panels were also clicked through the browser interface.

Five representative practice pages were checked at widths of 320, 390, 768, 1024 and 1440 pixels, with no page-wide horizontal overflow. Mobile navigation and search passed. Both language panels remain available with JavaScript disabled. All DOM IDs are unique, and internal links and ARIA tab targets resolve. No JavaScript page errors occurred during the completed checks.

Desktop and mobile screenshots were visually inspected. Browser navigation to local test URLs is restricted in this environment, so the final checks injected the exact generated HTML into a fresh browser document.

## Limits

The practice SQL was reviewed but not executed against a live MySQL server. The pandas fixtures are not the official online-judge suite and do not establish exhaustive correctness. The SQLBolt comparisons use SQLite, not MySQL.

This update repairs the practice implementations and reference text. The Murder City and Squid Game source queries were not modified or rerun, and their recorded results and source-specific assumptions remain as previously documented. No unseen game database result or missing original query was fabricated.

The checks do not verify a production hosting policy, actual system clipboard permission, or deployment. The live website and OneNote bundle were not changed.
