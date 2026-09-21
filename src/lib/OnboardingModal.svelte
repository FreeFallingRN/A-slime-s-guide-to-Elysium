<script>
  import { onMount, createEventDispatcher } from "svelte";
  import {
    Flame,
    Gauge,
    Users,
    Download,
    Github,
    BookOpen,
    Sparkles,
    CheckCircle2,
    ChevronRight,
    ChevronLeft,
    X,
    ExternalLink,
    Smartphone,
    Monitor,
    Compass,
    Sliders,
    Layers,
    Share2,
    PlusSquare,
    MoreVertical
  } from "lucide-svelte";

  export let isOpen = false;
  export let deferredPrompt = null;
  export let initialSlide = 0;

  const dispatch = createEventDispatcher();

  let activeSlide = 0;
  let selectedPlatform = "brave-android"; // 'brave-android', 'ios-safari', 'desktop'

  const TOTAL_SLIDES = 5;

  $: if (isOpen) {
    if (initialSlide >= 0 && initialSlide < TOTAL_SLIDES) {
      activeSlide = initialSlide;
    }
  }

  function nextSlide() {
    if (activeSlide < TOTAL_SLIDES - 1) {
      activeSlide += 1;
    } else {
      completeOnboarding();
    }
  }

  function prevSlide() {
    if (activeSlide > 0) {
      activeSlide -= 1;
    }
  }

  function goToSlide(index) {
    activeSlide = index;
  }

  function completeOnboarding() {
    try {
      localStorage.setItem("slime_elysium_onboarding_completed", "true");
    } catch (e) {
      console.warn("Could not save onboarding state to localStorage:", e);
    }
    isOpen = false;
    dispatch("close");
  }

  async function handleInstallClick() {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
          dispatch("installed");
        }
      } catch (err) {
        console.error("Install prompt error:", err);
      }
    }
  }

  function handleKeydown(event) {
    if (!isOpen) return;
    if (event.key === "Escape") {
      completeOnboarding();
    } else if (event.key === "ArrowRight") {
      nextSlide();
    } else if (event.key === "ArrowLeft") {
      prevSlide();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
  <!-- Backdrop -->
  <div
    class="modal-backdrop"
    role="dialog"
    aria-modal="true"
    aria-label="System Onboarding Guide"
    tabindex="-1"
    on:click={completeOnboarding}
    on:keydown={(e) => e.key === 'Escape' && completeOnboarding()}
  >
    <!-- Modal Container (Click inside doesn't close) -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <div class="modal-card" role="document" on:click|stopPropagation on:keydown|stopPropagation>
      <!-- Modal Header -->
      <div class="modal-header">
        <div class="header-left">
          <div class="glow-flame-icon">
            <Flame size={18} />
          </div>
          <div class="header-titles">
            <span class="system-label font-tech">ARSON DEVS // SYSTEM ONBOARDING</span>
            <span class="slide-indicator font-tech">NODE {activeSlide + 1} OF {TOTAL_SLIDES}</span>
          </div>
        </div>
        <button class="close-btn" on:click={completeOnboarding} title="Close Guide">
          <X size={18} />
        </button>
      </div>

      <!-- Slide Navigation Tabs (Top Micro Bar) -->
      <div class="slide-tabs">
        <button class="tab-pill {activeSlide === 0 ? 'active' : ''}" on:click={() => goToSlide(0)}>
          1. Overview
        </button>
        <button class="tab-pill {activeSlide === 1 ? 'active' : ''}" on:click={() => goToSlide(1)}>
          2. Timeline
        </button>
        <button class="tab-pill {activeSlide === 2 ? 'active' : ''}" on:click={() => goToSlide(2)}>
          3. Lore
        </button>
        <button class="tab-pill {activeSlide === 3 ? 'active' : ''}" on:click={() => goToSlide(3)}>
          4. Install PWA
        </button>
        <button class="tab-pill {activeSlide === 4 ? 'active' : ''}" on:click={() => goToSlide(4)}>
          5. Community
        </button>
      </div>

      <!-- Slide Viewport -->
      <div class="slide-content-area">
        <!-- SLIDE 0: Welcome & Core Purpose -->
        {#if activeSlide === 0}
          <div class="slide slide-welcome fade-in">
            <div class="badge-hero">
              <span class="holo-tag">ARSON DEVS COMPANION OS</span>
              <h2 class="hero-title">A Slime's Guide to Elysium</h2>
              <p class="hero-subtitle">
                The definitive interactive companion app for the webnovel <strong class="highlight-text">Slime Evolution</strong> by NunuXD.
              </p>
            </div>

            <div class="feature-grid">
              <div class="feature-card">
                <div class="card-icon cyan"><Sliders size={20} /></div>
                <div class="card-info">
                  <h4>Chrono-Controller</h4>
                  <p>Scrub back and forth through novel chapters to see Halon's exact stats, skills, and traits at any point in time.</p>
                </div>
              </div>

              <div class="feature-card">
                <div class="card-icon flame"><Gauge size={20} /></div>
                <div class="card-info">
                  <h4>Digestion & Stat Simulator</h4>
                  <p>Accurate mathematical models for digestion speeds, mana flow capacity, and kinetic mobility milestones.</p>
                </div>
              </div>

              <div class="feature-card">
                <div class="card-icon purple"><Users size={20} /></div>
                <div class="card-info">
                  <h4>Character Evolutions & Art</h4>
                  <p>Track companion stage developments (Lisa, Pip, Elle, etc.) with official novel illustrations and lore entries.</p>
                </div>
              </div>

              <div class="feature-card">
                <div class="card-icon green"><Download size={20} /></div>
                <div class="card-info">
                  <h4>PWA Offline App</h4>
                  <p>Install on your phone or PC for a distraction-free, lightning-fast native app experience that works offline.</p>
                </div>
              </div>
            </div>
          </div>

        <!-- SLIDE 1: Chrono-Controller & Simulator -->
        {:else if activeSlide === 1}
          <div class="slide slide-features fade-in">
            <div class="slide-header">
              <div class="category-tag">SYSTEM CORE</div>
              <h2 class="slide-title">Chrono-Controller & Calculations</h2>
              <p class="slide-desc">
                Everything in the app is synchronized through a unified timeline engine.
              </p>
            </div>

            <div class="hologram-walkthrough">
              <div class="demo-box">
                <div class="demo-header">
                  <span class="font-tech text-cyan">GLOBAL CONTROLLER DEMO</span>
                  <span class="font-tech text-muted">CHAPTER 1 → 100+</span>
                </div>
                <div class="demo-slider-mock">
                  <div class="slider-track-mock">
                    <div class="slider-fill-mock"></div>
                    <div class="slider-thumb-mock"></div>
                  </div>
                  <div class="slider-labels-mock font-tech">
                    <span>CH 1: Rebirth</span>
                    <span class="text-flame">CH 93-100: Fairy Grove</span>
                  </div>
                </div>
              </div>

              <div class="info-checklist">
                <div class="check-item">
                  <CheckCircle2 size={16} class="check-icon text-cyan" />
                  <div>
                    <strong>Real-time Skill Upgrades:</strong> As you adjust the slider, newly learned skills and upgraded abilities reflect their exact tier.
                  </div>
                </div>
                <div class="check-item">
                  <CheckCircle2 size={16} class="check-icon text-cyan" />
                  <div>
                    <strong>Speed & Mana Milestones:</strong> Track base digestion multipliers, viscous flow velocity (m/s), and internal mana compression.
                  </div>
                </div>
                <div class="check-item">
                  <CheckCircle2 size={16} class="check-icon text-cyan" />
                  <div>
                    <strong>Interactive Simulators:</strong> Test custom biomass digestion and stat allocation in the Stat Breakdown tab.
                  </div>
                </div>
              </div>
            </div>
          </div>

        <!-- SLIDE 2: Character Compendium & Lore -->
        {:else if activeSlide === 2}
          <div class="slide slide-lore fade-in">
            <div class="slide-header">
              <div class="category-tag">DATABASE</div>
              <h2 class="slide-title">Character Compendium & Lore</h2>
              <p class="slide-desc">
                Inspect character relationship trees, evolutionary forms, and fauna encyclopedia.
              </p>
            </div>

            <div class="character-preview-grid">
              <div class="preview-tile">
                <div class="tile-badge">SLIME PROTAGONIST</div>
                <h3>Halon</h3>
                <p>Evolves from Basic Acid Slime to Living Symbiotic Armor with Synthetic Mana Circulation.</p>
              </div>

              <div class="preview-tile">
                <div class="tile-badge">SHADOW FOX</div>
                <h3>Lisa</h3>
                <p>From juvenile shadow beast to tactical bonded mount with shadow stride abilities.</p>
              </div>

              <div class="preview-tile">
                <div class="tile-badge">FAIRIES</div>
                <h3>Pip & Elle</h3>
                <p>Luminescent forest guides possessing ancient floral resonance and amber nectar lore.</p>
              </div>
            </div>

            <div class="encyclopedia-callout">
              <Sparkles size={18} class="text-cyan" />
              <span>
                Browse the <strong>Lore Encyclopedia</strong> directly inside the Characters tab to look up Glass Beetles, Amber Trees, and Mana Ecology.
              </span>
            </div>
          </div>

        <!-- SLIDE 3: Install as App (PWA Guide) -->
        {:else if activeSlide === 3}
          <div class="slide slide-install fade-in">
            <div class="slide-header">
              <div class="category-tag">PROGRESSIVE WEB APP</div>
              <h2 class="slide-title">Install Elysium as a Native App</h2>
              <p class="slide-desc">
                Enjoy full-screen immersion, instant loading, and offline access on any phone, tablet, or desktop.
              </p>
            </div>

            {#if deferredPrompt}
              <div class="direct-install-box">
                <div class="install-prompt-text">
                  <Sparkles size={20} class="text-cyan" />
                  <span>Your browser supports 1-click automatic installation!</span>
                </div>
                <button class="primary-install-btn font-tech" on:click={handleInstallClick}>
                  <Download size={18} />
                  <span>INSTALL APP NOW</span>
                </button>
              </div>
            {/if}

            <!-- Platform Switcher -->
            <div class="platform-selector">
              <button
                class="platform-pill {selectedPlatform === 'brave-android' ? 'active' : ''}"
                on:click={() => (selectedPlatform = 'brave-android')}
              >
                <Smartphone size={14} />
                <span>Brave / Chrome (Android)</span>
              </button>

              <button
                class="platform-pill {selectedPlatform === 'ios-safari' ? 'active' : ''}"
                on:click={() => (selectedPlatform = 'ios-safari')}
              >
                <Smartphone size={14} />
                <span>iOS Safari (iPhone)</span>
              </button>

              <button
                class="platform-pill {selectedPlatform === 'desktop' ? 'active' : ''}"
                on:click={() => (selectedPlatform = 'desktop')}
              >
                <Monitor size={14} />
                <span>Desktop (PC / Mac)</span>
              </button>
            </div>

            <!-- Platform Instructions Card -->
            <div class="instruction-card">
              {#if selectedPlatform === 'brave-android'}
                <div class="step-guide">
                  <div class="note-box">
                    <strong>Note for Brave Mobile Users:</strong> Brave blocks automatic popups for privacy. You can easily install the app via the browser menu:
                  </div>
                  <div class="instruction-step">
                    <div class="step-number font-tech">1</div>
                    <div class="step-details">
                      Tap the <strong>three vertical dots menu</strong> (<MoreVertical size={14} style="display:inline; vertical-align:middle;" />) in Brave or Chrome.
                    </div>
                  </div>
                  <div class="instruction-step">
                    <div class="step-number font-tech">2</div>
                    <div class="step-details">
                      Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
                    </div>
                  </div>
                  <div class="instruction-step">
                    <div class="step-number font-tech">3</div>
                    <div class="step-details">
                      Confirm <strong>Install</strong>. Slime Elysium will appear on your home screen and app drawer!
                    </div>
                  </div>
                </div>
              {:else if selectedPlatform === 'ios-safari'}
                <div class="step-guide">
                  <div class="instruction-step">
                    <div class="step-number font-tech">1</div>
                    <div class="step-details">
                      In Safari, tap the <strong>Share</strong> button (<Share2 size={14} style="display:inline; vertical-align:middle;" />) at the bottom toolbar.
                    </div>
                  </div>
                  <div class="instruction-step">
                    <div class="step-number font-tech">2</div>
                    <div class="step-details">
                      Scroll down and tap <strong>"Add to Home Screen"</strong> (<PlusSquare size={14} style="display:inline; vertical-align:middle;" />).
                    </div>
                  </div>
                  <div class="instruction-step">
                    <div class="step-number font-tech">3</div>
                    <div class="step-details">
                      Tap <strong>Add</strong> in the top right. Launch the app from your home screen for full-screen mode!
                    </div>
                  </div>
                </div>
              {:else if selectedPlatform === 'desktop'}
                <div class="step-guide">
                  <div class="instruction-step">
                    <div class="step-number font-tech">1</div>
                    <div class="step-details">
                      In Chrome, Edge, or Brave, look at the right side of the address bar for the <strong>Install icon</strong> (<Download size={14} style="display:inline; vertical-align:middle;" />).
                    </div>
                  </div>
                  <div class="instruction-step">
                    <div class="step-number font-tech">2</div>
                    <div class="step-details">
                      Alternatively, click the browser menu (<MoreVertical size={14} style="display:inline; vertical-align:middle;" />) and click <strong>"Install A Slime's Guide to Elysium..."</strong>.
                    </div>
                  </div>
                  <div class="instruction-step">
                    <div class="step-number font-tech">3</div>
                    <div class="step-details">
                      Enjoy a dedicated desktop window with standalone performance!
                    </div>
                  </div>
                </div>
              {/if}
            </div>
          </div>

        <!-- SLIDE 4: GitHub & Community Links -->
        {:else if activeSlide === 4}
          <div class="slide slide-community fade-in">
            <div class="slide-header">
              <div class="category-tag">CONNECTIVITY</div>
              <h2 class="slide-title">Open Source & Community</h2>
              <p class="slide-desc">
                Contribute, star the repository, or dive directly into the webnovel.
              </p>
            </div>

            <div class="links-list">
              <a
                href="https://github.com/FreeFallingRN/A-slime-s-guide-to-Elysium"
                target="_blank"
                rel="noopener noreferrer"
                class="link-card github-card"
              >
                <div class="link-icon-box">
                  <Github size={24} />
                </div>
                <div class="link-info">
                  <div class="link-title-row">
                    <span class="link-title">GitHub Repository</span>
                    <ExternalLink size={14} />
                  </div>
                  <p class="link-desc">Star the project, inspect formulas, report chapter lore corrections, or submit pull requests.</p>
                  <span class="link-badge font-tech">FreeFallingRN/A-slime-s-guide-to-Elysium</span>
                </div>
              </a>

              <a
                href="https://www.webnovel.com/book/35006015000821605"
                target="_blank"
                rel="noopener noreferrer"
                class="link-card novel-card"
              >
                <div class="link-icon-box fire">
                  <BookOpen size={24} />
                </div>
                <div class="link-info">
                  <div class="link-title-row">
                    <span class="link-title">Read Slime Evolution</span>
                    <ExternalLink size={14} />
                  </div>
                  <p class="link-desc">Support the author NunuXD and read new chapters as they release.</p>
                  <span class="link-badge fire font-tech">WEBNOVEL OFFICIAL</span>
                </div>
              </a>
            </div>

            <div class="ready-banner">
              <Sparkles size={16} class="text-cyan" />
              <span>You are fully synchronized. Enter the Elysium system below!</span>
            </div>
          </div>
        {/if}
      </div>

      <!-- Modal Footer Controls -->
      <div class="modal-footer">
        <div class="footer-dots">
          {#each Array(TOTAL_SLIDES) as _, i}
            <button
              class="dot {activeSlide === i ? 'active' : ''}"
              on:click={() => goToSlide(i)}
              title="Slide {i + 1}"
            ></button>
          {/each}
        </div>

        <div class="footer-buttons">
          {#if activeSlide > 0}
            <button class="nav-btn secondary font-tech" on:click={prevSlide}>
              <ChevronLeft size={16} />
              <span>BACK</span>
            </button>
          {/if}

          {#if activeSlide < TOTAL_SLIDES - 1}
            <button class="nav-btn skip font-tech" on:click={completeOnboarding}>
              <span>SKIP</span>
            </button>
            <button class="nav-btn primary font-tech" on:click={nextSlide}>
              <span>NEXT</span>
              <ChevronRight size={16} />
            </button>
          {:else}
            <button class="nav-btn primary enter font-tech" on:click={completeOnboarding}>
              <Sparkles size={16} />
              <span>ENTER ELYSIUM</span>
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Modal Backdrop */
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(4, 6, 12, 0.85);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 16px;
    animation: fadeInBg 0.25s ease-out forwards;
  }

  @keyframes fadeInBg {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* Modal Container */
  .modal-card {
    background: linear-gradient(180deg, rgba(14, 20, 34, 0.98) 0%, rgba(7, 9, 15, 0.98) 100%);
    border: 1px solid rgba(0, 240, 255, 0.3);
    box-shadow: 0 0 30px rgba(0, 240, 255, 0.15), 0 20px 50px rgba(0, 0, 0, 0.8);
    border-radius: 16px;
    width: 100%;
    max-width: 680px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    animation: slideUpModal 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes slideUpModal {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.97);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* Header */
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    background: rgba(7, 9, 15, 0.6);
    border-bottom: 1px solid rgba(0, 240, 255, 0.15);
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .glow-flame-icon {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #ff5e00, #ff0000);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    box-shadow: 0 0 12px rgba(255, 94, 0, 0.4);
  }

  .header-titles {
    display: flex;
    flex-direction: column;
  }

  .system-label {
    font-size: 0.68rem;
    font-weight: 800;
    color: var(--color-holo-cyan, #00f0ff);
    letter-spacing: 0.15em;
  }

  .slide-indicator {
    font-size: 0.62rem;
    color: #8899ac;
    letter-spacing: 0.1em;
  }

  .close-btn {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #8899ac;
    border-radius: 8px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
  }

  .close-btn:hover {
    background: rgba(255, 68, 68, 0.2);
    border-color: rgba(255, 68, 68, 0.5);
    color: #ff4444;
  }

  /* Slide Tabs */
  .slide-tabs {
    display: flex;
    gap: 6px;
    padding: 10px 20px;
    background: rgba(4, 6, 12, 0.4);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    overflow-x: auto;
  }

  .tab-pill {
    background: transparent;
    border: 1px solid transparent;
    color: #7a8c9e;
    font-size: 0.72rem;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 6px;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s;
  }

  .tab-pill:hover {
    color: #cbd5e1;
    background: rgba(255, 255, 255, 0.04);
  }

  .tab-pill.active {
    background: rgba(0, 240, 255, 0.12);
    border-color: rgba(0, 240, 255, 0.3);
    color: #00f0ff;
    text-shadow: 0 0 8px rgba(0, 240, 255, 0.4);
  }

  /* Content Area */
  .slide-content-area {
    padding: 24px 24px 16px 24px;
    overflow-y: auto;
    flex: 1;
    min-height: 320px;
  }

  .fade-in {
    animation: fadeInContent 0.25s ease-out forwards;
  }

  @keyframes fadeInContent {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Slide Styles */
  .slide {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .badge-hero {
    text-align: center;
    margin-bottom: 6px;
  }

  .holo-tag {
    display: inline-block;
    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 0.2em;
    color: #ff5e00;
    background: rgba(255, 94, 0, 0.1);
    border: 1px solid rgba(255, 94, 0, 0.3);
    padding: 3px 8px;
    border-radius: 4px;
    margin-bottom: 8px;
  }

  .hero-title {
    font-size: 1.55rem;
    font-weight: 800;
    color: #fff;
    margin: 0 0 6px 0;
    text-shadow: 0 0 15px rgba(0, 240, 255, 0.3);
  }

  .hero-subtitle {
    color: #94a3b8;
    font-size: 0.88rem;
    margin: 0;
    line-height: 1.4;
  }

  .highlight-text {
    color: #00f0ff;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 12px;
    margin-top: 6px;
  }

  .feature-card {
    display: flex;
    gap: 12px;
    background: rgba(14, 20, 34, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 12px 14px;
    border-radius: 10px;
    align-items: flex-start;
  }

  .card-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .card-icon.cyan {
    background: rgba(0, 240, 255, 0.15);
    color: #00f0ff;
    border: 1px solid rgba(0, 240, 255, 0.3);
  }

  .card-icon.flame {
    background: rgba(255, 94, 0, 0.15);
    color: #ff5e00;
    border: 1px solid rgba(255, 94, 0, 0.3);
  }

  .card-icon.purple {
    background: rgba(168, 85, 247, 0.15);
    color: #c084fc;
    border: 1px solid rgba(168, 85, 247, 0.3);
  }

  .card-icon.green {
    background: rgba(34, 197, 94, 0.15);
    color: #4ade80;
    border: 1px solid rgba(34, 197, 94, 0.3);
  }

  .card-info h4 {
    margin: 0 0 4px 0;
    font-size: 0.85rem;
    font-weight: 700;
    color: #fff;
  }

  .card-info p {
    margin: 0;
    font-size: 0.74rem;
    color: #94a3b8;
    line-height: 1.35;
  }

  /* Slide Header common */
  .slide-header {
    margin-bottom: 4px;
  }

  .category-tag {
    font-size: 0.6rem;
    font-weight: 800;
    color: #00f0ff;
    letter-spacing: 0.15em;
    margin-bottom: 4px;
  }

  .slide-title {
    font-size: 1.3rem;
    font-weight: 800;
    color: #fff;
    margin: 0 0 4px 0;
  }

  .slide-desc {
    color: #94a3b8;
    font-size: 0.82rem;
    margin: 0;
  }

  /* Hologram Box */
  .hologram-walkthrough {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .demo-box {
    background: rgba(7, 9, 15, 0.8);
    border: 1px solid rgba(0, 240, 255, 0.2);
    border-radius: 10px;
    padding: 14px;
  }

  .demo-header {
    display: flex;
    justify-content: space-between;
    font-size: 0.68rem;
    margin-bottom: 10px;
  }

  .demo-slider-mock {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .slider-track-mock {
    height: 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    position: relative;
  }

  .slider-fill-mock {
    width: 85%;
    height: 100%;
    background: linear-gradient(90deg, #00f0ff, #ff5e00);
    border-radius: 4px;
  }

  .slider-thumb-mock {
    position: absolute;
    left: 85%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #00f0ff;
    box-shadow: 0 0 10px #00f0ff;
  }

  .slider-labels-mock {
    display: flex;
    justify-content: space-between;
    font-size: 0.65rem;
    color: #64748b;
  }

  .info-checklist {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .check-item {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    font-size: 0.8rem;
    color: #cbd5e1;
    background: rgba(255, 255, 255, 0.03);
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .check-item :global(svg) {
    flex-shrink: 0;
    margin-top: 2px;
  }

  /* Lore preview grid */
  .character-preview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 10px;
  }

  .preview-tile {
    background: rgba(14, 20, 34, 0.7);
    border: 1px solid rgba(0, 240, 255, 0.15);
    border-radius: 10px;
    padding: 12px;
  }

  .tile-badge {
    font-size: 0.58rem;
    font-weight: 800;
    color: #ff5e00;
    letter-spacing: 0.1em;
    margin-bottom: 4px;
  }

  .preview-tile h3 {
    margin: 0 0 4px 0;
    font-size: 0.95rem;
    color: #fff;
  }

  .preview-tile p {
    margin: 0;
    font-size: 0.72rem;
    color: #94a3b8;
    line-height: 1.35;
  }

  .encyclopedia-callout {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(0, 240, 255, 0.06);
    border: 1px dashed rgba(0, 240, 255, 0.3);
    padding: 12px;
    border-radius: 8px;
    font-size: 0.78rem;
    color: #cbd5e1;
  }

  /* PWA Install Slide */
  .direct-install-box {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: linear-gradient(135deg, rgba(0, 240, 255, 0.12), rgba(255, 94, 0, 0.12));
    border: 1px solid rgba(0, 240, 255, 0.4);
    padding: 14px;
    border-radius: 10px;
  }

  .install-prompt-text {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.82rem;
    color: #e2e8f0;
    font-weight: 600;
  }

  .primary-install-btn {
    background: linear-gradient(135deg, #00f0ff, #00a2ff);
    color: #07090f;
    font-size: 0.85rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    padding: 10px 16px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 0 0 15px rgba(0, 240, 255, 0.4);
    transition: all 0.2s;
  }

  .primary-install-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 25px rgba(0, 240, 255, 0.6);
  }

  .platform-selector {
    display: flex;
    gap: 6px;
    overflow-x: auto;
    padding-bottom: 2px;
  }

  .platform-pill {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #94a3b8;
    font-size: 0.72rem;
    font-weight: 600;
    padding: 6px 10px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
    transition: all 0.2s;
  }

  .platform-pill.active {
    background: rgba(0, 240, 255, 0.15);
    border-color: rgba(0, 240, 255, 0.4);
    color: #00f0ff;
  }

  .instruction-card {
    background: rgba(7, 9, 15, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    padding: 14px;
  }

  .note-box {
    background: rgba(255, 94, 0, 0.1);
    border-left: 3px solid #ff5e00;
    padding: 8px 10px;
    border-radius: 4px;
    font-size: 0.74rem;
    color: #fed7aa;
    margin-bottom: 12px;
    line-height: 1.35;
  }

  .step-guide {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .instruction-step {
    display: flex;
    gap: 12px;
    align-items: flex-start;
  }

  .step-number {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: rgba(0, 240, 255, 0.15);
    border: 1px solid rgba(0, 240, 255, 0.4);
    color: #00f0ff;
    font-size: 0.75rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .step-details {
    font-size: 0.8rem;
    color: #cbd5e1;
    line-height: 1.35;
  }

  /* Community slide */
  .links-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .link-card {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    background: rgba(14, 20, 34, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 14px 16px;
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.2s;
  }

  .link-card:hover {
    transform: translateY(-2px);
    border-color: rgba(0, 240, 255, 0.4);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  }

  .link-card.novel-card:hover {
    border-color: rgba(255, 94, 0, 0.4);
  }

  .link-icon-box {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .link-icon-box.fire {
    background: rgba(255, 94, 0, 0.15);
    color: #ff5e00;
  }

  .link-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .link-title-row {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #fff;
    font-weight: 700;
    font-size: 0.95rem;
  }

  .link-desc {
    margin: 0;
    font-size: 0.76rem;
    color: #94a3b8;
    line-height: 1.35;
  }

  .link-badge {
    display: inline-block;
    font-size: 0.62rem;
    color: #00f0ff;
    margin-top: 2px;
  }

  .link-badge.fire {
    color: #ff5e00;
  }

  .ready-banner {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(0, 240, 255, 0.06);
    border: 1px solid rgba(0, 240, 255, 0.2);
    padding: 10px 14px;
    border-radius: 8px;
    font-size: 0.78rem;
    color: #cbd5e1;
    margin-top: 6px;
  }

  /* Footer */
  .modal-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 20px;
    background: rgba(7, 9, 15, 0.8);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .footer-dots {
    display: flex;
    gap: 6px;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    cursor: pointer;
    padding: 0;
    transition: all 0.2s;
  }

  .dot.active {
    background: #00f0ff;
    box-shadow: 0 0 8px #00f0ff;
    width: 20px;
    border-radius: 4px;
  }

  .footer-buttons {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .nav-btn {
    border-radius: 8px;
    padding: 8px 14px;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s;
  }

  .nav-btn.secondary {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #cbd5e1;
  }

  .nav-btn.secondary:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }

  .nav-btn.skip {
    background: transparent;
    border: none;
    color: #64748b;
    padding: 8px 10px;
  }

  .nav-btn.skip:hover {
    color: #94a3b8;
  }

  .nav-btn.primary {
    background: linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(0, 162, 255, 0.3));
    border: 1px solid rgba(0, 240, 255, 0.5);
    color: #00f0ff;
    box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
  }

  .nav-btn.primary:hover {
    background: linear-gradient(135deg, #00f0ff, #00a2ff);
    color: #07090f;
    box-shadow: 0 0 16px rgba(0, 240, 255, 0.5);
  }

  .nav-btn.enter {
    background: linear-gradient(135deg, #ff5e00, #ff0000);
    border-color: #ff5e00;
    color: #fff;
    box-shadow: 0 0 15px rgba(255, 94, 0, 0.4);
  }

  .nav-btn.enter:hover {
    box-shadow: 0 0 25px rgba(255, 94, 0, 0.7);
    transform: translateY(-1px);
  }

  .text-cyan {
    color: #00f0ff;
  }

  .text-flame {
    color: #ff5e00;
  }

  .text-muted {
    color: #64748b;
  }

  /* Responsive Adjustments */
  @media (max-width: 600px) {
    .modal-card {
      max-height: 95vh;
      border-radius: 12px;
    }

    .modal-header {
      padding: 12px 14px;
    }

    .slide-tabs {
      padding: 8px 12px;
    }

    .slide-content-area {
      padding: 16px 14px;
      min-height: 280px;
    }

    .feature-grid {
      grid-template-columns: 1fr;
    }

    .character-preview-grid {
      grid-template-columns: 1fr;
    }

    .hero-title {
      font-size: 1.25rem;
    }

    .slide-title {
      font-size: 1.1rem;
    }

    .modal-footer {
      padding: 10px 14px;
    }
  }
</style>
