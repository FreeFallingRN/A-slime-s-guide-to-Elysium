<script>
  import { currentChapter, charactersData } from './store.js';
  import { Shield, ToggleLeft, ToggleRight, ArrowUp, ArrowDown, Settings, HelpCircle } from 'lucide-svelte';

  let selectedCharKey = 'halon';
  let character = charactersData[selectedCharKey];
  let chapter = 5;

  // React to store changes
  currentChapter.subscribe(val => {
    chapter = val;
  });

  // Local state for interactive properties of abilities
  let localAbilities = [];
  
  // Track active state of abilities
  let activeAbilitiesMap = {}; // { abilityId: boolean }
  let abilityLevelsMap = {}; // { abilityId: number }
  let abilityTypesMap = {}; // { abilityId: string } (additive, multiplicative, exponential)
  let abilityValuesMap = {}; // { abilityId: number }

  // Whenever character or chapter changes, rebuild the local abilities list
  $: {
    character = charactersData[selectedCharKey];
    
    // Filter abilities dynamically based on synchronized chapter lock
    const baseAbilities = (character.abilities || []).filter(ab => ab.chapter <= chapter);
    
    // Reset or carry over modifications
    localAbilities = baseAbilities.map(ab => {
      // Initialize mappings if empty
      if (activeAbilitiesMap[ab.id] === undefined) activeAbilitiesMap[ab.id] = true;
      if (abilityLevelsMap[ab.id] === undefined) abilityLevelsMap[ab.id] = ab.level || 1;
      if (abilityTypesMap[ab.id] === undefined) abilityTypesMap[ab.id] = ab.type || 'additive';
      if (abilityValuesMap[ab.id] === undefined) abilityValuesMap[ab.id] = ab.value || 0.1;

      return {
        ...ab,
        // Bind to reactive maps
        active: activeAbilitiesMap[ab.id],
        level: abilityLevelsMap[ab.id],
        type: abilityTypesMap[ab.id],
        value: abilityValuesMap[ab.id]
      };
    });
  }

  // Calculate stats dynamically based on custom pipeline
  $: finalStats = calculateStats(character.baseStats, localAbilities, chapter);

  function calculateStats(baseStats, abilities, activeChapter) {
    let stats = { ...baseStats };
    
    // Run calculations sequentially in the exact array order
    abilities.forEach(ab => {
      // Only apply if unlocked at current chapter AND toggled active
      const isUnlocked = ab.chapter <= activeChapter;
      const isActive = activeAbilitiesMap[ab.id];

      if (isUnlocked && isActive) {
        const statName = ab.target;
        const baseVal = stats[statName];
        if (baseVal === undefined) return;

        const lvl = abilityLevelsMap[ab.id];
        const val = abilityValuesMap[ab.id];
        const type = abilityTypesMap[ab.id];

        let result = baseVal;
        if (type === 'additive') {
          // e.g. Base + Value * Level
          // If stat is HP/MP/ATK, check if it's flat scale or percentage. 
          // We will use standard flat addition for additive
          result = baseVal + (val * lvl);
        } else if (type === 'multiplicative') {
          // e.g. Base * (1 + Value * Level)
          result = baseVal * (1 + (val * lvl));
        } else if (type === 'exponential') {
          // e.g. Base * (1 + Value)^Level
          result = baseVal * Math.pow(1 + val, lvl);
        }

        // Round to 2 decimal places for clean layout
        stats[statName] = Math.round(result * 100) / 100;
      }
    });

    return stats;
  }

  // Reorder pipeline items
  function moveItem(index, direction) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= localAbilities.length) return;

    // Swap positions
    const temp = localAbilities[index];
    localAbilities[index] = localAbilities[targetIndex];
    localAbilities[targetIndex] = temp;

    // Reactively trigger updates
    localAbilities = [...localAbilities];
  }

  function handleToggle(id) {
    activeAbilitiesMap[id] = !activeAbilitiesMap[id];
    localAbilities = [...localAbilities];
  }

  function handleLevelChange(id, e) {
    abilityLevelsMap[id] = parseInt(e.target.value);
    localAbilities = [...localAbilities];
  }

  function handleTypeChange(id, type) {
    abilityTypesMap[id] = type;
    localAbilities = [...localAbilities];
  }

  function handleValueChange(id, e) {
    abilityValuesMap[id] = parseFloat(e.target.value);
    localAbilities = [...localAbilities];
  }

  function switchCharacter(key) {
    selectedCharKey = key;
    // Clear mappings to rebuild for new character
    activeAbilitiesMap = {};
    abilityLevelsMap = {};
    abilityTypesMap = {};
    abilityValuesMap = {};
  }
</script>

<div class="stat-calc-layout">
  <!-- Character Selector & Stats Display -->
  <div class="hologram-panel side-panel">
    <div class="panel-header">
      <h3 class="hologram-glow-text">CHARACTER DIRECTORY</h3>
      <div class="char-tabs">
        <button class="hologram-btn {selectedCharKey === 'halon' ? 'active' : ''}" on:click={() => switchCharacter('halon')}>Halon (Slime)</button>
        <button class="hologram-btn {selectedCharKey === 'lohan' ? 'active' : ''}" on:click={() => switchCharacter('lohan')}>Lohan (IRL)</button>
      </div>
    </div>

    <div class="character-identity">
      <h2>{character.name}</h2>
      <p class="subtitle">Race: {character.race} | Class: {character.class} | Lv: {character.level}</p>
    </div>

    <div class="stats-comparison">
      <div class="stats-header">
        <span>STAT</span>
        <span>BASE</span>
        <span class="hologram-glow-text">SCALED RESULT</span>
      </div>
      {#each Object.keys(character.baseStats) as stat}
        <div class="stat-row">
          <span class="stat-name">{stat.toUpperCase()}</span>
          <span class="stat-base">{character.baseStats[stat]}</span>
          <span class="stat-final {finalStats[stat] !== character.baseStats[stat] ? 'buffed' : ''}">
            {finalStats[stat]}
          </span>
        </div>
      {/each}
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
        <div class="ability-card {isUnlocked ? '' : 'locked'} {!isUnlocked ? '' : activeAbilitiesMap[ab.id] ? 'active' : 'inactive'}">
          {#if !isUnlocked}
            <!-- Locked State -->
            <div class="locked-overlay">
              <Shield size={24} class="lock-shield" />
              <span>UNLOCKS AT CHAPTER {ab.chapter} (Locked by Chrono-Sync)</span>
            </div>
          {/if}

          <!-- Normal Active/Inactive State Content -->
          <div class="ability-main">
            <div class="pipeline-controls">
              <button 
                class="order-btn" 
                on:click={() => moveItem(index, -1)} 
                disabled={index === 0 || !isUnlocked}
              >
                <ArrowUp size={16} />
              </button>
              <span class="step-num">#{index + 1}</span>
              <button 
                class="order-btn" 
                on:click={() => moveItem(index, 1)} 
                disabled={index === localAbilities.length - 1 || !isUnlocked}
              >
                <ArrowDown size={16} />
              </button>
            </div>

            <div class="ability-details">
              <div class="title-row">
                <h4>{ab.name}</h4>
                {#if isUnlocked}
                  <button class="toggle-btn" on:click={() => handleToggle(ab.id)}>
                    {#if activeAbilitiesMap[ab.id]}
                      <ToggleRight size={28} class="toggle-icon active-glow" />
                    {:else}
                      <ToggleLeft size={28} class="toggle-icon muted-glow" />
                    {/if}
                  </button>
                {/if}
              </div>
              <p class="description">{ab.description}</p>
              
              {#if isUnlocked}
                <!-- Parameters sliders and configurations -->
                <div class="ability-config">
                  <div class="config-item">
                    <label for="lvl-{ab.id}">Ability Level: <span class="val-badge">{abilityLevelsMap[ab.id]}</span></label>
                    <input 
                      type="range" 
                      id="lvl-{ab.id}" 
                      min="1" 
                      max="10" 
                      value={abilityLevelsMap[ab.id]} 
                      on:input={(e) => handleLevelChange(ab.id, e)} 
                    />
                  </div>

                  <div class="config-item">
                    <label for="val-{ab.id}">Growth Weight (V): <span class="val-badge">{abilityValuesMap[ab.id]}</span></label>
                    <input 
                      type="number" 
                      id="val-{ab.id}" 
                      step="0.01" 
                      min="0"
                      value={abilityValuesMap[ab.id]} 
                      on:input={(e) => handleValueChange(ab.id, e)} 
                      class="number-input"
                    />
                  </div>

                  <div class="config-item type-selector">
                    <label>Formula Type:</label>
                    <div class="type-buttons">
                      <button 
                        class="type-btn {abilityTypesMap[ab.id] === 'additive' ? 'selected' : ''}" 
                        on:click={() => handleTypeChange(ab.id, 'additive')}
                      >Additive</button>
                      <button 
                        class="type-btn {abilityTypesMap[ab.id] === 'multiplicative' ? 'selected' : ''}" 
                        on:click={() => handleTypeChange(ab.id, 'multiplicative')}
                      >Multi</button>
                      <button 
                        class="type-btn {abilityTypesMap[ab.id] === 'exponential' ? 'selected' : ''}" 
                        on:click={() => handleTypeChange(ab.id, 'exponential')}
                      >Exponential</button>
                    </div>
                  </div>
                </div>

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

  .char-tabs {
    display: flex;
    gap: 8px;
  }

  .char-tabs :global(.hologram-btn) {
    font-size: 0.72rem;
    padding: 4px 10px;
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

  .ability-card.inactive {
    opacity: 0.6;
    border-color: rgba(255, 255, 255, 0.02);
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

  .pipeline-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.2);
    padding: 10px;
    border-right: 1px solid rgba(255, 255, 255, 0.05);
    gap: 8px;
    width: 50px;
    min-height: 100%;
  }

  .order-btn {
    background: none;
    border: none;
    color: var(--color-holo-muted);
    cursor: pointer;
    transition: var(--transition-smooth);
    padding: 4px;
    border-radius: 4px;
  }

  .order-btn:hover:not(:disabled) {
    color: var(--color-holo-primary);
    background: rgba(0, 240, 255, 0.1);
  }

  .order-btn:disabled {
    opacity: 0.15;
    cursor: not-allowed;
  }

  .step-num {
    font-size: 0.72rem;
    font-weight: bold;
    color: var(--color-holo-primary);
    font-family: var(--font-sans);
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

  .toggle-btn {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  :global(.toggle-icon) {
    transition: var(--transition-smooth);
  }

  :global(.toggle-icon.active-glow) {
    color: var(--color-holo-primary);
    filter: drop-shadow(0 0 5px var(--color-holo-glow));
  }

  :global(.toggle-icon.muted-glow) {
    color: var(--color-holo-muted);
    opacity: 0.5;
  }

  .description {
    font-size: 0.8rem;
    color: var(--color-holo-muted);
    line-height: 1.4;
  }

  .ability-config {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    background: rgba(0, 0, 0, 0.15);
    padding: 12px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.02);
    margin-top: 4px;
  }

  @media (min-width: 600px) {
    .ability-config {
      grid-template-columns: 1fr 1fr;
    }
    
    .type-selector {
      grid-column: span 2;
    }
  }

  .config-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .config-item label {
    font-size: 0.72rem;
    font-weight: bold;
    color: var(--color-holo-muted);
  }

  .val-badge {
    color: var(--color-holo-primary);
    font-weight: 700;
  }

  .config-item input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 4px;
    background: rgba(0, 240, 255, 0.15);
    border-radius: 2px;
    outline: none;
  }

  .config-item input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--color-holo-primary);
    cursor: pointer;
    box-shadow: 0 0 5px var(--color-holo-primary);
  }

  .number-input {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid var(--color-holo-border);
    color: #fff;
    border-radius: 4px;
    padding: 4px 8px;
    font-family: var(--font-sans);
    font-size: 0.8rem;
    outline: none;
    transition: var(--transition-smooth);
    width: 80px;
  }

  .number-input:focus {
    border-color: var(--color-holo-primary);
    box-shadow: 0 0 5px var(--color-holo-glow);
  }

  .type-buttons {
    display: flex;
    gap: 6px;
    margin-top: 2px;
  }

  .type-btn {
    flex-grow: 1;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--color-holo-muted);
    font-size: 0.7rem;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
    transition: var(--transition-smooth);
    font-family: var(--font-sans);
  }

  .type-btn:hover {
    border-color: rgba(0, 240, 255, 0.3);
    color: #fff;
  }

  .type-btn.selected {
    background: rgba(0, 240, 255, 0.1);
    border-color: var(--color-holo-primary);
    color: var(--color-holo-primary);
    text-shadow: 0 0 5px var(--color-holo-glow);
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
</style>
