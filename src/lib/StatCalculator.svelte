<script>
  import {
    currentChapter,
    activeChapterDetails,
    charactersData,
    getAbilityLevel,
  } from "./store.js";
  import { Shield, HelpCircle, ArrowRight } from "lucide-svelte";
  import { runCalculation } from "./calc.js";

  let selectedCharKey = "halon";
  let character = charactersData[selectedCharKey];
  let chapter = 5;
  let activeLvl = 1;
  let combatActive = false;
  let activeTab = "pipeline"; // 'pipeline', 'digestion', 'mana', 'speed'

  // React to store changes
  currentChapter.subscribe((val) => {
    chapter = val;
  });

  activeChapterDetails.subscribe((val) => {
    if (val && val.halonLvl !== undefined) {
      activeLvl = val.halonLvl;
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
    digestion: "Digestion",
    mana: "Mana",
    speed: "Speed",
    none: "Other",
  };

  // Derive ordered groups from localAbilities
  let groupedAbilities = [];
  $: {
    const groupMap = {};
    for (const ab of localAbilities) {
      const key = ab.target || "none";
      if (!groupMap[key]) groupMap[key] = [];
      groupMap[key].push(ab);
    }
    // Preserve the order from localAbilities (groups already ordered by highest lv)
    const seen = [];
    for (const ab of localAbilities) {
      const key = ab.target || "none";
      if (!seen.includes(key)) seen.push(key);
    }
    groupedAbilities = seen.map((key) => ({
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
    character = charactersData[selectedCharKey];

    // Filter abilities dynamically based on synchronized chapter lock
    const baseAbilities = (character.abilities || []).filter((ab) => {
      // Must be unlocked in/before current chapter
      if (ab.chapter > chapter) return false;

      // Must not be absorbed/fused by another active fusion
      const isAbsorbed = (character.abilities || []).some((otherAb) => {
        if (otherAb.chapter > chapter) return false;
        if (otherAb.upgrades) {
          return otherAb.upgrades.some((up) => {
            return (
              chapter >= up.chapter &&
              up.type === "fusion" &&
              up.absorbs &&
              up.absorbs.includes(ab.id)
            );
          });
        }
        return false;
      });

      return !isAbsorbed;
    });

    const mappedAbilities = baseAbilities.map((ab) => {
      const currentLvl = getAbilityLevel(ab.id, chapter);
      let updatedAb = {
        ...ab,
        level: currentLvl,
      };

      // Apply upgrades if unlocked at or before this chapter
      if (ab.upgrades) {
        for (const upgrade of ab.upgrades) {
          if (chapter >= upgrade.chapter) {
            updatedAb = {
              ...updatedAb,
              ...upgrade,
            };
          }
        }
      }
      return updatedAb;
    });

    // Determine dynamic group ordering based on highest ability level within each target group
    const groupMaxLevels = {};
    mappedAbilities.forEach((ab) => {
      const target = ab.target || "none";
      const currentMax = groupMaxLevels[target] ?? 0;
      groupMaxLevels[target] = Math.max(currentMax, ab.level);
    });
    // Create an ordering map where groups with higher max levels come first
    const dynamicGroupOrder = Object.entries(groupMaxLevels)
      .sort(([, maxA], [, maxB]) => maxB - maxA)
      .map(([target]) => target);

    // Helper to get the order index of a target; defaults to a high index for unknown groups
    const getGroupOrderIndex = (target) => {
      const idx = dynamicGroupOrder.indexOf(target);
      return idx === -1 ? dynamicGroupOrder.length : idx;
    };

    localAbilities = mappedAbilities.sort((a, b) => {
      const orderA = getGroupOrderIndex(a.target || "none");
      const orderB = getGroupOrderIndex(b.target || "none");
      if (orderA !== orderB) {
        return orderA - orderB; // lower index = higher priority group
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
      passive_digestion: `+${d.passiveVal} bio/h`,
      mass_expansion: `+${d.massVal} bio/h`,
      instinctive_perception: `+${m.perceptionVal} mana`,
      partial_division: `+${d.cloneVal} bio/h`,
      memory_resonance: `+${m.resonanceVal} mana`,
      magic_core: `+${Math.round(m.multipliedSum * (m.coreMult - 1) * 100) / 100} mana`,
      chemosensory_aptitude: `+${m.sensoryVal} mana`,
      pigmentation_mimicry: `+${Math.round((s.final - s.viscousVal) * 100) / 100} m/s`,
      pack_instinct: `+${d.packVal} bio/h`,
      magic_harmonizer: `+${Math.round((m.multipliedSum - m.additiveSum) * 100) / 100} mana`,
      monocular_vision: `+${s.monocularVal.toFixed(2)} m/s`,
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
  <div class="hologram-panel side-panel">
    <div class="panel-header">
      <h3 class="hologram-glow-text">CHARACTER SHEET</h3>
    </div>

    <div class="character-identity">
      <div class="character-avatar">
        <img
          src="halon-avatar.png"
          alt="Halon Avatar"
          class="avatar-img"
        />
        <div class="avatar-glow"></div>
      </div>
      <h2>{character.name}</h2>
      <p class="subtitle">
        Race: {character.race} ({character.raceBase || "Common"}) | Class: {character.class}
        ({character.classBase || "Common"}) | Lv: {activeLvl}
      </p>
    </div>

    <div class="stats-comparison">
      {#each Object.keys(character.baseStats) as stat}
        <div class="stat-row">
          <span class="stat-name">
            {#if stat === "speed"}
              SPEED
            {:else if stat === "digestion"}
              DIGESTION
            {:else}
              {stat.toUpperCase()}
            {/if}
          </span>
          <span class="stat-final buffed">
            {finalStats[stat]}
            {#if stat === "speed"}
              m/s{:else if stat === "digestion"}
              bio/h{/if}
          </span>
        </div>
      {/each}

      <!-- Combat Intensity Toggle for Hemolymphatic Tissue active combat digestion -->
      <div class="combat-intensity-toggle">
        <label class="combat-toggle-label">
          <input type="checkbox" bind:checked={combatActive} />
          <span class="toggle-text">Active Combat</span>
        </label>
      </div>
    </div>
  </div>

  <!-- Abilities Pipeline Editor / Visual graphs -->
  <div class="hologram-panel main-panel">
    <div class="panel-header">
      <div class="tab-selector">
        <button
          class="tab-btn {activeTab === 'pipeline' ? 'active' : ''}"
          on:click={() => (activeTab = "pipeline")}
        >
          Abilities & Evolutions
        </button>
        <button
          class="tab-btn {activeTab === 'digestion' ? 'active' : ''}"
          on:click={() => (activeTab = "digestion")}
        >
          Digestion Calculator
        </button>
        <button
          class="tab-btn {activeTab === 'mana' ? 'active' : ''}"
          on:click={() => (activeTab = "mana")}
        >
          Mana Calculator
        </button>
        <button
          class="tab-btn {activeTab === 'speed' ? 'active' : ''}"
          on:click={() => (activeTab = "speed")}
        >
          Speed Calculator
        </button>
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
      <!-- Digestion Flowchart -->
      <div class="flowchart-container">
        <div class="flowchart-grid digestion-grid-vertical">
          <!-- Row 1: Enhanced Digestion Base Box (Spans 2 columns) -->
          <div class="flowchart-box-group span-cols-2">
            <div class="flowchart-group-title">Enhanced Digestion</div>
            <div class="flowchart-node">
              <span class="node-label">Base Digestion</span>
              <span class="node-value">{calcData.digestion.base} bio/h</span>
            </div>
            {#if calcData.digestion.efficientLvl > 0}
              <div class="mini-arrow">▼</div>
              <div class="flowchart-node active-buff">
                <span class="node-label"
                  >Efficient Dig (Lv {calcData.digestion.efficientLvl})</span
                >
                <span class="node-value"
                  >+{Math.round((calcData.digestion.efficientMult - 1) * 100)}%
                  Comp.</span
                >
              </div>
            {/if}
            <div class="mini-arrow">▼</div>
            <div class="flowchart-node final-subnode">
              <span class="node-label">Enhanced Base</span>
              <span class="node-value"
                >{calcData.digestion.digEnhanced} bio/h</span
              >
            </div>
          </div>

          <!-- Branching/Stepping Logic for Multipliers -->
          {#if calcData.digestion.massLvl > 0 && calcData.digestion.passiveLvl > 0}
            <!-- BOTH are active: Show double branching layout -->
            <!-- Row 2: Branching Connectors -->
            <div class="connector-cell span-cols-2">
              <svg
                viewBox="0 0 100 40"
                class="connector-svg vertical-branch-svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M 50 0 C 50 20, 25 20, 25 40"
                  fill="none"
                  stroke="var(--color-holo-primary)"
                  stroke-width="2"
                  marker-end="url(#arrow)"
                />
                <path
                  d="M 50 0 C 50 20, 75 20, 75 40"
                  fill="none"
                  stroke="var(--color-holo-primary)"
                  stroke-width="2"
                  marker-end="url(#arrow)"
                />
              </svg>
            </div>

            <!-- Row 3: Multipliers (Side by side) -->
            <div
              class="flowchart-node active-buff justify-self-end width-node"
              style="grid-column: 1;"
            >
              <span class="node-label"
                >Mass Expansion (Lv {calcData.digestion.massLvl})</span
              >
              <span class="node-value"
                >+{Math.round(calcData.digestion.massMult * 100)}% (+{calcData
                  .digestion.massVal} bio/h)</span
              >
            </div>

            <div
              class="flowchart-node active-buff justify-self-start width-node"
              style="grid-column: 2;"
            >
              <span class="node-label"
                >Passive Digestion (Lv {calcData.digestion.passiveLvl})</span
              >
              <span class="node-value"
                >+{Math.round(calcData.digestion.passiveMult * 100)}% (+{calcData
                  .digestion.passiveVal} bio/h)</span
              >
            </div>

            <!-- Row 4: Merging Connectors -->
            <div class="connector-cell span-cols-2">
              <svg
                viewBox="0 0 100 40"
                class="connector-svg vertical-merge-svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M 25 0 C 25 20, 50 20, 50 40"
                  fill="none"
                  stroke="var(--color-holo-primary)"
                  stroke-width="2"
                  marker-end="url(#arrow)"
                />
                <path
                  d="M 75 0 C 75 20, 50 20, 50 40"
                  fill="none"
                  stroke="var(--color-holo-primary)"
                  stroke-width="2"
                  marker-end="url(#arrow)"
                />
              </svg>
            </div>
          {:else if calcData.digestion.massLvl > 0}
            <!-- ONLY Mass Expansion is active: Single centered path -->
            <div class="flowchart-arrow span-cols-2">▼</div>
            <div class="flowchart-node active-buff span-cols-2 width-node">
              <span class="node-label"
                >Mass Expansion (Lv {calcData.digestion.massLvl})</span
              >
              <span class="node-value"
                >+{Math.round(calcData.digestion.massMult * 100)}% (+{calcData
                  .digestion.massVal} bio/h)</span
              >
            </div>
            <div class="flowchart-arrow span-cols-2">▼</div>
          {:else if calcData.digestion.passiveLvl > 0}
            <!-- ONLY Passive Digestion is active: Single centered path -->
            <div class="flowchart-arrow span-cols-2">▼</div>
            <div class="flowchart-node active-buff span-cols-2 width-node">
              <span class="node-label"
                >Passive Digestion (Lv {calcData.digestion.passiveLvl})</span
              >
              <span class="node-value"
                >+{Math.round(calcData.digestion.passiveMult * 100)}% (+{calcData
                  .digestion.passiveVal} bio/h)</span
              >
            </div>
            <div class="flowchart-arrow span-cols-2">▼</div>
          {:else}
            <!-- NEITHER is active: Simple arrow straight down -->
            <div class="flowchart-arrow span-cols-2">▼</div>
          {/if}

          <!-- Row 5: Neutral Sum (Spans 2 columns) -->
          <div
            class="flowchart-node card-stack span-cols-2 glow-node width-large {!combatActive
              ? 'final-node'
              : ''}"
          >
            <span class="node-label">Neutral Sum</span>
            <span class="node-value">{calcData.digestion.neutralSum} bio/h</span
            >
            {#if calcData.digestion.cloneLvl > 0 || calcData.digestion.packLvl > 0}
              <div class="mini-bonuses">
                {#if calcData.digestion.cloneLvl > 0}
                  <span class="mini-bonus-text"
                    >Clone: +{Math.round(calcData.digestion.cloneMult * 100)}%
                    (+{calcData.digestion.cloneVal})</span
                  >
                {/if}
                {#if calcData.digestion.packLvl > 0}
                  <span class="mini-bonus-text"
                    >Pack: +{Math.round(calcData.digestion.packMult * 100)}% (+{calcData
                      .digestion.packVal})</span
                  >
                {/if}
              </div>
            {/if}
          </div>

          {#if combatActive && calcData.digestion.hemoLvl > 0}
            <!-- Row 6: Connector (Spans 2 columns) -->
            <div class="flowchart-arrow span-cols-2">▼</div>

            <!-- Row 7: Hemo Multiplier (Spans 2 columns) -->
            <div class="flowchart-node active-combat span-cols-2 width-large">
              <span class="node-label"
                >Hemo Tissue (Lv {calcData.digestion.hemoLvl})</span
              >
              <span class="node-value"
                >x{calcData.digestion.hemoMult.toFixed(1)}</span
              >
            </div>

            <!-- Row 8: Connector (Spans 2 columns) -->
            <div class="flowchart-arrow span-cols-2">▼</div>

            <!-- Row 9: Battle Sum (Spans 2 columns) -->
            <div
              class="flowchart-node card-stack span-cols-2 final-node glow-node-battle width-large"
            >
              <span class="node-label">Battle Sum</span>
              <span class="node-value">{calcData.digestion.final} bio/h</span>
            </div>
          {/if}
        </div>
      </div>
    {:else if activeTab === "mana"}
      <!-- Mana Flowchart -->
      <div class="flowchart-container">
        <div class="flowchart-grid mana-grid-vertical">
          <!-- Base Mana -->
          <div class="flowchart-node width-large">
            <span class="node-label">Base Mana</span>
            <span class="node-value">{calcData.mana.base}</span>
          </div>

          <!-- Connector -->
          <div class="flowchart-arrow">▼</div>

          <!-- Additive Bonuses group box -->
          {#if calcData.mana.perceptionLvl > 0 || calcData.mana.resonanceLvl > 0 || calcData.mana.sensoryLvl > 0}
            {@const activeNodes = [
              {
                lvl: calcData.mana.perceptionLvl,
                label: `Instinctive Perc (Lv ${calcData.mana.perceptionLvl})`,
                val: `+${calcData.mana.perceptionVal}`,
              },
              {
                lvl: calcData.mana.resonanceLvl,
                label: `Memory Res (Lv ${calcData.mana.resonanceLvl})`,
                val: `+${calcData.mana.resonanceVal}`,
              },
              {
                lvl: calcData.mana.sensoryLvl,
                label: `Chemosensory Apt (Lv ${calcData.mana.sensoryLvl})`,
                val: `+${calcData.mana.sensoryVal}`,
              },
            ].filter((n) => n.lvl > 0)}
            <div class="flowchart-box-group width-large">
              <div class="flowchart-group-title">Additive Bonuses</div>

              {#each activeNodes as node, i}
                {#if i > 0}
                  <div class="mini-arrow">▼</div>
                {/if}
                <div class="flowchart-node active-buff">
                  <span class="node-label">{node.label}</span>
                  <span class="node-value">{node.val}</span>
                </div>
              {/each}
            </div>

            <!-- Connector -->
            <div class="flowchart-arrow">▼</div>
          {/if}

          <!-- Additive Sum -->
          <div class="flowchart-node glow-node width-large">
            <span class="node-label">Additive Sum</span>
            <span class="node-value">{calcData.mana.additiveSum}</span>
          </div>

          <!-- Connector -->
          <div class="flowchart-arrow">▼</div>

          {#if calcData.mana.harmonizerLvl > 0}
            <!-- Magic Harmonizer (Multiplier) -->
            <div class="flowchart-node active-buff width-large">
              <span class="node-label"
                >Magic Harmonizer (Lv {calcData.mana.harmonizerLvl})</span
              >
              <span class="node-value"
                >x{calcData.mana.harmonizerMult.toFixed(1)}</span
              >
            </div>

            <!-- Connector -->
            <div class="flowchart-arrow">▼</div>
          {/if}

          {#if calcData.mana.coreLvl > 0}
            <!-- Magic Core (Exponential) -->
            <div class="flowchart-node active-buff width-large">
              <span class="node-label"
                >Magic Core (Lv {calcData.mana.coreLvl})</span
              >
              <span class="node-value"
                >+{Math.round((calcData.mana.coreMult - 1) * 100)}% Comp.</span
              >
            </div>

            <!-- Connector -->
            <div class="flowchart-arrow">▼</div>
          {/if}

          <!-- Final Mana -->
          <div
            class="flowchart-node card-stack final-node glow-node-battle width-large"
          >
            <span class="node-label">Final Mana</span>
            <span class="node-value">{calcData.mana.final}</span>
          </div>
        </div>
      </div>
    {:else if activeTab === "speed"}
      <!-- Speed Flowchart -->
      <div class="flowchart-container">
        <div class="flowchart-grid speed-grid-vertical">
          <!-- Base Speed -->
          <div class="flowchart-node width-large">
            <span class="node-label">Base Speed</span>
            <span class="node-value">{calcData.speed.base} m/s</span>
          </div>

          <!-- Connector -->
          <div class="flowchart-arrow">▼</div>

          {#if calcData.speed.monocularLvl > 0}
            <!-- Monocular Vision (Additive) -->
            <div class="flowchart-node active-buff width-large">
              <span class="node-label"
                >Telescopic Vision (Lv {calcData.speed.monocularLvl})</span
              >
              <span class="node-value"
                >+{calcData.speed.monocularVal.toFixed(2)} m/s</span
              >
            </div>

            <!-- Connector -->
            <div class="flowchart-arrow">▼</div>
          {/if}

          <!-- Additive Sum -->
          <div class="flowchart-node glow-node width-large">
            <span class="node-label">Agility Sum</span>
            <span class="node-value"
              >{calcData.speed.additiveSum.toFixed(2)} m/s</span
            >
          </div>

          <!-- Connector -->
          <div class="flowchart-arrow">▼</div>

          {#if calcData.speed.viscousLvl > 0}
            <!-- Viscous Flow (Compounded Multiplier) -->
            <div class="flowchart-node active-buff width-large">
              <span class="node-label"
                >Viscous Flow (Lv {calcData.speed.viscousLvl})</span
              >
              <span class="node-value"
                >+{Math.round((calcData.speed.viscousMult - 1) * 100)}% Comp. ({calcData.speed.viscousVal.toFixed(
                  2,
                )} m/s)</span
              >
            </div>

            <!-- Connector -->
            <div class="flowchart-arrow">▼</div>
          {/if}

          {#if calcData.speed.mimicryLvl > 0}
            <!-- Pigmentation Mimicry (Camouflage Multiplier) -->
            <div class="flowchart-node active-buff width-large">
              <span class="node-label"
                >Camouflage (Lv {calcData.speed.mimicryLvl})</span
              >
              <span class="node-value"
                >x{calcData.speed.mimicryMult.toFixed(2)}</span
              >
            </div>

            <!-- Connector -->
            <div class="flowchart-arrow">▼</div>
          {/if}

          <!-- Final Speed -->
          <div
            class="flowchart-node card-stack final-node glow-node-battle width-large"
          >
            <span class="node-label">Final Speed</span>
            <span class="node-value">{calcData.speed.final.toFixed(2)} m/s</span
            >
          </div>
        </div>
      </div>
    {/if}
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

  .stat-row {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    font-size: 0.95rem;
    padding: 6px 0;
    border-bottom: 1px dashed rgba(255, 255, 255, 0.05);
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
    align-items: flex-start;
    gap: 8px;
  }

  .title-badges {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
    flex-wrap: wrap;
    justify-content: flex-end;
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
    white-space: nowrap;
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

  /* Tab selection styling */
  .tab-selector {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .tab-btn {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--color-holo-muted);
    font-family: var(--font-sans);
    padding: 6px 14px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: 600;
    transition: var(--transition-smooth);
  }

  .tab-btn:hover {
    border-color: var(--color-holo-border);
    color: var(--color-holo-primary);
  }

  .tab-btn.active {
    background: rgba(0, 240, 255, 0.08);
    border-color: var(--color-holo-primary);
    color: var(--color-holo-primary);
    text-shadow: 0 0 5px var(--color-holo-glow);
  }
</style>
