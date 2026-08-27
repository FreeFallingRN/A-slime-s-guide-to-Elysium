<script>
  import { currentChapter, visualsData } from './store.js';
  import { Image, Search, Lock, X, Calendar, User, Info, Eye } from 'lucide-svelte';

  let chapter = 1;
  let searchTerm = '';
  let selectedVisual = null;

  // React to current chapter lock store
  currentChapter.subscribe(val => {
    chapter = val;
  });

  // Filter and search logic
  $: filteredVisuals = visualsData.filter(vis => {
    const matchesSearch = vis.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          vis.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vis.date.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  function openModal(visual) {
    if (visual.chapter <= chapter) {
      selectedVisual = visual;
    }
  }

  function closeModal() {
    selectedVisual = null;
  }
</script>

<div class="gallery-container hologram-panel">
  <!-- Header with search filter -->
  <div class="panel-header">
    <div class="header-left">
      <Image size={18} class="hologram-glow-text" />
      <h3 class="hologram-glow-text">CHRONICLE VISUAL ARCHIVES</h3>
    </div>
    
    <div class="search-bar">
      <div class="search-icon-wrapper">
        <Search size={14} />
      </div>
      <input 
        type="text" 
        placeholder="Filter logs (e.g. Lohan, Lisa, March 12)..." 
        bind:value={searchTerm}
        class="search-input"
      />
    </div>
  </div>

  <!-- Main gallery grid -->
  <div class="gallery-viewport">
    {#if filteredVisuals.length === 0}
      <div class="empty-gallery">
        <p>No archives match your search query.</p>
      </div>
    {:else}
      <div class="gallery-grid">
        {#each filteredVisuals as vis (vis.id)}
          {@const isUnlocked = vis.chapter <= chapter}
          
          <button 
            class="gallery-card {isUnlocked ? 'unlocked' : 'locked'}"
            on:click={() => openModal(vis)}
            disabled={!isUnlocked}
            aria-label={isUnlocked ? `View ${vis.name} illustration` : `Illustration locked`}
          >
            {#if isUnlocked}
              <!-- Unlocked Card Content -->
              <div class="card-image-wrapper">
                <img src={vis.file} alt={vis.name} class="card-image" />
                <div class="image-overlay">
                  <div class="overlay-icon-wrapper">
                    <Eye size={20} />
                  </div>
                  <span class="overlay-text">EXPAND CORE LOG</span>
                </div>
                <div class="date-badge">
                  <Calendar size={10} />
                  <span>{vis.date}</span>
                </div>
              </div>
              <div class="card-info">
                <div class="card-meta">
                  <span class="char-name">{vis.name}</span>
                  <span class="ch-badge">Ch. {vis.chapter}</span>
                </div>
                <p class="card-desc-preview">{vis.desc}</p>
              </div>
            {:else}
              <!-- Locked Card Content -->
              <div class="locked-card-inner">
                <div class="lock-circle">
                  <Lock size={18} />
                </div>
                <span class="lock-title">CHRONO-LOCKED</span>
                <span class="lock-chapter">Requires Chapter {vis.chapter}</span>
                <div class="lock-date-mask">{vis.date} Visual Record</div>
              </div>
            {/if}
          </button>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Holographic Fullscreen Modal -->
  {#if selectedVisual}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <div class="holo-modal-overlay" on:click={closeModal} role="dialog" aria-modal="true">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="holo-modal-content" on:click|stopPropagation>
        <!-- Scanner lines and framing corner markers -->
        <div class="holo-scanlines"></div>
        <div class="holo-corner top-left"></div>
        <div class="holo-corner top-right"></div>
        <div class="holo-corner bottom-left"></div>
        <div class="holo-corner bottom-right"></div>

        <button class="close-btn" on:click={closeModal} aria-label="Close modal">
          <X size={18} />
        </button>

        <div class="modal-body">
          <div class="modal-visual-frame">
            <img src={selectedVisual.file} alt={selectedVisual.name} class="modal-large-img" />
            <div class="holo-laser-beam"></div>
          </div>
          
          <div class="modal-details">
            <h2 class="modal-title hologram-glow-text">{selectedVisual.name.toUpperCase()}</h2>
            
            <div class="modal-meta-row">
              <div class="meta-item">
                <div class="meta-icon-wrapper"><User size={12} /></div>
                <span class="meta-label">Subject:</span>
                <span class="meta-val">{selectedVisual.name}</span>
              </div>
              <div class="meta-item">
                <div class="meta-icon-wrapper"><Calendar size={12} /></div>
                <span class="meta-label">Timeline log:</span>
                <span class="meta-val">{selectedVisual.date}</span>
              </div>
              <div class="meta-item">
                <div class="meta-icon-wrapper"><Info size={12} /></div>
                <span class="meta-label">Unlocked Ch:</span>
                <span class="meta-val">{selectedVisual.chapter}</span>
              </div>
            </div>

            <div class="modal-desc-box">
              <span class="desc-box-header">SYSTEM REPORT SUMMARY</span>
              <p class="modal-desc">{selectedVisual.desc}</p>
            </div>
            
            <div class="tech-footprint">
              <span>SECURITY LOG REFERENCE ID: {selectedVisual.id.toUpperCase()}</span>
              <span>NEURAL RESOLUTION INDEX: 100% SECURE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .gallery-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  .panel-header {
    border-bottom: 1px solid var(--color-holo-border);
    padding: 14px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .panel-header h3 {
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.1em;
  }

  /* Search input layout */
  .search-bar {
    position: relative;
    max-width: 320px;
    width: 100%;
  }

  .search-icon-wrapper {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-holo-muted);
    display: flex;
    align-items: center;
  }

  .search-input {
    width: 100%;
    background: rgba(2, 14, 26, 0.6);
    border: 1px solid var(--color-holo-border);
    border-radius: 4px;
    padding: 6px 12px 6px 32px;
    color: #fff;
    font-size: 0.8rem;
    font-family: var(--font-sans);
    outline: none;
    transition: var(--transition-smooth);
  }

  .search-input:focus {
    border-color: var(--color-holo-primary);
    box-shadow: 0 0 8px rgba(0, 240, 255, 0.25);
  }

  /* Viewport and grid */
  .gallery-viewport {
    padding: 20px;
    min-height: 250px;
  }

  .empty-gallery {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    font-style: italic;
    color: var(--color-holo-muted);
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
  }

  /* Card Styles */
  .gallery-card {
    background: rgba(2, 14, 26, 0.4);
    border: 1px solid var(--color-holo-border);
    border-radius: 8px;
    padding: 0;
    margin: 0;
    overflow: hidden;
    cursor: pointer;
    transition: var(--transition-smooth);
    display: flex;
    flex-direction: column;
    text-align: left;
    outline: none;
    width: 100%;
  }

  .gallery-card.unlocked:hover {
    border-color: var(--color-holo-primary);
    box-shadow: 0 0 12px rgba(0, 240, 255, 0.15);
    transform: translateY(-2px);
  }

  /* Image wrappers */
  .card-image-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: #000;
  }

  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition-smooth);
  }

  .gallery-card:hover .card-image {
    transform: scale(1.05);
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(7, 10, 18, 0.65);
    opacity: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: var(--transition-smooth);
  }

  .gallery-card.unlocked:hover .image-overlay {
    opacity: 1;
  }

  .overlay-icon-wrapper {
    color: var(--color-holo-primary);
    filter: drop-shadow(0 0 4px var(--color-holo-glow));
    transform: translateY(8px);
    transition: var(--transition-smooth);
    display: flex;
    align-items: center;
  }

  .gallery-card:hover .overlay-icon-wrapper {
    transform: translateY(0);
  }

  .overlay-text {
    font-size: 0.65rem;
    font-weight: bold;
    color: var(--color-holo-primary);
    letter-spacing: 0.05em;
  }

  .date-badge {
    position: absolute;
    bottom: 8px;
    left: 8px;
    background: rgba(4, 9, 16, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 4px;
    padding: 2px 6px;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.65rem;
    font-weight: bold;
    color: #fff;
  }

  .card-info {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex-grow: 1;
  }

  .card-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
  }

  .char-name {
    font-size: 0.85rem;
    font-weight: bold;
    color: #fff;
  }

  .ch-badge {
    font-size: 0.65rem;
    font-weight: 700;
    color: var(--color-holo-primary);
    background: rgba(0, 240, 255, 0.08);
    border: 1px solid rgba(0, 240, 255, 0.2);
    padding: 1px 4px;
    border-radius: 3px;
  }

  .card-desc-preview {
    font-size: 0.72rem;
    color: var(--color-holo-muted);
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 0;
  }

  /* Locked state card */
  .gallery-card.locked {
    cursor: not-allowed;
    border-color: rgba(255, 94, 0, 0.15);
    background: rgba(255, 94, 0, 0.01);
  }

  .locked-card-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 24px 12px;
    min-height: 180px;
    width: 100%;
    color: var(--color-arson-fire);
  }

  .lock-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 94, 0, 0.05);
    border: 1px solid rgba(255, 94, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    box-shadow: 0 0 8px rgba(255, 94, 0, 0.1);
  }

  .lock-title {
    font-size: 0.75rem;
    font-weight: bold;
    letter-spacing: 0.05em;
  }

  .lock-chapter {
    font-size: 0.65rem;
    color: var(--color-holo-muted);
    margin-top: 4px;
  }

  .lock-date-mask {
    font-size: 0.58rem;
    color: rgba(255, 94, 0, 0.4);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: 14px;
    border-top: 1px dashed rgba(255, 94, 0, 0.15);
    padding-top: 8px;
    width: 100%;
  }

  /* Hologram Modal design */
  .holo-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(4, 9, 16, 0.85);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1100;
    padding: 20px;
    animation: fade-overlay 0.25s ease-out;
  }

  @keyframes fade-overlay {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .holo-modal-content {
    background: rgba(7, 10, 18, 0.95);
    border: 2px solid var(--color-holo-primary);
    box-shadow: 0 0 30px rgba(0, 240, 255, 0.15);
    border-radius: 12px;
    max-width: 800px;
    width: 100%;
    position: relative;
    padding: 30px;
    overflow: hidden;
    animation: zoom-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes zoom-in {
    from { transform: scale(0.92) translateY(10px); opacity: 0; }
    to { transform: scale(1) translateY(0); opacity: 1; }
  }

  /* Laser and scan animation markers */
  .holo-scanlines {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 240, 255, 0.08) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
    background-size: 100% 4px, 3px 100%;
    pointer-events: none;
    z-index: 5;
  }

  .holo-corner {
    position: absolute;
    width: 16px;
    height: 16px;
    border: 2px solid var(--color-holo-primary);
    z-index: 6;
  }

  .holo-corner.top-left { top: 12px; left: 12px; border-right: none; border-bottom: none; }
  .holo-corner.top-right { top: 12px; right: 12px; border-left: none; border-bottom: none; }
  .holo-corner.bottom-left { bottom: 12px; left: 12px; border-right: none; border-top: none; }
  .holo-corner.bottom-right { bottom: 12px; right: 12px; border-left: none; border-top: none; }

  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background: transparent;
    border: 1px solid rgba(0, 240, 255, 0.2);
    color: var(--color-holo-primary);
    width: 32px;
    height: 32px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition-smooth);
    z-index: 10;
  }

  .close-btn:hover {
    background: rgba(0, 240, 255, 0.1);
    border-color: var(--color-holo-primary);
  }

  .modal-body {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
    align-items: center;
    position: relative;
    z-index: 2;
  }

  @media (min-width: 680px) {
    .modal-body {
      grid-template-columns: 320px 1fr;
    }
  }

  /* Image core viewer in modal */
  .modal-visual-frame {
    width: 100%;
    aspect-ratio: 1 / 1;
    border: 1px solid var(--color-holo-border);
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    background: #000;
  }

  .modal-large-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .holo-laser-beam {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--color-holo-primary);
    box-shadow: 0 0 10px var(--color-holo-glow);
    pointer-events: none;
    animation: laser-bounce 4s infinite linear;
  }

  @keyframes laser-bounce {
    0%, 100% { top: 0%; opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    50% { top: 100%; }
  }

  /* Details Panel in modal */
  .modal-details {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .modal-title {
    font-size: 1.8rem;
    font-weight: 900;
    letter-spacing: 0.05em;
    margin: 0;
  }

  .modal-meta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    padding: 10px 0;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8rem;
  }

  .meta-icon-wrapper {
    color: var(--color-holo-primary);
    display: flex;
    align-items: center;
  }

  .meta-label {
    color: var(--color-holo-muted);
    font-weight: 500;
  }

  .meta-val {
    color: #fff;
    font-weight: 700;
  }

  .modal-desc-box {
    background: rgba(2, 14, 26, 0.5);
    border: 1px solid var(--color-holo-border);
    border-radius: 6px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .desc-box-header {
    font-size: 0.65rem;
    font-weight: bold;
    color: var(--color-holo-muted);
    letter-spacing: 0.1em;
  }

  .modal-desc {
    font-size: 0.9rem;
    color: #fff;
    line-height: 1.5;
    margin: 0;
  }

  .tech-footprint {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 0.55rem;
    font-family: var(--font-sans);
    color: rgba(0, 240, 255, 0.4);
    letter-spacing: 0.05em;
  }
</style>
