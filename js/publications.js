const fieldLabels = {
  neuroscience: "Neuroscience",
  physics: "Physics",
};

const typeLabels = {
  publication: "Publications",
  preprint: "Pre-prints",
  conference: "Conferences",
};

const typeDescriptions = {
  publication: "Journal publications and peer-reviewed articles.",
  preprint: "arXiv entries, technical reports, and records without a journal venue in the provided CSV.",
  conference: "Conference abstracts or proceedings, including APS-style meeting entries.",
};

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
    makeElement("h3", "", item.title || "Untitled publication"),
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

    return (a.title || "").localeCompare(b.title || "");
  });
}

function renderGroup(items, type, id) {
  const list = document.getElementById(id);
  const count = document.getElementById(`${id}-count`);
  const filteredItems = sortByYearDescending(
    items.filter((item) => (item.type || "publication") === type),
  );

  if (count) {
    count.textContent = `${filteredItems.length} entries`;
  }

  list?.replaceChildren(
    ...filteredItems.map((item) => makePublicationCard(item, true)),
  );
}

function renderPublications(items) {
  const selected = document.getElementById("selected-publications");
  const archive = document.getElementById("publication-archive");
  const limit = Number(selected?.dataset.publicationLimit || 12);
  const sortedItems = sortByYearDescending(items);
  const years = sortedItems.map(getYear).filter(Boolean);
  const fieldCounts = sortedItems.reduce((totals, item) => {
    const field = item.field || "physics";
    totals[field] = (totals[field] || 0) + 1;
    return totals;
  }, {});
  const typeCounts = sortedItems.reduce((totals, item) => {
    const type = item.type || "publication";
    totals[type] = (totals[type] || 0) + 1;
    return totals;
  }, {});

  setText("publication-total", String(sortedItems.length));
  setText("physics-total", String(fieldCounts.physics || 0));
  setText("neuroscience-total", String(fieldCounts.neuroscience || 0));
  setText("preprint-total", String(typeCounts.preprint || 0));
  setText("conference-total", String(typeCounts.conference || 0));
  setText("publication-count", `${sortedItems.length} entries`);

  if (years.length) {
    setText("publication-years", `${Math.min(...years)} - ${Math.max(...years)}`);
  }

  selected?.replaceChildren(
    ...sortedItems.slice(0, limit).map((item) => makePublicationCard(item)),
  );
  renderGroup(sortedItems, "publication", "publications-list");
  renderGroup(sortedItems, "preprint", "preprints-list");
  renderGroup(sortedItems, "conference", "conferences-list");
  archive?.replaceChildren(
    ...sortedItems.map((item) => makePublicationCard(item, true)),
  );
}

if (Array.isArray(window.PUBLICATIONS)) {
  renderPublications(window.PUBLICATIONS);
} else {
  setText("publication-count", "Unavailable");
  document
    .getElementById("selected-publications")
    ?.append(makeElement("p", "", "Publication data could not be loaded."));
}
