/* =========================================================
   Shared JavaScript for the website.
   ---------------------------------------------------------
   This file controls:
   1. The typing title animation.
   2. Search and filtering for list pages.
   3. Footer year.
========================================================= */

/* ---------------------------------------------------------
   Typing title animation
   ---------------------------------------------------------
   Usage in HTML:
   <h1 class="typing-title" data-title="About Me" data-typing-mode="normal"></h1>

   Available modes:
   - normal: types the title normally.
   - typo: intentionally types a small typo, deletes it, then finishes correctly.

   The animation runs once on page load and then repeats every 60 seconds.
--------------------------------------------------------- */
function setupTypingTitle() {
  const titleElement = document.querySelector(".typing-title");
  if (!titleElement) return;

  const title = titleElement.dataset.title || "";
  const mode = titleElement.dataset.typingMode || "normal";
  const cursor = '<span class="typing-cursor">|</span>';
  const typeSpeed = 72;
  const deleteSpeed = 42;
  const repeatDelay = 60000;

  function render(text) {
    titleElement.innerHTML = `${text}${cursor}`;
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function typeText(text) {
    for (let index = 0; index <= text.length; index += 1) {
      render(text.slice(0, index));
      await wait(typeSpeed);
    }
  }

  async function deleteTo(length, currentText) {
    for (let index = currentText.length; index >= length; index -= 1) {
      render(currentText.slice(0, index));
      await wait(deleteSpeed);
    }
  }

  async function playNormal() {
    render("");
    await typeText(title);
  }

  async function playTypo() {
    /*
      Planned typo behavior:
      - Type most of the title.
      - Add an incorrect ending.
      - Delete back to the correct prefix.
      - Type the final title correctly.
    */
    const splitIndex = Math.max(2, Math.floor(title.length * 0.62));
    const correctPrefix = title.slice(0, splitIndex);
    const typoText = `${correctPrefix}x`;

    render("");
    await typeText(correctPrefix);
    await typeText(typoText);
    await wait(450);
    await deleteTo(correctPrefix.length, typoText);
    await typeText(title);
  }

  async function play() {
    if (mode === "typo") {
      await playTypo();
    } else {
      await playNormal();
    }
  }

  play();
  setInterval(play, repeatDelay);
}

/* ---------------------------------------------------------
   Render one link card for press/publication lists.
--------------------------------------------------------- */
function createListCard(item) {
  const category = item.category ? ` · ${item.category}` : "";

  return `
    <a class="list-card" href="${item.url}" target="_blank" rel="noopener noreferrer">
      <div>
        <h3 class="list-title">${item.title}</h3>
        <p class="list-meta">${item.source}${category}</p>
      </div>
      <span class="list-date mono">${item.date}</span>
    </a>
  `;
}

/* ---------------------------------------------------------
   Render a searchable/filterable list from a JSON file.
--------------------------------------------------------- */
async function setupListPage() {
  const listElement = document.querySelector("[data-list]");
  if (!listElement) return;

  const dataPath = listElement.dataset.source;
  const searchInput = document.querySelector("[data-search]");
  const countElement = document.querySelector("[data-count]");
  const filterButtons = document.querySelectorAll("[data-filter]");
  let activeFilter = "all";

  const response = await fetch(dataPath);
  const data = await response.json();
  const items = data.items || [];

  function render() {
    const query = (searchInput?.value || "").trim().toLowerCase();

    const filteredItems = items.filter((item) => {
      const searchableText = [item.title, item.source, item.date, item.field, item.category]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(query);
      const matchesFilter = activeFilter === "all" || item.field === activeFilter;

      return matchesSearch && matchesFilter;
    });

    if (countElement) {
      countElement.textContent = `${filteredItems.length} / ${items.length} shown`;
    }

    if (filteredItems.length === 0) {
      listElement.innerHTML = `
        <div class="list-card">
          <div>
            <h3 class="list-title">No matches found</h3>
            <p class="list-meta">Try a broader search term.</p>
          </div>
        </div>
      `;
      return;
    }

    listElement.innerHTML = filteredItems.map(createListCard).join("");
  }

  if (searchInput) {
    searchInput.addEventListener("input", render);
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      activeFilter = button.dataset.filter;
      render();
    });
  });

  render();
}

/* ---------------------------------------------------------
   Page initialization.
--------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  setupTypingTitle();
  setupListPage();
});
