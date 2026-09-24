<script>
  import { currentChapter, activeChapterDetails } from "./store.js";
  import { BIOMASS_SKILLS, calculateBiomassCost } from "./biomassCalc.js";
  import { AlertTriangle, CheckCircle2, Sparkles, TrendingUp } from "lucide-svelte";

  let chapter = 1;
  let chapterDetails = {};
  currentChapter.subscribe((val) => {
    chapter = val;
  });
  activeChapterDetails.subscribe((val) => {
    chapterDetails = val;
  });

  $: availableSkills = BIOMASS_SKILLS.filter((skill) => skill.chapter <= chapter);
  let selectedSkillId = "magic_core";
  let startLevel = 1;
  let targetLevel = 2;

  $: {
    if (!availableSkills.some((skill) => skill.id === selectedSkillId)) {
      selectedSkillId = availableSkills[0]?.id || "magic_core";
    }
  }

  function clampLevels() {
    startLevel = Math.max(1, Math.min(99, Number.parseInt(startLevel, 10) || 1));
    targetLevel = Math.max(startLevel + 1, Math.min(100, Number.parseInt(targetLevel, 10) || 2));
  }

  $: clampLevels();

  $: result = availableSkills.length
    ? calculateBiomassCost({ skillId: selectedSkillId, startLevel, targetLevel })
    : null;
</script>

<div class="biomass-calc-container hologram-panel">
  <div class="panel-header">
    <div class="header-title">
      <Sparkles size={18} class="header-icon" />
      <h3 class="hologram-glow-text">BIOMASS UPGRADE CALCULATOR</h3>
    </div>
    <span class:needs-review={result?.status !== "CONFIRMED"} class="cost-badge">
      {result ? result.status.replaceAll("_", " ") : "LOCKED"}
    </span>
  </div>

  <div class="calculator-body">
    <div class="config-grid">
      <div class="config-row">
        <label for="biomass-skill">SKILL / MUTATION</label>
        <select id="biomass-skill" bind:value={selectedSkillId}>
          {#each availableSkills as skill}
            <option value={skill.id}>{skill.name}</option>
          {/each}
        </select>
      </div>

      <div class="range-row">
        <div class="input-group">
          <label for="biomass-start">START</label>
          <input id="biomass-start" type="number" bind:value={startLevel} min="1" max="99" />
        </div>
        <div class="arrow-divider">-></div>
        <div class="input-group">
          <label for="biomass-target">TARGET</label>
          <input id="biomass-target" type="number" bind:value={targetLevel} min="2" max="100" />
        </div>
      </div>
    </div>

    {#if result}
      <div class="upgrade-row">
        <div class="upgrade-info">
          <span class="upgrade-name">{result.skill.name}</span>
          <span class="upgrade-desc">{result.skill.notes}</span>
        </div>
        <div class="cost-output">
          <span class="output-label">KNOWN COST</span>
          <span class="cost-val">{result.total.toLocaleString()} BM</span>
        </div>
      </div>

      <div class="projection-panel">
        <div class="projection-header">
          <TrendingUp size={16} />
          <span>LEVEL {chapterDetails.halonLvl || 1} / CHAPTER {chapter}</span>
        </div>
        <div class="projection-content">
          {#each result.segments as segment}
            <div class="stat-spec">
              <span>Lv {segment.from} -> Lv {segment.to}</span>
              <span>{segment.cost.toLocaleString()} BM / {segment.status.replaceAll("_", " ")}</span
              >
            </div>
          {/each}
          <div class="stat-spec highlight">
            <span
              >{result.status === "CONFIRMED" ? "Confirmed Total" : "Confirmed Partial Total"}</span
            >
            <span class="hologram-glow-text">{result.total.toLocaleString()} BM</span>
          </div>
        </div>
      </div>

      {#if result.status !== "CONFIRMED"}
        <div class="review-panel">
          <AlertTriangle size={16} />
          <span>{result.unresolvedReasons[0]}</span>
        </div>
      {:else}
        <div class="confirmed-panel">
          <CheckCircle2 size={16} />
          <span>{result.unitNote}</span>
        </div>
      {/if}
    {/if}
  </div>
</div>

<style>
  .biomass-calc-container {
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
    gap: 12px;
  }

  .header-title {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .header-title h3 {
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.1em;
  }

  .cost-badge {
    background: rgba(0, 240, 255, 0.12);
    border: 1px solid var(--color-holo-primary);
    color: var(--color-holo-primary);
    padding: 2px 10px;
    border-radius: 4px;
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    white-space: nowrap;
  }

  .cost-badge.needs-review {
    background: rgba(255, 94, 0, 0.15);
    border-color: var(--color-arson-fire);
    color: var(--color-arson-fire);
  }

  .calculator-body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .config-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
  }

  @media (min-width: 768px) {
    .config-grid {
      grid-template-columns: 2fr 1fr;
      align-items: end;
    }
  }

  .config-row,
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .config-row label,
  .input-group label {
    font-size: 0.72rem;
    font-weight: bold;
    color: var(--color-holo-muted);
    letter-spacing: 0.05em;
  }

  .config-row select,
  .input-group input {
    background: var(--color-space-bg);
    border: 1px solid var(--color-holo-border);
    color: #fff;
    padding: 8px 12px;
    border-radius: 6px;
    outline: none;
    font-family: var(--font-sans);
    font-weight: bold;
  }

  .config-row select:focus,
  .input-group input:focus {
    border-color: var(--color-holo-primary);
  }

  .range-row {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 10px;
    align-items: end;
  }

  .arrow-divider {
    color: var(--color-holo-muted);
    font-weight: bold;
    padding-bottom: 8px;
  }

  .upgrade-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 16px;
    background: rgba(255, 255, 255, 0.01);
    border: 1px solid rgba(255, 255, 255, 0.03);
    border-radius: 6px;
  }

  @media (min-width: 768px) {
    .upgrade-row {
      grid-template-columns: 2fr auto;
      align-items: center;
    }
  }

  .upgrade-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .upgrade-name {
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
  }

  .upgrade-desc {
    font-size: 0.75rem;
    color: var(--color-holo-muted);
    line-height: 1.4;
  }

  .cost-output {
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: right;
  }

  .output-label {
    font-size: 0.6rem;
    font-weight: bold;
    color: var(--color-holo-muted);
  }

  .cost-val {
    font-family: var(--font-sans);
    font-weight: bold;
    color: var(--color-holo-primary);
    text-shadow: 0 0 5px var(--color-holo-glow);
  }

  .projection-panel {
    background: rgba(0, 240, 255, 0.02);
    border: 1px dashed rgba(0, 240, 255, 0.15);
    border-radius: 6px;
    padding: 16px;
  }

  .projection-header,
  .review-panel,
  .confirmed-panel {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.72rem;
    font-weight: bold;
    letter-spacing: 0.05em;
  }

  .projection-header {
    color: var(--color-holo-primary);
    margin-bottom: 12px;
  }

  .projection-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .stat-spec {
    display: flex;
    justify-content: space-between;
    gap: 14px;
    font-size: 0.8rem;
    color: var(--color-holo-muted);
  }

  .stat-spec.highlight {
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding-top: 8px;
    font-weight: bold;
    font-size: 0.9rem;
    color: #fff;
  }

  .review-panel,
  .confirmed-panel {
    padding: 12px 14px;
    border-radius: 6px;
    line-height: 1.4;
  }

  .review-panel {
    background: rgba(255, 94, 0, 0.08);
    border: 1px solid rgba(255, 94, 0, 0.22);
    color: var(--color-arson-fire);
  }

  .confirmed-panel {
    background: rgba(0, 240, 255, 0.06);
    border: 1px solid rgba(0, 240, 255, 0.18);
    color: var(--color-holo-primary);
  }

  @media (max-width: 520px) {
    .panel-header,
    .stat-spec {
      align-items: flex-start;
      flex-direction: column;
    }

    .cost-output {
      text-align: left;
    }
  }
</style>
