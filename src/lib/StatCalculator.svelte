<script>
  import { currentChapter, activeChapterDetails, charactersData, getAbilityLevel } from './store.js';
  import { Shield, HelpCircle } from 'lucide-svelte';

  let selectedCharKey = 'halon';
  let character = charactersData[selectedCharKey];
  let chapter = 5;
  let activeLvl = 1;
  let combatActive = false;

  // React to store changes
  currentChapter.subscribe(val => {
    chapter = val;
  });

  activeChapterDetails.subscribe(val => {
    if (val && val.halonLvl !== undefined) {
      activeLvl = val.halonLvl;
    }
  });

  // Local state for abilities
  let localAbilities = [];

  // Whenever character or chapter changes, rebuild the local abilities list
  $: {
    character = charactersData[selectedCharKey];
    
    // Filter abilities dynamically based on synchronized chapter lock
    const baseAbilities = (character.abilities || []).filter(ab => ab.chapter <= chapter);
    
    localAbilities = baseAbilities.map(ab => {
      const currentLvl = getAbilityLevel(ab.id, chapter);
      return {
        ...ab,
        level: currentLvl
      };
    });
  }

  // Calculate stats dynamically based on custom pipeline
  $: finalStats = calculateStats(character.baseStats, localAbilities, chapter, combatActive);

  function calculateStats(baseStats, abilities, activeChapter, isCombat) {
    if (!baseStats) return {};
    let stats = { ...baseStats };
    
    // Run calculations sequentially in the exact array order
    abilities.forEach(ab => {
      const statName = ab.target;
      const baseVal = stats[statName];
      if (baseVal === undefined || statName === 'none') return;

      const lvl = ab.level;
      const val = ab.value;
      const type = ab.type;

      let result = baseVal;
      if (type === 'additive') {
        result = baseVal + (val * lvl);
      } else if (type === 'multiplicative') {
        result = baseVal * (1 + (val * lvl));
      } else if (type === 'exponential') {
        result = baseVal * Math.pow(1 + val, lvl);
      }

      // Round to 2 decimal places
      stats[statName] = Math.round(result * 100) / 100;
    });

    if (isCombat) {
      const hemoAbility = abilities.find(a => a.id === 'hemolymphatic_tissue');
      if (hemoAbility) {
        const lvl = hemoAbility.level;
        stats.digestion = Math.round(stats.digestion * (1 + (0.20 * lvl)) * 100) / 100;
      }
    }

    return stats;
  }
</script>

<div class="stat-calc-layout">
  <!-- Stats Display Panel -->
  <div class="hologram-panel side-panel">
    <div class="panel-header">
      <h3 class="hologram-glow-text">SLIME CHARACTER SHEET</h3>
    </div>

    <div class="character-identity">
      <div class="character-avatar">
        <img src="mythical_slime_placeholder.jpg" alt="Halon Avatar" class="avatar-img" />
        <div class="avatar-glow"></div>
      </div>
      <h2>{character.name}</h2>
      <p class="subtitle">
        Race: {character.race} ({character.raceBase || 'Common'}) | 
        Class: {character.class} ({character.classBase || 'Common'}) | 
        Lv: {activeLvl}
      </p>
    </div>

    <div class="stats-comparison">
      <div class="stats-header">
        <span>STAT</span>
        <span>BASE</span>
        <span class="hologram-glow-text">SCALED RESULT</span>
      </div>
      {#each Object.keys(character.baseStats) as stat}
        <div class="stat-row">
          <span class="stat-name">
            {#if stat === 'speed'}
              SPEED
            {:else if stat === 'digestion'}
              DIGESTION
            {:else}
              {stat.toUpperCase()}
            {/if}
          </span>
          <span class="stat-base">
            {character.baseStats[stat]}
            {#if stat === 'speed'} m/s{:else if stat === 'digestion'} bio/h{/if}
          </span>
          <span class="stat-final {finalStats[stat] !== character.baseStats[stat] ? 'buffed' : ''}">
            {finalStats[stat]}
            {#if stat === 'speed'} m/s{:else if stat === 'digestion'} bio/h{/if}
          </span>
        </div>
      {/each}

      <!-- Combat Intensity Toggle for Hemolymphatic Tissue active combat digestion -->
      <div class="combat-intensity-toggle">
        <label class="combat-toggle-label">
          <input type="checkbox" bind:checked={combatActive} />
          <span class="toggle-text">Active Combat Digestion</span>
        </label>
      </div>
    </div>
  </div>

  <!-- Abilities Pipeline Editor -->
  <div class="hologram-panel main-panel">
    <div class="panel-header">
      <h3 class="hologram-glow-text">DYNAMICS ABILITY PIPELINE & SCALING EDITOR</h3>
      <span class="help-tooltip" title="Order matters! Buffs apply sequentially from top to bottom. Click up/down arrows to reorder.">
        <HelpCircle size={16} />
      </span>
    </div>

    <div class="abilities-list">
      {#each localAbilities as ab, index}
        {@const isUnlocked = ab.chapter <= chapter}
        <div class="ability-card {isUnlocked ? 'active' : 'locked'}">
          {#if !isUnlocked}
            <!-- Locked State -->
            <div class="locked-overlay">
              <Shield size={24} class="lock-shield" />
              <span>UNLOCKS AT CHAPTER {ab.chapter} (Locked by Chrono-Sync)</span>
            </div>
          {/if}

          <!-- Normal Active State Content -->
          <div class="ability-main">
            <div class="ability-details">
              <div class="title-row">
                <h4>{ab.name}</h4>
                {#if isUnlocked}
                  <span class="active-badge">Lv {ab.level}</span>
                {/if}
              </div>
              <p class="description">{ab.description}</p>
              
              {#if isUnlocked && ab.target !== 'none'}
                <div class="applies-badge">
                  Applies to: <span class="stat-target">{ab.target.toUpperCase()}</span>
                </div>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .stat-calc-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }

  @media (min-width: 900px) {
    .stat-calc-layout {
      grid-template-columns: 320px 1fr;
    }
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

  .panel-header h3 {
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.1em;
  }

  .side-panel {
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
  }

  .character-identity {
    padding: 20px;
    text-align: center;
    border-bottom: 1px dashed var(--color-holo-border);
  }

  .character-identity h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 4px;
  }

  .character-identity .subtitle {
    font-size: 0.78rem;
    color: var(--color-holo-muted);
  }

  .stats-comparison {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .stats-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1.5fr;
    font-size: 0.72rem;
    font-weight: bold;
    color: var(--color-holo-muted);
    letter-spacing: 0.05em;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    padding-bottom: 8px;
    text-align: right;
  }

  .stats-header span:first-child {
    text-align: left;
  }

  .stat-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1.5fr;
    align-items: center;
    font-size: 0.95rem;
    text-align: right;
  }

  .stat-name {
    text-align: left;
    font-weight: bold;
    color: var(--color-holo-muted);
  }

  .stat-base {
    color: #fff;
    opacity: 0.8;
  }

  .stat-final {
    font-weight: 700;
    color: #fff;
    transition: var(--transition-smooth);
  }

  .stat-final.buffed {
    color: var(--color-holo-primary);
    text-shadow: 0 0 8px var(--color-holo-glow);
  }

  /* Abilities Panel */
  .main-panel {
    display: flex;
    flex-direction: column;
  }

  .help-tooltip {
    color: var(--color-holo-muted);
    cursor: help;
    display: flex;
    align-items: center;
  }

  .abilities-list {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .ability-card {
    border: 1px solid rgba(255, 255, 255, 0.05);
    background: rgba(255, 255, 255, 0.02);
    border-radius: 6px;
    position: relative;
    overflow: hidden;
    transition: var(--transition-smooth);
  }

  .ability-card.active {
    border-color: rgba(0, 240, 255, 0.2);
    background: rgba(0, 240, 255, 0.02);
  }

  .active-badge {
    background: rgba(0, 240, 255, 0.1);
    color: var(--color-holo-primary);
    border: 1px solid rgba(0, 240, 255, 0.2);
    font-size: 0.72rem;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 4px;
    text-shadow: 0 0 5px var(--color-holo-glow);
    letter-spacing: 0.05em;
  }



  .ability-card.locked {
    border-color: rgba(255, 94, 0, 0.1);
    background: rgba(255, 94, 0, 0.01);
  }

  .locked-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 10, 18, 0.9);
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: var(--color-arson-fire);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.1em;
  }

  :global(.lock-shield) {
    filter: drop-shadow(0 0 5px var(--color-arson-glow));
    animation: pulse-slow 3s infinite;
  }

  .ability-main {
    display: flex;
  }



  .ability-details {
    flex-grow: 1;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title-row h4 {
    font-size: 1.1rem;
    color: #fff;
  }



  .description {
    font-size: 0.8rem;
    color: var(--color-holo-muted);
    line-height: 1.4;
  }



  .applies-badge {
    font-size: 0.72rem;
    color: var(--color-holo-muted);
    align-self: flex-start;
  }

  .stat-target {
    color: var(--color-book-gold);
    font-weight: bold;
    border-bottom: 1px dotted var(--color-book-gold);
  }

  /* Character Avatar styling */
  .character-avatar {
    position: relative;
    width: 140px;
    height: 140px;
    margin: 0 auto 16px auto;
    border-radius: 50%;
    border: 2px solid var(--color-holo-primary);
    box-shadow: 0 0 15px rgba(0, 240, 255, 0.3);
    overflow: hidden;
    background: #000;
  }

  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    mix-blend-mode: screen;
    filter: hue-rotate(180deg) brightness(1.2) contrast(1.1);
  }

  .avatar-glow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, transparent 50%, rgba(0, 240, 255, 0.2) 100%);
    pointer-events: none;
  }

  /* Combat toggle layout */
  .combat-intensity-toggle {
    margin-top: 14px;
    padding-top: 10px;
    border-top: 1px dashed var(--color-holo-border);
    display: flex;
    justify-content: flex-end;
  }

  .combat-toggle-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--color-holo-muted);
    cursor: pointer;
    transition: var(--transition-smooth);
  }

  .combat-toggle-label:hover {
    color: var(--color-arson-fire);
  }

  .combat-toggle-label input {
    accent-color: var(--color-arson-fire);
    cursor: pointer;
  }

  .combat-toggle-label input:checked ~ .toggle-text {
    color: var(--color-arson-fire);
    text-shadow: 0 0 5px var(--color-arson-glow);
  }
</style>
