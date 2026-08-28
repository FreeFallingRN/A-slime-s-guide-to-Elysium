<script>
  import {
    currentChapter,
    activeChapterDetails,
    characterData,
    getAbilityLevel,
    getAbilitiesForChapter,
    getRequiredExp,
  } from "./store.js";
  import {
    Shield,
    HelpCircle,
    ArrowRight,
    Flame,
    Sparkles,
  } from "lucide-svelte";
  import { runCalculation } from "./calc.js";

  let character = characterData;
  let chapter = 5;
  let activeLvl = 1;
  let activeReqExp = 100;
  let combatActive = false;
  let activeTab = "pipeline"; // 'pipeline', 'digestion', 'mana', 'speed'

  // React to store changes
  currentChapter.subscribe((val) => {
    chapter = val;
  });

  activeChapterDetails.subscribe((val) => {
    if (val && val.halonLvl !== undefined) {
      activeLvl = val.halonLvl;
      activeReqExp = val.reqExp || getRequiredExp(val.halonLvl);
    }
  });

  // Local state for abilities
  let localAbilities = [];
  let collapsedGroups = new Set(); // tracks which group targets are collapsed
  let skillSearch = "";

  function toggleGroup(target) {
    if (collapsedGroups.has(target)) {
      collapsedGroups.delete(target);
    } else {
      collapsedGroups.add(target);
    }
    collapsedGroups = new Set(collapsedGroups); // trigger reactivity
  }

  const GROUP_LABELS = {
    mana: "Mana",
    speed: "Speed",
    digestion: "Digestion",
    none: "Other",
  };

  const DESIRED_GROUP_ORDER = ["mana", "speed", "digestion", "none"];

  // Derive ordered groups from localAbilities according to explicit order: Mana, Speed, Digestion, Other
  let groupedAbilities = [];
  $: {
    const groupMap = {};
    for (const ab of localAbilities) {
      const key = ab.target || "none";
      if (!groupMap[key]) groupMap[key] = [];
      groupMap[key].push(ab);
    }

    groupedAbilities = DESIRED_GROUP_ORDER.filter(
      (key) => groupMap[key] && groupMap[key].length > 0,
    ).map((key) => ({
      target: key,
      label: GROUP_LABELS[key] || key,
      abilities: groupMap[key],
      maxLevel: Math.max(...groupMap[key].map((a) => a.level || 0)),
    }));
  }

  // Filtered groups – when searching, auto-expand all
  let filteredGroupedAbilities = [];
  $: {
    const q = skillSearch.trim().toLowerCase();
    if (!q) {
      filteredGroupedAbilities = groupedAbilities;
    } else {
      filteredGroupedAbilities = groupedAbilities
        .map((g) => ({
          ...g,
          abilities: g.abilities.filter((ab) =>
            ab.name.toLowerCase().includes(q),
          ),
        }))
        .filter((g) => g.abilities.length > 0);
    }
  }

  // Whenever character or chapter changes, rebuild the local abilities list
  $: {
    character = characterData;
    const mappedAbilities = getAbilitiesForChapter(chapter);

    localAbilities = mappedAbilities.sort((a, b) => {
      const orderA = DESIRED_GROUP_ORDER.indexOf(a.target || "none");
      const orderB = DESIRED_GROUP_ORDER.indexOf(b.target || "none");

      const priorityA = orderA === -1 ? DESIRED_GROUP_ORDER.length : orderA;
      const priorityB = orderB === -1 ? DESIRED_GROUP_ORDER.length : orderB;

      if (priorityA !== priorityB) {
        return priorityA - priorityB; // lower index = higher priority group
      }
      // Within the same group, sort by level descending
      if (b.level !== a.level) {
        return b.level - a.level;
      }
      // Finally, fallback to chapter order
      return a.chapter - b.chapter;
    });
  }

  // Calculate stats dynamically based on the exact formula structures
  $: calcData = runCalculation(
    character.baseStats,
    localAbilities,
    activeLvl,
    combatActive,
    chapter,
  );
  $: finalStats = {
    digestion: calcData.digestion.final,
    mana: calcData.mana.final,
    speed: calcData.speed.final,
  };

  // Map each ability id to its current numerical contribution
  $: abilityBonusMap = (() => {
    if (!calcData?.digestion) return {};
    const d = calcData.digestion;
    const m = calcData.mana;
    const s = calcData.speed;
    return {
      efficient_digestion: (() => {
        const digBonus = Math.round((d.digEnhanced - d.base) * 100) / 100;
        if (chapter >= 33 && d.efficientLvl > 0) {
          const em = 1 + 0.01 * d.efficientLvl;
          const manaBonus = Math.round(m.final * (1 - 1 / em) * 100) / 100;
          return `+${digBonus} bio/h  ·  +${manaBonus} mana`;
        }
        return `+${digBonus} bio/h`;
      })(),
      viscous_flow: `+${Math.round((s.viscousVal - s.additiveSum) * 100) / 100} m/s`,
      hemolymphatic_tissue: combatActive
        ? `+${d.hemoVal} bio/h`
        : `Toggle combat to view`,
      viscous_flow: `+${Math.round((s.final - s.base) * 100) / 100} m/s`,
      passive_digestion: `+${d.passiveVal} bio/h`,
      mass_expansion: `+${d.massVal} bio/h`,
      partial_division: `+${d.cloneVal} bio/h`,
      magic_core: `+${Math.round((m.final - m.base) * 100) / 100} mana`,
    };
  })();
</script>

<!-- Arrow Marker Definitions SVG (Invisible) -->
<svg style="position: absolute; width: 0; height: 0;" aria-hidden="true">
  <defs>
    <marker
      id="arrow"
      viewBox="0 0 10 10"
      refX="6"
      refY="5"
      markerWidth="6"
      markerHeight="6"
      orient="auto-start-reverse"
    >
      <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-holo-primary)" />
    </marker>
  </defs>
</svg>

<div class="stat-calc-layout">
  <!-- Stats Display Panel -->
  <div class="hologram-panel side-panel {combatActive ? 'in-combat' : ''}">
    <div class="panel-header">
      <h3 class="hologram-glow-text {combatActive ? 'combat-glow' : ''}">
        CHARACTER SHEET
      </h3>
      {#if combatActive}
        <span class="combat-mode-badge">
          <Flame size={12} class="combat-flame-icon" /> COMBAT ACTIVE
        </span>
      {/if}
    </div>

    <div class="character-identity">
      <div class="character-avatar {combatActive ? 'in-combat' : ''}">
        <img
          src={combatActive
            ? "halon-avatar-battle.png"
            : "halon-avatar-neutral.png"}
          alt="{character.name} {combatActive ? 'Battle' : 'Neutral'} Avatar"
          class="avatar-img"
        />
        <div class="avatar-glow {combatActive ? 'combat-glow' : ''}"></div>
      </div>
      <h2>{character.name}</h2>
      <p class="subtitle">
        Race: {character.race} ({character.raceBase || "Common"}) | Class: {character.class}
        ({character.classBase || "Common"})
      </p>

      <div class="level-exp-container">
        <span class="level-badge">Lv {activeLvl}</span>
        <span class="req-exp-badge">REQ EXP: {activeReqExp}</span>
      </div>
    </div>

    <div class="stats-comparison">
      {#each ["mana", "speed", "digestion"] as stat}
        {@const isDigestionInCombat = stat === "digestion" && combatActive}
        <div class="stat-row-group">
          <div class="stat-row {isDigestionInCombat ? 'combat-highlight' : ''}">
            <span
              class="stat-name {isDigestionInCombat ? 'stat-name-combat' : ''}"
            >
              {#if stat === "speed"}
                SPEED
              {:else if stat === "digestion"}
                DIGESTION {#if combatActive}<span class="boost-tag"
                    >🔥 BOOSTED</span
                  >{/if}
              {:else}
                {stat.toUpperCase()}
              {/if}
            </span>
            <span
              class="stat-final {isDigestionInCombat
                ? 'stat-final-combat'
                : 'buffed'}"
            >
              {finalStats[stat]}
              {#if stat === "speed"}
                m/s{:else if stat === "digestion"}
                bio/h{/if}
            </span>
          </div>
          {#if stat === "digestion" && calcData.digestion && calcData.digestion.cloneLvl > 0}
            <div class="clone-split-subrow">
              <span class="subrow-pill"
                >Body: {calcData.digestion.mainBody} bio/h</span
              >
              <span class="subrow-pill clone-pill"
                >Clone: +{calcData.digestion.cloneOutput} bio/h</span
              >
            </div>
          {/if}
        </div>
      {/each}

      <!-- Cybernetic Holographic Combat Switch -->
      <div class="combat-intensity-toggle">
        <button
          type="button"
          class="cyber-toggle-btn {combatActive ? 'active' : ''}"
          on:click={() => (combatActive = !combatActive)}
          aria-pressed={combatActive}
        >
          <div class="toggle-left">
            <Flame
              size={15}
              class="toggle-flame-icon {combatActive ? 'active' : ''}"
            />
            <span class="toggle-label-text">
              {combatActive ? "COMBAT INTENSITY HIGH" : "COMBAT MODE"}
            </span>
          </div>
          <div class="cyber-switch-track {combatActive ? 'active' : ''}">
            <div class="cyber-switch-thumb"></div>
          </div>
        </button>
      </div>
    </div>
  </div>

  <!-- Abilities Pipeline Editor / Visual graphs -->
  <div class="hologram-panel main-panel">
    <div class="panel-header">
      <div class="tab-selector-wrap">
        <div class="tab-selector">
          <button
            class="tab-btn {activeTab === 'pipeline' ? 'active' : ''}"
            on:click={() => (activeTab = "pipeline")}
          >
            <span class="tab-label-full">Abilities & Evolutions</span>
            <span class="tab-label-short">Abilities</span>
          </button>
          <button
            class="tab-btn {activeTab === 'digestion' ? 'active' : ''}"
            on:click={() => (activeTab = "digestion")}
          >
            <span class="tab-label-full">Digestion Calculator</span>
            <span class="tab-label-short">Digestion</span>
          </button>
          <button
            class="tab-btn {activeTab === 'mana' ? 'active' : ''}"
            on:click={() => (activeTab = "mana")}
          >
            <span class="tab-label-full">Mana Calculator</span>
            <span class="tab-label-short">Mana</span>
          </button>
          <button
            class="tab-btn {activeTab === 'speed' ? 'active' : ''}"
            on:click={() => (activeTab = "speed")}
          >
            <span class="tab-label-full">Speed Calculator</span>
            <span class="tab-label-short">Speed</span>
          </button>
        </div>
      </div>
      <span
        class="help-tooltip"
        title="Order matters! Switch tabs to view active ability logs or visual mathematical flowcharts."
      >
        <HelpCircle size={16} />
      </span>
    </div>

    {#if activeTab === "pipeline"}
      <!-- Search bar -->
      <div class="skill-search-bar">
        <div class="skill-search-input-wrap">
          <svg
            class="skill-search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            id="skill-search"
            class="skill-search-input"
            type="text"
            placeholder="Search abilities..."
            bind:value={skillSearch}
            autocomplete="off"
            spellcheck="false"
          />
          {#if skillSearch}
            <button
              class="skill-search-clear"
              on:click={() => (skillSearch = "")}
              aria-label="Clear search">✕</button
            >
          {/if}
        </div>
        {#if skillSearch && filteredGroupedAbilities.length === 0}
          <p class="skill-search-empty">No skills match "{skillSearch}"</p>
        {/if}
      </div>

      <div class="abilities-list">
        {#each filteredGroupedAbilities as group}
          <!-- Group Header -->
          <button
            class="ability-group-header"
            on:click={() => toggleGroup(group.target)}
            aria-expanded={skillSearch
              ? true
              : !collapsedGroups.has(group.target)}
          >
            <div class="group-header-left">
              <span class="group-chevron"
                >{!skillSearch && collapsedGroups.has(group.target)
                  ? "▶"
                  : "▼"}</span
              >
              <span class="group-label">{group.label}</span>
              <span class="group-count"
                >{group.abilities.length} skill{group.abilities.length !== 1
                  ? "s"
                  : ""}</span
              >
            </div>
          </button>

          {#if skillSearch || !collapsedGroups.has(group.target)}
            <div class="group-body">
              {#each group.abilities as ab}
                {@const isUnlocked = ab.chapter <= chapter}
                <div class="ability-card {isUnlocked ? 'active' : 'locked'}">
                  {#if !isUnlocked}
                    <!-- Locked State -->
                    <div class="locked-overlay">
                      <Shield size={24} class="lock-shield" />
                      <span
                        >UNLOCKS AT CHAPTER {ab.chapter} (Locked by Chrono-Sync)</span
                      >
                    </div>
                  {/if}

                  <!-- Normal Active State Content -->
                  <div class="ability-main">
                    <div class="ability-details">
                      <div class="title-row">
                        <h4>{ab.name}</h4>
                        <div class="title-badges">
                          {#if isUnlocked}
                            <span class="active-badge">Lv {ab.level}</span>
                          {/if}
                          {#if isUnlocked && abilityBonusMap[ab.id]}
                            <span class="bonus-badge"
                              >{abilityBonusMap[ab.id]}</span
                            >
                          {/if}
                        </div>
                      </div>
                      <p class="description">{ab.description}</p>

                      {#if isUnlocked && ab.effect}
                        <div class="effect-badge">
                          <svg
                            class="effect-icon"
                            viewBox="0 0 12 12"
                            fill="none"
                            aria-hidden="true"
                          >
                            <polyline
                              points="2,2 8,6 2,10"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <span class="effect-text">{ab.effect}</span>
                        </div>
                      {/if}

                      {#if isUnlocked && ab.traits && ab.traits.length > 0}
                        <div class="traits-container">
                          {#each ab.traits as trait}
                            <div class="trait-badge">
                              <div class="trait-header">
                                <Sparkles
                                  size={13}
                                  class="trait-sparkle-icon"
                                />
                                <span class="trait-title"
                                  >TRAIT: {trait.name}</span
                                >
                              </div>
                              <p class="trait-desc">{trait.description}</p>
                            </div>
                          {/each}
                        </div>
                      {/if}

                      {#if isUnlocked && ab.target !== "none"}
                        <div class="applies-badge">
                          Applies to: <span class="stat-target"
                            >{ab.target.toUpperCase()}</span
                          >
                        </div>
                      {/if}
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          {/if}
        {/each}
      </div>
    {:else if activeTab === "digestion"}
      <!-- Ultra-Clear Step-by-Step Digestion Breakdown -->
      <div class="calc-breakdown-container">
        <div class="breakdown-header">
          <h4>DIGESTION SPEED MATHEMATICAL BREAKDOWN</h4>
          <span class="breakdown-subtitle"
            >Step-by-step formula tracing how Lohan's biomass processing is
            computed</span
          >
        </div>

        <div class="breakdown-steps-list">
          <!-- Stage 1: Base Digestion -->
          <div class="step-card">
            <div class="step-header">
              <span class="step-number">BASE</span>
              <span class="step-title">Base Digestion Speed</span>
            </div>
            <div class="step-subitems">
              <div class="subitem-row">
                <span class="subitem-name">Base Absorption Capacity:</span>
                <span class="subitem-calc">Base Stat</span>
                <span class="subitem-value"
                  >{calcData.digestion.base} bio/h</span
                >
              </div>
            </div>
          </div>

          <!-- Stage 2: Enhanced Base -->
          {#if calcData.digestion.efficientLvl > 0}
            <div class="step-card">
              <div class="step-header">
                <span class="step-number">MULTIPLIER</span>
                <span class="step-title">Enhanced Base</span>
              </div>
              <div class="step-subitems">
                <div class="subitem-row">
                  <span class="subitem-name"
                    >Efficient Digestion (Lv {calcData.digestion
                      .efficientLvl}):</span
                  >
                  <span class="subitem-calc"
                    >{calcData.digestion.base} × (1 + 10% ^ {calcData.digestion
                      .efficientLvl})</span
                  >
                  <span class="subitem-value"
                    >{calcData.digestion.digEnhanced} bio/h</span
                  >
                </div>
              </div>
            </div>
          {/if}

          <!-- Stage 3 & 4: Mass Expansion & Passive Digestion Multipliers -->
          {#if calcData.digestion.massLvl > 0 || calcData.digestion.passiveLvl > 0}
            <div class="step-card">
              <div class="step-header">
                <span class="step-number">ADDITIVE</span>
                <span class="step-title">Passive skills</span>
              </div>
              <div class="step-subitems">
                {#if calcData.digestion.massLvl > 0}
                  <div class="subitem-row">
                    <span class="subitem-name"
                      >+ Mass Expansion (Lv {calcData.digestion.massLvl}):</span
                    >
                    <span class="subitem-calc"
                      >{calcData.digestion.digEnhanced} × (30% × {calcData
                        .digestion.massLvl})</span
                    >
                    <span class="subitem-value"
                      >+{calcData.digestion.massVal} bio/h</span
                    >
                  </div>
                {/if}
                {#if calcData.digestion.passiveLvl > 0}
                  <div class="subitem-row">
                    <span class="subitem-name"
                      >+ Passive Digestion (Lv {calcData.digestion
                        .passiveLvl}):</span
                    >
                    <span class="subitem-calc"
                      >{calcData.digestion.digEnhanced} × (10% × {calcData
                        .digestion.passiveLvl})</span
                    >
                    <span class="subitem-value"
                      >+{calcData.digestion.passiveVal} bio/h</span
                    >
                  </div>
                {/if}
              </div>
            </div>
          {/if}

          <!-- Stage 5: Base Subtotal (Shown when clones or combat add further stages) -->
          {#if calcData.digestion.cloneLvl > 0 || (combatActive && calcData.digestion.hemoLvl > 0)}
            <div class="step-card highlight-step">
              <div class="step-header">
                <span class="step-number">SUM</span>
                <span class="step-title">Main Body Rate</span>
              </div>
              <div class="step-subitems">
                <div class="subitem-row">
                  <span class="subitem-name">Main Body Base Sum:</span>
                  <span class="subitem-calc">
                    {calcData.digestion.digEnhanced} (Enhanced Base)
                    {#if calcData.digestion.massLvl > 0}
                      + {calcData.digestion.massVal} (Mass){/if}
                    {#if calcData.digestion.passiveLvl > 0}
                      + {calcData.digestion.passiveVal} (Passive){/if}
                  </span>
                  <span class="subitem-value"
                    >{calcData.digestion.baseSum} bio/h</span
                  >
                </div>
              </div>
            </div>
          {/if}

          <!-- Stage 6: Remote Division Clone Bonus -->
          {#if calcData.digestion.cloneLvl > 0}
            <div class="step-card">
              <div class="step-header">
                <span class="step-number">ADDITIVE</span>
                <span class="step-title">Clone Harvest Rate</span>
              </div>
              <div class="step-subitems">
                <div class="subitem-row">
                  <span class="subitem-name"
                    >+ Partial Division (Lv {calcData.digestion
                      .cloneLvl}):</span
                  >
                  <span class="subitem-calc"
                    >{calcData.digestion.baseSum} (Base Subtotal) × (10% × {calcData
                      .digestion.cloneLvl})</span
                  >
                  <span class="subitem-value"
                    >+{calcData.digestion.cloneVal} bio/h</span
                  >
                </div>
              </div>
            </div>
          {/if}

          <!-- Stage 7: Neutral Total Rate (Shown when clones are active) -->
          {#if calcData.digestion.cloneLvl > 0}
            <div class="step-card">
              <div class="step-header">
                <span class="step-number">SUM</span>
                <span class="step-title">Combined Rate</span>
              </div>
              <div class="step-subitems">
                <div class="subitem-row">
                  <span class="subitem-name">Passive / Out-of-Combat Rate:</span
                  >
                  <span class="subitem-calc"
                    >{calcData.digestion.baseSum} (Subtotal) + {calcData
                      .digestion.cloneVal} (Clones)</span
                  >
                  <span class="subitem-value"
                    >{calcData.digestion.neutralSum} bio/h</span
                  >
                </div>
              </div>
            </div>
          {/if}

          <!-- Stage 8: Active Combat Flood Multiplier -->
          {#if combatActive && calcData.digestion.hemoLvl > 0}
            <div class="step-card combat-step">
              <div class="step-header">
                <span class="step-number">ADDITIVE</span>
                <span class="step-title">Active Combat</span>
              </div>
              <div class="step-subitems">
                <div class="subitem-row">
                  <span class="subitem-name"
                    >+ Hemolymphatic Tissue (Lv {calcData.digestion
                      .hemoLvl}):</span
                  >
                  <span class="subitem-calc"
                    >{calcData.digestion.baseSum} (Main Body) × (20% × {calcData
                      .digestion.hemoLvl})</span
                  >
                  <span class="subitem-value"
                    >+{calcData.digestion.hemoVal} bio/h</span
                  >
                </div>
              </div>
            </div>
          {/if}

          <!-- Final Output -->
          <div class="step-card final-step">
            <div class="step-header">
              <span class="step-number">FINAL</span>
              <span class="step-title">Total Digestion Rate</span>
            </div>
            <div class="step-subitems">
              <div class="subitem-row">
                <span class="subitem-name">Total Combined Output:</span>
                <span class="subitem-calc">
                  {calcData.digestion.mainBody} (Main Body{#if combatActive}
                    Combat Rate{/if})
                  {#if calcData.digestion.cloneLvl > 0}
                    + {calcData.digestion.cloneOutput} (Clones){/if}
                </span>
                <span class="subitem-value final-value"
                  >{calcData.digestion.final} bio/h</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    {:else if activeTab === "mana"}
      <!-- Ultra-Clear Step-by-Step Mana Breakdown -->
      <div class="calc-breakdown-container">
        <div class="breakdown-header">
          <h4>MANA CAPACITY MATHEMATICAL BREAKDOWN</h4>
          <span class="breakdown-subtitle"
            >Step-by-step formula tracing Lohan's Mana Core compounding</span
          >
        </div>

        <div class="breakdown-steps-list">
          <div class="step-card">
            <div class="step-header">
              <span class="step-number">STEP 1</span>
              <span class="step-title">Base Mana Capacity</span>
            </div>
            <div class="step-subitems">
              <div class="subitem-row">
                <span class="subitem-name">Magic Core Baseline:</span>
                <span class="subitem-calc"
                  >{calcData.mana.coreLvl > 0
                    ? "15.00 Mana (Magic Core Lv 1 Unlocked)"
                    : "10.00 Base Mana"}</span
                >
                <span class="subitem-value">{calcData.mana.base} Mana</span>
              </div>
            </div>
          </div>

          {#if calcData.mana.coreLvl > 1}
            <div class="step-card">
              <div class="step-header">
                <span class="step-number">STEP 2</span>
                <span class="step-title">Magic Core Growth</span>
              </div>
              <div class="step-subitems">
                <div class="subitem-row">
                  <span class="subitem-name"
                    >⚡ Magic Core (Lv {calcData.mana.coreLvl}):</span
                  >
                  <span class="subitem-calc"
                    >15.00 × (1.10 ^ {calcData.mana.coreLvl - 1})</span
                  >
                  <span class="subitem-value">{calcData.mana.final} Mana</span>
                </div>
              </div>
            </div>
          {/if}

          <div class="step-card final-step">
            <div class="step-header">
              <span class="step-number">FINAL</span>
              <span class="step-title">Total Capacity</span>
            </div>
            <div class="step-subitems">
              <div class="subitem-row">
                <span class="subitem-name">Total Current Mana Pool:</span>
                <span class="subitem-calc">Synchronized Core Density</span>
                <span class="subitem-value final-value"
                  >{calcData.mana.final} Mana</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    {:else if activeTab === "speed"}
      <!-- Ultra-Clear Single-Skill Speed Formula -->
      <div class="calc-breakdown-container">
        <div class="breakdown-header">
          <h4>MOVEMENT SPEED FORMULA</h4>
          <span class="breakdown-subtitle"
            >Single-skill locomotion velocity computed from Viscous Flow
            compounding</span
          >
        </div>

        <div class="breakdown-steps-list">
          <div class="step-card">
            <div class="step-header">
              <span class="step-number">BASE</span>
              <span class="step-title">Baseline Locomotion Speed</span>
            </div>
            <div class="step-subitems">
              <div class="subitem-row">
                <span class="subitem-name">Base Slime Velocity:</span>
                <span class="subitem-calc">Unmodified Baseline</span>
                <span class="subitem-value">{calcData.speed.base} m/s</span>
              </div>
            </div>
          </div>

          {#if calcData.speed.viscousLvl > 0}
            <div class="step-card highlight-step">
              <div class="step-header">
                <span class="step-number">MULTIPLIER</span>
                <span class="step-title"
                  >Viscous Flow (Level {calcData.speed.viscousLvl})</span
                >
              </div>
              <div class="step-subitems">
                <div class="subitem-row">
                  <span class="subitem-name">Viscous Flow Compounding:</span>
                  <span class="subitem-calc"
                    >{calcData.speed.base} (Base) × (1.10 ^ {calcData.speed
                      .viscousLvl})</span
                  >
                  <span class="subitem-value"
                    >{calcData.speed.final.toFixed(2)} m/s</span
                  >
                </div>
              </div>
            </div>
          {/if}

          <div class="step-card final-step">
            <div class="step-header">
              <span class="step-number">FINAL</span>
              <span class="step-title">Total Locomotion Movement Speed</span>
            </div>
            <div class="step-subitems">
              <div class="subitem-row">
                <span class="subitem-name">Total Maximum Velocity:</span>
                <span class="subitem-calc">Locomotion Output</span>
                <span class="subitem-value final-value"
                  >{calcData.speed.final.toFixed(2)} m/s</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .stat-calc-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 20px;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  @media (min-width: 900px) {
    .stat-calc-layout {
      grid-template-columns: 320px minmax(0, 1fr);
    }
  }

  @media (max-width: 767px) {
    .panel-header {
      padding: 10px;
      gap: 8px;
    }

    .tab-selector {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 4px;
      width: 100%;
    }

    .tab-btn {
      padding: 7px 4px;
      font-size: 0.75rem;
      width: 100%;
    }

    .tab-label-full {
      display: none;
    }

    .tab-label-short {
      display: inline;
    }

    .abilities-list {
      padding: 12px 8px;
      gap: 12px;
    }

    .group-body {
      padding-left: 6px;
      margin-left: 2px;
      gap: 8px;
    }

    .ability-details {
      padding: 12px 10px;
    }

    .title-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
    }

    .title-badges {
      justify-content: flex-start;
      width: 100%;
    }

    .bonus-badge {
      font-size: 0.65rem;
    }

    .flowchart-container {
      padding: 12px 6px;
    }
  }

  .panel-header {
    border-bottom: 1px solid var(--color-holo-border);
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    min-width: 0;
  }

  .tab-selector-wrap {
    flex-grow: 1;
    min-width: 0;
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
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    min-width: 0;
  }

  .character-identity {
    padding: 20px;
    text-align: center;
    border-bottom: 1px dashed var(--color-holo-border);
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    min-width: 0;
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
    word-break: break-word;
  }

  .stats-comparison {
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    min-width: 0;
  }

  .stat-row-group {
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 100%;
  }

  .clone-split-subrow {
    display: flex;
    justify-content: flex-end;
    gap: 6px;
    padding: 0 10px 4px 10px;
  }

  .subrow-pill {
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--color-holo-primary);
    background: rgba(0, 240, 255, 0.08);
    border: 1px solid rgba(0, 240, 255, 0.2);
    border-radius: 4px;
    padding: 2px 6px;
    letter-spacing: 0.02em;
  }

  .subrow-pill.clone-pill {
    color: #00ffaa;
    background: rgba(0, 255, 170, 0.08);
    border-color: rgba(0, 255, 170, 0.25);
  }

  .mini-bonus-pill {
    font-size: 0.76rem;
    font-weight: 600;
    color: #00f0ff;
    background: rgba(0, 240, 255, 0.06);
    border: 1px solid rgba(0, 240, 255, 0.2);
    border-radius: 6px;
    padding: 6px 10px;
    margin-top: 6px;
    text-align: center;
    letter-spacing: 0.02em;
  }

  .stat-row {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    font-size: 0.92rem;
    padding: 8px 10px;
    border-radius: 6px;
    border: 1px solid transparent;
    border-left: 4px solid transparent;
    border-bottom: 1px dashed rgba(255, 255, 255, 0.05);
    box-sizing: border-box;
    min-height: 42px;
    transition:
      background 0.3s ease,
      border-color 0.3s ease,
      box-shadow 0.3s ease;
  }

  .stat-name {
    font-weight: bold;
    color: var(--color-holo-muted);
    letter-spacing: 0.05em;
  }

  .stat-final {
    font-weight: 700;
    color: var(--color-holo-primary);
    text-shadow: 0 0 8px var(--color-holo-glow);
    transition: var(--transition-smooth);
  }

  /* Breakdown Container Styling */
  .calc-breakdown-container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    color: #fff;
  }

  .breakdown-header h4 {
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-holo-primary);
    letter-spacing: 0.05em;
    margin: 0 0 4px 0;
  }

  .breakdown-subtitle {
    font-size: 0.8rem;
    color: var(--color-holo-muted);
  }

  .breakdown-steps-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .step-card {
    background: rgba(10, 20, 35, 0.6);
    border: 1px solid rgba(0, 240, 255, 0.15);
    border-radius: 8px;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .step-card.highlight-step {
    border-color: rgba(0, 240, 255, 0.35);
    background: rgba(0, 240, 255, 0.04);
  }

  .step-card.final-step {
    border-color: rgba(255, 200, 0, 0.5);
    background: rgba(255, 200, 0, 0.05);
    box-shadow: 0 0 15px rgba(255, 200, 0, 0.1);
  }

  .step-card.combat-step {
    border-color: rgba(255, 75, 75, 0.5);
    background: rgba(255, 30, 30, 0.05);
    box-shadow: 0 0 15px rgba(255, 75, 75, 0.1);
  }

  .step-header {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .step-number {
    font-size: 0.7rem;
    font-weight: 800;
    color: #000;
    background: var(--color-holo-primary);
    padding: 2px 6px;
    border-radius: 4px;
    letter-spacing: 0.05em;
  }

  .final-step .step-number {
    background: #ffc800;
  }

  .combat-step .step-number {
    background: #ff4b4b;
    color: #fff;
  }

  .step-title {
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--color-holo-primary);
  }

  .final-step .step-title {
    color: #ffc800;
  }

  .combat-step .step-title {
    color: #ff4b4b;
  }

  .step-formula {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    font-family: monospace, sans-serif;
  }

  .formula-label {
    color: var(--color-holo-muted);
  }

  .formula-value,
  .formula-result {
    font-weight: 700;
    color: #fff;
  }

  .final-value {
    font-size: 1.1rem;
    color: #00ffaa;
  }

  .step-note {
    font-size: 0.78rem;
    color: #00f0ff;
    background: rgba(0, 240, 255, 0.06);
    padding: 4px 8px;
    border-radius: 4px;
  }

  .step-subitems {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-left: 8px;
  }

  .subitem-row {
    display: grid;
    grid-template-columns: 220px 1fr auto;
    align-items: center;
    font-size: 0.85rem;
    gap: 8px;
  }

  .subitem-name {
    color: var(--color-holo-muted);
  }

  .subitem-calc {
    font-family: monospace;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.8rem;
  }

  .subitem-value {
    font-weight: 700;
    color: #00ffaa;
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
    min-width: 0;
  }

  .title-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
    flex-wrap: wrap;
  }

  .title-badges {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 1;
    flex-wrap: wrap;
    justify-content: flex-end;
    max-width: 100%;
  }

  .bonus-badge {
    background: rgba(194, 157, 83, 0.1);
    color: var(--color-book-gold);
    border: 1px solid rgba(194, 157, 83, 0.3);
    font-size: 0.68rem;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 4px;
    text-shadow: 0 0 5px var(--color-book-gold-glow);
    letter-spacing: 0.03em;
    white-space: normal;
    word-break: break-word;
    max-width: 100%;
  }

  .title-row h4 {
    font-size: 1.1rem;
    color: #fff;
    word-break: break-word;
  }

  .description {
    font-size: 0.8rem;
    color: var(--color-holo-muted);
    line-height: 1.4;
    word-break: break-word;
  }

  .applies-badge {
    font-size: 0.72rem;
    color: var(--color-holo-muted);
    align-self: flex-start;
  }

  .effect-badge {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    align-self: flex-start;
    background: rgba(0, 240, 255, 0.06);
    border-left: 2px solid var(--color-holo-primary);
    border-radius: 0 4px 4px 0;
    padding: 4px 8px;
    max-width: 100%;
  }

  .effect-icon {
    width: 10px;
    height: 10px;
    color: var(--color-holo-primary);
    flex-shrink: 0;
    margin-top: 3px;
  }

  .effect-content {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .effect-text {
    font-size: 0.72rem;
    color: var(--color-holo-primary);
    opacity: 0.85;
    line-height: 1.4;
  }

  /* Unlocked Skill Traits */
  .traits-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 4px;
    width: 100%;
  }

  .trait-badge {
    background: linear-gradient(
      90deg,
      rgba(178, 77, 255, 0.12) 0%,
      rgba(178, 77, 255, 0.03) 100%
    );
    border: 1px solid rgba(178, 77, 255, 0.35);
    border-left: 3px solid #b24dff;
    border-radius: 4px;
    padding: 8px 10px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    box-shadow: 0 0 10px rgba(178, 77, 255, 0.15);
  }

  .trait-header {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  :global(.trait-sparkle-icon) {
    color: #d18aff;
    filter: drop-shadow(0 0 4px #b24dff);
  }

  .trait-title {
    font-size: 0.72rem;
    font-weight: 800;
    color: #e4b8ff;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    text-shadow: 0 0 6px rgba(178, 77, 255, 0.6);
  }

  .trait-desc {
    font-size: 0.76rem;
    color: rgba(235, 215, 255, 0.9);
    line-height: 1.35;
    margin: 0;
  }

  .effect-current {
    font-size: 0.75rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.02em;
    text-shadow: 0 0 6px var(--color-holo-glow);
  }

  .stat-target {
    color: var(--color-book-gold);
    font-weight: bold;
    border-bottom: 1px dotted var(--color-book-gold);
  }

  /* Level & Required EXP Display */
  .level-exp-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 8px;
    width: 100%;
    flex-wrap: wrap;
  }

  .level-badge {
    background: rgba(0, 240, 255, 0.12);
    border: 1px solid var(--color-holo-primary);
    color: var(--color-holo-primary);
    font-weight: 800;
    font-size: 0.82rem;
    padding: 3px 10px;
    border-radius: 6px;
    letter-spacing: 0.05em;
    text-shadow: 0 0 6px var(--color-holo-glow);
    box-shadow: 0 0 8px rgba(0, 240, 255, 0.2);
  }

  .req-exp-badge {
    background: rgba(194, 157, 83, 0.12);
    border: 1px solid var(--color-book-gold);
    color: var(--color-book-gold);
    font-weight: 700;
    font-size: 0.78rem;
    padding: 3px 10px;
    border-radius: 6px;
    letter-spacing: 0.04em;
    text-shadow: 0 0 6px var(--color-book-gold-glow);
    box-shadow: 0 0 8px rgba(194, 157, 83, 0.15);
  }

  /* --- COMBAT MODE THEME STYLES --- */
  .side-panel.in-combat {
    border-color: rgba(255, 94, 0, 0.45);
    box-shadow:
      0 8px 32px 0 rgba(0, 0, 0, 0.6),
      0 0 25px 0 var(--color-arson-glow);
    background: linear-gradient(
      180deg,
      rgba(22, 8, 4, 0.85) 0%,
      rgba(2, 14, 26, 0.75) 100%
    );
  }

  .hologram-glow-text.combat-glow {
    color: var(--color-arson-fire);
    text-shadow: 0 0 10px var(--color-arson-glow);
  }

  .combat-mode-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: rgba(255, 94, 0, 0.15);
    border: 1px solid var(--color-arson-fire);
    color: var(--color-arson-fire);
    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    padding: 3px 8px;
    border-radius: 4px;
    text-shadow: 0 0 5px var(--color-arson-glow);
    animation: pulse-slow 2s infinite ease-in-out;
  }

  :global(.combat-flame-icon) {
    color: var(--color-arson-fire);
    filter: drop-shadow(0 0 4px var(--color-arson-fire));
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
    transition: var(--transition-smooth);
  }

  .character-avatar.in-combat {
    border-color: var(--color-arson-fire);
    box-shadow:
      0 0 25px var(--color-arson-glow),
      0 0 45px rgba(255, 94, 0, 0.35);
  }

  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    mix-blend-mode: screen;
    transition:
      opacity 0.4s ease-in-out,
      transform 0.4s ease-in-out;
  }

  .avatar-glow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle,
      transparent 50%,
      rgba(0, 240, 255, 0.2) 100%
    );
    pointer-events: none;
    transition: var(--transition-smooth);
  }

  .avatar-glow.combat-glow {
    background: radial-gradient(
      circle,
      transparent 40%,
      rgba(255, 94, 0, 0.4) 100%
    );
  }

  /* Digestion Combat Highlight */
  .stat-row.combat-highlight {
    background: linear-gradient(
      90deg,
      rgba(255, 94, 0, 0.18) 0%,
      rgba(255, 94, 0, 0.04) 100%
    );
    border-color: rgba(255, 94, 0, 0.45);
    border-left-color: var(--color-arson-fire);
    box-shadow: 0 0 14px rgba(255, 94, 0, 0.2);
  }

  .stat-name-combat {
    color: var(--color-arson-fire) !important;
    font-weight: 800;
    letter-spacing: 0.08em;
  }

  .boost-tag {
    font-size: 0.6rem;
    font-weight: 800;
    background: rgba(255, 94, 0, 0.2);
    color: var(--color-arson-fire);
    padding: 2px 6px;
    border-radius: 3px;
    margin-left: 6px;
    letter-spacing: 0.05em;
    text-shadow: 0 0 4px var(--color-arson-glow);
  }

  .stat-final-combat {
    color: var(--color-arson-fire) !important;
    font-size: 1.05rem;
    font-weight: 900;
    text-shadow: 0 0 10px var(--color-arson-glow);
    letter-spacing: 0.02em;
    line-height: 1;
  }

  /* Cybernetic Holographic Switch Toggle */
  .combat-intensity-toggle {
    margin-top: 10px;
    padding-top: 12px;
    border-top: 1px dashed var(--color-holo-border);
  }

  .cyber-toggle-btn {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(0, 240, 255, 0.03);
    border: 1px solid rgba(0, 240, 255, 0.15);
    padding: 9px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: var(--transition-smooth);
    font-family: var(--font-sans);
  }

  .cyber-toggle-btn:hover {
    background: rgba(0, 240, 255, 0.07);
    border-color: rgba(0, 240, 255, 0.3);
    box-shadow: 0 0 10px rgba(0, 240, 255, 0.1);
  }

  .cyber-toggle-btn.active {
    background: rgba(255, 94, 0, 0.12);
    border-color: var(--color-arson-fire);
    box-shadow: 0 0 14px rgba(255, 94, 0, 0.25);
  }

  .toggle-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  :global(.toggle-flame-icon) {
    color: var(--color-holo-muted);
    transition: var(--transition-smooth);
  }

  :global(.toggle-flame-icon.active) {
    color: var(--color-arson-fire);
    filter: drop-shadow(0 0 6px var(--color-arson-fire));
    animation: pulse-slow 1.5s infinite ease-in-out;
  }

  .toggle-label-text {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: var(--color-holo-muted);
    transition: var(--transition-smooth);
  }

  .cyber-toggle-btn.active .toggle-label-text {
    color: var(--color-arson-fire);
    text-shadow: 0 0 6px var(--color-arson-glow);
  }

  .cyber-switch-track {
    width: 40px;
    height: 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    position: relative;
    transition: var(--transition-smooth);
    border: 1px solid rgba(255, 255, 255, 0.15);
    flex-shrink: 0;
  }

  .cyber-switch-track.active {
    background: rgba(255, 94, 0, 0.3);
    border-color: var(--color-arson-fire);
    box-shadow: 0 0 8px var(--color-arson-glow);
  }

  .cyber-switch-thumb {
    width: 14px;
    height: 14px;
    background: var(--color-holo-muted);
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: 2px;
    transition:
      transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
      background-color 0.3s;
  }

  .cyber-switch-track.active .cyber-switch-thumb {
    transform: translateX(20px);
    background: var(--color-arson-fire);
    box-shadow: 0 0 8px var(--color-arson-fire);
  }

  :global(.toggle-flame) {
    color: var(--color-arson-fire);
    filter: drop-shadow(0 0 4px var(--color-arson-fire));
    animation: pulse-slow 1.5s infinite;
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

  /* --- VISUAL GRAPH / FLOWCHART STYLES --- */
  .flowchart-container {
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
  }

  .flowchart-grid {
    display: grid;
    align-items: center;
    gap: 12px;
    width: 100%;
  }

  .digestion-grid-vertical {
    grid-template-columns: 1fr 1fr;
    width: 100%;
    max-width: 440px;
    margin: 0 auto;
  }

  .mana-grid-vertical,
  .speed-grid-vertical {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 100%;
  }

  .span-cols-2 {
    grid-column: span 2;
    justify-self: center;
  }

  .justify-self-end {
    justify-self: end;
  }

  .justify-self-start {
    justify-self: start;
  }

  .width-node {
    width: 100%;
    max-width: 190px;
  }

  .width-large {
    width: 100%;
    max-width: 220px;
  }

  .vertical-branch-svg,
  .vertical-merge-svg {
    width: 200px;
    height: 40px;
  }

  .flowchart-box-group {
    background: rgba(2, 14, 26, 0.45);
    border: 1px dashed var(--color-holo-border);
    border-radius: 8px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .flowchart-group-title {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--color-holo-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 4px;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    padding-bottom: 4px;
  }

  .flowchart-node {
    background: rgba(2, 14, 26, 0.7);
    border: 1px solid var(--color-holo-border);
    border-radius: 6px;
    padding: 8px 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: center;
    transition: var(--transition-smooth);
    min-height: 58px;
    justify-content: center;
    position: relative;
  }

  .flowchart-node.glow-node {
    border-color: rgba(0, 240, 255, 0.5);
    box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
  }

  .flowchart-node.final-node {
    border-color: var(--color-book-gold);
    box-shadow: 0 0 15px var(--color-book-gold-glow);
    background: rgba(194, 157, 83, 0.03);
  }

  .flowchart-node.active-buff {
    border-color: rgba(0, 240, 255, 0.4);
    background: rgba(0, 240, 255, 0.05);
  }

  .flowchart-node.active-combat {
    border-color: var(--color-arson-fire);
    background: rgba(255, 94, 0, 0.05);
    box-shadow: 0 0 10px var(--color-arson-glow);
  }

  .flowchart-node.inactive-buff {
    opacity: 0.5;
    border-style: dotted;
    background: rgba(255, 255, 255, 0.01);
  }

  .node-label {
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--color-holo-muted);
    letter-spacing: 0.02em;
  }

  .active-buff .node-label {
    color: var(--color-holo-primary);
  }

  .active-combat .node-label {
    color: var(--color-arson-fire);
  }

  .final-node .node-label {
    color: var(--color-book-gold);
  }

  .node-value {
    font-size: 0.92rem;
    font-weight: bold;
    color: #fff;
  }

  .glow-node-battle .node-value {
    text-shadow: 0 0 8px var(--color-holo-primary);
  }

  .final-subnode .node-value {
    color: var(--color-holo-primary);
    text-shadow: 0 0 6px var(--color-holo-glow);
  }

  .mini-arrow {
    font-size: 0.6rem;
    color: var(--color-holo-border);
    text-align: center;
    line-height: 1;
  }

  .flowchart-arrow {
    font-size: 0.75rem;
    color: var(--color-holo-primary);
    text-shadow: 0 0 4px var(--color-holo-glow);
    text-align: center;
    line-height: 1;
    margin: 4px 0;
  }

  .connector-cell {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .connector-svg {
    width: 100%;
    height: 100%;
    min-height: 40px;
  }

  /* Card stack styling for Neutral & Battle Sum */
  .card-stack {
    position: relative;
    z-index: 10;
  }

  .card-stack::before {
    content: "";
    position: absolute;
    top: 4px;
    left: 4px;
    right: -4px;
    bottom: -4px;
    border: 1px solid var(--color-holo-border);
    background: var(--color-holo-bg);
    border-radius: 6px;
    z-index: -1;
  }

  .card-stack::after {
    content: "";
    position: absolute;
    top: 8px;
    left: 8px;
    right: -8px;
    bottom: -8px;
    border: 1px solid rgba(0, 240, 255, 0.08);
    background: rgba(2, 14, 26, 0.2);
    border-radius: 6px;
    z-index: -2;
  }

  .final-node::before {
    border-color: rgba(194, 157, 83, 0.4);
  }
  .final-node::after {
    border-color: rgba(194, 157, 83, 0.15);
  }

  .mini-bonuses {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-top: 4px;
    padding-top: 4px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .mini-bonus-text {
    font-size: 0.6rem;
    color: var(--color-holo-muted);
  }

  /* --- SKILL SEARCH BAR --- */
  .skill-search-bar {
    padding: 14px 20px 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .skill-search-input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .skill-search-icon {
    position: absolute;
    left: 12px;
    width: 15px;
    height: 15px;
    color: var(--color-holo-muted);
    pointer-events: none;
    flex-shrink: 0;
  }

  .skill-search-input {
    width: 100%;
    background: rgba(0, 240, 255, 0.04);
    border: 1px solid rgba(0, 240, 255, 0.15);
    border-radius: 6px;
    color: #fff;
    font-family: var(--font-sans);
    font-size: 0.82rem;
    padding: 8px 36px 8px 34px;
    outline: none;
    transition: var(--transition-smooth);
  }

  .skill-search-input::placeholder {
    color: var(--color-holo-muted);
    opacity: 0.6;
  }

  .skill-search-input:focus {
    border-color: var(--color-holo-primary);
    background: rgba(0, 240, 255, 0.07);
    box-shadow: 0 0 10px rgba(0, 240, 255, 0.15);
  }

  .skill-search-clear {
    position: absolute;
    right: 10px;
    background: none;
    border: none;
    color: var(--color-holo-muted);
    font-size: 0.75rem;
    cursor: pointer;
    padding: 2px 4px;
    border-radius: 3px;
    line-height: 1;
    transition: var(--transition-smooth);
  }

  .skill-search-clear:hover {
    color: var(--color-holo-primary);
    background: rgba(0, 240, 255, 0.08);
  }

  .skill-search-empty {
    font-size: 0.78rem;
    color: var(--color-holo-muted);
    font-style: italic;
    padding: 0 2px;
  }

  /* --- COLLAPSIBLE GROUP HEADERS --- */
  .ability-group-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: rgba(0, 240, 255, 0.04);
    border: 1px solid rgba(0, 240, 255, 0.12);
    border-radius: 6px;
    padding: 10px 14px;
    cursor: pointer;
    font-family: var(--font-sans);
    color: var(--color-holo-primary);
    transition: var(--transition-smooth);
    text-align: left;
  }

  .ability-group-header:hover {
    background: rgba(0, 240, 255, 0.08);
    border-color: rgba(0, 240, 255, 0.3);
    box-shadow: 0 0 8px rgba(0, 240, 255, 0.1);
  }

  .group-header-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .group-chevron {
    font-size: 0.6rem;
    opacity: 0.7;
    transition: var(--transition-smooth);
    width: 10px;
    text-align: center;
  }

  .group-label {
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-shadow: 0 0 5px var(--color-holo-glow);
  }

  .group-count {
    font-size: 0.7rem;
    color: var(--color-holo-muted);
    font-weight: 400;
  }

  .group-max-lv {
    font-size: 0.7rem;
    color: var(--color-book-gold);
    font-weight: 700;
    letter-spacing: 0.05em;
  }

  .group-body {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-left: 12px;
    border-left: 2px solid rgba(0, 240, 255, 0.15);
    margin-left: 4px;
  }

  /* Segmented Pill Navigation Bar */
  .tab-selector {
    display: flex;
    align-items: center;
    gap: 4px;
    background: rgba(2, 14, 26, 0.6);
    border: 1px solid rgba(0, 240, 255, 0.18);
    padding: 4px;
    border-radius: 8px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .tab-selector::-webkit-scrollbar {
    display: none;
  }

  .tab-btn {
    background: transparent;
    border: 1px solid transparent;
    color: var(--color-holo-muted);
    font-family: var(--font-sans);
    padding: 6px 14px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.78rem;
    font-weight: 600;
    transition: var(--transition-smooth);
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .tab-label-full {
    display: inline;
  }

  .tab-label-short {
    display: none;
  }

  .tab-btn:hover {
    border-color: rgba(0, 240, 255, 0.2);
    color: #fff;
    background: rgba(0, 240, 255, 0.05);
  }

  .tab-btn.active {
    background: rgba(0, 240, 255, 0.15);
    border-color: var(--color-holo-primary);
    color: var(--color-holo-primary);
    font-weight: 700;
    text-shadow: 0 0 8px var(--color-holo-glow);
    box-shadow: 0 0 10px rgba(0, 240, 255, 0.1);
  }
</style>
