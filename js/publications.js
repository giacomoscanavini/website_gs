const fieldLabels = {
  neuroscience: "Neuroscience",
  physics: "Physics",
};

const typeLabels = {
  publication: "Publications",
  preprint: "Pre-prints",
  conference: "Conferences",
};

const selectedPublicationTitles = [
  "First double-differential cross section measurement of neutral-current π0 production in neutrino-argon scattering in the MicroBooNE detector",
  "Coupling of Event-Related Potential and Pupil Dilation as a Compensatory Marker of Executive Attention in Traumatic Brain Injury",
  "Artifact-reference multivariate backward regression (ARMBR): a novel method for EEG blink artifact removal with minimal data requirements",
  "First measurement of the cross section for νμ and ν¯ μ induced single charged pion production on argon using ArgoNeuT",
  "Search for an excess of electron neutrino interactions in MicroBooNE using multiple final-state topologies",
  "Search for an anomalous excess of inclusive charged-current νe interactions in the MicroBooNE experiment using Wire-Cell reconstruction",
  "Leveraging meaning-induced neural dynamics to detect covert cognition via EEG during natural language listening—a case series",
];

const selectedDisplayTitles = new Map([
  [
    "First measurement of the cross section for νμ and ν¯ μ induced single charged pion production on argon using ArgoNeuT",
    "First measurement of the cross section for νμ and ν¯μ induced single charged pion production on argon using ArgoNeuT",
  ],
  [
    "Leveraging meaning-induced neural dynamics to detect covert cognition via EEG during natural language listening—a case series",
    "Leveraging meaning-induced neural dynamics to detect covert cognition via EEG during natural language listening - a case series",
  ],
]);

let allPublications = [];
let selectedPublications = [];

function setText(id, value) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = value;
  }
}

function makeElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text !== undefined && text !== null && text !== "") {
    element.textContent = text;
  }

  return element;
}

function getYear(item) {
  const year = Number.parseInt(item.year || item.date, 10);
  return Number.isFinite(year) ? year : 0;
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u2010-\u2015]/g, "-")
    .replace(/π/g, "pi")
    .replace(/ν/g, "nu")
    .replace(/μ/g, "mu")
    .replace(/¯/g, "bar")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function searchableText(item) {
  return normalizeText([
    item.title,
    item.displayTitle,
    item.year,
    item.date,
    item.source,
    item.authors,
    item.field,
    item.type,
    item.keywords,
  ].filter(Boolean).join(" "));
}

function formatAuthors(authors) {
  if (!authors) {
    return "";
  }

  const authorList = authors
    .split(";")
    .map((author) => author.trim())
    .filter(Boolean);

  if (authorList.length <= 3) {
    return authorList.join("; ");
  }

  return `${authorList.slice(0, 3).join("; ")}; et al.`;
}

function makePublicationCard(item, compact = false) {
  const field = item.field || "physics";
  const type = item.type || "publication";
  const article = makeElement(
    "article",
    `paper-card compact-paper ${field} ${type}${compact ? " mini-paper" : ""}`,
  );
  const content = makeElement("div");
  const source = item.source || "Source unavailable";
  const year = getYear(item) || "n.d.";
  const fieldLabel = fieldLabels[field] || field;
  const typeLabel = typeLabels[type]?.replace(/s$/, "") || type;
  const authors = formatAuthors(item.authors);
  const links = makeElement("div", "paper-links");
  const link = makeElement("a", "", "Explore");

  content.append(
    makeElement("span", "journal-badge", `${source} · ${year}`),
    makeElement("span", `paper-category paper-category-${field}`, fieldLabel),
    makeElement("span", `paper-type paper-type-${type}`, typeLabel),
    makeElement("h3", "", item.displayTitle || item.title || "Untitled publication"),
  );

  if (authors) {
    content.append(makeElement("p", "paper-authors", authors));
  }

  link.href = item.url || "https://scholar.google.com/citations?user=-EembpAAAAAJ";
  link.rel = "noreferrer";
  link.target = "_blank";
  links.append(link);
  article.append(content, links);

  return article;
}

function sortByYearDescending(items) {
  return [...items].sort((a, b) => {
    const yearDifference = getYear(b) - getYear(a);

    if (yearDifference !== 0) {
      return yearDifference;
    }

    return (a.selectedOrder ?? 9999) - (b.selectedOrder ?? 9999);
  });
}

function buildSelectedPublications(items) {
  return selectedPublicationTitles
    .map((title, index) => {
      const match = items.find((item) => item.title === title);

      if (!match) {
        return null;
      }

      return {
        ...match,
        displayTitle: selectedDisplayTitles.get(title) || match.title,
        selectedOrder: index,
      };
    })
    .filter(Boolean);
}

function getFilteredItems(items, query) {
  const tokens = normalizeText(query).split(/\s+/).filter(Boolean);

  if (!tokens.length) {
    return items;
  }

  return items.filter((item) => {
    const haystack = searchableText(item);
    return tokens.every((token) => haystack.includes(token));
  });
}

function updateStats(items) {
  const sortedItems = sortByYearDescending(items);
  const years = sortedItems.map(getYear).filter(Boolean);
  const fieldCounts = sortedItems.reduce((totals, item) => {
    const field = item.field || "physics";
    totals[field] = (totals[field] || 0) + 1;
    return totals;
  }, {});

  setText("publication-total", String(sortedItems.length));
  setText("physics-total", String(fieldCounts.physics || 0));
  setText("neuroscience-total", String(fieldCounts.neuroscience || 0));
  setText("publication-count", `${sortedItems.length} entries`);

  if (years.length) {
    setText("publication-years", `${Math.min(...years)} - ${Math.max(...years)}`);
  }
}

function renderPublicationLists(query = "") {
  const selected = document.getElementById("selected-publications");
  const archive = document.getElementById("publication-archive");
  const selectedMatches = sortByYearDescending(getFilteredItems(selectedPublications, query));
  const archiveMatches = sortByYearDescending(getFilteredItems(allPublications, query));
  const hasQuery = normalizeText(query).length > 0;

  selected?.replaceChildren(
    ...selectedMatches.map((item) => makePublicationCard(item)),
  );

  archive?.replaceChildren(
    ...archiveMatches.map((item) => makePublicationCard(item, true)),
  );

  setText("publication-count", `${archiveMatches.length} entries`);
  setText(
    "publication-search-status",
    hasQuery
      ? `${selectedMatches.length} selected matches · ${archiveMatches.length} archive matches`
      : "Showing selected publications and the full archive.",
  );

  if (selected && selectedMatches.length === 0) {
    selected.append(makeElement("p", "empty-publication-state", "No selected publications match this search."));
  }

  if (archive && archiveMatches.length === 0) {
    archive.append(makeElement("p", "empty-publication-state", "No archive entries match this search."));
  }
}

function renderPublications(items) {
  allPublications = sortByYearDescending(items);
  selectedPublications = sortByYearDescending(buildSelectedPublications(allPublications));

  updateStats(allPublications);
  renderPublicationLists();

  const searchInput = document.getElementById("publication-search-input");
  searchInput?.addEventListener("input", (event) => {
    renderPublicationLists(event.target.value);
  });
}

if (Array.isArray(window.PUBLICATIONS)) {
  renderPublications(window.PUBLICATIONS);
} else {
  setText("publication-count", "Unavailable");
  document
    .getElementById("selected-publications")
    ?.append(makeElement("p", "", "Publication data could not be loaded."));
}
