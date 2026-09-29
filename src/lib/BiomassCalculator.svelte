<script>
  import {
    currentChapter,
    activeChapterDetails,
    characterData,
    getAbilitiesForChapter
  } from "./store.js";
  import { runCalculation } from "./calc.js";
  import {
    calculateBiomassCost,
    getAvailableBiomassSkills,
    getAbilityLevelAtChapter,
    estimateDigestionTime,
    calculatePortfolioCost,
    LEVEL_11_BIOMASS_UNIT_SCALE
  } from "./biomassCalc.js";
  import {
    Sparkles,
    AlertTriangle,
    CheckCircle2,
    TrendingUp,
    Clock,
    Zap,
    RotateCcw,
    Layers,
    Sliders,
    Swords,
    Moon,
    ArrowRight,
    Plus,
    Minus,
    BookOpen,
    HelpCircle,
    Info,
    Trash2,
    ListPlus
  } from "lucide-svelte";

  // Active Chapter Store Subscription
  let chapter = 1;
  let chapterDetails = { halonLvl: 1, reqExp: 100 };
  currentChapter.subscribe((val) => {
    chapter = val;
  });
  activeChapterDetails.subscribe((val) => {
    chapterDetails = val || { halonLvl: 1, reqExp: 100 };
  });

  // Active View Tab
  let activeTab = "single"; // 'single' | 'planner'

  // Single Skill Calculator State
  let selectedSkillId = "magic_core";
  let levelsToAdd = 1;

  // Available skills unlocked at or before current chapter
  $: availableSkills = getAvailableBiomassSkills(chapter);

  // Fallback to first available skill if selected becomes invalid
  $: {
    if (availableSkills.length > 0 && !availableSkills.some((s) => s.id === selectedSkillId)) {
      selectedSkillId = availableSkills[0].id;
    }
  }

  // Halon's current level for the selected ability at this chapter
  $: currentSkillLevel = Math.max(1, getAbilityLevelAtChapter(selectedSkillId, chapter) || 1);
  $: targetSkillLevel = currentSkillLevel + Math.max(1, levelsToAdd);

  function setLevelsToAdd(delta) {
    levelsToAdd = Math.max(1, Math.min(100 - currentSkillLevel, delta));
  }

  // Calculate Single Skill Upgrade Cost starting from Current Level
  $: singleResult = availableSkills.length
    ? calculateBiomassCost({
        skillId: selectedSkillId,
        startLevel: currentSkillLevel,
        targetLevel: targetSkillLevel,
        characterLevel: chapterDetails.halonLvl || 1,
        chapter: chapter
      })
    : null;

  // Digestion Rates at Current Chapter
  $: mappedAbilities = getAbilitiesForChapter(chapter);
  $: neutralCalc = runCalculation(
    characterData.baseStats,
    mappedAbilities,
    chapterDetails.halonLvl || 1,
    false,
    chapter
  );
  $: combatCalc = runCalculation(
    characterData.baseStats,
    mappedAbilities,
    chapterDetails.halonLvl || 1,
    true,
    chapter
  );

  $: neutralRate = neutralCalc?.digestion?.final || 1.8;
  $: combatRate = combatCalc?.digestion?.final || neutralRate;
  $: passiveRate = neutralCalc?.digestion?.passiveVal || 0;

  // Digestion Time Estimations
  $: singleTimeEstimate = singleResult
    ? estimateDigestionTime(
        singleResult.total,
        neutralRate,
        passiveRate,
        singleResult.isRefined
      )
    : null;
  $: singleCombatTimeEstimate = singleResult
    ? estimateDigestionTime(
        singleResult.total,
        combatRate,
        0,
        singleResult.isRefined
      )
    : null;

  // =========================================================================
  // Multi-Ability Planner State
  // =========================================================================
  /** @type {Array<{ id: string, levelsToAdd: number }>} */
  let plannedAbilities = [];
  let plannerSelectedSkillId = "";
  let plannerInitialLevels = 1;

  // Available skills not yet in the planner
  $: unaddedSkills = availableSkills.filter(
    (skill) => !plannedAbilities.some((p) => p.id === skill.id)
  );

  // Keep plannerSelectedSkillId valid
  $: {
    if (unaddedSkills.length > 0 && !unaddedSkills.some((s) => s.id === plannerSelectedSkillId)) {
      plannerSelectedSkillId = unaddedSkills[0].id;
    }
  }

  function addAbilityToPlan() {
    const idToAdd = plannerSelectedSkillId || (unaddedSkills.length > 0 ? unaddedSkills[0].id : "");
    if (!idToAdd) return;
    if (!plannedAbilities.some((p) => p.id === idToAdd)) {
      plannedAbilities = [
        ...plannedAbilities,
        { id: idToAdd, levelsToAdd: Math.max(1, plannerInitialLevels || 1) }
      ];
      plannerInitialLevels = 1;
    }
  }

  function removeAbilityFromPlan(skillId) {
    plannedAbilities = plannedAbilities.filter((p) => p.id !== skillId);
  }

  function updatePlannedLevels(skillId, count) {
    const val = Math.max(1, Math.min(100, Number.parseInt(String(count), 10) || 1));
    plannedAbilities = plannedAbilities.map((p) =>
      p.id === skillId ? { ...p, levelsToAdd: val } : p
    );
  }

  function adjustPlannedLevels(skillId, delta) {
    plannedAbilities = plannedAbilities.map((p) => {
      if (p.id === skillId) {
        const cur = Math.max(1, getAbilityLevelAtChapter(p.id, chapter) || 1);
        const nextVal = Math.max(1, Math.min(100 - cur, p.levelsToAdd + delta));
        return { ...p, levelsToAdd: nextVal };
      }
      return p;
    });
  }

  function clearAllPlanned() {
    plannedAbilities = [];
  }

  // Calculate costs for each planned ability from current level to requested level
  $: plannedItemsCalculated = plannedAbilities.map((item) => {
    const skill = availableSkills.find((s) => s.id === item.id) || { id: item.id, name: item.id, chapter: 1 };
    const start = Math.max(1, getAbilityLevelAtChapter(item.id, chapter) || 1);
    const target = start + Math.max(1, item.levelsToAdd);
    let calc = null;
    try {
      calc = calculateBiomassCost({
        skillId: item.id,
        startLevel: start,
        targetLevel: target,
        characterLevel: chapterDetails.halonLvl || 1,
        chapter: chapter
      });
    } catch {
      calc = null;
    }
    return {
      id: item.id,
      skill,
      startLevel: start,
      targetLevel: target,
      levelsAdded: item.levelsToAdd,
      calc
    };
  });

  $: portfolioResult = calculatePortfolioCost({
    upgrades: plannedItemsCalculated.map((p) => ({
      skillId: p.id,
      startLevel: p.startLevel,
      targetLevel: p.targetLevel
    })),
    characterLevel: chapterDetails.halonLvl || 1,
    chapter: chapter
  });

  $: portfolioTimeEstimate = estimateDigestionTime(
    portfolioResult.total,
    neutralRate,
    passiveRate,
    portfolioResult.isRefined
  );
  $: portfolioCombatTimeEstimate = estimateDigestionTime(
    portfolioResult.total,
    combatRate,
    0,
    portfolioResult.isRefined
  );

  function getTargetStatBadgeClass(target) {
    switch (target) {
      case "digestion":
        return "badge-digestion";
      case "mana":
        return "badge-mana";
      case "speed":
        return "badge-speed";
      default:
        return "badge-other";
    }
  }
</script>

<div class="biomass-calc-container hologram-panel">
  <!-- Top Navigation & Header -->
  <div class="panel-header">
    <div class="header-title">
      <div class="title-icon-box">
        <Sparkles size={18} class="header-icon" />
      </div>
      <div>
        <h3 class="hologram-glow-text">BIOMASS UPGRADE CALCULATOR</h3>
        <span class="header-subtext">
          CHAPTER {chapter} · HALON LV {chapterDetails.halonLvl || 1} · {neutralRate.toLocaleString()} BM/H DIGESTION
        </span>
      </div>
    </div>
  </div>

  <!-- Sub-View Navigation Tabs -->
  <div class="sub-nav-tabs">
    <button
      class="sub-tab {activeTab === 'single' ? 'active' : ''}"
      on:click={() => (activeTab = "single")}
      id="tab-single-skill"
    >
      <Sliders size={15} />
      <span>Single Ability Upgrade</span>
    </button>
    <button
      class="sub-tab {activeTab === 'planner' ? 'active' : ''}"
      on:click={() => (activeTab = "planner")}
      id="tab-portfolio-planner"
    >
      <Layers size={15} />
      <span>Multi-Ability Planner ({plannedAbilities.length})</span>
    </button>
  </div>

  <div class="calculator-body">
    <!-- ========================================================================= -->
    <!-- TAB 1: SINGLE ABILITY UPGRADE CALCULATOR                                  -->
    <!-- ========================================================================= -->
    {#if activeTab === "single"}
      <div class="single-view-grid">
        <!-- Configuration Card -->
        <div class="config-card">
          <div class="card-header">
            <Sliders size={15} class="holo-cyan" />
            <span class="card-title">SELECT ABILITY & LEVELS TO UPGRADE</span>
          </div>

          <div class="config-fields">
            <!-- Ability Selection -->
            <div class="config-row">
              <div class="label-with-meta">
                <label for="biomass-skill">CHOOSE ABILITY</label>
                <span class="skill-count-meta">{availableSkills.length} Unlocked at Ch. {chapter}</span>
              </div>
              <select id="biomass-skill" bind:value={selectedSkillId}>
                {#each availableSkills as skill}
                  <option value={skill.id}>
                    {skill.name} (Unlocked Ch. {skill.chapter})
                  </option>
                {/each}
              </select>
            </div>

            <!-- Current Level Box (Locked Starting Point) -->
            <div class="current-level-card">
              <div class="current-level-left">
                <span class="card-mini-label">STARTING FROM CURRENT LEVEL:</span>
                <span class="current-lvl-display">Level {currentSkillLevel}</span>
              </div>
              <div class="current-level-right">
                <span class="synced-pill">Synced to Ch. {chapter}</span>
              </div>
            </div>

            <!-- How Many Levels to Upgrade -->
            <div class="levels-to-add-card">
              <label for="levels-add-input">HOW MANY LEVELS TO UPGRADE?</label>
              <div class="level-stepper-row">
                <div class="stepper-input large">
                  <button
                    class="step-btn"
                    on:click={() => setLevelsToAdd(levelsToAdd - 1)}
                    disabled={levelsToAdd <= 1}>-</button
                  >
                  <input
                    id="levels-add-input"
                    type="number"
                    bind:value={levelsToAdd}
                    on:input={(e) => setLevelsToAdd(Number.parseInt(e.currentTarget.value, 10) || 1)}
                    min="1"
                    max={Math.max(1, 100 - currentSkillLevel)}
                  />
                  <button
                    class="step-btn"
                    on:click={() => setLevelsToAdd(levelsToAdd + 1)}
                    disabled={targetSkillLevel >= 100}>+</button
                  >
                </div>

                <div class="target-summary-pill">
                  <span class="target-pill-label">RESULTING TARGET:</span>
                  <span class="target-pill-val">Level {targetSkillLevel}</span>
                </div>
              </div>

              <!-- Quick Level Presets -->
              <div class="quick-preset-buttons">
                <button class="preset-btn {levelsToAdd === 1 ? 'active' : ''}" on:click={() => setLevelsToAdd(1)}>
                  +1 Level
                </button>
                <button class="preset-btn {levelsToAdd === 2 ? 'active' : ''}" on:click={() => setLevelsToAdd(2)}>
                  +2 Levels
                </button>
                <button class="preset-btn {levelsToAdd === 5 ? 'active' : ''}" on:click={() => setLevelsToAdd(5)}>
                  +5 Levels
                </button>
                <button class="preset-btn {levelsToAdd === 10 ? 'active' : ''}" on:click={() => setLevelsToAdd(10)}>
                  +10 Levels
                </button>
                <button class="preset-btn {levelsToAdd === 20 ? 'active' : ''}" on:click={() => setLevelsToAdd(20)}>
                  +20 Levels
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Result Card -->
        {#if singleResult}
          <div class="output-card">
            <div class="card-header">
              <Zap size={15} class="holo-orange" />
              <span class="card-title">TOTAL UPGRADE COST</span>
            </div>

            <!-- Cost Summary Banner -->
            <div class="cost-summary-box">
              <div class="cost-summary-left">
                <div class="skill-name-row">
                  <span class="result-skill-name">{singleResult.skill.name}</span>
                  {#if singleResult.skill.ability?.target}
                    <span class="stat-target-badge {getTargetStatBadgeClass(singleResult.skill.ability.target)}">
                      {singleResult.skill.ability.target.toUpperCase()}
                    </span>
                  {/if}
                </div>
                <span class="result-level-range">
                  Level {singleResult.startLevel} &rarr; Level {singleResult.targetLevel}
                  <span class="delta-tag">+{levelsToAdd} {levelsToAdd === 1 ? 'Level' : 'Levels'}</span>
                </span>
              </div>

              <div class="cost-summary-right">
                <span class="cost-amount-label">REQUIRED BIOMASS</span>
                <div class="cost-display">
                  <span class="cost-number">{singleResult.total.toLocaleString()}</span>
                  <span class="cost-unit">{singleResult.unit}</span>
                </div>
              </div>
            </div>

            <!-- Digestion Time Estimator -->
            {#if singleTimeEstimate}
              <div class="digestion-time-panel">
                <div class="time-panel-header">
                  <Clock size={14} />
                  <span>TIME TO ACCUMULATE AT CH. {chapter} DIGESTION SPEED</span>
                </div>
                <div class="time-metrics-grid">
                  <div class="time-metric">
                    <div class="metric-top">
                      <Zap size={13} class="holo-cyan" />
                      <span class="metric-label">ACTIVE DIGESTION</span>
                    </div>
                    <span class="metric-value">{singleTimeEstimate.activeFormatted}</span>
                    <span class="metric-sub">{neutralRate.toLocaleString()} BM/h</span>
                  </div>

                  <div class="time-metric">
                    <div class="metric-top">
                      <Swords size={13} class="holo-fire" />
                      <span class="metric-label">COMBAT BURST</span>
                    </div>
                    <span class="metric-value">{singleCombatTimeEstimate?.activeFormatted || "N/A"}</span>
                    <span class="metric-sub">{combatRate.toLocaleString()} BM/h</span>
                  </div>

                  <div class="time-metric">
                    <div class="metric-top">
                      <Moon size={13} class="holo-purple" />
                      <span class="metric-label">PASSIVE REST</span>
                    </div>
                    <span class="metric-value">{singleTimeEstimate.passiveFormatted}</span>
                    <span class="metric-sub">
                      {passiveRate > 0 ? `${passiveRate.toLocaleString()} BM/h` : "Not unlocked"}
                    </span>
                  </div>
                </div>
              </div>
            {/if}

            <!-- Step by Step Math Segments -->
            <div class="segments-section">
              <span class="segments-title">PROGRESSION BREAKDOWN</span>
              <div class="segments-list">
                {#each singleResult.segments as segment}
                  <div class="segment-card">
                    <div class="segment-left">
                      <span class="segment-span">
                        Lv {segment.from} &rarr; Lv {segment.to}
                      </span>
                      <span class="segment-unit">
                        {singleResult.isRefined
                          ? `Condensed Refined Units (Character Lv ${chapterDetails.halonLvl || 11}+)`
                          : `Standard Pre-Refinement Units (Character Lv ${chapterDetails.halonLvl || 1})`}
                      </span>
                    </div>

                    <div class="segment-right">
                      <span class="segment-cost">
                        {segment.cost.toLocaleString()} {segment.unit}
                      </span>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        {/if}
      </div>

    <!-- ========================================================================= -->
    <!-- TAB 2: MULTI-ABILITY UPGRADE PLANNER (Pick & Add Abilities)               -->
    <!-- ========================================================================= -->
    {:else if activeTab === "planner"}
      <div class="planner-view">
        <!-- Add Ability to Plan Bar -->
        <div class="planner-add-card">
          <div class="planner-add-header">
            <ListPlus size={16} class="holo-cyan" />
            <span class="planner-add-title">ADD ABILITY TO UPGRADE PLAN</span>
          </div>

          <div class="planner-add-controls">
            <div class="planner-select-box">
              <label for="planner-ability-select">SELECT ABILITY</label>
              <select
                id="planner-ability-select"
                bind:value={plannerSelectedSkillId}
                disabled={unaddedSkills.length === 0}
              >
                {#if unaddedSkills.length === 0}
                  <option value="">All available abilities added to plan</option>
                {:else}
                  {#each unaddedSkills as skill}
                    {@const curLvl = Math.max(1, getAbilityLevelAtChapter(skill.id, chapter) || 1)}
                    <option value={skill.id}>
                      {skill.name} (Current: Lv {curLvl})
                    </option>
                  {/each}
                {/if}
              </select>
            </div>

            <div class="planner-levels-box">
              <label for="planner-initial-levels">ADD LEVELS</label>
              <div class="stepper-input">
                <button
                  class="step-btn"
                  on:click={() => (plannerInitialLevels = Math.max(1, plannerInitialLevels - 1))}
                  disabled={plannerInitialLevels <= 1}>-</button
                >
                <input
                  id="planner-initial-levels"
                  type="number"
                  bind:value={plannerInitialLevels}
                  min="1"
                  max="100"
                />
                <button
                  class="step-btn"
                  on:click={() => (plannerInitialLevels = Math.max(1, plannerInitialLevels + 1))}
                  >+</button
                >
              </div>
            </div>

            <div class="planner-add-btn-box">
              <button
                class="planner-add-btn"
                on:click={addAbilityToPlan}
                disabled={unaddedSkills.length === 0}
                id="add-ability-plan-btn"
              >
                <Plus size={15} />
                <span>Add to Plan</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Planned Abilities List -->
        <div class="planned-list-container">
          <div class="planned-list-header">
            <span class="planned-header-title">
              PLANNED ABILITIES ({plannedItemsCalculated.length})
            </span>
            {#if plannedItemsCalculated.length > 0}
              <button class="clear-plan-btn" on:click={clearAllPlanned}>
                <Trash2 size={13} />
                <span>Clear All</span>
              </button>
            {/if}
          </div>

          {#if plannedItemsCalculated.length === 0}
            <div class="empty-plan-card">
              <ListPlus size={32} class="empty-icon" />
              <span class="empty-title">No Abilities Added Yet</span>
              <p class="empty-subtext">
                Select an ability from the dropdown above and click <strong>"Add to Plan"</strong> to calculate multi-ability upgrade costs.
              </p>
            </div>
          {:else}
            <div class="planned-cards-stack">
              {#each plannedItemsCalculated as item}
                <div class="planned-item-card">
                  <!-- Left Info -->
                  <div class="planned-item-left">
                    <div class="planned-item-title-row">
                      <span class="planned-skill-name">{item.skill.name}</span>
                      {#if item.skill.ability?.target}
                        <span class="stat-target-badge {getTargetStatBadgeClass(item.skill.ability.target)}">
                          {item.skill.ability.target.toUpperCase()}
                        </span>
                      {/if}
                    </div>
                    <span class="planned-range-text">
                      Starting Lv <strong>{item.startLevel}</strong> &rarr; Target Lv <strong>{item.targetLevel}</strong>
                    </span>
                  </div>

                  <!-- Center Controls: Add Levels Stepper -->
                  <div class="planned-item-center">
                    <span class="stepper-label">LEVELS TO ADD:</span>
                    <div class="stepper-input">
                      <button
                        class="step-btn"
                        on:click={() => adjustPlannedLevels(item.id, -1)}
                        disabled={item.levelsAdded <= 1}>-</button
                      >
                      <input
                        type="number"
                        bind:value={item.levelsAdded}
                        on:input={(e) => updatePlannedLevels(item.id, e.currentTarget.value)}
                        min="1"
                        max="100"
                      />
                      <button
                        class="step-btn"
                        on:click={() => adjustPlannedLevels(item.id, 1)}
                        disabled={item.targetLevel >= 100}>+</button
                      >
                    </div>
                  </div>

                  <!-- Right Cost Breakdown & Remove Button -->
                  <div class="planned-item-right">
                    <div class="planned-cost-display">
                      <span class="cost-label">UPGRADE COST:</span>
                      <div class="cost-val-box">
                        <span class="planned-cost-number">
                          {item.calc ? item.calc.total.toLocaleString() : "0"}
                        </span>
                        <span class="planned-cost-unit">
                          {item.calc ? item.calc.unit : (portfolioResult.isRefined ? "Refined BM" : "BM")}
                        </span>
                      </div>
                    </div>

                    <button
                      class="remove-item-btn"
                      on:click={() => removeAbilityFromPlan(item.id)}
                      title="Remove ability from plan"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              {/each}
            </div>
          {/if}
        </div>

        <!-- Combined Total Summary Card -->
        {#if plannedItemsCalculated.length > 0}
          <div class="planner-summary-card">
            <div class="planner-summary-header">
              <div class="summary-title-row">
                <Zap size={16} class="holo-cyan" />
                <span>TOTAL COMBINED BIOMASS REQUIRED</span>
              </div>
            </div>

            <div class="planner-metrics-grid">
              <div class="planner-metric-box">
                <span class="metric-box-label">ABILITIES UPGRADING</span>
                <span class="metric-box-val">{plannedItemsCalculated.length} Selected</span>
              </div>

              <div class="planner-metric-box">
                <span class="metric-box-label">TOTAL LEVELS ADDED</span>
                <span class="metric-box-val">+{plannedItemsCalculated.reduce((sum, p) => sum + p.levelsAdded, 0)} Levels</span>
              </div>

              <div class="planner-metric-box">
                <span class="metric-box-label">STORAGE CONDENSATION</span>
                <span class="metric-box-val">
                  {portfolioResult.isRefined ? "Refined (1:1,000)" : "Standard Pre-11"}
                </span>
              </div>

              <div class="planner-metric-box highlight">
                <span class="metric-box-label">TOTAL BIOMASS REQUIRED</span>
                <span class="metric-box-val neon-cyan">
                  {portfolioResult.total.toLocaleString()} {portfolioResult.unit}
                </span>
              </div>
            </div>

            <div class="portfolio-time-strip">
              <Clock size={15} class="holo-orange" />
              <span>
                TOTAL ESTIMATED ACCUMULATION TIME: <strong>{portfolioTimeEstimate.activeFormatted}</strong> Active
                ({neutralRate.toLocaleString()} BM/h) · <strong>{portfolioCombatTimeEstimate.activeFormatted}</strong> Combat
                {#if passiveRate > 0}
                  · <strong>{portfolioTimeEstimate.passiveFormatted}</strong> Passive Rest
                {/if}
              </span>
            </div>
          </div>
        {/if}
      </div>
    {/if}

    <!-- Refinement Lore Info Footer -->
    <div class="refinement-info-card">
      <div class="refinement-header">
        <Info size={15} class="holo-cyan" />
        <span>ABOUT BIOMASS CONDENSATION & LEVEL 11 CHARACTER REFINEMENT</span>
      </div>
      <p class="refinement-desc">
        When Halon reaches Character Level 11 (Chapter 201+ / Mythic Slime evolution), all stored biomass condenses at a
        <strong>1,000 Standard BM &rarr; 1 Refined BM</strong> ratio.
        Consequently, all upgrade costs and biomass balances in Chapter 201+ are scaled and paid in Refined Units, with zero mixed-unit splits.
      </p>
    </div>
  </div>
</div>

<style>
  .biomass-calc-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
    border-radius: 12px;
    background: rgba(10, 16, 26, 0.85);
    border: 1px solid var(--color-holo-border);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    overflow: hidden;
  }

  /* Header */
  .panel-header {
    border-bottom: 1px solid var(--color-holo-border);
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    background: linear-gradient(180deg, rgba(0, 240, 255, 0.05) 0%, transparent 100%);
  }

  .header-title {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .title-icon-box {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: rgba(0, 240, 255, 0.1);
    border: 1px solid rgba(0, 240, 255, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-holo-primary);
    box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
  }

  .header-title h3 {
    font-size: 0.95rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    margin: 0;
    color: #fff;
  }

  .header-subtext {
    font-size: 0.68rem;
    font-weight: 700;
    color: var(--color-holo-muted);
    letter-spacing: 0.06em;
    font-family: var(--font-sans);
  }

  .header-controls {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  /* Mode Switcher */
  /* Sub Tabs */
  .sub-nav-tabs {
    display: flex;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    background: rgba(5, 8, 14, 0.5);
    padding: 0 16px;
    gap: 4px;
  }

  .sub-tab {
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    color: var(--color-holo-muted);
    padding: 10px 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 0.78rem;
    transition: all 0.2s;
  }

  .sub-tab:hover {
    color: #fff;
  }

  .sub-tab.active {
    color: var(--color-holo-primary);
    border-bottom-color: var(--color-holo-primary);
    background: rgba(0, 240, 255, 0.03);
  }

  .calculator-body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /* Single View Layout */
  .single-view-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 18px;
  }

  @media (min-width: 900px) {
    .single-view-grid {
      grid-template-columns: 1fr 1.2fr;
      align-items: start;
    }
  }

  .config-card,
  .output-card {
    background: rgba(13, 20, 32, 0.6);
    border: 1px solid rgba(0, 240, 255, 0.12);
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .card-title {
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: #cbd5e1;
  }

  .config-fields {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .config-row {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .label-with-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .config-row label,
  .levels-to-add-card label,
  .planner-select-box label,
  .planner-levels-box label {
    font-size: 0.68rem;
    font-weight: 800;
    color: var(--color-holo-muted);
    letter-spacing: 0.05em;
  }

  .skill-count-meta {
    font-size: 0.65rem;
    color: var(--color-holo-primary);
    font-weight: 700;
  }

  .config-row select,
  .planner-select-box select {
    background: #090d16;
    border: 1px solid var(--color-holo-border);
    color: #fff;
    padding: 10px 12px;
    border-radius: 6px;
    outline: none;
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 0.85rem;
    cursor: pointer;
  }

  .config-row select:focus,
  .planner-select-box select:focus {
    border-color: var(--color-holo-primary);
    box-shadow: 0 0 8px rgba(0, 240, 255, 0.3);
  }

  /* Current Level Card */
  .current-level-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(0, 240, 255, 0.04);
    border: 1px solid rgba(0, 240, 255, 0.2);
    padding: 12px 14px;
    border-radius: 6px;
  }

  .current-level-left {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .card-mini-label {
    font-size: 0.62rem;
    font-weight: 800;
    color: var(--color-holo-muted);
    letter-spacing: 0.05em;
  }

  .current-lvl-display {
    font-size: 1.1rem;
    font-weight: 900;
    color: #fff;
    font-family: var(--font-sans);
  }

  .synced-pill {
    background: rgba(0, 240, 255, 0.12);
    border: 1px solid rgba(0, 240, 255, 0.3);
    color: var(--color-holo-primary);
    font-size: 0.65rem;
    font-weight: 800;
    padding: 3px 8px;
    border-radius: 12px;
  }

  /* Levels to Add Card */
  .levels-to-add-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 6px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .level-stepper-row {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .stepper-input {
    display: flex;
    align-items: center;
    background: #090d16;
    border: 1px solid var(--color-holo-border);
    border-radius: 6px;
    overflow: hidden;
  }

  .stepper-input.large {
    width: 130px;
  }

  .step-btn {
    background: rgba(255, 255, 255, 0.05);
    border: none;
    color: #fff;
    width: 36px;
    height: 36px;
    cursor: pointer;
    font-weight: 800;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s;
  }

  .step-btn:hover:not(:disabled) {
    background: rgba(0, 240, 255, 0.2);
    color: var(--color-holo-primary);
  }

  .step-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .stepper-input input {
    background: transparent;
    border: none;
    color: #fff;
    text-align: center;
    width: 100%;
    font-family: var(--font-sans);
    font-weight: 800;
    font-size: 0.95rem;
    outline: none;
  }

  .target-summary-pill {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(0, 240, 255, 0.08);
    border: 1px solid rgba(0, 240, 255, 0.25);
    padding: 8px 12px;
    border-radius: 6px;
  }

  .target-pill-label {
    font-size: 0.65rem;
    font-weight: 700;
    color: var(--color-holo-muted);
  }

  .target-pill-val {
    font-size: 0.95rem;
    font-weight: 900;
    color: var(--color-holo-primary);
    font-family: var(--font-sans);
  }

  .quick-preset-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .preset-btn {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #cbd5e1;
    padding: 6px 10px;
    border-radius: 4px;
    font-size: 0.68rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
  }

  .preset-btn:hover {
    background: rgba(0, 240, 255, 0.1);
    border-color: rgba(0, 240, 255, 0.3);
    color: #fff;
  }

  .preset-btn.active {
    background: rgba(0, 240, 255, 0.18);
    border-color: var(--color-holo-primary);
    color: var(--color-holo-primary);
  }

  .preset-btn.milestone {
    background: rgba(0, 240, 255, 0.1);
    border-color: var(--color-holo-primary);
    color: var(--color-holo-primary);
  }

  /* Output Card */
  .cost-summary-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(0, 240, 255, 0.03);
    border: 1px solid rgba(0, 240, 255, 0.2);
    border-radius: 8px;
    padding: 16px;
    gap: 16px;
    flex-wrap: wrap;
  }

  .skill-name-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .result-skill-name {
    font-size: 1.05rem;
    font-weight: 800;
    color: #fff;
  }

  .stat-target-badge {
    font-size: 0.58rem;
    font-weight: 800;
    padding: 2px 6px;
    border-radius: 3px;
    letter-spacing: 0.05em;
  }

  .badge-digestion {
    background: rgba(0, 240, 255, 0.15);
    color: #00f0ff;
    border: 1px solid rgba(0, 240, 255, 0.3);
  }

  .badge-mana {
    background: rgba(168, 85, 247, 0.15);
    color: #c084fc;
    border: 1px solid rgba(168, 85, 247, 0.3);
  }

  .badge-speed {
    background: rgba(34, 197, 94, 0.15);
    color: #4ade80;
    border: 1px solid rgba(34, 197, 94, 0.3);
  }

  .badge-other {
    background: rgba(255, 255, 255, 0.08);
    color: #94a3b8;
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  .result-level-range {
    font-size: 0.74rem;
    color: var(--color-holo-muted);
    font-weight: 700;
    margin-top: 4px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .delta-tag {
    color: var(--color-holo-primary);
    font-weight: 800;
  }

  .cost-summary-right {
    text-align: right;
  }

  .cost-amount-label {
    font-size: 0.62rem;
    font-weight: 800;
    color: var(--color-holo-muted);
    letter-spacing: 0.05em;
    display: block;
  }

  .cost-display {
    display: flex;
    align-items: baseline;
    gap: 6px;
    justify-content: flex-end;
  }

  .cost-number {
    font-size: 1.6rem;
    font-weight: 900;
    color: var(--color-holo-primary);
    text-shadow: 0 0 12px var(--color-holo-glow);
    font-family: var(--font-sans);
  }

  .cost-unit {
    font-size: 0.8rem;
    font-weight: 800;
    color: #cbd5e1;
  }

  /* Digestion Time Panel */
  .digestion-time-panel {
    background: rgba(7, 12, 20, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 8px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .time-panel-header {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.65rem;
    font-weight: 800;
    color: var(--color-holo-muted);
    letter-spacing: 0.05em;
  }

  .time-metrics-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .time-metric {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.04);
    border-radius: 6px;
    padding: 8px 10px;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .metric-top {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .metric-label {
    font-size: 0.58rem;
    font-weight: 800;
    color: var(--color-holo-muted);
    letter-spacing: 0.04em;
  }

  .metric-value {
    font-size: 0.95rem;
    font-weight: 800;
    color: #fff;
    font-family: var(--font-sans);
  }

  .metric-sub {
    font-size: 0.58rem;
    color: #64748b;
    font-weight: 700;
  }

  /* Segments */
  .segments-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .segments-title {
    font-size: 0.66rem;
    font-weight: 800;
    color: var(--color-holo-muted);
    letter-spacing: 0.05em;
  }

  .segments-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .segment-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 6px;
    padding: 8px 12px;
    gap: 10px;
  }

  .segment-left {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .segment-span {
    font-size: 0.78rem;
    font-weight: 800;
    color: #fff;
  }

  .segment-unit {
    font-size: 0.62rem;
    color: var(--color-holo-muted);
  }

  .segment-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .segment-cost {
    font-size: 0.85rem;
    font-weight: 800;
    color: var(--color-holo-primary);
  }

  /* ========================================================================= */
  /* TAB 2: PLANNER VIEW STYLES (Pick & Add Abilities)                         */
  /* ========================================================================= */
  .planner-view {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .planner-add-card {
    background: rgba(13, 20, 32, 0.75);
    border: 1px solid var(--color-holo-border);
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .planner-add-header {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .planner-add-title {
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: #cbd5e1;
  }

  .planner-add-controls {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    align-items: end;
  }

  @media (min-width: 768px) {
    .planner-add-controls {
      grid-template-columns: 2fr 130px auto;
    }
  }

  .planner-select-box,
  .planner-levels-box {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .planner-add-btn {
    background: rgba(0, 240, 255, 0.15);
    border: 1px solid var(--color-holo-primary);
    color: var(--color-holo-primary);
    padding: 9px 16px;
    border-radius: 6px;
    font-size: 0.76rem;
    font-weight: 800;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: all 0.2s;
    font-family: var(--font-sans);
    height: 38px;
    box-sizing: border-box;
  }

  .planner-add-btn:hover:not(:disabled) {
    background: rgba(0, 240, 255, 0.3);
    box-shadow: 0 0 12px rgba(0, 240, 255, 0.4);
    color: #fff;
  }

  .planner-add-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* Planned List */
  .planned-list-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .planned-list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4px;
  }

  .planned-header-title {
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    color: var(--color-holo-muted);
  }

  .clear-plan-btn {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #94a3b8;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.65rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: all 0.2s;
  }

  .clear-plan-btn:hover {
    border-color: var(--color-arson-fire);
    color: var(--color-arson-fire);
  }

  /* Empty State */
  .empty-plan-card {
    background: rgba(13, 20, 32, 0.4);
    border: 1px dashed rgba(0, 240, 255, 0.2);
    border-radius: 8px;
    padding: 32px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 8px;
  }

  .empty-plan-card :global(.empty-icon) {
    color: var(--color-holo-muted);
    opacity: 0.6;
  }

  .empty-title {
    font-size: 0.9rem;
    font-weight: 800;
    color: #cbd5e1;
  }

  .empty-subtext {
    font-size: 0.72rem;
    color: var(--color-holo-muted);
    max-width: 420px;
    margin: 0;
    line-height: 1.4;
  }

  .empty-subtext strong {
    color: var(--color-holo-primary);
  }

  /* Planned Cards Stack */
  .planned-cards-stack {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .planned-item-card {
    background: rgba(13, 20, 32, 0.7);
    border: 1px solid rgba(0, 240, 255, 0.15);
    border-radius: 8px;
    padding: 14px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
    transition: border-color 0.2s;
  }

  .planned-item-card:hover {
    border-color: rgba(0, 240, 255, 0.35);
  }

  .planned-item-left {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 200px;
  }

  .planned-item-title-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .planned-skill-name {
    font-size: 0.95rem;
    font-weight: 800;
    color: #fff;
  }

  .planned-range-text {
    font-size: 0.72rem;
    color: var(--color-holo-muted);
  }

  .planned-range-text strong {
    color: #cbd5e1;
  }

  .planned-item-center {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
  }

  .stepper-label {
    font-size: 0.6rem;
    font-weight: 800;
    color: var(--color-holo-muted);
    letter-spacing: 0.05em;
  }

  .planned-item-center .stepper-input {
    width: 110px;
  }

  .planned-item-right {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .planned-cost-display {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
  }

  .cost-label {
    font-size: 0.58rem;
    font-weight: 800;
    color: var(--color-holo-muted);
    letter-spacing: 0.04em;
  }

  .cost-val-box {
    display: flex;
    align-items: baseline;
    gap: 4px;
  }

  .planned-cost-number {
    font-size: 1.15rem;
    font-weight: 900;
    color: var(--color-holo-primary);
    font-family: var(--font-sans);
  }

  .planned-cost-unit {
    font-size: 0.65rem;
    font-weight: 700;
    color: #cbd5e1;
  }

  .remove-item-btn {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #94a3b8;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
  }

  .remove-item-btn:hover {
    background: rgba(255, 94, 0, 0.15);
    border-color: var(--color-arson-fire);
    color: var(--color-arson-fire);
  }

  /* Planner Summary Card */
  .planner-summary-card {
    background: rgba(13, 20, 32, 0.75);
    border: 1px solid var(--color-holo-border);
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .planner-summary-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .summary-title-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    color: #fff;
  }

  .planner-metrics-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  @media (min-width: 768px) {
    .planner-metrics-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .planner-metric-box {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 6px;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .planner-metric-box.highlight {
    background: rgba(0, 240, 255, 0.04);
    border-color: rgba(0, 240, 255, 0.25);
  }

  .metric-box-label {
    font-size: 0.6rem;
    font-weight: 800;
    color: var(--color-holo-muted);
    letter-spacing: 0.04em;
  }

  .metric-box-val {
    font-size: 1.05rem;
    font-weight: 900;
    color: #fff;
    font-family: var(--font-sans);
  }

  .metric-box-val.neon-cyan {
    color: var(--color-holo-primary);
    text-shadow: 0 0 8px var(--color-holo-glow);
  }

  .portfolio-time-strip {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(0, 240, 255, 0.04);
    border: 1px dashed rgba(0, 240, 255, 0.2);
    padding: 10px 14px;
    border-radius: 6px;
    font-size: 0.72rem;
    color: #cbd5e1;
    line-height: 1.4;
  }

  .portfolio-time-strip strong {
    color: var(--color-holo-primary);
  }

  /* Refinement Info Card */
  .refinement-info-card {
    background: rgba(0, 240, 255, 0.02);
    border: 1px solid rgba(0, 240, 255, 0.1);
    border-radius: 8px;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .refinement-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.68rem;
    font-weight: 800;
    color: var(--color-holo-primary);
    letter-spacing: 0.06em;
  }

  .refinement-desc {
    font-size: 0.72rem;
    color: var(--color-holo-muted);
    margin: 0;
    line-height: 1.5;
  }

  .refinement-desc strong {
    color: #fff;
  }

  /* Utility Colors */
  .holo-cyan {
    color: var(--color-holo-primary);
  }

  .holo-orange {
    color: var(--color-holo-secondary, #ff8438);
  }

  .holo-fire {
    color: var(--color-arson-fire);
  }

  .holo-purple {
    color: #c084fc;
  }

  .font-tech {
    font-family: var(--font-sans);
  }

  @media (max-width: 640px) {
    .panel-header {
      padding: 12px 14px;
    }

    .time-metrics-grid {
      grid-template-columns: 1fr;
    }

    .cost-summary-box {
      flex-direction: column;
      align-items: flex-start;
    }

    .cost-summary-right {
      text-align: left;
    }

    .cost-display {
      justify-content: flex-start;
    }

    .planned-item-card {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }

    .planned-item-right {
      width: 100%;
      justify-content: space-between;
    }
  }
</style>
