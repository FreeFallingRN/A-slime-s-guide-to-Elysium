<script>
  import { currentChapter, activeChapterDetails, chaptersData } from './store.js';
  import { Shield, ShieldAlert, LockKeyhole, LockKeyholeOpen, Clock, User, Flame } from 'lucide-svelte';

  let activeCh = 5;
  let chDetails = {};
  let showModal = false;

  currentChapter.subscribe(val => {
    activeCh = val;
  });

  activeChapterDetails.subscribe(val => {
    chDetails = val;
  });

  function selectChapter(ch) {
    currentChapter.set(ch);
    showModal = false;
  }

  function updateChapter(e) {
    currentChapter.set(parseInt(e.target.value));
  }

  function adjustChapter(amount) {
    currentChapter.update(n => Math.max(1, Math.min(30, n + amount)));
  }
</script>

<!-- DESKTOP CHAPTER WIDGET -->
<div class="hologram-panel chapter-control-container desktop-only">
  <div class="header">
    <div class="glow-indicator">
      {#if activeCh < 10}
        <LockKeyhole size={18} class="lock-icon locked" />
      {:else}
        <LockKeyholeOpen size={18} class="lock-icon unlocked" />
      {/if}
      <span class="hologram-glow-text font-tech">SYSTEM CHRONICLE SYNC</span>
    </div>
    <div class="chapter-badge">
      CH. {activeCh}
    </div>
  </div>

  <!-- Desktop Metadata Block -->
  <div class="desktop-meta font-tech">
    <div class="meta-row">
      <span class="meta-label">Active Log:</span>
      <span class="meta-value">Chapter {activeCh} - "{chDetails.title}"</span>
    </div>
    <div class="meta-row">
      <span class="meta-label">Sync Date:</span>
      <span class="meta-value">{chDetails.date}</span>
    </div>
    <div class="meta-row stats">
      <span class="meta-label">Levels:</span>
      <span class="meta-value">
        Halon (Lv {chDetails.halonLvl}) | Lohan (Lv {chDetails.lohanLvl})
      </span>
    </div>
  </div>

  <div class="controls">
    <button class="hologram-btn-small" on:click={() => adjustChapter(-1)} disabled={activeCh <= 1}>−</button>
    <div class="slider-wrapper">
      <input 
        type="range" 
        min="1" 
        max="30" 
        class="chapter-slider" 
        value={activeCh} 
        on:input={updateChapter} 
      />
      <div class="ticks">
        <span>Ch 1</span>
        <span>Ch 10</span>
        <span>Ch 20</span>
        <span>Ch 30</span>
      </div>
    </div>
    <button class="hologram-btn-small" on:click={() => adjustChapter(1)} disabled={activeCh >= 30}>+</button>
  </div>

  <div class="spoiler-warning">
    <ShieldAlert size={14} class="warning-icon" />
    <span>Content beyond Chapter {activeCh} will be hidden (Spoiler-Free Mode Active)</span>
  </div>
</div>


<!-- MOBILE STICKY HEADER -->
<div class="mobile-header mobile-only">
  <div class="mobile-logo">
    <Flame size={15} class="brand-flame" />
    <span class="logo-text">SLIME</span>
  </div>

  <!-- Center Active Info Details -->
  <div class="mobile-meta">
    <div class="mobile-title font-tech">Ch.{activeCh}: "{chDetails.title}"</div>
    <div class="mobile-stats">
      <span class="stat"><Clock size={10} /> {chDetails.date}</span>
      <span class="stat separator">|</span>
      <span class="stat"><User size={10} /> Halon Lvl.{chDetails.halonLvl}</span>
      <span class="stat separator">|</span>
      <span class="stat"><User size={10} /> Lohan Lvl.{chDetails.lohanLvl}</span>
    </div>
  </div>

  <!-- Clickable Trigger Badge -->
  <button class="mobile-badge" on:click={() => showModal = true}>
    CH. {activeCh}
  </button>
</div>


<!-- CHAPTER SELECTOR DIALOG (MODAL) -->
{#if showModal}
  <div class="modal-overlay" on:click={() => showModal = false}>
    <div class="modal-dialog hologram-panel" on:click|stopPropagation>
      <div class="modal-header">
        <h3 class="hologram-glow-text">CHRONICLE LOG SYNC</h3>
        <button class="close-btn" on:click={() => showModal = false}>&times;</button>
      </div>
      <p class="modal-subheader">Select your reading progress to lock all future chapters spoiler-free.</p>
      
      <div class="chapters-grid">
        {#each Array(30) as _, i}
          {@const chNum = i + 1}
          {@const isSelected = activeCh === chNum}
          {@const item = chaptersData[i] || {}}
          <button 
            class="grid-ch-btn {isSelected ? 'active' : ''}" 
            on:click={() => selectChapter(chNum)}
          >
            <span class="num">{chNum}</span>
            <span class="title">{item.title || 'Log'}</span>
          </button>
        {/each}
      </div>
    </div>
  </div>
{/if}


<style>
  /* Base Desktop Styles */
  .chapter-control-container {
    padding: 16px 24px;
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .glow-indicator {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.15em;
  }

  .font-tech {
    font-family: var(--font-sans);
  }

  .lock-icon {
    transition: var(--transition-smooth);
  }

  .lock-icon.locked {
    color: var(--color-arson-fire);
    filter: drop-shadow(0 0 5px var(--color-arson-glow));
  }

  .lock-icon.unlocked {
    color: var(--color-holo-primary);
    filter: drop-shadow(0 0 5px var(--color-holo-glow));
  }

  .chapter-badge {
    background: rgba(0, 240, 255, 0.15);
    border: 1px solid var(--color-holo-primary);
    color: var(--color-holo-primary);
    padding: 2px 10px;
    border-radius: 4px;
    font-family: var(--font-sans);
    font-weight: 800;
    font-size: 0.95rem;
    letter-spacing: 0.05em;
    text-shadow: 0 0 5px var(--color-holo-glow);
  }

  /* Desktop Meta Info */
  .desktop-meta {
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.03);
    border-radius: 6px;
    padding: 10px 14px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.8rem;
  }

  .meta-row {
    display: flex;
    gap: 8px;
  }

  .meta-label {
    color: var(--color-holo-muted);
    font-weight: bold;
    min-width: 80px;
  }

  .meta-value {
    color: #fff;
  }

  .meta-row.stats .meta-value {
    color: var(--color-book-gold);
    font-weight: bold;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .slider-wrapper {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .chapter-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: rgba(0, 240, 255, 0.15);
    outline: none;
    border: 1px solid rgba(0, 240, 255, 0.2);
  }

  .chapter-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--color-holo-primary);
    border: 2px solid #000;
    cursor: pointer;
    box-shadow: 0 0 8px var(--color-holo-primary);
    transition: var(--transition-smooth);
  }

  .chapter-slider::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 0 15px var(--color-holo-primary);
  }

  .ticks {
    display: flex;
    justify-content: space-between;
    font-size: 0.65rem;
    color: var(--color-holo-muted);
    font-family: var(--font-sans);
    font-weight: bold;
    letter-spacing: 0.05em;
  }

  .hologram-btn-small {
    background: rgba(0, 240, 255, 0.05);
    border: 1px solid rgba(0, 240, 255, 0.5);
    color: var(--color-holo-primary);
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    font-family: var(--font-sans);
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition-smooth);
  }

  .hologram-btn-small:hover:not(:disabled) {
    background: var(--color-holo-primary);
    color: #000;
    box-shadow: 0 0 8px var(--color-holo-primary);
  }

  .hologram-btn-small:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    border-color: rgba(255, 255, 255, 0.1);
    color: var(--color-holo-muted);
  }

  .spoiler-warning {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.72rem;
    color: var(--color-holo-muted);
    font-family: var(--font-sans);
  }

  :global(.warning-icon) {
    color: var(--color-book-gold);
  }

  /* --- MOBILE STICKY HEADER --- */
  .mobile-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 56px;
    background: rgba(4, 9, 16, 0.95);
    border-bottom: 1px solid var(--color-holo-border);
    z-index: 1000;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.7);
  }

  .mobile-logo {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 900;
    font-size: 0.7rem;
    color: var(--color-arson-fire);
    letter-spacing: 0.1em;
    text-shadow: 0 0 5px var(--color-arson-glow);
  }

  .brand-flame {
    color: var(--color-arson-fire);
    filter: drop-shadow(0 0 3px var(--color-arson-glow));
  }

  .mobile-meta {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    flex-grow: 1;
    margin: 0 10px;
    max-width: 60%;
  }

  .mobile-title {
    font-size: 0.75rem;
    font-weight: bold;
    color: #fff;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    letter-spacing: 0.02em;
  }

  .mobile-stats {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.55rem;
    color: var(--color-holo-muted);
    font-weight: 500;
  }

  .stat {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .separator {
    opacity: 0.3;
  }

  .mobile-badge {
    background: rgba(0, 240, 255, 0.08);
    border: 1px solid var(--color-holo-primary);
    color: var(--color-holo-primary);
    padding: 4px 10px;
    border-radius: 4px;
    font-family: var(--font-sans);
    font-weight: 800;
    font-size: 0.75rem;
    text-shadow: 0 0 5px var(--color-holo-glow);
    cursor: pointer;
    transition: var(--transition-smooth);
    outline: none;
  }

  .mobile-badge:active {
    transform: scale(0.95);
  }

  /* --- MODAL DIALOG --- */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(3, 6, 12, 0.85);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .modal-dialog {
    width: 100%;
    max-width: 440px;
    background: rgba(4, 9, 16, 0.96);
    max-height: 80vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid var(--color-holo-border);
    box-shadow: 0 10px 40px rgba(0, 240, 255, 0.15);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--color-holo-border);
    padding-bottom: 10px;
    margin-bottom: 8px;
  }

  .modal-header h3 {
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 0.1em;
  }

  .modal-subheader {
    font-size: 0.7rem;
    color: var(--color-holo-muted);
    margin-bottom: 16px;
    line-height: 1.3;
  }

  .close-btn {
    background: none;
    border: none;
    color: var(--color-holo-muted);
    font-size: 1.5rem;
    cursor: pointer;
    line-height: 1;
    transition: var(--transition-smooth);
  }

  .close-btn:hover {
    color: #fff;
  }

  .chapters-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  @media (min-width: 400px) {
    .chapters-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .grid-ch-btn {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    color: var(--color-holo-muted);
    padding: 10px 4px;
    border-radius: 6px;
    cursor: pointer;
    transition: var(--transition-smooth);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 4px;
    min-height: 60px;
  }

  .grid-ch-btn:hover {
    border-color: rgba(0, 240, 255, 0.3);
    color: #fff;
    background: rgba(0, 240, 255, 0.04);
  }

  .grid-ch-btn.active {
    background: rgba(0, 240, 255, 0.12);
    border-color: var(--color-holo-primary);
    color: var(--color-holo-primary);
    text-shadow: 0 0 5px var(--color-holo-glow);
    box-shadow: 0 0 8px rgba(0, 240, 255, 0.15);
  }

  .grid-ch-btn .num {
    font-size: 0.95rem;
    font-weight: 800;
  }

  .grid-ch-btn .title {
    font-size: 0.52rem;
    font-weight: 600;
    max-width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
  }

  /* --- RESPONSIVE VISIBILITY TWEAKS --- */
  .desktop-only {
    display: flex !important;
  }

  .mobile-only {
    display: none !important;
  }

  @media (max-width: 767px) {
    .desktop-only {
      display: none !important;
    }

    .mobile-only {
      display: flex !important;
    }
  }
</style>
