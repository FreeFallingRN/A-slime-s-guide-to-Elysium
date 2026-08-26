<script>
  import { Shield, Sparkles, TrendingUp } from 'lucide-svelte';

  // Evolution Tiers
  const evolutionTiers = [
    { name: "Stage 1: Common Slime", multiplier: 1.0, base: 50, chapter: 1 },
    { name: "Stage 2: Acidic Slime", multiplier: 1.8, base: 120, chapter: 3 },
    { name: "Stage 2: Steel-Skin Slime", multiplier: 2.2, base: 180, chapter: 10 },
    { name: "Stage 3: Apex Magic Slime", multiplier: 5.0, base: 500, chapter: 15 },
    { name: "Stage 4: Elysian Lord Slime", multiplier: 12.5, base: 2000, chapter: 25 }
  ];

  let selectedTierIndex = 0;
  
  // Upgrades
  let coreLvl = 1;
  let coreTarget = 10;
  
  let cellLvl = 1;
  let cellTarget = 10;

  let sensoryLvl = 1;
  let sensoryTarget = 10;

  // Formulas: Cost for upgrading from L to L+1
  // Formula: BaseCost * TierMultiplier * (1.12)^L
  function calculateUpgradeCost(lvl, targetLvl, baseCost, tierMult) {
    if (targetLvl <= lvl) return 0;
    
    let totalCost = 0;
    for (let l = lvl; l < targetLvl; l++) {
      totalCost += Math.round(baseCost * tierMult * Math.pow(1.13, l - 1));
    }
    return totalCost;
  }

  $: activeTier = evolutionTiers[selectedTierIndex];
  
  $: coreCost = calculateUpgradeCost(coreLvl, coreTarget, activeTier.base, activeTier.multiplier);
  $: cellCost = calculateUpgradeCost(cellLvl, cellTarget, activeTier.base * 0.8, activeTier.multiplier);
  $: sensoryCost = calculateUpgradeCost(sensoryLvl, sensoryTarget, activeTier.base * 0.5, activeTier.multiplier);

  $: grandTotal = coreCost + cellCost + sensoryCost;

  // Max cap input safety
  function validateInput() {
    coreLvl = Math.max(1, Math.min(100, coreLvl));
    coreTarget = Math.max(coreLvl, Math.min(100, coreTarget));
    
    cellLvl = Math.max(1, Math.min(100, cellLvl));
    cellTarget = Math.max(cellLvl, Math.min(100, cellTarget));

    sensoryLvl = Math.max(1, Math.min(100, sensoryLvl));
    sensoryTarget = Math.max(sensoryLvl, Math.min(100, sensoryTarget));
  }
</script>

<div class="biomass-calc-container hologram-panel">
  <div class="panel-header">
    <div class="header-title">
      <Sparkles size={18} class="header-icon" />
      <h3 class="hologram-glow-text">BIOMASS UPGRADE SIMULATOR</h3>
    </div>
    <span class="cost-badge">EST. BUDGET: {grandTotal.toLocaleString()} BM</span>
  </div>

  <div class="calculator-body">
    <!-- Evolution Tier Selection -->
    <div class="config-row">
      <label for="evo-tier">ACTIVE EVOLUTION TIER:</label>
      <select id="evo-tier" bind:value={selectedTierIndex} on:change={validateInput}>
        {#each evolutionTiers as tier, index}
          <option value={index}>{tier.name} (Mult: x{tier.multiplier})</option>
        {/each}
      </select>
    </div>

    <!-- Core Upgrade Row -->
    <div class="upgrade-row">
      <div class="upgrade-info">
        <span class="upgrade-name">Slime Core Energy</span>
        <span class="upgrade-desc">Raises maximum mana capacity and spell efficiency.</span>
      </div>
      <div class="upgrade-inputs">
        <div class="input-group">
          <label>CURRENT</label>
          <input type="number" bind:value={coreLvl} on:change={validateInput} min="1" max="99" />
        </div>
        <div class="arrow-divider">→</div>
        <div class="input-group">
          <label>TARGET</label>
          <input type="number" bind:value={coreTarget} on:change={validateInput} min="2" max="100" />
        </div>
        <div class="cost-output">
          <label>BIOMASS COST</label>
          <span class="cost-val">{coreCost.toLocaleString()}</span>
        </div>
      </div>
    </div>

    <!-- Cell Density Row -->
    <div class="upgrade-row">
      <div class="upgrade-info">
        <span class="upgrade-name">Cell Membrane Density</span>
        <span class="upgrade-desc">Improves base physical defensive rating and blunt defense.</span>
      </div>
      <div class="upgrade-inputs">
        <div class="input-group">
          <label>CURRENT</label>
          <input type="number" bind:value={cellLvl} on:change={validateInput} min="1" max="99" />
        </div>
        <div class="arrow-divider">→</div>
        <div class="input-group">
          <label>TARGET</label>
          <input type="number" bind:value={cellTarget} on:change={validateInput} min="2" max="100" />
        </div>
        <div class="cost-output">
          <label>BIOMASS COST</label>
          <span class="cost-val">{cellCost.toLocaleString()}</span>
        </div>
      </div>
    </div>

    <!-- Sensory Nodes Row -->
    <div class="upgrade-row">
      <div class="upgrade-info">
        <span class="upgrade-name">Sensory Receptors</span>
        <span class="upgrade-desc">Boosts spatial awareness, evasion, and movement speeds.</span>
      </div>
      <div class="upgrade-inputs">
        <div class="input-group">
          <label>CURRENT</label>
          <input type="number" bind:value={sensoryLvl} on:change={validateInput} min="1" max="99" />
        </div>
        <div class="arrow-divider">→</div>
        <div class="input-group">
          <label>TARGET</label>
          <input type="number" bind:value={sensoryTarget} on:change={validateInput} min="2" max="100" />
        </div>
        <div class="cost-output">
          <label>BIOMASS COST</label>
          <span class="cost-val">{sensoryCost.toLocaleString()}</span>
        </div>
      </div>
    </div>

    <!-- Projection Summary Panel -->
    <div class="projection-panel">
      <div class="projection-header">
        <TrendingUp size={16} />
        <span>EVOLUTIONARY COST ANALYSIS</span>
      </div>
      <div class="projection-content">
        <div class="stat-spec">
          <span>Core Base Multiplier</span>
          <span>x{activeTier.multiplier.toFixed(2)}</span>
        </div>
        <div class="stat-spec">
          <span>Scaling Coefficient</span>
          <span>13% Exponential</span>
        </div>
        <div class="stat-spec highlight">
          <span>Cumulative Biomass Required</span>
          <span class="hologram-glow-text">{grandTotal.toLocaleString()} BM</span>
        </div>
      </div>
    </div>
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
    background: rgba(255, 94, 0, 0.15);
    border: 1px solid var(--color-arson-fire);
    color: var(--color-arson-fire);
    padding: 2px 10px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-shadow: 0 0 5px var(--color-arson-glow);
  }

  .calculator-body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .config-row {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .config-row label {
    font-size: 0.72rem;
    font-weight: bold;
    color: var(--color-holo-muted);
    letter-spacing: 0.05em;
  }

  .config-row select {
    background: var(--color-space-bg);
    border: 1px solid var(--color-holo-border);
    color: #fff;
    padding: 8px 12px;
    border-radius: 6px;
    outline: none;
    font-family: var(--font-sans);
    font-weight: bold;
    transition: var(--transition-smooth);
    cursor: pointer;
  }

  .config-row select:focus {
    border-color: var(--color-holo-primary);
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
      grid-template-columns: 2fr 3fr;
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
  }

  .upgrade-inputs {
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: flex-start;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .input-group label {
    font-size: 0.6rem;
    font-weight: bold;
    color: var(--color-holo-muted);
    text-align: center;
  }

  .input-group input {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid var(--color-holo-border);
    color: #fff;
    border-radius: 4px;
    padding: 4px;
    width: 60px;
    text-align: center;
    font-family: var(--font-sans);
    outline: none;
    transition: var(--transition-smooth);
  }

  .input-group input:focus {
    border-color: var(--color-holo-primary);
    box-shadow: 0 0 5px var(--color-holo-glow);
  }

  .arrow-divider {
    color: var(--color-holo-muted);
    font-weight: bold;
    padding-top: 14px;
  }

  .cost-output {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-left: auto;
    text-align: right;
  }

  .cost-output label {
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

  .projection-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.72rem;
    font-weight: bold;
    color: var(--color-holo-primary);
    letter-spacing: 0.05em;
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
</style>
