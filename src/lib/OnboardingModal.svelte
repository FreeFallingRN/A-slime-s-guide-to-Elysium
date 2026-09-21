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
  export let discordUrl = "https://discord.gg/your-server";

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
    aria-label="System Guide"
    tabindex="-1"
    on:click={completeOnboarding}
    on:keydown={(e) => e.key === 'Escape' && completeOnboarding()}
  >
    <!-- Modal Container -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <div class="modal-card" role="document" on:click|stopPropagation on:keydown|stopPropagation>
      <!-- Modal Header -->
      <div class="modal-header">
        <div class="header-left">
          <div class="glow-flame-icon">
            <Flame size={16} />
          </div>
          <div class="header-titles">
            <span class="system-label font-tech">ARSON DEVS // SYSTEM GUIDE</span>
            <span class="slide-indicator font-tech">STEP {activeSlide + 1} OF {TOTAL_SLIDES}</span>
          </div>
        </div>
        <button class="close-btn" on:click={completeOnboarding} title="Close Guide">
          <X size={16} />
        </button>
      </div>

      <!-- Icon-Based Top Navigation Tabs -->
      <nav class="slide-tabs">
        <button
          class="tab-pill {activeSlide === 0 ? 'active' : ''}"
          on:click={() => goToSlide(0)}
          title="Overview"
        >
          <Compass size={13} />
          <span>Overview</span>
        </button>
        <button
          class="tab-pill {activeSlide === 1 ? 'active' : ''}"
          on:click={() => goToSlide(1)}
          title="Timeline & Stats"
        >
          <Sliders size={13} />
          <span>Timeline</span>
        </button>
        <button
          class="tab-pill {activeSlide === 2 ? 'active' : ''}"
          on:click={() => goToSlide(2)}
          title="Characters & Lore"
        >
          <BookOpen size={13} />
          <span>Lore</span>
        </button>
        <button
          class="tab-pill {activeSlide === 3 ? 'active' : ''}"
          on:click={() => goToSlide(3)}
          title="Install PWA"
        >
          <Download size={13} />
          <span>Install PWA</span>
        </button>
        <button
          class="tab-pill {activeSlide === 4 ? 'active' : ''}"
          on:click={() => goToSlide(4)}
          title="Community & Discord"
        >
          <Users size={13} />
          <span>Community</span>
        </button>
      </nav>

      <!-- Slide Viewport -->
      <div class="slide-content-area">
        <!-- SLIDE 0: Welcome & Core Purpose -->
        {#if activeSlide === 0}
          <div class="slide slide-welcome fade-in">
            <div class="badge-hero">
              <span class="holo-tag">INTERACTIVE COMPANION</span>
              <h2 class="hero-title">A Slime's Guide to Elysium</h2>
              <p class="hero-subtitle">
                Interactive companion app and stats tracker for <strong class="highlight-text">Slime Evolution</strong> by NunuXD.
              </p>
            </div>

            <div class="feature-grid">
              <div class="feature-card">
                <div class="card-icon cyan"><Sliders size={18} /></div>
                <div class="card-info">
                  <h4>Global Chrono-Controller</h4>
                  <p>Scrub through chapters 1 to 100+ to sync Halon's level, unlocked skills, and anatomical traits to that point in the novel.</p>
                </div>
              </div>

              <div class="feature-card">
                <div class="card-icon flame"><Gauge size={18} /></div>
                <div class="card-info">
                  <h4>Stat Breakdown & Simulators</h4>
                  <p>Mathematical calculations for digestion rates (g/min), viscous flow velocity (m/s), and internal mana capacity.</p>
                </div>
              </div>

              <div class="feature-card">
                <div class="card-icon purple"><Users size={18} /></div>
                <div class="card-info">
                  <h4>Character Compendium & Lore</h4>
                  <p>Inspect dual-world character profiles (Elysium vs. Sectors), unlockable illustrations, and flora/fauna encyclopedia entries.</p>
                </div>
              </div>

              <div class="feature-card">
                <div class="card-icon green"><Download size={18} /></div>
                <div class="card-info">
                  <h4>Installable Progressive Web App</h4>
                  <p>Install on your phone, tablet, or desktop for a standalone full-screen experience with offline caching.</p>
                </div>
              </div>
            </div>
          </div>

        <!-- SLIDE 1: Chrono-Controller & Simulator -->
        {:else if activeSlide === 1}
          <div class="slide slide-features fade-in">
            <div class="slide-header">
              <div class="category-tag">TIMELINE ENGINE</div>
              <h2 class="slide-title">Chrono-Controller & Calculations</h2>
              <p class="slide-desc">
                All data across the app is synchronized to the active chapter in the global controller.
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
                    <span class="text-flame">CH 100: Fairy Grove</span>
                  </div>
                </div>
              </div>

              <div class="info-checklist">
                <div class="check-item">
                  <CheckCircle2 size={15} class="text-cyan" />
                  <div>
                    <strong>Chapter-Locked Progression:</strong> Skills, ability tiers, and anatomical traits unlock and scale according to the active chapter.
                  </div>
                </div>
                <div class="check-item">
                  <CheckCircle2 size={15} class="text-cyan" />
                  <div>
                    <strong>Digestion & Speed Formulas:</strong> Real formulas from novel milestones calculating digestion time and velocity (m/s).
                  </div>
                </div>
                <div class="check-item">
                  <CheckCircle2 size={15} class="text-cyan" />
                  <div>
                    <strong>Biomass Calculator:</strong> Estimate biomass point requirements to level up core, cellular, and sensory stats.
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
                Dual-world character profiles, progressive stages, and flora/fauna encyclopedia.
              </p>
            </div>

            <div class="character-preview-grid">
              <div class="preview-tile">
                <div class="tile-badge">SLIME / SECTOR 4 STUDENT</div>
                <h3>Halon / Lohan Hayes</h3>
                <p>A unique Mythical Slime (Class: Devourer) in Elysium, linked to Lohan Hayes living in the Lower Zone of Sector 4 on planet Eden 3.</p>
              </div>

              <div class="preview-tile">
                <div class="tile-badge">WHITE FOX / SECTOR 4 ELITE</div>
                <h3>Lisa / Isabella Vance</h3>
                <p>An intelligent telepathic white fox and leader of the White Lotus guild, linked to player Isabella Vance in Sector 4.</p>
              </div>

              <div class="preview-tile">
                <div class="tile-badge">FOREST FAIRIES</div>
                <h3>Pip & Elle</h3>
                <p>Luminescent fairies encountered in Chapter 95, guiding Halon through the fairy grove and amber tree canopy.</p>
              </div>
            </div>

            <div class="encyclopedia-callout">
              <Sparkles size={16} class="text-cyan" />
              <span>
                Browse the <strong>Lore Archive</strong> tab to inspect Races, Classes, Monsters, Factions, Dungeons, and Tech/Items unlocked as you read.
              </span>
            </div>
          </div>

        <!-- SLIDE 3: Install as App (PWA Guide) -->
        {:else if activeSlide === 3}
          <div class="slide slide-install fade-in">
            <div class="slide-header">
              <div class="category-tag">PROGRESSIVE WEB APP</div>
              <h2 class="slide-title">Install Elysium as an App</h2>
              <p class="slide-desc">
                Full-screen immersion, instant startup, and offline caching on any device.
              </p>
            </div>

            {#if deferredPrompt}
              <div class="direct-install-box">
                <div class="install-prompt-text">
                  <Sparkles size={18} class="text-cyan" />
                  <span>Your browser supports 1-click automatic installation!</span>
                </div>
                <button class="primary-install-btn font-tech" on:click={handleInstallClick}>
                  <Download size={16} />
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
                <Smartphone size={13} />
                <span>Brave / Chrome</span>
              </button>

              <button
                class="platform-pill {selectedPlatform === 'ios-safari' ? 'active' : ''}"
                on:click={() => (selectedPlatform = 'ios-safari')}
              >
                <Smartphone size={13} />
                <span>iOS Safari</span>
              </button>

              <button
                class="platform-pill {selectedPlatform === 'desktop' ? 'active' : ''}"
                on:click={() => (selectedPlatform = 'desktop')}
              >
                <Monitor size={13} />
                <span>Desktop (PC / Mac)</span>
              </button>
            </div>

            <!-- Platform Instructions Card -->
            <div class="instruction-card">
              {#if selectedPlatform === 'brave-android'}
                <div class="step-guide">

                  <div class="instruction-step">
                    <div class="step-number font-tech">1</div>
                    <div class="step-details">
                      Tap the <strong>three dots menu</strong> (<MoreVertical size={13} style="display:inline; vertical-align:middle;" />) in Brave or Chrome.
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
                      Confirm <strong>Install</strong>. Launch Elysium from your home screen with zero browser bars!
                    </div>
                  </div>
                </div>
              {:else if selectedPlatform === 'ios-safari'}
                <div class="step-guide">
                  <div class="instruction-step">
                    <div class="step-number font-tech">1</div>
                    <div class="step-details">
                      In Safari, tap the <strong>Share</strong> button (<Share2 size={13} style="display:inline; vertical-align:middle;" />) in the bottom toolbar.
                    </div>
                  </div>
                  <div class="instruction-step">
                    <div class="step-number font-tech">2</div>
                    <div class="step-details">
                      Scroll down and tap <strong>"Add to Home Screen"</strong> (<PlusSquare size={13} style="display:inline; vertical-align:middle;" />).
                    </div>
                  </div>
                  <div class="instruction-step">
                    <div class="step-number font-tech">3</div>
                    <div class="step-details">
                      Tap <strong>Add</strong> in the top right. Launch from your home screen for fullscreen standalone mode!
                    </div>
                  </div>
                </div>
              {:else if selectedPlatform === 'desktop'}
                <div class="step-guide">
                  <div class="instruction-step">
                    <div class="step-number font-tech">1</div>
                    <div class="step-details">
                      In Chrome, Edge, or Brave, look at the right side of the address bar for the <strong>Install icon</strong> (<Download size={13} style="display:inline; vertical-align:middle;" />).
                    </div>
                  </div>
                  <div class="instruction-step">
                    <div class="step-number font-tech">2</div>
                    <div class="step-details">
                      Alternatively, click the browser menu (<MoreVertical size={13} style="display:inline; vertical-align:middle;" />) and choose <strong>"Install A Slime's Guide to Elysium..."</strong>.
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

        <!-- SLIDE 4: Community, Discord & Links -->
        {:else if activeSlide === 4}
          <div class="slide slide-community fade-in">
            <div class="slide-header">
              <div class="category-tag">COMMUNITY HUB</div>
              <h2 class="slide-title">Join the Community & Read</h2>
              <p class="slide-desc">
                Chat with other readers, follow chapter releases, and check the code.
              </p>
            </div>

            <div class="links-list">
              <!-- Discord Server Card (Featured) -->
              <a
                href={discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="link-card discord-card"
              >
                <div class="link-icon-box discord">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </div>
                <div class="link-info">
                  <div class="link-title-row">
                    <span class="link-title">Slime Evolution Discord</span>
                    <span class="join-badge font-tech">JOIN SERVER</span>
                    <ExternalLink size={13} class="ext-icon" />
                  </div>
                  <p class="link-desc">Chat with the community, discuss lore, and get chapter release notifications.</p>
                </div>
              </a>

              <!-- GitHub Card -->
              <a
                href="https://github.com/FreeFallingRN/A-slime-s-guide-to-Elysium"
                target="_blank"
                rel="noopener noreferrer"
                class="link-card github-card"
              >
                <div class="link-icon-box">
                  <Github size={20} />
                </div>
                <div class="link-info">
                  <div class="link-title-row">
                    <span class="link-title">GitHub Repository</span>
                    <ExternalLink size={13} class="ext-icon" />
                  </div>
                  <p class="link-desc">Inspect calculation formulas, report lore corrections, or contribute updates.</p>
                  <span class="link-badge font-tech">FreeFallingRN/A-slime-s-guide-to-Elysium</span>
                </div>
              </a>

              <!-- Webnovel Card -->
              <a
                href="https://www.webnovel.com/book/35006015000821605"
                target="_blank"
                rel="noopener noreferrer"
                class="link-card novel-card"
              >
                <div class="link-icon-box fire">
                  <BookOpen size={20} />
                </div>
                <div class="link-info">
                  <div class="link-title-row">
                    <span class="link-title">Read Slime Evolution</span>
                    <ExternalLink size={13} class="ext-icon" />
                  </div>
                  <p class="link-desc">Support author NunuXD and read new chapters as they release on Webnovel.</p>
                  <span class="link-badge fire font-tech">OFFICIAL WEBNOVEL</span>
                </div>
              </a>
            </div>

            <div class="ready-banner">
              <Sparkles size={15} class="text-cyan" />
              <span>You're ready! Start exploring the app below.</span>
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
              <ChevronLeft size={14} />
              <span>BACK</span>
            </button>
          {/if}

          {#if activeSlide < TOTAL_SLIDES - 1}
            <button class="nav-btn skip font-tech" on:click={completeOnboarding}>
              <span>SKIP</span>
            </button>
            <button class="nav-btn primary font-tech" on:click={nextSlide}>
              <span>NEXT</span>
              <ChevronRight size={14} />
            </button>
          {:else}
            <button class="nav-btn primary enter font-tech" on:click={completeOnboarding}>
              <Sparkles size={15} />
              <span>ENTER APP</span>
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
    background: rgba(4, 6, 12, 0.88);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 16px;
    animation: fadeInBg 0.2s ease-out forwards;
  }

  @keyframes fadeInBg {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* Modal Card Container */
  .modal-card {
    background: linear-gradient(180deg, rgba(14, 20, 34, 0.98) 0%, rgba(7, 9, 15, 0.98) 100%);
    border: 1px solid rgba(0, 240, 255, 0.3);
    box-shadow: 0 0 35px rgba(0, 240, 255, 0.15), 0 20px 50px rgba(0, 0, 0, 0.85);
    border-radius: 14px;
    width: 100%;
    max-width: 640px;
    max-height: 88vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    animation: slideUpModal 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes slideUpModal {
    from {
      opacity: 0;
      transform: translateY(16px) scale(0.98);
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
    padding: 12px 18px;
    background: rgba(7, 9, 15, 0.6);
    border-bottom: 1px solid rgba(0, 240, 255, 0.15);
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .glow-flame-icon {
    width: 28px;
    height: 28px;
    background: linear-gradient(135deg, #ff5e00, #ff0000);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    box-shadow: 0 0 10px rgba(255, 94, 0, 0.4);
  }

  .header-titles {
    display: flex;
    flex-direction: column;
  }

  .system-label {
    font-size: 0.65rem;
    font-weight: 800;
    color: var(--color-holo-cyan, #00f0ff);
    letter-spacing: 0.12em;
  }

  .slide-indicator {
    font-size: 0.58rem;
    color: #8899ac;
    letter-spacing: 0.08em;
  }

  .close-btn {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #8899ac;
    border-radius: 6px;
    width: 28px;
    height: 28px;
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

  /* Sleek Icon-Based Top Navigation Tabs */
  .slide-tabs {
    display: flex;
    gap: 4px;
    padding: 8px 14px;
    background: rgba(4, 6, 12, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    overflow-x: auto;
    scrollbar-width: none;
  }

  .slide-tabs::-webkit-scrollbar {
    display: none;
  }

  .tab-pill {
    background: transparent;
    border: 1px solid transparent;
    color: #7a8c9e;
    font-size: 0.68rem;
    font-weight: 700;
    padding: 5px 10px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    white-space: nowrap;
    transition: all 0.2s;
    font-family: var(--font-sans);
  }

  .tab-pill:hover {
    color: #cbd5e1;
    background: rgba(255, 255, 255, 0.04);
  }

  .tab-pill.active {
    background: rgba(0, 240, 255, 0.12);
    border-color: rgba(0, 240, 255, 0.35);
    color: #00f0ff;
    text-shadow: 0 0 8px rgba(0, 240, 255, 0.4);
  }

  /* Content Area */
  .slide-content-area {
    padding: 20px 20px 14px 20px;
    overflow-y: auto;
    flex: 1;
    min-height: 300px;
  }

  .fade-in {
    animation: fadeInContent 0.2s ease-out forwards;
  }

  @keyframes fadeInContent {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Slide Styles */
  .slide {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .badge-hero {
    text-align: center;
    margin-bottom: 2px;
  }

  .holo-tag {
    display: inline-block;
    font-size: 0.58rem;
    font-weight: 800;
    letter-spacing: 0.18em;
    color: #ff5e00;
    background: rgba(255, 94, 0, 0.1);
    border: 1px solid rgba(255, 94, 0, 0.3);
    padding: 2px 7px;
    border-radius: 4px;
    margin-bottom: 6px;
  }

  .hero-title {
    font-size: 1.35rem;
    font-weight: 800;
    color: #fff;
    margin: 0 0 4px 0;
    text-shadow: 0 0 12px rgba(0, 240, 255, 0.25);
  }

  .hero-subtitle {
    color: #94a3b8;
    font-size: 0.82rem;
    margin: 0;
    line-height: 1.35;
  }

  .highlight-text {
    color: #00f0ff;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 10px;
    margin-top: 4px;
  }

  .feature-card {
    display: flex;
    gap: 10px;
    background: rgba(14, 20, 34, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.07);
    padding: 10px 12px;
    border-radius: 8px;
    align-items: flex-start;
  }

  .card-icon {
    width: 32px;
    height: 32px;
    border-radius: 6px;
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
    margin: 0 0 2px 0;
    font-size: 0.8rem;
    font-weight: 700;
    color: #fff;
  }

  .card-info p {
    margin: 0;
    font-size: 0.7rem;
    color: #94a3b8;
    line-height: 1.3;
  }

  /* Slide Header common */
  .slide-header {
    margin-bottom: 2px;
  }

  .category-tag {
    font-size: 0.58rem;
    font-weight: 800;
    color: #00f0ff;
    letter-spacing: 0.15em;
    margin-bottom: 3px;
  }

  .slide-title {
    font-size: 1.2rem;
    font-weight: 800;
    color: #fff;
    margin: 0 0 3px 0;
  }

  .slide-desc {
    color: #94a3b8;
    font-size: 0.78rem;
    margin: 0;
  }

  /* Hologram Box */
  .hologram-walkthrough {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .demo-box {
    background: rgba(7, 9, 15, 0.8);
    border: 1px solid rgba(0, 240, 255, 0.2);
    border-radius: 8px;
    padding: 12px;
  }

  .demo-header {
    display: flex;
    justify-content: space-between;
    font-size: 0.65rem;
    margin-bottom: 8px;
  }

  .demo-slider-mock {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .slider-track-mock {
    height: 6px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    position: relative;
  }

  .slider-fill-mock {
    width: 85%;
    height: 100%;
    background: linear-gradient(90deg, #00f0ff, #ff5e00);
    border-radius: 3px;
  }

  .slider-thumb-mock {
    position: absolute;
    left: 85%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #00f0ff;
    box-shadow: 0 0 8px #00f0ff;
  }

  .slider-labels-mock {
    display: flex;
    justify-content: space-between;
    font-size: 0.62rem;
    color: #64748b;
  }

  .info-checklist {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .check-item {
    display: flex;
    gap: 8px;
    align-items: flex-start;
    font-size: 0.76rem;
    color: #cbd5e1;
    background: rgba(255, 255, 255, 0.03);
    padding: 8px 10px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .check-item :global(svg) {
    flex-shrink: 0;
    margin-top: 2px;
  }

  /* Lore preview grid */
  .character-preview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
    gap: 8px;
  }

  .preview-tile {
    background: rgba(14, 20, 34, 0.7);
    border: 1px solid rgba(0, 240, 255, 0.15);
    border-radius: 8px;
    padding: 10px;
  }

  .tile-badge {
    font-size: 0.55rem;
    font-weight: 800;
    color: #ff5e00;
    letter-spacing: 0.1em;
    margin-bottom: 3px;
  }

  .preview-tile h3 {
    margin: 0 0 2px 0;
    font-size: 0.88rem;
    color: #fff;
  }

  .preview-tile p {
    margin: 0;
    font-size: 0.68rem;
    color: #94a3b8;
    line-height: 1.3;
  }

  .encyclopedia-callout {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(0, 240, 255, 0.06);
    border: 1px dashed rgba(0, 240, 255, 0.3);
    padding: 10px;
    border-radius: 6px;
    font-size: 0.74rem;
    color: #cbd5e1;
  }

  /* PWA Install Slide */
  .direct-install-box {
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: linear-gradient(135deg, rgba(0, 240, 255, 0.12), rgba(255, 94, 0, 0.12));
    border: 1px solid rgba(0, 240, 255, 0.4);
    padding: 12px;
    border-radius: 8px;
  }

  .install-prompt-text {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.78rem;
    color: #e2e8f0;
    font-weight: 600;
  }

  .primary-install-btn {
    background: linear-gradient(135deg, #00f0ff, #00a2ff);
    color: #07090f;
    font-size: 0.8rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    padding: 8px 14px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    box-shadow: 0 0 12px rgba(0, 240, 255, 0.4);
    transition: all 0.2s;
  }

  .primary-install-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 0 20px rgba(0, 240, 255, 0.6);
  }

  .platform-selector {
    display: flex;
    gap: 6px;
    overflow-x: auto;
    padding-bottom: 2px;
    scrollbar-width: none;
  }

  .platform-selector::-webkit-scrollbar {
    display: none;
  }

  .platform-pill {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #94a3b8;
    font-size: 0.68rem;
    font-weight: 600;
    padding: 5px 8px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    white-space: nowrap;
    transition: all 0.2s;
    font-family: var(--font-sans);
  }

  .platform-pill.active {
    background: rgba(0, 240, 255, 0.15);
    border-color: rgba(0, 240, 255, 0.4);
    color: #00f0ff;
  }

  .instruction-card {
    background: rgba(7, 9, 15, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 8px;
    padding: 12px;
  }

  .note-box {
    background: rgba(255, 94, 0, 0.1);
    border-left: 3px solid #ff5e00;
    padding: 6px 8px;
    border-radius: 4px;
    font-size: 0.7rem;
    color: #fed7aa;
    margin-bottom: 10px;
    line-height: 1.3;
  }

  .step-guide {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .instruction-step {
    display: flex;
    gap: 10px;
    align-items: flex-start;
  }

  .step-number {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(0, 240, 255, 0.15);
    border: 1px solid rgba(0, 240, 255, 0.4);
    color: #00f0ff;
    font-size: 0.68rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .step-details {
    font-size: 0.76rem;
    color: #cbd5e1;
    line-height: 1.3;
  }

  /* Community slide */
  .links-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .link-card {
    display: flex;
    gap: 12px;
    align-items: center;
    background: rgba(14, 20, 34, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 10px 14px;
    border-radius: 10px;
    text-decoration: none;
    transition: all 0.2s;
  }

  .link-card:hover {
    transform: translateY(-1px);
    border-color: rgba(0, 240, 255, 0.4);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  }

  /* Discord Featured Card */
  .link-card.discord-card {
    background: linear-gradient(135deg, rgba(88, 101, 242, 0.15) 0%, rgba(14, 20, 34, 0.9) 100%);
    border-color: rgba(88, 101, 242, 0.4);
  }

  .link-card.discord-card:hover {
    border-color: #5865F2;
    box-shadow: 0 0 15px rgba(88, 101, 242, 0.35);
  }

  .link-card.novel-card:hover {
    border-color: rgba(255, 94, 0, 0.4);
  }

  .link-icon-box {
    width: 38px;
    height: 38px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.06);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .link-icon-box.discord {
    background: #5865F2;
    color: #fff;
    box-shadow: 0 0 10px rgba(88, 101, 242, 0.4);
  }

  .link-icon-box.fire {
    background: rgba(255, 94, 0, 0.15);
    color: #ff5e00;
  }

  .link-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    min-width: 0;
  }

  .link-title-row {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #fff;
    font-weight: 700;
    font-size: 0.88rem;
  }

  .join-badge {
    font-size: 0.58rem;
    font-weight: 800;
    background: #5865F2;
    color: #fff;
    padding: 2px 6px;
    border-radius: 4px;
    letter-spacing: 0.05em;
  }

  .ext-icon {
    margin-left: auto;
    color: #64748b;
  }

  .link-card:hover .ext-icon {
    color: #fff;
  }

  .link-desc {
    margin: 0;
    font-size: 0.7rem;
    color: #94a3b8;
    line-height: 1.3;
  }

  .link-badge {
    display: inline-block;
    font-size: 0.58rem;
    color: #00f0ff;
    margin-top: 1px;
  }

  .link-badge.fire {
    color: #ff5e00;
  }

  .ready-banner {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(0, 240, 255, 0.06);
    border: 1px solid rgba(0, 240, 255, 0.2);
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 0.74rem;
    color: #cbd5e1;
    margin-top: 2px;
  }

  /* Footer */
  .modal-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;
    background: rgba(7, 9, 15, 0.8);
    border-top: 1px solid rgba(255, 255, 255, 0.07);
  }

  .footer-dots {
    display: flex;
    gap: 5px;
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    cursor: pointer;
    padding: 0;
    transition: all 0.2s;
  }

  .dot.active {
    background: #00f0ff;
    box-shadow: 0 0 6px #00f0ff;
    width: 16px;
    border-radius: 3px;
  }

  .footer-buttons {
    display: flex;
    gap: 6px;
    align-items: center;
  }

  .nav-btn {
    border-radius: 6px;
    padding: 6px 12px;
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: all 0.2s;
  }

  .nav-btn.secondary {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #cbd5e1;
  }

  .nav-btn.secondary:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
  }

  .nav-btn.skip {
    background: transparent;
    border: none;
    color: #64748b;
    padding: 6px 8px;
  }

  .nav-btn.skip:hover {
    color: #94a3b8;
  }

  .nav-btn.primary {
    background: linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(0, 162, 255, 0.3));
    border: 1px solid rgba(0, 240, 255, 0.5);
    color: #00f0ff;
    box-shadow: 0 0 8px rgba(0, 240, 255, 0.2);
  }

  .nav-btn.primary:hover {
    background: linear-gradient(135deg, #00f0ff, #00a2ff);
    color: #07090f;
    box-shadow: 0 0 14px rgba(0, 240, 255, 0.5);
  }

  .nav-btn.enter {
    background: linear-gradient(135deg, #ff5e00, #ff0000);
    border-color: #ff5e00;
    color: #fff;
    box-shadow: 0 0 12px rgba(255, 94, 0, 0.4);
  }

  .nav-btn.enter:hover {
    box-shadow: 0 0 20px rgba(255, 94, 0, 0.7);
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
      max-height: 94vh;
      border-radius: 10px;
    }

    .modal-header {
      padding: 10px 12px;
    }

    .slide-tabs {
      padding: 6px 8px;
      gap: 3px;
    }

    .tab-pill {
      padding: 4px 7px;
      font-size: 0.62rem;
      gap: 3px;
    }

    .slide-content-area {
      padding: 14px 12px;
      min-height: 260px;
    }

    .feature-grid {
      grid-template-columns: 1fr;
    }

    .character-preview-grid {
      grid-template-columns: 1fr;
    }

    .hero-title {
      font-size: 1.15rem;
    }

    .slide-title {
      font-size: 1.05rem;
    }

    .modal-footer {
      padding: 8px 12px;
    }
  }
</style>
