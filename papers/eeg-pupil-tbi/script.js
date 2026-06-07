const progressBar = document.getElementById("progressBar");
const revealEls = [...document.querySelectorAll(".reveal")];
const chapters = [...document.querySelectorAll(".chapter")];
const railDots = [...document.querySelectorAll(".rail-dot")];
const navLinks = [...document.querySelectorAll(".top-nav a")];

function updateProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
}

function setActiveChapter() {
  let activeIndex = 0;
  let smallest = Number.POSITIVE_INFINITY;

  chapters.forEach((chapter, index) => {
    const rect = chapter.getBoundingClientRect();
    const distance = Math.abs(rect.top - window.innerHeight * 0.24);
    if (distance < smallest) {
      smallest = distance;
      activeIndex = index;
    }
  });

  railDots.forEach((dot, index) => dot.classList.toggle("is-active", index === activeIndex));

  const sectionIds = navLinks
    .map((link) => (link.getAttribute("href") || "").replace("#", ""))
    .filter((id) => document.getElementById(id));
  let currentId = sectionIds[0];

  sectionIds.forEach((id) => {
    const section = document.getElementById(id);
    if (!section) return;
    if (section.getBoundingClientRect().top < window.innerHeight * 0.32) {
      currentId = id;
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    link.classList.toggle("is-active", href === `#${currentId}`);
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");

      const counters = entry.target.querySelectorAll("[data-count]");
      counters.forEach((counter) => animateCounter(counter));

      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -8% 0px",
  }
);

revealEls.forEach((el) => revealObserver.observe(el));

const counted = new WeakSet();

function animateCounter(el) {
  if (counted.has(el)) return;
  counted.add(el);

  const target = Number(el.dataset.count);
  if (!Number.isFinite(target)) return;

  const duration = 900;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased).toString();

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

window.addEventListener("scroll", () => {
  updateProgress();
  setActiveChapter();
}, { passive: true });

window.addEventListener("resize", setActiveChapter);
updateProgress();
setActiveChapter();
