/**
 * Math scaling pipelines for Slime guide to Elysium.
 * Shared between StatCalculator.svelte and the regression test suite.
 */

export function runCalculation(baseStats, abilities, playerLvl, isCombat, chapter = 1) {
  if (!baseStats) return {};
  
  const getLvl = (id) => {
    const ab = abilities.find(a => a.id === id);
    return ab ? ab.level : 0;
  };
  
  // ----------------------------------------------------
  // 1. DIGESTION PIPELINE (Base: 1 + 3 * level)
  // ----------------------------------------------------
  const digBase = 1 + 3 * playerLvl;
  
  const efficientLvl = getLvl('efficient_digestion');
  // Efficient digestion compounds 10% per level, rounded to 2 decimals at each level
  let digEnhanced = digBase;
  for (let i = 0; i < efficientLvl; i++) {
    digEnhanced = Math.round(digEnhanced * 1.10 * 100) / 100;
  }
  
  const massLvl = getLvl('mass_expansion');
  const massMult = 0.30 * massLvl;
  const massVal = Math.round(digEnhanced * massMult * 100) / 100;
  
  const passiveLvl = getLvl('passive_digestion');
  const passiveMult = 0.10 * passiveLvl;
  const passiveVal = Math.round(digEnhanced * passiveMult * 100) / 100;
  
  const cloneLvl = getLvl('partial_division');
  const cloneMult = 0.10 * cloneLvl; // Clone gives 10% per level (Clone Lv 3 = 30%)
  
  const packLvl = getLvl('pack_instinct');
  const packMult = 0.15 * packLvl; // Pack instinct gives 15% per level
  
  const baseSum = digEnhanced + massVal + passiveVal;
  
  const cloneVal = Math.round(baseSum * cloneMult * 100) / 100;
  const packVal = Math.round(baseSum * packMult * 100) / 100;
  
  const neutralSum = Math.round((baseSum + cloneVal + packVal) * 100) / 100;
  
  const hemoLvl = getLvl('hemolymphatic_tissue');
  const hemoMult = 1 + 0.20 * hemoLvl;
  const finalDigestion = isCombat ? Math.round(neutralSum * hemoMult * 100) / 100 : neutralSum;
  
  // ----------------------------------------------------
  // 2. MANA PIPELINE
  // ----------------------------------------------------
  const manaBase = (baseStats.mana || 10) + 0.02 * (playerLvl - 1);
  const perceptionLvl = getLvl('instinctive_perception');
  const resonanceLvl = getLvl('memory_resonance');
  const sensoryLvl = getLvl('chemosensory_aptitude');
  
  const perceptionVal = 2.0 * perceptionLvl;
  const resonanceVal = 1.0 * resonanceLvl;
  const sensoryVal = 2.0 * sensoryLvl;
  
  const additiveSum = manaBase + perceptionVal + resonanceVal + sensoryVal;
  
  const harmonizerLvl = getLvl('magic_harmonizer');
  const harmonizerMult = 1 + 0.20 * harmonizerLvl;
  const multipliedSum = Math.round(additiveSum * harmonizerMult * 100) / 100;
  
  const coreLvl = getLvl('magic_core');
  // Magic Core is exponential (+10% compounding per level)
  let finalMana = multipliedSum;
  for (let i = 0; i < coreLvl; i++) {
    finalMana = Math.round(finalMana * 1.10 * 100) / 100;
  }
  
  // Apply Ch 33 Hyper Efficient Digestion extra mana bonus (+1% per level)
  if (chapter >= 33) {
    const efficientLvl = getLvl('efficient_digestion');
    const efficientManaMult = 1 + 0.01 * efficientLvl;
    finalMana = Math.round(finalMana * efficientManaMult * 100) / 100;
  }
  
  // ----------------------------------------------------
  // 3. SPEED PIPELINE (Base: 0.25)
  // ----------------------------------------------------
  const speedBase = 0.25;
  const monocularLvl = getLvl('monocular_vision');
  const speedAdditiveSum = speedBase + 0.10 * monocularLvl;
  
  const viscousLvl = getLvl('viscous_flow');
  // Viscous Flow compounds step-by-step (12% if fused, 10% normally)
  let speedCompounded = speedAdditiveSum;
  const viscousFactor = chapter >= 68 ? 1.12 : 1.10;
  for (let i = 0; i < viscousLvl; i++) {
    speedCompounded = Math.round(speedCompounded * viscousFactor * 100) / 100;
  }
  
  const mimicryLvl = getLvl('pigmentation_mimicry');
  const mimicryMult = 1 + 0.10 * mimicryLvl;
  const finalSpeed = Math.round(speedCompounded * mimicryMult * 100) / 100;
  
  return {
    digestion: {
      base: digBase,
      efficientLvl,
      efficientMult: Math.round(Math.pow(1.10, efficientLvl) * 100) / 100,
      digEnhanced,
      massLvl,
      massMult,
      massVal,
      passiveLvl,
      passiveMult,
      passiveVal,
      cloneLvl,
      cloneMult,
      cloneVal,
      packLvl,
      packMult,
      packVal,
      baseSum: Math.round(baseSum * 100) / 100,
      neutralSum,
      hemoLvl,
      hemoMult,
      hemoVal: isCombat ? Math.round(neutralSum * (hemoMult - 1) * 100) / 100 : 0,
      final: finalDigestion
    },
    mana: {
      base: manaBase,
      perceptionLvl,
      perceptionVal,
      resonanceLvl,
      resonanceVal,
      sensoryLvl,
      sensoryVal,
      additiveSum,
      harmonizerLvl,
      harmonizerMult,
      multipliedSum,
      coreLvl,
      coreMult: Math.round(Math.pow(1.10, coreLvl) * 100) / 100,
      final: finalMana
    },
    speed: {
      base: speedBase,
      monocularLvl,
      monocularVal: 0.10 * monocularLvl,
      additiveSum: Math.round(speedAdditiveSum * 100) / 100,
      viscousLvl,
      viscousMult: Math.round(Math.pow(1.10, viscousLvl) * 100) / 100,
      viscousVal: Math.round(speedCompounded * 100) / 100,
      mimicryLvl,
      mimicryMult,
      final: finalSpeed
    }
  };
}
