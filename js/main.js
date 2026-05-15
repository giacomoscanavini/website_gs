/* =========================================================
   Shared JavaScript for Giacomo Scanavini's website
   ---------------------------------------------------------
   This script is loaded by every page through:

     <script src="js/main.js" defer></script>

   The `defer` attribute means the browser downloads this file
   while reading the HTML, but waits to run it until the HTML has
   been parsed. That lets this script safely look for elements that
   already exist on the page.

   Main responsibilities:
   1. Add the current year to the footer.
   2. Animate section titles with a typing effect.
   3. Load JSON data for Press/News and Publications pages.
   4. Render searchable and filterable lists.
========================================================= */

/* =========================================================
   SMALL UTILITY: wait
   ---------------------------------------------------------
   JavaScript animations often need controlled pauses.
   This helper returns a Promise that resolves after `ms`
   milliseconds, so we can write readable async animation code:

     await wait(100);

   rather than deeply nested setTimeout calls.
========================================================= */
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* =========================================================
   TYPING TITLE ANIMATION
   ---------------------------------------------------------
   HTML usage example:

     <h1
       class="typing-title"
       data-title="Press & News"
       data-accent-start="8"
       data-typing-mode="typo"
     ></h1>

   Data attributes:
   - data-title:
       The final text that should appear.

   - data-accent-start:
       Character index where the colored part begins.
       Characters before this index are white; characters from
       this index onward use the page accent color.

       Example: "Press & News"
                01234567890
                accent-start="8" colors "News".

   - data-typing-mode:
       "normal" types the title cleanly.
       "typo" makes a planned realistic typo, deletes only the
       incorrect local characters, then finishes the correct title.

   The animation plays once when the page loads and then repeats
   every 60 seconds.
========================================================= */
function setupTypingTitle() {
  const titleElement = document.querySelector(".typing-title");

  // Some pages, such as the main hub, do not use a typing title.
  // In that case, do nothing.
  if (!titleElement) return;

  const title = titleElement.dataset.title || "";
  const mode = titleElement.dataset.typingMode || "normal";

  // The accent boundary controls the white/accent split.
  // If a page does not provide it, the whole title remains white.
  const accentStart = Number.parseInt(titleElement.dataset.accentStart || title.length, 10);

  // Typing speeds in milliseconds. Slightly slower than the first
  // prototype, but still quick enough not to feel theatrical.
  const typeSpeed = 105;
  const deleteSpeed = 58;

  // Replay title animation once per minute.
  const repeatDelay = 60000;

  /* ---------------------------------------------------------
     renderTypedText
     ---------------------------------------------------------
     Writes the currently typed text into the title element.

     It splits the text into two spans:
     - .typing-title-main: normal white text
     - .typing-title-accent: page-specific hue

     The cursor is a real narrow element rather than a text "|".
     This makes it thinner and easier to style with CSS.
  --------------------------------------------------------- */
  function renderTypedText(currentText) {
    const mainText = currentText.slice(0, accentStart);
    const accentText = currentText.slice(accentStart);

    titleElement.innerHTML = `
      <span class="typing-title-main">${mainText}</span><span class="typing-title-accent">${accentText}</span><span class="typing-cursor" aria-hidden="true"></span>
    `;
  }

  /* ---------------------------------------------------------
     typeRange
     ---------------------------------------------------------
     Types characters from `startLength` up to the full length of
     `targetText`. This lets the typo animation continue from an
     already typed prefix instead of restarting from zero.
  --------------------------------------------------------- */
  async function typeRange(targetText, startLength = 0) {
    for (let length = startLength; length <= targetText.length; length += 1) {
      renderTypedText(targetText.slice(0, length));
      await wait(typeSpeed);
    }
  }

  /* ---------------------------------------------------------
     deleteToLength
     ---------------------------------------------------------
     Deletes characters from the end of `currentText` until the
     visible text has exactly `targetLength` characters.

     The important design choice: typo recovery deletes only a few
     local characters, not the whole title.
  --------------------------------------------------------- */
  async function deleteToLength(currentText, targetLength) {
    for (let length = currentText.length; length >= targetLength; length -= 1) {
      renderTypedText(currentText.slice(0, length));
      await wait(deleteSpeed);
    }
  }

  /* ---------------------------------------------------------
     getTypoPlan
     ---------------------------------------------------------
     Returns a hand-written typo plan for the current title.
     These are intentionally realistic-ish mistakes rather than a
     random "x" dropped into the word.

     Each plan has:
     - wrongText: the text containing the typo
     - deleteTo: how many characters should remain after backspacing

     Example for "Press & News":
     - wrongText: "Press & Newd"
     - deleteTo: 10, leaving "Press & New"
     - then the script types the final "s"
  --------------------------------------------------------- */
  function getTypoPlan() {
    const plans = {
      "About Me": {
        wrongText: "About Mr",
        deleteTo: "About M".length
      },
      "Press & News": {
        wrongText: "Press & Newd",
        deleteTo: "Press & New".length
      },
      "Publications": {
        wrongText: "Publicaitons",
        deleteTo: "Publica".length
      },
      "Photography": {
        wrongText: "Photograpjy",
        deleteTo: "Photograp".length
      }
    };

    return plans[title];
  }

  /* ---------------------------------------------------------
     playNormal
     ---------------------------------------------------------
     Clears the title and types the correct title once.
  --------------------------------------------------------- */
  async function playNormal() {
    renderTypedText("");
    await typeRange(title, 0);
  }

  /* ---------------------------------------------------------
     playTypo
     ---------------------------------------------------------
     Plays a planned typo sequence:
     1. Type the planned wrong text.
     2. Pause briefly so the typo is visible.
     3. Backspace only the incorrect local part.
     4. Type the correct final title.

     If no typo plan exists for a title, fall back to the normal
     animation rather than inventing a bad typo.
  --------------------------------------------------------- */
  async function playTypo() {
    const plan = getTypoPlan();

    if (!plan) {
      await playNormal();
      return;
    }

    renderTypedText("");
    await typeRange(plan.wrongText, 0);
    await wait(420);
    await deleteToLength(plan.wrongText, plan.deleteTo);
    await typeRange(title, plan.deleteTo);
  }

  /* ---------------------------------------------------------
     play
     ---------------------------------------------------------
     Chooses the animation based on the page's data-typing-mode.
  --------------------------------------------------------- */
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

/* =========================================================
   CREATE ONE LIST CARD
   ---------------------------------------------------------
   Press and publication entries share the same visual card.
   The input `item` comes from one of the JSON files in /data.

   Expected fields:
   - item.title: main visible card title
   - item.source: journal, institution, or news source
   - item.category: optional category shown after the source
   - item.date: year or month/year
   - item.url: external link opened in a new tab
========================================================= */
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


/* =========================================================
   BUILT-IN FALLBACK DATA
   ---------------------------------------------------------
   The site normally loads list content from files in /data using
   fetch(). That is the cleanest structure for learning and editing.

   However, many browsers block fetch() when you open an HTML file
   directly from your computer with a file:// URL. In that case the
   Press and Publications pages would otherwise appear empty.

   To make the site more forgiving, this object stores the same data
   directly inside JavaScript as a backup. The loading code below first
   tries the JSON file; if that fails, it uses this fallback data.
========================================================= */
const FALLBACK_DATA = {
  "data/news.json": [
  {
    "title": "MicroBooNE 'shines a flashlight' on tricky neutrinos",
    "source": "Yale News",
    "date": "Oct 2021",
    "url": "https://news.yale.edu/2021/10/27/microboone-shines-flashlight-tricky-neutrinos",
    "category": "Press & News"
  },
  {
    "title": "MicroBooNE experiment's first results show no hint of a sterile neutrino",
    "source": "Yale Department of Physics",
    "date": "Oct 2021",
    "url": "https://physics.yale.edu/news/microboone-experiment-s-first-results-show-no-hint-sterile-neutrino",
    "category": "Press & News"
  },
  {
    "title": "MicroBooNE experiment's first results show no hint of a sterile neutrino",
    "source": "Wright Laboratory",
    "date": "Oct 2021",
    "url": "https://wlab.yale.edu/news/microboone-experiments-first-results-show-no-hint-sterile-neutrino",
    "category": "Press & News"
  },
  {
    "title": "ArgoNeuT hits a home run with measurements of neutrinos in liquid argon",
    "source": "Fermilab News",
    "date": "Feb 2019",
    "url": "https://news.fnal.gov/2019/02/argoneut-hits-a-home-run-with-measurements-of-neutrinos-in-liquid-argon/",
    "category": "Press & News"
  },
  {
    "title": "ArgoNeuT Hits a Home Run with Measurements of Neutrinos in Liquid Argon",
    "source": "U.S. Department of Energy",
    "date": "Jan 2019",
    "url": "https://www.energy.gov/science/hep/articles/argoneut-hits-home-run-measurements-neutrinos-liquid-argon",
    "category": "Press & News"
  },
  {
    "title": "Fleming group installs SBND Field Cage at Fermilab",
    "source": "Yale Department of Physics",
    "date": "Aug 2021",
    "url": "https://physics.yale.edu/news/fleming-group-installs-sbnd-field-cage-fermilab",
    "category": "Press & News"
  },
  {
    "title": "Giacomo Scanavini — Postdoctoral Associate in Radiology",
    "source": "Weill Cornell Medicine — Sudhin Shah Laboratory",
    "date": "2024",
    "url": "https://radiology.weill.cornell.edu/research/brain-health-imaging-institute-bhii/sudhin-shah-laboratory",
    "category": "Profiles"
  },
  {
    "title": "Giacomo Scanavini — Experimental Particle Physics",
    "source": "Yale Department of Physics",
    "date": "2023",
    "url": "https://physics.yale.edu/people/giacomo-scanavini",
    "category": "Profiles"
  },
  {
    "title": "Who's Who at the Lab — Giacomo Scanavini",
    "source": "Wright Laboratory, Yale University",
    "date": "Jul 2020",
    "url": "https://wlab.yale.edu/people/whos-who-lab/whos-who-lab-giacomo-scanavini",
    "category": "Profiles"
  },
  {
    "title": "Giacomo Scanavini successfully defends thesis on neutral-current neutral pion production",
    "source": "Yale Department of Physics",
    "date": "Apr 2023",
    "url": "https://physics.yale.edu/news/giacomo-scanavini-successfully-defends-thesis-first-measurement-neutral-current-neutral-pion",
    "category": "Awards & Recognition"
  }
],
  "data/publications.json": [
  {
    "title": "GABAA binding correlates with high-frequency EEG: a possible proxy for depolarization in traumatic brain injury",
    "date": "2026",
    "url": "https://scholar.google.com/citations?user=-EembpAAAAAJ",
    "category": "Research & Publications",
    "source": "Brain Communications",
    "field": "neuroscience"
  },
  {
    "title": "Reconstruction of atmospheric neutrinos in DUNE's horizontal-drift far-detector module",
    "date": "2026",
    "url": "https://arxiv.org/abs/2601.05697",
    "category": "Research & Publications",
    "source": "arXiv",
    "field": "physics"
  },
  {
    "title": "Coupling of Event-Related Potential and Pupil Dilation as a Compensatory Marker of Executive Attention in Traumatic Brain Injury",
    "date": "2025",
    "url": "https://doi.org/10.1177/2689288X251370997",
    "category": "Research & Publications",
    "source": "Neurotrauma Reports",
    "field": "neuroscience"
  },
  {
    "title": "Cortical oscillatory dynamics underlying response speed: insights from high-density EEG and the attention network test",
    "date": "2025",
    "url": "https://doi.org/10.1093/cercor/bhaf316",
    "category": "Research & Publications",
    "source": "Cerebral Cortex",
    "field": "neuroscience"
  },
  {
    "title": "Artifact-reference multivariate backward regression (ARMBR): a novel method for EEG blink artifact removal with minimal data requirements",
    "date": "2025",
    "url": "https://doi.org/10.1088/1741-2552/aded49",
    "category": "Research & Publications",
    "source": "Journal of Neural Engineering",
    "field": "neuroscience"
  },
  {
    "title": "Leveraging meaning-induced neural dynamics to detect covert cognition via EEG during natural language listening — a case series",
    "date": "2025",
    "url": "https://doi.org/10.3389/fpsyg.2025.1616963",
    "category": "Research & Publications",
    "source": "Frontiers in Psychology",
    "field": "neuroscience"
  },
  {
    "title": "SyncGenie: A programmable event synchronization device for neuroscience research",
    "date": "2025",
    "url": "https://doi.org/10.1016/j.ohx.2025.e00619",
    "category": "Research & Publications",
    "source": "HardwareX",
    "field": "neuroscience"
  },
  {
    "title": "First double-differential cross section measurement of neutral-current π⁰ production in neutrino-argon scattering in the MicroBooNE detector",
    "date": "2025",
    "url": "https://doi.org/10.1103/PhysRevLett.134.161802",
    "category": "Research & Publications",
    "source": "Physical Review Letters",
    "field": "physics"
  },
  {
    "title": "Measurement of three-dimensional inclusive muon-neutrino charged-current cross sections on argon with the MicroBooNE detector",
    "date": "2025",
    "url": "https://scholar.google.com/citations?user=-EembpAAAAAJ",
    "category": "Research & Publications",
    "source": "Physics Letters B",
    "field": "physics"
  },
  {
    "title": "First measurement of differential cross sections for muon neutrino charged current interactions on argon with a two-proton final state using the MicroBooNE detector",
    "date": "2025",
    "url": "https://scholar.google.com/citations?user=-EembpAAAAAJ",
    "category": "Research & Publications",
    "source": "Physics Letters B",
    "field": "physics"
  },
  {
    "title": "Measurement of single- and double-differential cross sections for mesonless charged-current muon neutrino interactions on argon with final-state protons using the MicroBooNE detector",
    "date": "2025",
    "url": "https://doi.org/10.1103/PhysRevD.112.112004",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "physics"
  },
  {
    "title": "Neutrino interaction vertex reconstruction in DUNE with Pandora deep learning",
    "date": "2025",
    "url": "https://doi.org/10.1140/epjc/s10052-025-14037-x",
    "category": "Research & Publications",
    "source": "European Physical Journal C",
    "field": "physics"
  },
  {
    "title": "Supernova pointing capabilities of DUNE",
    "date": "2025",
    "url": "https://doi.org/10.1103/PhysRevD.111.092006",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "physics"
  },
  {
    "title": "The hypothetical track-length fitting algorithm for energy measurement in liquid argon TPCs",
    "date": "2025",
    "url": "https://doi.org/10.1088/1748-0221/20/02/P02021",
    "category": "Research & Publications",
    "source": "JINST",
    "field": "physics"
  },
  {
    "title": "Spatial and temporal evaluations of the liquid argon purity in ProtoDUNE-SP",
    "date": "2025",
    "url": "https://doi.org/10.1088/1748-0221/20/09/P09008",
    "category": "Research & Publications",
    "source": "Journal of Instrumentation",
    "field": "physics"
  },
  {
    "title": "The DUNE Science Program",
    "date": "2025",
    "url": "https://arxiv.org/abs/2503.23291",
    "category": "Research & Publications",
    "source": "arXiv",
    "field": "physics"
  },
  {
    "title": "The DUNE phase II detectors",
    "date": "2025",
    "url": "https://arxiv.org/abs/2503.23293",
    "category": "Research & Publications",
    "source": "arXiv",
    "field": "physics"
  },
  {
    "title": "DUNE Software and Computing Research and Development",
    "date": "2025",
    "url": "https://arxiv.org/abs/2503.23743",
    "category": "Research & Publications",
    "source": "arXiv",
    "field": "physics"
  },
  {
    "title": "Measurement of the differential cross section for neutral pion production in charged-current muon neutrino interactions on argon with the MicroBooNE detector",
    "date": "2024",
    "url": "https://doi.org/10.1103/PhysRevD.110.092014",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "physics"
  },
  {
    "title": "First measurement of the total inelastic cross section of positively charged kaons on argon at energies between 5.0 and 7.5 GeV",
    "date": "2024",
    "url": "https://doi.org/10.1103/PhysRevD.110.092011",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "physics"
  },
  {
    "title": "DUNE Phase II: scientific opportunities, detector concepts, technological solutions",
    "date": "2024",
    "url": "https://doi.org/10.1088/1748-0221/19/12/P12005",
    "category": "Research & Publications",
    "source": "Journal of Instrumentation",
    "field": "physics"
  },
  {
    "title": "First simultaneous measurement of differential muon-neutrino charged-current cross sections on argon for final states with and without protons using MicroBooNE data",
    "date": "2024",
    "url": "https://doi.org/10.1103/PhysRevLett.133.041801",
    "category": "Research & Publications",
    "source": "Physical Review Letters",
    "field": "physics"
  },
  {
    "title": "First measurement of η meson production in neutrino interactions on argon with MicroBooNE",
    "date": "2024",
    "url": "https://doi.org/10.1103/PhysRevLett.132.151801",
    "category": "Research & Publications",
    "source": "Physical Review Letters",
    "field": "physics"
  },
  {
    "title": "First search for dark-trident processes using the MicroBooNE detector",
    "date": "2024",
    "url": "https://doi.org/10.1103/PhysRevLett.132.241801",
    "category": "Research & Publications",
    "source": "Physical Review Letters",
    "field": "physics"
  },
  {
    "title": "Search for heavy neutral leptons in electron-positron and neutral-pion final states with the MicroBooNE detector",
    "date": "2024",
    "url": "https://doi.org/10.1103/PhysRevLett.132.041801",
    "category": "Research & Publications",
    "source": "Physical Review Letters",
    "field": "physics"
  },
  {
    "title": "First application of a liquid argon TPC for the search for intranuclear neutron-antineutron transitions and annihilation in ⁴⁰Ar using the MicroBooNE detector",
    "date": "2024",
    "url": "https://doi.org/10.1088/1748-0221/19/07/P07032",
    "category": "Research & Publications",
    "source": "Journal of Instrumentation",
    "field": "physics"
  },
  {
    "title": "Improving neutrino energy estimation of charged-current interaction events with recurrent neural networks in MicroBooNE",
    "date": "2024",
    "url": "https://doi.org/10.1103/PhysRevD.110.092010",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "neuroscience"
  },
  {
    "title": "Inclusive cross section measurements in final states with and without protons for charged-current νμ-Ar scattering in MicroBooNE",
    "date": "2024",
    "url": "https://doi.org/10.1103/PhysRevD.110.013006",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "physics"
  },
  {
    "title": "Measurement of nuclear effects in neutrino-argon interactions using generalized kinematic imbalance variables with the MicroBooNE detector",
    "date": "2024",
    "url": "https://doi.org/10.1103/PhysRevD.109.092007",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "physics"
  },
  {
    "title": "Measurement of ambient radon progeny decay rates and energy spectra in liquid argon using the MicroBooNE detector",
    "date": "2024",
    "url": "https://doi.org/10.1103/PhysRevD.109.052007",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "physics"
  },
  {
    "title": "The DUNE far detector vertical drift technology — Technical design report",
    "date": "2024",
    "url": "https://doi.org/10.1088/1748-0221/19/08/T08004",
    "category": "Research & Publications",
    "source": "Journal of Instrumentation",
    "field": "physics"
  },
  {
    "title": "Doping liquid argon with xenon in ProtoDUNE Single-Phase: effects on scintillation light",
    "date": "2024",
    "url": "https://doi.org/10.1088/1748-0221/19/08/P08005",
    "category": "Research & Publications",
    "source": "Journal of Instrumentation",
    "field": "physics"
  },
  {
    "title": "Performance of a modular ton-scale pixel-readout liquid argon time projection chamber",
    "date": "2024",
    "url": "https://doi.org/10.3390/instruments8030041",
    "category": "Research & Publications",
    "source": "Instruments",
    "field": "physics"
  },
  {
    "title": "Measurement of double-differential cross sections for mesonless charged-current muon neutrino interactions on argon with final-state protons using the MicroBooNE detector",
    "date": "2024",
    "url": "https://arxiv.org/abs/2403.19574",
    "category": "Research & Publications",
    "source": "arXiv",
    "field": "physics"
  },
  {
    "title": "Neutral-Current Neutral Pion Production Measurement in MicroBooNE Using Wire-Cell (PhD Thesis)",
    "date": "2023",
    "url": "https://elischolar.library.yale.edu/gsas_dissertations/1023/",
    "category": "Research & Publications",
    "source": "Yale University",
    "field": "physics"
  },
  {
    "title": "First constraints on light sterile neutrino oscillations from combined appearance and disappearance searches with the MicroBooNE detector",
    "date": "2023",
    "url": "https://doi.org/10.1103/PhysRevLett.130.011801",
    "category": "Research & Publications",
    "source": "Physical Review Letters",
    "field": "physics"
  },
  {
    "title": "First double-differential measurement of kinematic imbalance in neutrino interactions with the MicroBooNE detector",
    "date": "2023",
    "url": "https://doi.org/10.1103/PhysRevLett.131.101802",
    "category": "Research & Publications",
    "source": "Physical Review Letters",
    "field": "physics"
  },
  {
    "title": "First measurement of quasielastic Λ baryon production in muon antineutrino interactions in the MicroBooNE detector",
    "date": "2023",
    "url": "https://doi.org/10.1103/PhysRevLett.130.231802",
    "category": "Research & Publications",
    "source": "Physical Review Letters",
    "field": "physics"
  },
  {
    "title": "First demonstration of O(1 ns) timing resolution in the MicroBooNE liquid argon time projection chamber",
    "date": "2023",
    "url": "https://doi.org/10.1103/PhysRevD.108.052010",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "physics"
  },
  {
    "title": "Multidifferential cross section measurements of νμ-argon quasielasticlike reactions with the MicroBooNE detector",
    "date": "2023",
    "url": "https://doi.org/10.1103/PhysRevD.108.053002",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "physics"
  },
  {
    "title": "Measurement of neutral current single π⁰ production on argon with the MicroBooNE detector",
    "date": "2023",
    "url": "https://doi.org/10.1103/PhysRevD.107.012004",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "physics"
  },
  {
    "title": "Highly-parallelized simulation of a pixelated LArTPC on a GPU",
    "date": "2023",
    "url": "https://doi.org/10.1088/1748-0221/18/04/P04034",
    "category": "Research & Publications",
    "source": "Journal of Instrumentation",
    "field": "physics"
  },
  {
    "title": "Identification and reconstruction of low-energy electrons in the ProtoDUNE-SP detector",
    "date": "2023",
    "url": "https://doi.org/10.1103/PhysRevD.107.092012",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "physics"
  },
  {
    "title": "Impact of cross-section uncertainties on supernova neutrino spectral parameter fitting in DUNE",
    "date": "2023",
    "url": "https://doi.org/10.1103/PhysRevD.107.112012",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "physics"
  },
  {
    "title": "First constraints on heavy QCD axions with a liquid argon TPC using the ArgoNeuT experiment",
    "date": "2023",
    "url": "https://doi.org/10.1103/PhysRevLett.130.221802",
    "category": "Research & Publications",
    "source": "Physical Review Letters",
    "field": "physics"
  },
  {
    "title": "Novel approach for evaluating detector-related uncertainties in a LArTPC using MicroBooNE data",
    "date": "2022",
    "url": "https://doi.org/10.1140/epjc/s10052-022-10270-8",
    "category": "Research & Publications",
    "source": "European Physical Journal C",
    "field": "physics"
  },
  {
    "title": "Search for neutrino-induced neutral-current Δ radiative decay in MicroBooNE and a first test of the MiniBooNE low energy excess under a single-photon hypothesis",
    "date": "2022",
    "url": "https://doi.org/10.1103/PhysRevLett.128.111801",
    "category": "Research & Publications",
    "source": "Physical Review Letters",
    "field": "physics"
  },
  {
    "title": "Search for an excess of electron neutrino interactions in MicroBooNE using multiple final-state topologies",
    "date": "2022",
    "url": "https://doi.org/10.1103/PhysRevLett.128.241801",
    "category": "Research & Publications",
    "source": "Physical Review Letters",
    "field": "physics"
  },
  {
    "title": "First measurement of energy-dependent inclusive muon neutrino charged-current cross sections on argon with the MicroBooNE detector",
    "date": "2022",
    "url": "https://doi.org/10.1103/PhysRevLett.128.151801",
    "category": "Research & Publications",
    "source": "Physical Review Letters",
    "field": "physics"
  },
  {
    "title": "Search for an anomalous excess of charged-current quasielastic νe interactions with MicroBooNE using Deep-Learning-based reconstruction",
    "date": "2022",
    "url": "https://doi.org/10.1103/PhysRevD.105.112003",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "physics"
  },
  {
    "title": "Search for an anomalous excess of charged-current νe interactions without pions in the final state with MicroBooNE",
    "date": "2022",
    "url": "https://doi.org/10.1103/PhysRevD.105.112004",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "physics"
  },
  {
    "title": "Search for an anomalous excess of inclusive charged-current νe interactions in MicroBooNE using Wire-Cell reconstruction",
    "date": "2022",
    "url": "https://doi.org/10.1103/PhysRevD.105.112005",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "physics"
  },
  {
    "title": "First measurement of inclusive electron-neutrino and antineutrino charged current differential cross sections in charged lepton energy on argon in MicroBooNE",
    "date": "2022",
    "url": "https://doi.org/10.1103/PhysRevD.105.L051102",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "physics"
  },
  {
    "title": "Search for long-lived heavy neutral leptons and Higgs portal scalars decaying in MicroBooNE",
    "date": "2022",
    "url": "https://doi.org/10.1103/PhysRevD.106.092006",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "physics"
  },
  {
    "title": "Differential cross section measurement of charged current νe interactions without final-state pions in MicroBooNE",
    "date": "2022",
    "url": "https://doi.org/10.1103/PhysRevD.106.L051102",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "physics"
  },
  {
    "title": "New CC 0π GENIE model tune for MicroBooNE",
    "date": "2022",
    "url": "https://doi.org/10.1103/PhysRevD.105.072001",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "physics"
  },
  {
    "title": "Wire-cell 3D pattern recognition techniques for neutrino event reconstruction in large LArTPCs",
    "date": "2022",
    "url": "https://doi.org/10.1088/1748-0221/17/01/P01037",
    "category": "Research & Publications",
    "source": "Journal of Instrumentation",
    "field": "neuroscience"
  },
  {
    "title": "Cosmic ray muon clustering for the MicroBooNE LArTPC using sMask-RCNN",
    "date": "2022",
    "url": "https://doi.org/10.1088/1748-0221/17/09/P09015",
    "category": "Research & Publications",
    "source": "Journal of Instrumentation",
    "field": "physics"
  },
  {
    "title": "Observation of radon mitigation in MicroBooNE by a liquid argon filtration system",
    "date": "2022",
    "url": "https://doi.org/10.1088/1748-0221/17/11/P11022",
    "category": "Research & Publications",
    "source": "Journal of Instrumentation",
    "field": "physics"
  },
  {
    "title": "A deep-learning based raw waveform region-of-interest finder for the liquid argon time projection chamber",
    "date": "2022",
    "url": "https://doi.org/10.1088/1748-0221/17/01/P01018",
    "category": "Research & Publications",
    "source": "Journal of Instrumentation",
    "field": "physics"
  },
  {
    "title": "Cosmic ray background rejection with wire-cell LArTPC event reconstruction in the MicroBooNE detector",
    "date": "2021",
    "url": "https://doi.org/10.1103/PhysRevApplied.15.064071",
    "category": "Research & Publications",
    "source": "Physical Review Applied",
    "field": "physics"
  },
  {
    "title": "Semantic segmentation with a sparse convolutional neural network for event reconstruction in MicroBooNE",
    "date": "2021",
    "url": "https://doi.org/10.1103/PhysRevD.103.052012",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "neuroscience"
  },
  {
    "title": "Measurement of the flux-averaged inclusive charged-current electron neutrino and antineutrino cross section on argon using the NuMI beam and MicroBooNE",
    "date": "2021",
    "url": "https://doi.org/10.1103/PhysRevD.104.052002",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "physics"
  },
  {
    "title": "Convolutional neural network for multiple particle identification in the MicroBooNE liquid argon TPC",
    "date": "2021",
    "url": "https://doi.org/10.1103/PhysRevD.103.092003",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "neuroscience"
  },
  {
    "title": "Calorimetric classification of track-like signatures in liquid argon TPCs using MicroBooNE data",
    "date": "2021",
    "url": "https://doi.org/10.1007/JHEP12(2021)153",
    "category": "Research & Publications",
    "source": "Journal of High Energy Physics",
    "field": "physics"
  },
  {
    "title": "New constraints on tau-coupled heavy neutral leptons with masses mN = 280–970 MeV",
    "date": "2021",
    "url": "https://doi.org/10.1103/PhysRevLett.127.121801",
    "category": "Research & Publications",
    "source": "Physical Review Letters",
    "field": "physics"
  },
  {
    "title": "Search for a Higgs portal scalar decaying to electron-positron pairs in MicroBooNE",
    "date": "2021",
    "url": "https://doi.org/10.1103/PhysRevLett.127.151803",
    "category": "Research & Publications",
    "source": "Physical Review Letters",
    "field": "physics"
  },
  {
    "title": "Neutrino event selection in MicroBooNE using Wire-Cell 3D imaging, clustering, and charge-light matching",
    "date": "2021",
    "url": "https://doi.org/10.1088/1748-0221/16/06/P06043",
    "category": "Research & Publications",
    "source": "Journal of Instrumentation",
    "field": "physics"
  },
  {
    "title": "Electromagnetic shower reconstruction and energy validation with Michel electrons and π⁰ samples for deep-learning analyses in MicroBooNE",
    "date": "2021",
    "url": "https://doi.org/10.1088/1748-0221/16/12/T12017",
    "category": "Research & Publications",
    "source": "Journal of Instrumentation",
    "field": "physics"
  },
  {
    "title": "The continuous readout stream of the MicroBooNE LArTPC for detection of supernova burst neutrinos",
    "date": "2021",
    "url": "https://doi.org/10.1088/1748-0221/16/02/P02008",
    "category": "Research & Publications",
    "source": "Journal of Instrumentation",
    "field": "physics"
  },
  {
    "title": "Vertex-finding and reconstruction of contained two-track neutrino events in the MicroBooNE detector",
    "date": "2021",
    "url": "https://doi.org/10.1088/1748-0221/16/02/P02017",
    "category": "Research & Publications",
    "source": "Journal of Instrumentation",
    "field": "physics"
  },
  {
    "title": "Cosmic ray background removal with deep neural networks in SBND",
    "date": "2021",
    "url": "https://doi.org/10.3389/frai.2021.649917",
    "category": "Research & Publications",
    "source": "Frontiers in AI",
    "field": "neuroscience"
  },
  {
    "title": "Measurement of the atmospheric muon rate with the MicroBooNE Liquid Argon TPC",
    "date": "2021",
    "url": "https://doi.org/10.1088/1748-0221/16/04/P04004",
    "category": "Research & Publications",
    "source": "Journal of Instrumentation",
    "field": "physics"
  },
  {
    "title": "Measurement of the longitudinal diffusion of ionization electrons in the MicroBooNE detector",
    "date": "2021",
    "url": "https://doi.org/10.1088/1748-0221/16/09/P09025",
    "category": "Research & Publications",
    "source": "Journal of Instrumentation",
    "field": "physics"
  },
  {
    "title": "First measurement of differential charged current quasielasticlike νμ-argon scattering cross sections with the MicroBooNE detector",
    "date": "2020",
    "url": "https://doi.org/10.1103/PhysRevLett.125.201803",
    "category": "Research & Publications",
    "source": "Physical Review Letters",
    "field": "physics"
  },
  {
    "title": "Improved limits on millicharged particles using the ArgoNeuT experiment at Fermilab",
    "date": "2020",
    "url": "https://doi.org/10.1103/PhysRevLett.124.131801",
    "category": "Research & Publications",
    "source": "Physical Review Letters",
    "field": "physics"
  },
  {
    "title": "First measurement of electron neutrino scattering cross section on argon",
    "date": "2020",
    "url": "https://doi.org/10.1103/PhysRevD.102.011101",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "physics"
  },
  {
    "title": "Measurement of differential cross sections for νμ-Ar charged-current interactions with protons and no pions in the final state with MicroBooNE",
    "date": "2020",
    "url": "https://doi.org/10.1103/PhysRevD.102.112013",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "physics"
  },
  {
    "title": "Reconstruction and measurement of O(100) MeV energy electromagnetic activity from π⁰→γγ decays in the MicroBooNE LArTPC",
    "date": "2020",
    "url": "https://doi.org/10.1088/1748-0221/15/02/P02007",
    "category": "Research & Publications",
    "source": "Journal of Instrumentation",
    "field": "physics"
  },
  {
    "title": "Measurement of space charge effects in the MicroBooNE LArTPC using cosmic muons",
    "date": "2020",
    "url": "https://doi.org/10.1088/1748-0221/15/12/P12037",
    "category": "Research & Publications",
    "source": "Journal of Instrumentation",
    "field": "physics"
  },
  {
    "title": "Calibration of the charge and energy loss per unit length of the MicroBooNE LArTPC using muons and protons",
    "date": "2020",
    "url": "https://doi.org/10.1088/1748-0221/15/03/P03022",
    "category": "Research & Publications",
    "source": "Journal of Instrumentation",
    "field": "physics"
  },
  {
    "title": "A method to determine the electric field of LArTPCs using a UV laser system — application in MicroBooNE",
    "date": "2020",
    "url": "https://doi.org/10.1088/1748-0221/15/07/P07010",
    "category": "Research & Publications",
    "source": "Journal of Instrumentation",
    "field": "physics"
  },
  {
    "title": "Search for heavy neutral leptons decaying into muon-pion pairs in the MicroBooNE detector",
    "date": "2020",
    "url": "https://doi.org/10.1103/PhysRevD.101.052001",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "physics"
  },
  {
    "title": "Construction of precision wire readout planes for the Short-Baseline Near Detector (SBND)",
    "date": "2020",
    "url": "https://doi.org/10.1088/1748-0221/15/06/P06033",
    "category": "Research & Publications",
    "source": "Journal of Instrumentation",
    "field": "physics"
  },
  {
    "title": "First measurement of inclusive muon neutrino charged current differential cross sections on argon at Eν ~ 0.8 GeV with the MicroBooNE detector",
    "date": "2019",
    "url": "https://doi.org/10.1103/PhysRevLett.123.131801",
    "category": "Research & Publications",
    "source": "Physical Review Letters",
    "field": "physics"
  },
  {
    "title": "First measurement of νμ charged-current π⁰ production on argon with the MicroBooNE detector",
    "date": "2019",
    "url": "https://doi.org/10.1103/PhysRevD.99.091102",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "physics"
  },
  {
    "title": "Deep neural network for pixel-level electromagnetic particle identification in MicroBooNE",
    "date": "2019",
    "url": "https://doi.org/10.1103/PhysRevD.99.092001",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "neuroscience"
  },
  {
    "title": "Rejecting cosmic background for exclusive charged current quasi elastic neutrino interaction studies with Liquid Argon TPCs",
    "date": "2019",
    "url": "https://doi.org/10.1140/epjc/s10052-019-7184-7",
    "category": "Research & Publications",
    "source": "European Physical Journal C",
    "field": "physics"
  },
  {
    "title": "Demonstration of MeV-scale physics in liquid argon time projection chambers using ArgoNeuT",
    "date": "2019",
    "url": "https://doi.org/10.1103/PhysRevD.99.012002",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "physics"
  },
  {
    "title": "First measurement of the cross section for νμ and ν̄μ induced single charged pion production on argon using ArgoNeuT",
    "date": "2018",
    "url": "https://doi.org/10.1103/PhysRevD.98.052002",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "physics"
  },
  {
    "title": "First observation of low energy electron neutrinos in a liquid argon time projection chamber",
    "date": "2017",
    "url": "https://doi.org/10.1103/PhysRevD.95.072005",
    "category": "Research & Publications",
    "source": "Physical Review D",
    "field": "physics"
  },
  {
    "title": "First Measurement of one Pion Production in Charged Current Neutrino and Antineutrino events on Argon (Technical Report)",
    "date": "2017",
    "url": "https://lss.fnal.gov/cgi-bin/find_paper.pl?tm-2654",
    "category": "Research & Publications",
    "source": "Fermilab",
    "field": "physics"
  },
  {
    "title": "Expectation for Neutrino-Argon interactions in the Short-Baseline Near Detector (SBND)",
    "date": "2015",
    "url": "https://inspirehep.net",
    "category": "Research & Publications",
    "source": "ICARUS / SBND Internal Note",
    "field": "physics"
  }
]
};

/* =========================================================
   SETUP SEARCHABLE / FILTERABLE LIST PAGE
   ---------------------------------------------------------
   This function powers both:
   - press.html
   - publications.html

   It looks for an element with [data-list]. Example:

     <div
       data-list
       data-source="data/publications.json"
     ></div>

   Then it:
   1. Reads the JSON path from data-source.
   2. Fetches the JSON file.
   3. Stores the loaded items.
   4. Renders matching cards.
   5. Re-renders when the user searches or clicks a filter button.
========================================================= */
async function setupListPage() {
  const listElement = document.querySelector("[data-list]");

  // If the current page has no list, there is nothing to set up.
  if (!listElement) return;

  const dataPath = listElement.dataset.source;
  const searchInput = document.querySelector("[data-search]");
  const countElement = document.querySelector("[data-count]");
  const filterButtons = document.querySelectorAll("[data-filter]");
  let activeFilter = "all";

  /* ---------------------------------------------------------
     Load data from JSON, with a local fallback
     ---------------------------------------------------------
     Preferred path:
       1. Load data from /data/news.json or /data/publications.json.

     Backup path:
       2. If fetch() fails, usually because the page was opened from
          disk with a file:// URL, use the built-in FALLBACK_DATA object
          above so the page still displays content.

     This means both of these workflows work:
       - Recommended: python3 -m http.server 8000
       - Quick preview: double-clicking the HTML file
  --------------------------------------------------------- */
  let items = [];

  try {
    const response = await fetch(dataPath);

    // A failed HTTP response, such as 404, does not always throw by
    // itself. This explicit check lets us handle it cleanly.
    if (!response.ok) {
      throw new Error(`Could not load ${dataPath}: ${response.status}`);
    }

    const data = await response.json();
    items = data.items || [];
  } catch (error) {
    console.warn("Using built-in fallback data:", error);
    items = FALLBACK_DATA[dataPath] || [];
  }

  /* ---------------------------------------------------------
     render
     ---------------------------------------------------------
     Applies search and filter settings, updates the count label,
     and writes the matching cards into the page.
  --------------------------------------------------------- */
  function render() {
    const query = (searchInput?.value || "").trim().toLowerCase();

    const filteredItems = items.filter((item) => {
      // Search across the fields that visitors are likely to use.
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

  // Search updates as the visitor types.
  if (searchInput) {
    searchInput.addEventListener("input", render);
  }

  // Filter buttons update the active filter and visual active state.
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      activeFilter = button.dataset.filter;
      render();
    });
  });

  // Initial render after data is loaded.
  render();
}

/* =========================================================
   PAGE INITIALIZATION
   ---------------------------------------------------------
   DOMContentLoaded fires when the HTML is ready. At that point
   we safely initialize all page behaviors.
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  // Footer year: keeps the copyright current automatically.
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  setupTypingTitle();
  setupListPage();
});
