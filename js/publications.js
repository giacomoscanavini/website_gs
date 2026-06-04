const fieldLabels = {
  neuroscience: "Neuroscience",
  physics: "Physics",
};

const fieldDescriptions = {
  neuroscience: "Neuroscience / neuroengineering work.",
  physics: "Neutrino physics, detector, reconstruction, or LArTPC collaboration work.",
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

  if (text) {
    element.textContent = text;
  }

  return element;
}

function makePublicationCard(item, compact = false) {
  const field = item.field || "publication";
  const article = makeElement(
    "article",
    `paper-card compact-paper ${field}${compact ? " mini-paper" : ""}`,
  );
  const content = makeElement("div");
  const source = item.source || "Publication";
  const date = item.date || "n.d.";
  const label = fieldLabels[field] || item.category || "Publication";
  const links = makeElement("div", "paper-links");
  const link = makeElement("a", "", "Explore");

  content.append(
    makeElement("span", "journal-badge", `${source} · ${date}`),
    makeElement("span", `paper-category paper-category-${field}`, label),
    makeElement("h3", "", item.title || "Untitled publication"),
    makeElement("p", "", fieldDescriptions[field] || "Publication."),
  );

  link.href = item.url || "https://scholar.google.com/citations?user=-EembpAAAAAJ";
  link.rel = "noreferrer";
  link.target = "_blank";
  links.append(link);
  article.append(content, links);

  return article;
}

function renderPublications(items) {
  const selected = document.getElementById("selected-publications");
  const archive = document.getElementById("publication-archive");
  const limit = Number(selected?.dataset.publicationLimit || 12);
  const years = items
    .map((item) => Number.parseInt(item.date, 10))
    .filter(Number.isFinite);
  const counts = items.reduce((totals, item) => {
    totals[item.field] = (totals[item.field] || 0) + 1;
    return totals;
  }, {});

  setText("publication-total", String(items.length));
  setText("physics-total", String(counts.physics || 0));
  setText("neuroscience-total", String(counts.neuroscience || 0));
  setText("publication-count", `${items.length} entries`);

  if (years.length) {
    setText("publication-years", `${Math.min(...years)} - ${Math.max(...years)}`);
  }

  selected?.replaceChildren(
    ...items.slice(0, limit).map((item) => makePublicationCard(item)),
  );
  archive?.replaceChildren(
    ...items.map((item) => makePublicationCard(item, true)),
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
