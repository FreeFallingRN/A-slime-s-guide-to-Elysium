<script>
  import { onMount } from 'svelte';
  import ChapterControl from './lib/ChapterControl.svelte';
  import Book from './lib/Book.svelte';
  import StatCalculator from './lib/StatCalculator.svelte';
  import BiomassCalculator from './lib/BiomassCalculator.svelte';
  import Map from './lib/Map.svelte';
  import Visual3D from './lib/Visual3D.svelte';
  
  import { BookOpen, Calculator, MapIcon, Sparkles, Shield, Flame, Download } from 'lucide-svelte';

  let currentTab = 'stats'; // 'book', 'stats', 'biomass', 'map', '3d'
  let deferredPrompt = null;
  let installable = false;

  onMount(() => {
    // Auto-reload the app when a new service worker takes over control
    if ('serviceWorker' in navigator) {
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return;
        refreshing = true;
        window.location.reload();
      });
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      installable = true;
    });

    window.addEventListener('appinstalled', () => {
      installable = false;
      deferredPrompt = null;
    });
  });

  async function installApp() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      installable = false;
      deferredPrompt = null;
    }
  }
</script>

<main class="app-layout">
  <!-- Brand Header -->
  <header class="brand-header">
    <div class="logo-area">
      <div class="logo-box">
        <Flame size={20} class="brand-flame" />
      </div>
      <div class="title-details">
        <h1 class="glow-title">A SLIME'S GUIDE TO ELYSIUM</h1>
        <span class="pub-tag">PUBLISHED BY ARSON DEVS INC.</span>
      </div>
    </div>
    <div class="header-actions">
      {#if installable}
        <button class="install-btn" on:click={installApp}>
          <Download size={12} />
          <span>INSTALL APP</span>
        </button>
      {/if}
      <div class="system-status">
        <div class="status-pulse"></div>
        <span class="status-text font-tech">SYS SYNC: SECURE</span>
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
        on:click={() => currentTab = 'stats'}
      >
        <Calculator size={16} />
        <span>Stat Simulator</span>
      </button>

      <button 
        class="nav-tab {currentTab === 'biomass' ? 'active' : ''}" 
        on:click={() => currentTab = 'biomass'}
      >
        <Sparkles size={16} />
        <span>Biomass Core</span>
      </button>

      <button 
        class="nav-tab {currentTab === 'map' ? 'active' : ''}" 
        on:click={() => currentTab = 'map'}
      >
        <MapIcon size={16} />
        <span>Radar Map</span>
      </button>

      <button 
        class="nav-tab {currentTab === '3d' ? 'active' : ''}" 
        on:click={() => currentTab = '3d'}
      >
        <Shield size={16} />
        <span>3D Evolution</span>
      </button>

      <button 
        class="nav-tab {currentTab === 'book' ? 'active' : ''}" 
        on:click={() => currentTab = 'book'}
      >
        <BookOpen size={16} />
        <span>Elysian Lore</span>
      </button>
    </nav>

    <!-- Main Viewport Router -->
    <section class="viewport-area">
      {#if currentTab === 'stats'}
        <StatCalculator />
      {:else}
        <div class="fade-in-wrapper">
          {#if currentTab === 'biomass'}
            <BiomassCalculator />
          {:else}
            <div class="fade-in-wrapper">
              {#if currentTab === 'map'}
                <Map />
              {:else}
                <div class="fade-in-wrapper">
                  {#if currentTab === '3d'}
                    <Visual3D />
                  {:else if currentTab === 'book'}
                    <Book />
                  {/if}
                </div>
              {/if}
            </div>
          {/if}
        </div>
      {/if}
    </section>
  </div>

  <!-- App Footer -->
  <footer class="app-footer">
    <p>© 2026 Arson Devs Inc. | Inspired by the Slime Evolution webnovel by NunuXD.</p>
  </footer>
</main>

<style>
  .app-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: radial-gradient(circle at center, #0e1422 0%, #07090f 100%);
    padding: 0;
  }

  .brand-header {
    background: rgba(7, 9, 15, 0.85);
    border-bottom: 1px solid var(--color-holo-border);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    padding: 16px 24px;
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
  }

  .logo-box {
    background: linear-gradient(135deg, var(--color-arson-fire) 0%, #ff0000 100%);
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 10px var(--color-arson-glow);
  }

  .brand-flame {
    color: #fff;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
  }

  .title-details {
    display: flex;
    flex-direction: column;
  }

  .glow-title {
    font-size: 1.15rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    color: #fff;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
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
    gap: 12px;
  }

  .install-btn {
    background: rgba(0, 240, 255, 0.08);
    border: 1px solid var(--color-holo-primary);
    color: var(--color-holo-primary);
    font-size: 0.65rem;
    font-weight: bold;
    letter-spacing: 0.05em;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: var(--transition-smooth);
    font-family: var(--font-sans);
  }

  .install-btn:hover {
    background: var(--color-holo-primary);
    color: #000;
    box-shadow: 0 0 10px var(--color-holo-primary);
  }

  .system-status {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(0, 240, 255, 0.05);
    border: 1px solid rgba(0, 240, 255, 0.2);
    padding: 4px 10px;
    border-radius: 4px;
  }

  .status-pulse {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--color-holo-primary);
    box-shadow: 0 0 8px var(--color-holo-primary);
    animation: pulse-slow 2s infinite ease-in-out;
  }

  .status-text {
    font-size: 0.65rem;
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
  }

  .global-controls {
    width: 100%;
  }

  /* Navigation Hub Tabs */
  .navigation-hub {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    scrollbar-width: none;
    padding-bottom: 4px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
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
  }

  .fade-in-wrapper {
    animation: fade-in 0.4s ease-out;
  }

  @keyframes fade-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .app-footer {
    background: rgba(7, 9, 15, 0.95);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding: 16px;
    text-align: center;
    color: var(--color-holo-muted);
    font-size: 0.72rem;
    margin-top: auto;
  }

  .font-tech {
    font-family: var(--font-sans);
  }

  /* --- RESPONSIVE MOBILE OPTIMIZATIONS --- */
  @media (max-width: 767px) {
    .brand-header {
      display: none !important;
    }

    .container {
      padding-top: 70px;
      padding-bottom: 85px;
      padding-left: 12px;
      padding-right: 12px;
      gap: 16px;
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
      grid-template-columns: repeat(5, 1fr);
      z-index: 1000;
      box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }

    .nav-tab {
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
