const pages = ["index.html", "research.html", "projects.html"];

const currentFile = window.location.pathname.split("/").pop() || "index.html";
const currentIndex = Math.max(pages.indexOf(currentFile), 0);
let navigationLocked = false;
let touchStartX = 0;
let touchStartY = 0;

document.body.classList.add("page-enter");

function goToPage(targetIndex) {
  if (
    navigationLocked ||
    targetIndex < 0 ||
    targetIndex >= pages.length ||
    targetIndex === currentIndex
  ) {
    return;
  }

  navigationLocked = true;
  const directionClass =
    targetIndex > currentIndex ? "leaving-left" : "leaving-right";
  document.body.classList.add(directionClass);

  window.setTimeout(() => {
    window.location.href = pages[targetIndex];
  }, 260);
}

document.querySelectorAll("a[data-page-index]").forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetIndex = Number(link.dataset.pageIndex);

    if (Number.isNaN(targetIndex)) {
      return;
    }

    event.preventDefault();
    goToPage(targetIndex);
  });
});

document.querySelectorAll("[data-step]").forEach((button) => {
  button.addEventListener("click", () => {
    goToPage(currentIndex + Number(button.dataset.step));
  });
});

const previousButton = document.querySelector('[data-step="-1"]');
const nextButton = document.querySelector('[data-step="1"]');

if (previousButton && currentIndex === 0) {
  previousButton.setAttribute("aria-disabled", "true");
}

if (nextButton && currentIndex === pages.length - 1) {
  nextButton.setAttribute("aria-disabled", "true");
}

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    goToPage(currentIndex + 1);
  }

  if (event.key === "ArrowLeft") {
    goToPage(currentIndex - 1);
  }
});

window.addEventListener(
  "wheel",
  (event) => {
    const horizontalIntent =
      Math.abs(event.deltaX) > Math.abs(event.deltaY) * 2 &&
      Math.abs(event.deltaX) > 32;

    if (!horizontalIntent) {
      return;
    }

    event.preventDefault();

    if (event.deltaX > 0) {
      goToPage(currentIndex + 1);
    } else {
      goToPage(currentIndex - 1);
    }
  },
  { passive: false },
);

window.addEventListener(
  "touchstart",
  (event) => {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
  },
  { passive: true },
);

window.addEventListener(
  "touchend",
  (event) => {
    const deltaX = event.changedTouches[0].screenX - touchStartX;
    const deltaY = event.changedTouches[0].screenY - touchStartY;
    const horizontalSwipe =
      Math.abs(deltaX) > Math.abs(deltaY) * 1.7 && Math.abs(deltaX) > 90;

    if (!horizontalSwipe) {
      return;
    }

    if (deltaX < 0) {
      goToPage(currentIndex + 1);
    } else {
      goToPage(currentIndex - 1);
    }
  },
  { passive: true },
);
