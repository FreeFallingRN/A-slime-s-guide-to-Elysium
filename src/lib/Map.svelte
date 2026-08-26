<script>
  import { currentChapter, activeMapNodes } from './store.js';
  import { MapPin, EyeOff, Radio, Locate, Compass } from 'lucide-svelte';

  let activeWorld = 'Elysium'; // 'Elysium' or 'Sectors'
  let selectedNode = null;
  let chapter = 5;

  // Track chapter changes to adjust fog and reset selection if needed
  currentChapter.subscribe(val => {
    chapter = val;
    if (selectedNode && selectedNode.chapter > val) {
      selectedNode = null;
    }
  });

  // Calculate Fog of War grid cells (4x4 grid)
  // Each grid block has a coordinate range and an unlock chapter.
  const fogGrid = [
    { row: 1, col: 1, chapter: 1, label: "Zone A-1" },
    { row: 1, col: 2, chapter: 4, label: "Zone A-2" },
    { row: 1, col: 3, chapter: 8, label: "Zone A-3" },
    { row: 1, col: 4, chapter: 15, label: "Zone A-4" },
    
    { row: 2, col: 1, chapter: 2, label: "Zone B-1" },
    { row: 2, col: 2, chapter: 5, label: "Zone B-2" },
    { row: 2, col: 3, chapter: 10, label: "Zone B-3" },
    { row: 2, col: 4, chapter: 18, label: "Zone B-4" },
    
    { row: 3, col: 1, chapter: 6, label: "Zone C-1" },
    { row: 3, col: 2, chapter: 7, label: "Zone C-2" },
    { row: 3, col: 3, chapter: 12, label: "Zone C-3" },
    { row: 3, col: 4, chapter: 22, label: "Zone C-4" },
    
    { row: 4, col: 1, chapter: 14, label: "Zone D-1" },
    { row: 4, col: 2, chapter: 16, label: "Zone D-2" },
    { row: 4, col: 3, chapter: 20, label: "Zone D-3" },
    { row: 4, col: 4, chapter: 25, label: "Zone D-4" }
  ];

  function selectNode(node) {
    selectedNode = node;
  }

  function handleWorldChange(world) {
    activeWorld = world;
    selectedNode = null;
  }
</script>

<div class="map-layout">
  <!-- Interactive Hologram HUD Map -->
  <div class="hologram-panel map-hud-panel">
    <div class="panel-header">
      <div class="header-left">
        <Compass size={18} class="hologram-glow-text" />
        <h3 class="hologram-glow-text">TACTICAL HOLO-GEOGRAPHY</h3>
      </div>
      <div class="world-selectors">
        <button class="hologram-btn {activeWorld === 'Elysium' ? 'active' : ''}" on:click={() => handleWorldChange('Elysium')}>Elysium</button>
        <button class="hologram-btn {activeWorld === 'Sectors' ? 'active' : ''}" on:click={() => handleWorldChange('Sectors')}>Real World Sectors</button>
      </div>
    </div>

    <!-- The Map Grid Plotter -->
    <div class="map-viewport pulsing-grid">
      <!-- Fog of War Cells Overlay -->
      <div class="fog-overlay-grid">
        {#each fogGrid as cell}
          {@const isFoggy = cell.chapter > chapter}
          <div 
            class="fog-cell {isFoggy ? 'foggy' : 'cleared'}"
            style="grid-row: {cell.row}; grid-column: {cell.col};"
          >
            {#if isFoggy}
              <div class="fog-content">
                <EyeOff size={16} />
                <span class="fog-lock-chapter">Ch {cell.chapter}</span>
              </div>
            {/if}
          </div>
        {/each}
      </div>

      <!-- Radar Sweeper Overlay line -->
      <div class="radar-line"></div>

      <!-- Plotted Map Pins -->
      {#each $activeMapNodes as node}
        {#if node.world === activeWorld}
          <button 
            class="map-pin-btn {selectedNode && selectedNode.id === node.id ? 'selected' : ''}"
            style="left: {node.x}%; top: {node.y}%;"
            on:click={() => selectNode(node)}
          >
            <div class="ping-circle"></div>
            <MapPin size={20} class="pin-svg" />
            <span class="pin-label">{node.name}</span>
          </button>
        {/if}
      {/each}
    </div>
  </div>

  <!-- Location Meta Panel -->
  <div class="hologram-panel meta-panel">
    <div class="panel-header">
      <h3 class="hologram-glow-text">NODE INTEL</h3>
    </div>

    <div class="meta-content">
      {#if selectedNode}
        <div class="intel-item">
          <span class="label">LOCATION:</span>
          <span class="value node-title">{selectedNode.name}</span>
        </div>
        <div class="intel-item">
          <span class="label">COORDINATES:</span>
          <span class="value font-tech">X: {selectedNode.x} | Y: {selectedNode.y}</span>
        </div>
        <div class="intel-item">
          <span class="label">CLASSIFICATION:</span>
          <span class="value level-rating">{selectedNode.level}</span>
        </div>
        <div class="intel-item">
          <span class="label">DISCOVERED:</span>
          <span class="value">Chapter {selectedNode.chapter}</span>
        </div>
        <div class="intel-desc">
          <p>{selectedNode.details}</p>
        </div>
      {:else}
        <div class="empty-intel">
          <Radio size={24} class="ping-icon" />
          <p>NO ACTIVE PIN SELECTED</p>
          <p class="sub">Click on an active map node to query geographical data and radar coordinates.</p>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .map-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }

  @media (min-width: 900px) {
    .map-layout {
      grid-template-columns: 1fr 300px;
    }
  }

  .map-hud-panel {
    display: flex;
    flex-direction: column;
  }

  .panel-header {
    border-bottom: 1px solid var(--color-holo-border);
    padding: 14px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
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

  .world-selectors {
    display: flex;
    gap: 8px;
  }

  .world-selectors :global(.hologram-btn) {
    font-size: 0.72rem;
    padding: 4px 10px;
  }

  /* Map Viewport Grid */
  .map-viewport {
    height: 400px;
    position: relative;
    background-color: rgba(0, 5, 10, 0.9);
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    overflow: hidden;
    user-select: none;
  }

  @media (min-width: 600px) {
    .map-viewport {
      height: 480px;
    }
  }

  /* Fog of War Overlay */
  .fog-overlay-grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    z-index: 5;
    pointer-events: none; /* Let clicks pass to pins */
  }

  .fog-cell {
    border: 1px solid rgba(0, 240, 255, 0.03);
    transition: all 0.8s ease-in-out;
  }

  .fog-cell.foggy {
    background: radial-gradient(circle, rgba(10, 18, 30, 0.98) 0%, rgba(5, 10, 15, 0.99) 100%);
    backdrop-filter: blur(8px) contrast(0.5);
    -webkit-backdrop-filter: blur(8px) contrast(0.5);
    border: 1px dashed rgba(255, 94, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 94, 0, 0.4);
    pointer-events: auto; /* Block interaction in foggy zones */
  }

  .fog-cell.cleared {
    background: transparent;
    border-color: rgba(0, 240, 255, 0.01);
  }

  .fog-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .fog-lock-chapter {
    font-size: 0.6rem;
    font-weight: bold;
    font-family: var(--font-sans);
    letter-spacing: 0.05em;
  }

  /* Radar Line scan effect */
  .radar-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--color-holo-primary), transparent);
    box-shadow: 0 0 10px var(--color-holo-primary);
    opacity: 0.3;
    animation: radar-sweep 6s infinite linear;
    z-index: 3;
    pointer-events: none;
  }

  @keyframes radar-sweep {
    0% { top: 0%; }
    100% { top: 100%; }
  }

  /* Pins */
  .map-pin-btn {
    position: absolute;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 6; /* Draw pins above the fog/grid */
    transform: translate(-50%, -50%);
    transition: var(--transition-smooth);
    display: flex;
    flex-direction: column;
    align-items: center;
    outline: none;
  }

  .pin-svg {
    color: var(--color-holo-primary);
    filter: drop-shadow(0 0 4px var(--color-holo-glow));
    transition: var(--transition-smooth);
  }

  .map-pin-btn:hover .pin-svg {
    color: #fff;
    transform: scale(1.2);
    filter: drop-shadow(0 0 8px var(--color-holo-primary));
  }

  .map-pin-btn.selected .pin-svg {
    color: var(--color-arson-fire);
    filter: drop-shadow(0 0 8px var(--color-arson-glow));
    transform: scale(1.1);
  }

  .pin-label {
    background: rgba(0, 0, 0, 0.85);
    border: 1px solid var(--color-holo-border);
    color: #fff;
    font-size: 0.65rem;
    font-weight: bold;
    padding: 2px 6px;
    border-radius: 4px;
    margin-top: 4px;
    white-space: nowrap;
    opacity: 0.8;
    transition: var(--transition-smooth);
    letter-spacing: 0.05em;
  }

  .map-pin-btn:hover .pin-label {
    opacity: 1;
    border-color: var(--color-holo-primary);
  }

  .ping-circle {
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid var(--color-holo-primary);
    top: -2px;
    opacity: 0;
    animation: ping-pulse 2s infinite ease-out;
  }

  @keyframes ping-pulse {
    0% { transform: scale(0.3); opacity: 0.8; }
    100% { transform: scale(1.5); opacity: 0; }
  }

  /* Node Intel Panel */
  .meta-panel {
    display: flex;
    flex-direction: column;
  }

  .meta-content {
    padding: 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .empty-intel {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    text-align: center;
    color: var(--color-holo-muted);
    font-size: 0.8rem;
    font-weight: bold;
    min-height: 220px;
  }

  .empty-intel .sub {
    font-size: 0.7rem;
    font-weight: normal;
    line-height: 1.4;
    padding: 0 10px;
  }

  :global(.ping-icon) {
    animation: pulse-slow 2s infinite ease-in-out;
    color: var(--color-holo-secondary);
  }

  .intel-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .intel-item .label {
    font-size: 0.65rem;
    font-weight: bold;
    color: var(--color-holo-muted);
    letter-spacing: 0.05em;
  }

  .intel-item .value {
    font-size: 0.95rem;
    color: #fff;
    font-weight: 700;
  }

  .intel-item .node-title {
    color: var(--color-holo-primary);
    text-shadow: 0 0 5px var(--color-holo-glow);
  }

  .font-tech {
    font-family: var(--font-sans);
  }

  .level-rating {
    color: var(--color-book-gold);
  }

  .intel-desc {
    border-top: 1px dashed var(--color-holo-border);
    padding-top: 14px;
    margin-top: 6px;
    color: var(--color-holo-text);
    font-size: 0.82rem;
    line-height: 1.5;
  }
</style>
