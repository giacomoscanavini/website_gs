function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function setupTypingTitle() {
  const titleElement = document.querySelector(".typing-title");

  if (!titleElement) return;

  const title = titleElement.dataset.title || "";
  const configuredMode = titleElement.dataset.typingMode || "random";

  const accentStart = Number.parseInt(titleElement.dataset.accentStart || title.length, 10);

  const typeSpeed = 92;
  const deleteSpeed = 52;

  const repeatDelay = 60000;

  
  function renderTypedText(currentText) {
    const mainText = currentText.slice(0, accentStart);
    const accentText = currentText.slice(accentStart);

    titleElement.innerHTML = `
      <span class="typing-title-main">${mainText}</span><span class="typing-title-accent">${accentText}</span><span class="typing-cursor" aria-hidden="true"></span>
    `;
  }

  
  async function typeRange(targetText, startLength = 0) {
    for (let length = startLength; length <= targetText.length; length += 1) {
      renderTypedText(targetText.slice(0, length));
      await wait(typeSpeed);
    }
  }

  
  async function deleteToLength(currentText, targetLength) {
    for (let length = currentText.length; length >= targetLength; length -= 1) {
      renderTypedText(currentText.slice(0, length));
      await wait(deleteSpeed);
    }
  }

  
  function getTypoPlan() {
    const plans = {
      "Giacomo Scanavini": {
        wrongText: "Giacomo Scanavimi",
        deleteTo: "Giacomo Scanavi".length
      },
      "About Giacomo": {
        wrongText: "About Giacoml",
        deleteTo: "About Giacom".length
      },
      "Press & News": {
        wrongText: "Press & Newa",
        deleteTo: "Press & New".length
      },
      "Publications": {
        wrongText: "Publicatinos",
        deleteTo: "Publicati".length
      },
      "Photography": {
        wrongText: "Photogrpahy",
        deleteTo: "Photogr".length
      },
      "Projects": {
        wrongText: "Projrcts",
        deleteTo: "Proj".length
      },
      "Contact": {
        wrongText: "Conatct",
        deleteTo: "Con".length
      }
    };

    return plans[title];
  }

  
  async function playNormal() {
    renderTypedText("");
    await typeRange(title, 0);
  }

  
  async function playTypo() {
    const plan = getTypoPlan();

    if (!plan) {
      await playNormal();
      return;
    }

    renderTypedText("");
    await typeRange(plan.wrongText, 0);
    await wait(300);
    await deleteToLength(plan.wrongText, plan.deleteTo);
    await typeRange(title, plan.deleteTo);
  }

  
  async function play() {
    const shouldTypo = configuredMode === "random"
      ? Boolean(getTypoPlan()) && Math.random() < 0.42
      : configuredMode === "typo";

    if (shouldTypo) {
      await playTypo();
    } else {
      await playNormal();
    }
  }

  play();
  setInterval(play, repeatDelay);
}

function createListCard(item) {
  const category = item.category && item.category !== "Publication" ? ` · ${item.category}` : "";

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

const FALLBACK_DATA = {
  "data/news.json": [
    {
      "title": "Ignite Connect 2026 — Sudhin Shah / Cognitive Signals",
      "source": "YouTube",
      "date": "2026",
      "url": "https://www.youtube.com/watch?v=gyBDtwGTUA0",
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
      "title": "Yale Wright Laboratory congratulates Giacomo Scanavini on successful dissertation defense",
      "source": "Yale Wright Laboratory / Instagram",
      "date": "May 2023",
      "url": "https://www.instagram.com/p/CsWxlAjLhj-/?img_index=1",
      "category": "Social"
    },
    {
      "title": "Giacomo Scanavini successfully defends thesis on neutral-current neutral pion production",
      "source": "Yale Department of Physics",
      "date": "Apr 2023",
      "url": "https://physics.yale.edu/news/giacomo-scanavini-successfully-defends-thesis-first-measurement-neutral-current-neutral-pion",
      "category": "Awards & Recognition"
    },
    {
      "title": "Giacomo Scanavini — Experimental Particle Physics",
      "source": "Yale Department of Physics",
      "date": "2023",
      "url": "https://physics.yale.edu/people/giacomo-scanavini",
      "category": "Profiles"
    },
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
      "title": "Fleming group installs SBND Field Cage at Fermilab",
      "source": "Yale Department of Physics",
      "date": "Aug 2021",
      "url": "https://physics.yale.edu/news/fleming-group-installs-sbnd-field-cage-fermilab",
      "category": "Press & News"
    },
    {
      "title": "Who's Who at the Lab — Giacomo Scanavini",
      "source": "Wright Laboratory, Yale University",
      "date": "Jul 2020",
      "url": "https://wlab.yale.edu/people/whos-who-lab/whos-who-lab-giacomo-scanavini",
      "category": "Profiles"
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
      "title": "Spring 2016 NPC Scholars — Giacomo Scanavini",
      "source": "Fermilab Neutrino Physics Center",
      "date": "2016",
      "url": "https://npc.fnal.gov/spring-2016-npc-recipients/",
      "category": "Awards & Recognition"
    }
  ],
  "data/publications.json": [
    {
      "title": "GABAA binding correlates with high-frequency EEG: a possible proxy for depolarization in traumatic brain injury",
      "date": "2026",
      "url": "https://scholar.google.com/citations?user=-EembpAAAAAJ",
      "category": "Publication",
      "source": "Brain Communications",
      "field": "neuroscience"
    },
    {
      "title": "Artifact-reference multivariate backward regression (ARMBR): a novel method for EEG blink artifact removal with minimal data requirements",
      "date": "2025",
      "url": "https://doi.org/10.1088/1741-2552/aded49",
      "category": "Publication",
      "source": "Journal of Neural Engineering",
      "field": "neuroscience"
    },
    {
      "title": "Cortical oscillatory dynamics underlying response speed: insights from high-density EEG and the attention network test",
      "date": "2025",
      "url": "https://doi.org/10.1093/cercor/bhaf316",
      "category": "Publication",
      "source": "Cerebral Cortex",
      "field": "neuroscience"
    },
    {
      "title": "Coupling of Event-Related Potential and Pupil Dilation as a Compensatory Marker of Executive Attention in Traumatic Brain Injury",
      "date": "2025",
      "url": "https://doi.org/10.1177/2689288X251370997",
      "category": "Publication",
      "source": "Neurotrauma Reports",
      "field": "neuroscience"
    },
    {
      "title": "Leveraging meaning-induced neural dynamics to detect covert cognition via EEG during natural language listening — a case series",
      "date": "2025",
      "url": "https://doi.org/10.3389/fpsyg.2025.1616963",
      "category": "Publication",
      "source": "Frontiers in Psychology",
      "field": "neuroscience"
    },
    {
      "title": "SyncGenie: A programmable event synchronization device for neuroscience research",
      "date": "2025",
      "url": "https://doi.org/10.1016/j.ohx.2025.e00619",
      "category": "Publication",
      "source": "HardwareX",
      "field": "neuroscience"
    },
    {
      "title": "Reconstruction of atmospheric neutrinos in DUNE's horizontal-drift far-detector module",
      "date": "2026",
      "url": "https://arxiv.org/abs/2601.05697",
      "category": "Publication",
      "source": "arXiv",
      "field": "physics"
    },
    {
      "title": "DUNE Software and Computing Research and Development",
      "date": "2025",
      "url": "https://arxiv.org/abs/2503.23743",
      "category": "Publication",
      "source": "arXiv",
      "field": "physics"
    },
    {
      "title": "First double-differential cross section measurement of neutral-current π⁰ production in neutrino-argon scattering in the MicroBooNE detector",
      "date": "2025",
      "url": "https://doi.org/10.1103/PhysRevLett.134.161802",
      "category": "Publication",
      "source": "Physical Review Letters",
      "field": "physics"
    },
    {
      "title": "First measurement of differential cross sections for muon neutrino charged current interactions on argon with a two-proton final state using the MicroBooNE detector",
      "date": "2025",
      "url": "https://scholar.google.com/citations?user=-EembpAAAAAJ",
      "category": "Publication",
      "source": "Physics Letters B",
      "field": "physics"
    },
    {
      "title": "Measurement of single- and double-differential cross sections for mesonless charged-current muon neutrino interactions on argon with final-state protons using the MicroBooNE detector",
      "date": "2025",
      "url": "https://doi.org/10.1103/PhysRevD.112.112004",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "Measurement of three-dimensional inclusive muon-neutrino charged-current cross sections on argon with the MicroBooNE detector",
      "date": "2025",
      "url": "https://scholar.google.com/citations?user=-EembpAAAAAJ",
      "category": "Publication",
      "source": "Physics Letters B",
      "field": "physics"
    },
    {
      "title": "Neutrino interaction vertex reconstruction in DUNE with Pandora deep learning",
      "date": "2025",
      "url": "https://doi.org/10.1140/epjc/s10052-025-14037-x",
      "category": "Publication",
      "source": "European Physical Journal C",
      "field": "physics"
    },
    {
      "title": "Spatial and temporal evaluations of the liquid argon purity in ProtoDUNE-SP",
      "date": "2025",
      "url": "https://doi.org/10.1088/1748-0221/20/09/P09008",
      "category": "Publication",
      "source": "Journal of Instrumentation",
      "field": "physics"
    },
    {
      "title": "Supernova pointing capabilities of DUNE",
      "date": "2025",
      "url": "https://doi.org/10.1103/PhysRevD.111.092006",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "The DUNE phase II detectors",
      "date": "2025",
      "url": "https://arxiv.org/abs/2503.23293",
      "category": "Publication",
      "source": "arXiv",
      "field": "physics"
    },
    {
      "title": "The DUNE Science Program",
      "date": "2025",
      "url": "https://arxiv.org/abs/2503.23291",
      "category": "Publication",
      "source": "arXiv",
      "field": "physics"
    },
    {
      "title": "The hypothetical track-length fitting algorithm for energy measurement in liquid argon TPCs",
      "date": "2025",
      "url": "https://doi.org/10.1088/1748-0221/20/02/P02021",
      "category": "Publication",
      "source": "JINST",
      "field": "physics"
    },
    {
      "title": "Doping liquid argon with xenon in ProtoDUNE Single-Phase: effects on scintillation light",
      "date": "2024",
      "url": "https://doi.org/10.1088/1748-0221/19/08/P08005",
      "category": "Publication",
      "source": "Journal of Instrumentation",
      "field": "physics"
    },
    {
      "title": "DUNE Phase II: scientific opportunities, detector concepts, technological solutions",
      "date": "2024",
      "url": "https://doi.org/10.1088/1748-0221/19/12/P12005",
      "category": "Publication",
      "source": "Journal of Instrumentation",
      "field": "physics"
    },
    {
      "title": "First application of a liquid argon TPC for the search for intranuclear neutron-antineutron transitions and annihilation in ⁴⁰Ar using the MicroBooNE detector",
      "date": "2024",
      "url": "https://doi.org/10.1088/1748-0221/19/07/P07032",
      "category": "Publication",
      "source": "Journal of Instrumentation",
      "field": "physics"
    },
    {
      "title": "First measurement of the total inelastic cross section of positively charged kaons on argon at energies between 5.0 and 7.5 GeV",
      "date": "2024",
      "url": "https://doi.org/10.1103/PhysRevD.110.092011",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "First measurement of η meson production in neutrino interactions on argon with MicroBooNE",
      "date": "2024",
      "url": "https://doi.org/10.1103/PhysRevLett.132.151801",
      "category": "Publication",
      "source": "Physical Review Letters",
      "field": "physics"
    },
    {
      "title": "First search for dark-trident processes using the MicroBooNE detector",
      "date": "2024",
      "url": "https://doi.org/10.1103/PhysRevLett.132.241801",
      "category": "Publication",
      "source": "Physical Review Letters",
      "field": "physics"
    },
    {
      "title": "First simultaneous measurement of differential muon-neutrino charged-current cross sections on argon for final states with and without protons using MicroBooNE data",
      "date": "2024",
      "url": "https://doi.org/10.1103/PhysRevLett.133.041801",
      "category": "Publication",
      "source": "Physical Review Letters",
      "field": "physics"
    },
    {
      "title": "Improving neutrino energy estimation of charged-current interaction events with recurrent neural networks in MicroBooNE",
      "date": "2024",
      "url": "https://doi.org/10.1103/PhysRevD.110.092010",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "Inclusive cross section measurements in final states with and without protons for charged-current νμ-Ar scattering in MicroBooNE",
      "date": "2024",
      "url": "https://doi.org/10.1103/PhysRevD.110.013006",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "Measurement of ambient radon progeny decay rates and energy spectra in liquid argon using the MicroBooNE detector",
      "date": "2024",
      "url": "https://doi.org/10.1103/PhysRevD.109.052007",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "Measurement of double-differential cross sections for mesonless charged-current muon neutrino interactions on argon with final-state protons using the MicroBooNE detector",
      "date": "2024",
      "url": "https://arxiv.org/abs/2403.19574",
      "category": "Publication",
      "source": "arXiv",
      "field": "physics"
    },
    {
      "title": "Measurement of nuclear effects in neutrino-argon interactions using generalized kinematic imbalance variables with the MicroBooNE detector",
      "date": "2024",
      "url": "https://doi.org/10.1103/PhysRevD.109.092007",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "Measurement of the differential cross section for neutral pion production in charged-current muon neutrino interactions on argon with the MicroBooNE detector",
      "date": "2024",
      "url": "https://doi.org/10.1103/PhysRevD.110.092014",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "Performance of a modular ton-scale pixel-readout liquid argon time projection chamber",
      "date": "2024",
      "url": "https://doi.org/10.3390/instruments8030041",
      "category": "Publication",
      "source": "Instruments",
      "field": "physics"
    },
    {
      "title": "Search for heavy neutral leptons in electron-positron and neutral-pion final states with the MicroBooNE detector",
      "date": "2024",
      "url": "https://doi.org/10.1103/PhysRevLett.132.041801",
      "category": "Publication",
      "source": "Physical Review Letters",
      "field": "physics"
    },
    {
      "title": "The DUNE far detector vertical drift technology — Technical design report",
      "date": "2024",
      "url": "https://doi.org/10.1088/1748-0221/19/08/T08004",
      "category": "Publication",
      "source": "Journal of Instrumentation",
      "field": "physics"
    },
    {
      "title": "First constraints on heavy QCD axions with a liquid argon TPC using the ArgoNeuT experiment",
      "date": "2023",
      "url": "https://doi.org/10.1103/PhysRevLett.130.221802",
      "category": "Publication",
      "source": "Physical Review Letters",
      "field": "physics"
    },
    {
      "title": "First constraints on light sterile neutrino oscillations from combined appearance and disappearance searches with the MicroBooNE detector",
      "date": "2023",
      "url": "https://doi.org/10.1103/PhysRevLett.130.011801",
      "category": "Publication",
      "source": "Physical Review Letters",
      "field": "physics"
    },
    {
      "title": "First demonstration of O(1 ns) timing resolution in the MicroBooNE liquid argon time projection chamber",
      "date": "2023",
      "url": "https://doi.org/10.1103/PhysRevD.108.052010",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "First double-differential measurement of kinematic imbalance in neutrino interactions with the MicroBooNE detector",
      "date": "2023",
      "url": "https://doi.org/10.1103/PhysRevLett.131.101802",
      "category": "Publication",
      "source": "Physical Review Letters",
      "field": "physics"
    },
    {
      "title": "First measurement of quasielastic Λ baryon production in muon antineutrino interactions in the MicroBooNE detector",
      "date": "2023",
      "url": "https://doi.org/10.1103/PhysRevLett.130.231802",
      "category": "Publication",
      "source": "Physical Review Letters",
      "field": "physics"
    },
    {
      "title": "Highly-parallelized simulation of a pixelated LArTPC on a GPU",
      "date": "2023",
      "url": "https://doi.org/10.1088/1748-0221/18/04/P04034",
      "category": "Publication",
      "source": "Journal of Instrumentation",
      "field": "physics"
    },
    {
      "title": "Identification and reconstruction of low-energy electrons in the ProtoDUNE-SP detector",
      "date": "2023",
      "url": "https://doi.org/10.1103/PhysRevD.107.092012",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "Impact of cross-section uncertainties on supernova neutrino spectral parameter fitting in DUNE",
      "date": "2023",
      "url": "https://doi.org/10.1103/PhysRevD.107.112012",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "Measurement of neutral current single π⁰ production on argon with the MicroBooNE detector",
      "date": "2023",
      "url": "https://doi.org/10.1103/PhysRevD.107.012004",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "Multidifferential cross section measurements of νμ-argon quasielasticlike reactions with the MicroBooNE detector",
      "date": "2023",
      "url": "https://doi.org/10.1103/PhysRevD.108.053002",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "Neutral-Current Neutral Pion Production Measurement in MicroBooNE Using Wire-Cell (PhD Thesis)",
      "date": "2023",
      "url": "https://elischolar.library.yale.edu/gsas_dissertations/1023/",
      "category": "Publication",
      "source": "Yale University",
      "field": "physics"
    },
    {
      "title": "A deep-learning based raw waveform region-of-interest finder for the liquid argon time projection chamber",
      "date": "2022",
      "url": "https://doi.org/10.1088/1748-0221/17/01/P01018",
      "category": "Publication",
      "source": "Journal of Instrumentation",
      "field": "physics"
    },
    {
      "title": "Cosmic ray muon clustering for the MicroBooNE LArTPC using sMask-RCNN",
      "date": "2022",
      "url": "https://doi.org/10.1088/1748-0221/17/09/P09015",
      "category": "Publication",
      "source": "Journal of Instrumentation",
      "field": "physics"
    },
    {
      "title": "Differential cross section measurement of charged current νe interactions without final-state pions in MicroBooNE",
      "date": "2022",
      "url": "https://doi.org/10.1103/PhysRevD.106.L051102",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "First measurement of energy-dependent inclusive muon neutrino charged-current cross sections on argon with the MicroBooNE detector",
      "date": "2022",
      "url": "https://doi.org/10.1103/PhysRevLett.128.151801",
      "category": "Publication",
      "source": "Physical Review Letters",
      "field": "physics"
    },
    {
      "title": "First measurement of inclusive electron-neutrino and antineutrino charged current differential cross sections in charged lepton energy on argon in MicroBooNE",
      "date": "2022",
      "url": "https://doi.org/10.1103/PhysRevD.105.L051102",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "New CC 0π GENIE model tune for MicroBooNE",
      "date": "2022",
      "url": "https://doi.org/10.1103/PhysRevD.105.072001",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "Novel approach for evaluating detector-related uncertainties in a LArTPC using MicroBooNE data",
      "date": "2022",
      "url": "https://doi.org/10.1140/epjc/s10052-022-10270-8",
      "category": "Publication",
      "source": "European Physical Journal C",
      "field": "physics"
    },
    {
      "title": "Observation of radon mitigation in MicroBooNE by a liquid argon filtration system",
      "date": "2022",
      "url": "https://doi.org/10.1088/1748-0221/17/11/P11022",
      "category": "Publication",
      "source": "Journal of Instrumentation",
      "field": "physics"
    },
    {
      "title": "Search for an anomalous excess of charged-current quasielastic νe interactions with MicroBooNE using Deep-Learning-based reconstruction",
      "date": "2022",
      "url": "https://doi.org/10.1103/PhysRevD.105.112003",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "Search for an anomalous excess of charged-current νe interactions without pions in the final state with MicroBooNE",
      "date": "2022",
      "url": "https://doi.org/10.1103/PhysRevD.105.112004",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "Search for an anomalous excess of inclusive charged-current νe interactions in MicroBooNE using Wire-Cell reconstruction",
      "date": "2022",
      "url": "https://doi.org/10.1103/PhysRevD.105.112005",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "Search for an excess of electron neutrino interactions in MicroBooNE using multiple final-state topologies",
      "date": "2022",
      "url": "https://doi.org/10.1103/PhysRevLett.128.241801",
      "category": "Publication",
      "source": "Physical Review Letters",
      "field": "physics"
    },
    {
      "title": "Search for long-lived heavy neutral leptons and Higgs portal scalars decaying in MicroBooNE",
      "date": "2022",
      "url": "https://doi.org/10.1103/PhysRevD.106.092006",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "Search for neutrino-induced neutral-current Δ radiative decay in MicroBooNE and a first test of the MiniBooNE low energy excess under a single-photon hypothesis",
      "date": "2022",
      "url": "https://doi.org/10.1103/PhysRevLett.128.111801",
      "category": "Publication",
      "source": "Physical Review Letters",
      "field": "physics"
    },
    {
      "title": "Wire-cell 3D pattern recognition techniques for neutrino event reconstruction in large LArTPCs",
      "date": "2022",
      "url": "https://doi.org/10.1088/1748-0221/17/01/P01037",
      "category": "Publication",
      "source": "Journal of Instrumentation",
      "field": "physics"
    },
    {
      "title": "Calorimetric classification of track-like signatures in liquid argon TPCs using MicroBooNE data",
      "date": "2021",
      "url": "https://doi.org/10.1007/JHEP12(2021)153",
      "category": "Publication",
      "source": "Journal of High Energy Physics",
      "field": "physics"
    },
    {
      "title": "Convolutional neural network for multiple particle identification in the MicroBooNE liquid argon TPC",
      "date": "2021",
      "url": "https://doi.org/10.1103/PhysRevD.103.092003",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "Cosmic ray background rejection with wire-cell LArTPC event reconstruction in the MicroBooNE detector",
      "date": "2021",
      "url": "https://doi.org/10.1103/PhysRevApplied.15.064071",
      "category": "Publication",
      "source": "Physical Review Applied",
      "field": "physics"
    },
    {
      "title": "Cosmic ray background removal with deep neural networks in SBND",
      "date": "2021",
      "url": "https://doi.org/10.3389/frai.2021.649917",
      "category": "Publication",
      "source": "Frontiers in AI",
      "field": "physics"
    },
    {
      "title": "Electromagnetic shower reconstruction and energy validation with Michel electrons and π⁰ samples for deep-learning analyses in MicroBooNE",
      "date": "2021",
      "url": "https://doi.org/10.1088/1748-0221/16/12/T12017",
      "category": "Publication",
      "source": "Journal of Instrumentation",
      "field": "physics"
    },
    {
      "title": "Measurement of the atmospheric muon rate with the MicroBooNE Liquid Argon TPC",
      "date": "2021",
      "url": "https://doi.org/10.1088/1748-0221/16/04/P04004",
      "category": "Publication",
      "source": "Journal of Instrumentation",
      "field": "physics"
    },
    {
      "title": "Measurement of the flux-averaged inclusive charged-current electron neutrino and antineutrino cross section on argon using the NuMI beam and MicroBooNE",
      "date": "2021",
      "url": "https://doi.org/10.1103/PhysRevD.104.052002",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "Measurement of the longitudinal diffusion of ionization electrons in the MicroBooNE detector",
      "date": "2021",
      "url": "https://doi.org/10.1088/1748-0221/16/09/P09025",
      "category": "Publication",
      "source": "Journal of Instrumentation",
      "field": "physics"
    },
    {
      "title": "Neutrino event selection in MicroBooNE using Wire-Cell 3D imaging, clustering, and charge-light matching",
      "date": "2021",
      "url": "https://doi.org/10.1088/1748-0221/16/06/P06043",
      "category": "Publication",
      "source": "Journal of Instrumentation",
      "field": "physics"
    },
    {
      "title": "New constraints on tau-coupled heavy neutral leptons with masses mN = 280–970 MeV",
      "date": "2021",
      "url": "https://doi.org/10.1103/PhysRevLett.127.121801",
      "category": "Publication",
      "source": "Physical Review Letters",
      "field": "physics"
    },
    {
      "title": "Search for a Higgs portal scalar decaying to electron-positron pairs in MicroBooNE",
      "date": "2021",
      "url": "https://doi.org/10.1103/PhysRevLett.127.151803",
      "category": "Publication",
      "source": "Physical Review Letters",
      "field": "physics"
    },
    {
      "title": "Semantic segmentation with a sparse convolutional neural network for event reconstruction in MicroBooNE",
      "date": "2021",
      "url": "https://doi.org/10.1103/PhysRevD.103.052012",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "The continuous readout stream of the MicroBooNE LArTPC for detection of supernova burst neutrinos",
      "date": "2021",
      "url": "https://doi.org/10.1088/1748-0221/16/02/P02008",
      "category": "Publication",
      "source": "Journal of Instrumentation",
      "field": "physics"
    },
    {
      "title": "Vertex-finding and reconstruction of contained two-track neutrino events in the MicroBooNE detector",
      "date": "2021",
      "url": "https://doi.org/10.1088/1748-0221/16/02/P02017",
      "category": "Publication",
      "source": "Journal of Instrumentation",
      "field": "physics"
    },
    {
      "title": "A method to determine the electric field of LArTPCs using a UV laser system — application in MicroBooNE",
      "date": "2020",
      "url": "https://doi.org/10.1088/1748-0221/15/07/P07010",
      "category": "Publication",
      "source": "Journal of Instrumentation",
      "field": "physics"
    },
    {
      "title": "Calibration of the charge and energy loss per unit length of the MicroBooNE LArTPC using muons and protons",
      "date": "2020",
      "url": "https://doi.org/10.1088/1748-0221/15/03/P03022",
      "category": "Publication",
      "source": "Journal of Instrumentation",
      "field": "physics"
    },
    {
      "title": "Construction of precision wire readout planes for the Short-Baseline Near Detector (SBND)",
      "date": "2020",
      "url": "https://doi.org/10.1088/1748-0221/15/06/P06033",
      "category": "Publication",
      "source": "Journal of Instrumentation",
      "field": "physics"
    },
    {
      "title": "First measurement of differential charged current quasielasticlike νμ-argon scattering cross sections with the MicroBooNE detector",
      "date": "2020",
      "url": "https://doi.org/10.1103/PhysRevLett.125.201803",
      "category": "Publication",
      "source": "Physical Review Letters",
      "field": "physics"
    },
    {
      "title": "First measurement of electron neutrino scattering cross section on argon",
      "date": "2020",
      "url": "https://doi.org/10.1103/PhysRevD.102.011101",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "Improved limits on millicharged particles using the ArgoNeuT experiment at Fermilab",
      "date": "2020",
      "url": "https://doi.org/10.1103/PhysRevLett.124.131801",
      "category": "Publication",
      "source": "Physical Review Letters",
      "field": "physics"
    },
    {
      "title": "Measurement of differential cross sections for νμ-Ar charged-current interactions with protons and no pions in the final state with MicroBooNE",
      "date": "2020",
      "url": "https://doi.org/10.1103/PhysRevD.102.112013",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "Measurement of space charge effects in the MicroBooNE LArTPC using cosmic muons",
      "date": "2020",
      "url": "https://doi.org/10.1088/1748-0221/15/12/P12037",
      "category": "Publication",
      "source": "Journal of Instrumentation",
      "field": "physics"
    },
    {
      "title": "Reconstruction and measurement of O(100) MeV energy electromagnetic activity from π⁰→γγ decays in the MicroBooNE LArTPC",
      "date": "2020",
      "url": "https://doi.org/10.1088/1748-0221/15/02/P02007",
      "category": "Publication",
      "source": "Journal of Instrumentation",
      "field": "physics"
    },
    {
      "title": "Search for heavy neutral leptons decaying into muon-pion pairs in the MicroBooNE detector",
      "date": "2020",
      "url": "https://doi.org/10.1103/PhysRevD.101.052001",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "Deep neural network for pixel-level electromagnetic particle identification in MicroBooNE",
      "date": "2019",
      "url": "https://doi.org/10.1103/PhysRevD.99.092001",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "Demonstration of MeV-scale physics in liquid argon time projection chambers using ArgoNeuT",
      "date": "2019",
      "url": "https://doi.org/10.1103/PhysRevD.99.012002",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "First measurement of inclusive muon neutrino charged current differential cross sections on argon at Eν ~ 0.8 GeV with the MicroBooNE detector",
      "date": "2019",
      "url": "https://doi.org/10.1103/PhysRevLett.123.131801",
      "category": "Publication",
      "source": "Physical Review Letters",
      "field": "physics"
    },
    {
      "title": "First measurement of νμ charged-current π⁰ production on argon with the MicroBooNE detector",
      "date": "2019",
      "url": "https://doi.org/10.1103/PhysRevD.99.091102",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "Rejecting cosmic background for exclusive charged current quasi elastic neutrino interaction studies with Liquid Argon TPCs",
      "date": "2019",
      "url": "https://doi.org/10.1140/epjc/s10052-019-7184-7",
      "category": "Publication",
      "source": "European Physical Journal C",
      "field": "physics"
    },
    {
      "title": "First measurement of the cross section for νμ and ν̄μ induced single charged pion production on argon using ArgoNeuT",
      "date": "2018",
      "url": "https://doi.org/10.1103/PhysRevD.98.052002",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "First Measurement of one Pion Production in Charged Current Neutrino and Antineutrino events on Argon (Technical Report)",
      "date": "2017",
      "url": "https://lss.fnal.gov/cgi-bin/find_paper.pl?tm-2654",
      "category": "Publication",
      "source": "Fermilab",
      "field": "physics"
    },
    {
      "title": "First observation of low energy electron neutrinos in a liquid argon time projection chamber",
      "date": "2017",
      "url": "https://doi.org/10.1103/PhysRevD.95.072005",
      "category": "Publication",
      "source": "Physical Review D",
      "field": "physics"
    },
    {
      "title": "Expectation for Neutrino-Argon interactions in the Short-Baseline Near Detector (SBND)",
      "date": "2015",
      "url": "https://inspirehep.net",
      "category": "Publication",
      "source": "ICARUS / SBND Internal Note",
      "field": "physics"
    }
  ]
};

async function setupListPage() {
  const listElement = document.querySelector("[data-list]");

  if (!listElement) return;

  const dataPath = listElement.dataset.source;
  const searchInput = document.querySelector("[data-search]");
  const countElement = document.querySelector("[data-count]");
  const filterButtons = document.querySelectorAll("[data-filter]");
  let activeFilter = "all";

  
  let items = [];

  try {
    const response = await fetch(dataPath);

    if (!response.ok) {
      throw new Error(`Could not load ${dataPath}: ${response.status}`);
    }

    const data = await response.json();
    items = Array.isArray(data) ? data : data.items || [];
  } catch (error) {
    console.warn("Using built-in fallback data:", error);
    items = FALLBACK_DATA[dataPath] || [];
  }

  
  function getYear(item) {
    const match = String(item.date || "").match(/\d{4}/);
    return match ? Number.parseInt(match[0], 10) : 0;
  }

  function getMonth(item) {
    const months = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 };
    const match = String(item.date || "").match(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/);
    return match ? months[match[0]] : 0;
  }

  function sortByTimeDescending(a, b) {
    return (getYear(b) - getYear(a)) || (getMonth(b) - getMonth(a)) || a.title.localeCompare(b.title);
  }

  function renderSortedCards(filteredItems) {
    return filteredItems
      .sort(sortByTimeDescending)
      .map(createListCard)
      .join("");
  }

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

    listElement.innerHTML = renderSortedCards(filteredItems);
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

function setupAnonymousPigeonForm() {
  const form = document.querySelector("[data-anonymous-form]");

  if (!form) return;

  const messageInput = document.querySelector("[data-anonymous-message]");
  const statusElement = document.querySelector("[data-anonymous-status]");
  const pigeon = document.querySelector("[data-pigeon]");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = (messageInput?.value || "").trim();
    if (!message) return;

    const sentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

    messageInput.value = "";

    if (pigeon) {
      pigeon.classList.remove("is-flying");
      form.closest(".anonymous-card")?.classList.remove("pigeon-delivering");
      void pigeon.offsetWidth; // Forces the browser to reflow, allowing the animation to restart.
      pigeon.classList.add("is-flying");
      form.closest(".anonymous-card")?.classList.add("pigeon-delivering");
    }

    if (statusElement) {
      statusElement.textContent = `Anonymous note sealed and carried away at ${sentTime}.`;
    }
  });
}


function setupPortraitStyleButton() {
  const portraitCard = document.querySelector("[data-portrait-style]");
  const styleButton = document.querySelector("[data-style-button]");

  if (!portraitCard || !styleButton) return;

  let animationTimer;

  styleButton.addEventListener("click", () => {
    window.clearTimeout(animationTimer);
    portraitCard.classList.remove("is-doodling");

    // Force a reflow so a repeated click restarts the ink animation from scratch.
    void portraitCard.offsetWidth;

    portraitCard.classList.add("is-doodling");
    styleButton.disabled = true;

    animationTimer = window.setTimeout(() => {
      styleButton.disabled = false;
    }, 2400);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  setupTypingTitle();
  setupListPage();
  setupAnonymousPigeonForm();
  setupPortraitStyleButton();
});
