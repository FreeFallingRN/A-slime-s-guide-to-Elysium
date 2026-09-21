<script>
  import { onMount } from "svelte";
  import ChapterControl from "./lib/ChapterControl.svelte";
  import Book from "./lib/Book.svelte";
  import StatCalculator from "./lib/StatCalculator.svelte";
  import BiomassCalculator from "./lib/BiomassCalculator.svelte";
  import Map from "./lib/Map.svelte";
  import Visual3D from "./lib/Visual3D.svelte";
  import Characters from "./lib/Characters.svelte";
  import OnboardingModal from "./lib/OnboardingModal.svelte";

  import {
    BookOpen,
    Gauge,
    MapIcon,
    Sparkles,
    Shield,
    Flame,
    Download,
    Users,
    Image as ImageIcon,
    HelpCircle,
    Github
  } from "lucide-svelte";

  let currentTab = "stats"; // 'book', 'stats', 'biomass', 'map', '3d'
  let deferredPrompt = null;
  let installable = false;

  // Onboarding state
  let showOnboarding = false;
  let onboardingSlide = 0;

  onMount(() => {
    // Check if user has seen the onboarding tutorial
    try {
      const completed = localStorage.getItem("slime_elysium_onboarding_completed");
      if (!completed) {
        showOnboarding = true;
        onboardingSlide = 0;
      }
    } catch (e) {
      console.warn("Could not read localStorage:", e);
    }

    // Auto-reload the app when a new service worker takes over control
    if ("serviceWorker" in navigator) {
      let refreshing = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (refreshing) return;
        refreshing = true;
        window.location.reload();
      });

      // Register the service worker manually with aggressive update checks
      const swUrl = `${import.meta.env.BASE_URL}sw.js`;
      navigator.serviceWorker
        .register(swUrl)
        .then((reg) => {
          // Force an immediate update check when app mounts
          reg.update().catch(() => {});

          // Re-check for updates when tab becomes focused (user switches back)
          window.addEventListener("focus", () => {
            reg.update().catch(() => {});
          });

          // Periodically check for updates (every 60 seconds)
          setInterval(() => {
            reg.update().catch(() => {});
          }, 60000);
        })
        .catch((err) => {
          console.error("Service worker registration failed:", err);
        });
    }

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
      installable = true;
    });

    window.addEventListener("appinstalled", () => {
      installable = false;
      deferredPrompt = null;
    });
  });

  async function installApp() {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
          installable = false;
          deferredPrompt = null;
        }
      } catch (e) {
        console.error("Error triggering install prompt:", e);
      }
    } else {
      // Fallback: Open the PWA installation guide step in the modal
      openGuide(3);
    }
  }

  function openGuide(slide = 0) {
    onboardingSlide = slide;
    showOnboarding = true;
  }
</script>

<main class="app-layout">
  <!-- Brand Header -->
  <header class="brand-header">
    <div class="logo-area" on:click={() => openGuide(0)} title="View System Overview">
      <div class="logo-box">
        <Flame size={20} class="brand-flame" />
      </div>
      <div class="title-details">
        <h1 class="glow-title">A SLIME'S GUIDE TO ELYSIUM</h1>
        <span class="pub-tag">PUBLISHED BY ARSON DEVS INC.</span>
      </div>
    </div>

    <div class="header-actions">
      <!-- Guide / Help Button -->
      <button class="header-btn guide-btn font-tech" on:click={() => openGuide(0)} title="Open Guide & Tutorial">
        <HelpCircle size={14} />
        <span class="btn-text">GUIDE</span>
      </button>

      <!-- Install App Button -->
      <button class="header-btn install-btn font-tech" on:click={installApp} title="Install Progressive Web App">
        <Download size={14} />
        <span class="btn-text">INSTALL APP</span>
      </button>

      <!-- GitHub Repository Link -->
      <a
        href="https://github.com/FreeFallingRN/A-slime-s-guide-to-Elysium"
        target="_blank"
        rel="noopener noreferrer"
        class="header-btn github-btn"
        title="GitHub Repository"
      >
        <Github size={15} />
      </a>

      <!-- Status Indicator -->
      <div class="system-status">
        <div class="status-pulse"></div>
        <span class="status-text font-tech">SYN: SECURE</span>
      </div>
    </div>
  </header>

  <div class="container">
    <!-- Global Chrono-Controller -->
    <section class="global-controls">
      <ChapterControl />
    </section>

    <!-- Navigation Hub (Hologram Submenu tabs) -->
    <nav class="navigation-hub">
      <button
        class="nav-tab {currentTab === 'stats' ? 'active' : ''}"
        on:click={() => (currentTab = "stats")}
      >
        <Gauge size={16} />
        <span>Stat Breakdown</span>
      </button>

      <button
        class="nav-tab {currentTab === 'characters' ? 'active' : ''}"
        on:click={() => (currentTab = "characters")}
      >
        <Users size={16} />
        <span>Characters</span>
      </button>
    </nav>

    <!-- Main Viewport Router -->
    <section class="viewport-area">
      {#if currentTab === "stats"}
        <StatCalculator />
      {:else if currentTab === "characters"}
        <div class="fade-in-wrapper">
          <Characters />
        </div>
      {/if}
    </section>
  </div>

  <!-- App Footer -->
  <footer class="app-footer">
    <div class="footer-content">
      <p class="copyright-line">
        © 2026 Arson Devs Inc. | Inspired by the webnovel <a
          href="https://www.webnovel.com/book/35006015000821605"
          target="_blank"
          rel="noopener noreferrer">Slime Evolution</a
        > by NunuXD.
      </p>
      <div class="footer-links font-tech">
        <button class="footer-link-btn" on:click={() => openGuide(0)}>SYSTEM GUIDE</button>
        <span class="sep">•</span>
        <button class="footer-link-btn" on:click={() => openGuide(3)}>INSTALL PWA</button>
        <span class="sep">•</span>
        <a
          href="https://github.com/FreeFallingRN/A-slime-s-guide-to-Elysium"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-link-a">GITHUB REPO</a
        >
      </div>
    </div>
  </footer>

  <!-- Onboarding & User Guide Modal -->
  <OnboardingModal
    bind:isOpen={showOnboarding}
    {deferredPrompt}
    initialSlide={onboardingSlide}
    on:installed={() => {
      installable = false;
      deferredPrompt = null;
    }}
  />
</main>


<style>
  .app-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: radial-gradient(circle at center, #0e1422 0%, #07090f 100%);
    padding: 0;
    overflow-x: hidden;
    max-width: 100%;
  }

  .brand-header {
    background: rgba(7, 9, 15, 0.9);
    border-bottom: 1px solid var(--color-holo-border);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    padding: 14px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .logo-area {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    user-select: none;
    transition: opacity 0.2s;
  }

  .logo-area:hover {
    opacity: 0.9;
  }

  .logo-box {
    background: linear-gradient(
      135deg,
      var(--color-arson-fire) 0%,
      #ff0000 100%
    );
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 12px var(--color-arson-glow);
  }

  .brand-flame {
    color: #fff;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
  }

  .title-details {
    display: flex;
    flex-direction: column;
  }

  .glow-title {
    font-size: 1.12rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    color: #fff;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
    margin: 0;
  }

  .pub-tag {
    font-size: 0.58rem;
    font-weight: 800;
    color: var(--color-arson-fire);
    letter-spacing: 0.2em;
    text-shadow: 0 0 5px var(--color-arson-glow);
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .header-btn {
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s;
    font-family: var(--font-sans);
    outline: none;
    text-decoration: none;
  }

  .guide-btn {
    background: rgba(0, 240, 255, 0.08);
    border: 1px solid rgba(0, 240, 255, 0.35);
    color: #00f0ff;
  }

  .guide-btn:hover {
    background: rgba(0, 240, 255, 0.2);
    border-color: #00f0ff;
    box-shadow: 0 0 10px rgba(0, 240, 255, 0.4);
  }

  .install-btn {
    background: linear-gradient(135deg, rgba(255, 94, 0, 0.15), rgba(255, 0, 0, 0.15));
    border: 1px solid rgba(255, 94, 0, 0.4);
    color: #ff8438;
  }

  .install-btn:hover {
    background: linear-gradient(135deg, #ff5e00, #ff0000);
    border-color: #ff5e00;
    color: #fff;
    box-shadow: 0 0 12px rgba(255, 94, 0, 0.5);
  }

  .github-btn {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #cbd5e1;
    padding: 6px 8px;
  }

  .github-btn:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.3);
    color: #fff;
  }

  .system-status {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(0, 240, 255, 0.05);
    border: 1px solid rgba(0, 240, 255, 0.2);
    padding: 6px 10px;
    border-radius: 6px;
  }

  .status-pulse {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--color-holo-primary);
    box-shadow: 0 0 8px var(--color-holo-primary);
    animation: pulse-slow 2s infinite ease-in-out;
  }

  .status-text {
    font-size: 0.62rem;
    font-weight: bold;
    color: var(--color-holo-primary);
    letter-spacing: 0.05em;
  }

  .container {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-sizing: border-box;
    min-width: 0;
  }

  .global-controls {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  /* Navigation Hub Tabs */
  .navigation-hub {
    display: flex;
    justify-content: center;
    gap: 8px;
    overflow-x: auto;
    scrollbar-width: none;
    padding-bottom: 4px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    max-width: 100%;
  }

  .navigation-hub::-webkit-scrollbar {
    display: none;
  }

  .nav-tab {
    background: rgba(255, 255, 255, 0.01);
    border: 1px solid rgba(255, 255, 255, 0.05);
    color: var(--color-holo-muted);
    padding: 10px 18px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 0.82rem;
    transition: var(--transition-smooth);
    white-space: nowrap;
    outline: none;
  }

  .nav-tab:hover {
    background: rgba(0, 240, 255, 0.02);
    border-color: rgba(0, 240, 255, 0.2);
    color: #fff;
  }

  .nav-tab.active {
    background: rgba(0, 240, 255, 0.08);
    border-color: var(--color-holo-primary);
    color: var(--color-holo-primary);
    box-shadow: 0 0 10px rgba(0, 240, 255, 0.1);
    text-shadow: 0 0 5px var(--color-holo-glow);
  }

  .viewport-area {
    flex-grow: 1;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  .fade-in-wrapper {
    animation: fade-in 0.4s ease-out;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .app-footer {
    background: rgba(7, 9, 15, 0.95);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding: 16px 20px;
    text-align: center;
    color: var(--color-holo-muted);
    font-size: 0.72rem;
    margin-top: auto;
  }

  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .copyright-line {
    margin: 0;
  }

  .copyright-line a {
    color: #00f0ff;
    text-decoration: none;
  }

  .copyright-line a:hover {
    text-decoration: underline;
  }

  .footer-links {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.65rem;
    font-weight: 700;
  }

  .footer-link-btn {
    background: none;
    border: none;
    color: #7a8c9e;
    cursor: pointer;
    padding: 0;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    transition: color 0.2s;
  }

  .footer-link-btn:hover {
    color: #00f0ff;
  }

  .footer-link-a {
    color: #7a8c9e;
    text-decoration: none;
    transition: color 0.2s;
  }

  .footer-link-a:hover {
    color: #ff5e00;
  }

  .sep {
    color: rgba(255, 255, 255, 0.2);
  }

  .font-tech {
    font-family: var(--font-sans);
  }

  /* --- RESPONSIVE MOBILE OPTIMIZATIONS --- */
  @media (max-width: 767px) {
    .brand-header {
      padding: 10px 12px;
      gap: 6px;
    }

    .logo-area {
      gap: 8px;
    }

    .logo-box {
      width: 28px;
      height: 28px;
      border-radius: 6px;
    }

    .glow-title {
      font-size: 0.82rem;
      letter-spacing: 0.05em;
    }

    .pub-tag {
      display: none;
    }

    .system-status {
      display: none;
    }

    .header-actions {
      gap: 5px;
    }

    .header-btn {
      padding: 5px 8px;
      font-size: 0.6rem;
      gap: 4px;
    }

    .container {
      padding-top: 10px;
      padding-bottom: 85px;
      padding-left: 10px;
      padding-right: 10px;
      gap: 14px;
    }

    .navigation-hub {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(4, 9, 16, 0.96);
      border-top: 1px solid var(--color-holo-border);
      border-bottom: none;
      padding: 8px 10px;
      gap: 4px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      justify-items: center;
      align-items: center;
      z-index: 1000;
      box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }

    .nav-tab {
      width: 100%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 6px 2px;
      font-size: 0.65rem;
      border: none;
      background: transparent;
      border-radius: 6px;
      color: var(--color-holo-muted);
      opacity: 0.75;
      text-align: center;
    }

    .nav-tab:hover {
      background: rgba(0, 240, 255, 0.04);
      color: #fff;
    }

    .nav-tab.active {
      background: rgba(0, 240, 255, 0.06);
      border-color: transparent;
      color: var(--color-holo-primary);
      text-shadow: 0 0 5px var(--color-holo-glow);
      opacity: 1;
    }

    .app-footer {
      margin-bottom: 75px;
      font-size: 0.62rem;
      padding: 12px;
    }
  }
</style>

