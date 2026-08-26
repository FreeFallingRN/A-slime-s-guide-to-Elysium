<script>
  import { currentChapter } from './store.js';
  import { Shield, ShieldAlert, LockKeyhole, LockKeyholeOpen } from 'lucide-svelte';

  let value = 5;
  currentChapter.subscribe(val => {
    value = val;
  });

  function updateChapter(e) {
    currentChapter.set(parseInt(e.target.value));
  }

  function adjustChapter(amount) {
    currentChapter.update(n => Math.max(1, Math.min(30, n + amount)));
  }
</script>

<div class="hologram-panel chapter-control-container">
  <div class="header">
    <div class="glow-indicator">
      {#if value < 10}
        <LockKeyhole size={18} class="lock-icon locked" />
      {:else}
        <LockKeyholeOpen size={18} class="lock-icon unlocked" />
      {/if}
      <span class="hologram-glow-text font-tech">SYSTEM CHRONICLE SYNC</span>
    </div>
    <div class="chapter-badge">
      CH. {value}
    </div>
  </div>

  <div class="controls">
    <button class="hologram-btn-small" on:click={() => adjustChapter(-1)} disabled={value <= 1}>−</button>
    <div class="slider-wrapper">
      <input 
        type="range" 
        min="1" 
        max="30" 
        class="chapter-slider" 
        bind:value={value} 
        on:input={updateChapter} 
      />
      <div class="ticks">
        <span>Ch 1</span>
        <span>Ch 10</span>
        <span>Ch 20</span>
        <span>Ch 30</span>
      </div>
    </div>
    <button class="hologram-btn-small" on:click={() => adjustChapter(1)} disabled={value >= 30}>+</button>
  </div>

  <div class="spoiler-warning">
    <ShieldAlert size={14} class="warning-icon" />
    <span>Content beyond Chapter {value} will be hidden (Spoiler-Free Mode Active)</span>
  </div>
</div>

<style>
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
</style>
