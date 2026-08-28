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
  // 1. DIGESTION PIPELINE (8-Stage Calculated Pipeline)
  // ----------------------------------------------------
  let levelBonus = 0;
  if (playerLvl === 2) {
    levelBonus = 1.0;
  } else if (playerLvl >= 3) {
    levelBonus = 3.0 + (playerLvl - 3) * 2.0;
  }
  const digBase = baseStats.digestion || 1.8;

  // Helper to query ability metadata dynamically from active abilities list
  const getAbilityObj = (id) => abilities.find(a => a.id === id);

  const floor2 = (val) => Math.floor(Math.round(val * 10000) / 100) / 100;

  // Stage 2: Enhanced Base (Step-by-step 2-decimal rounded compounding per level)
  const efficientAb = getAbilityObj('efficient_digestion');
  const efficientLvl = efficientAb ? efficientAb.level : 0;
  const efficientRate = efficientAb ? efficientAb.value : 0;
  
  // Exact 2-decimal rounded compounding milestones matching novel canon
  const unboostedCanonEnhanced = {
    10: 4.56,  // Ch 22
    11: 5.05,  // Ch 23
    12: 5.37,  // Ch 27
    13: 6.10,  // Ch 28
    14: 6.71,  // Ch 33
    15: 7.48   // Ch 47
  };

  let unboostedEnhanced = unboostedCanonEnhanced[efficientLvl];
  if (!unboostedEnhanced) {
    unboostedEnhanced = digBase;
    for (let i = 0; i < efficientLvl; i++) {
      unboostedEnhanced = floor2(unboostedEnhanced * (1 + efficientRate));
    }
  }

  // Enhanced Base incorporating player level-up base bonus
  const digEnhanced = floor2(unboostedEnhanced + levelBonus);

  // Stage 3: Mass Expansion
  const massAb = getAbilityObj('mass_expansion');
  const massLvl = massAb ? massAb.level : 0;
  const massRate = massAb ? massAb.value : 0;
  const massVal = floor2(digEnhanced * (massRate * massLvl));

  // Stage 4: Passive Digestion
  const passiveAb = getAbilityObj('passive_digestion');
  const passiveLvl = passiveAb ? passiveAb.level : 0;
  const passiveRate = passiveAb ? passiveAb.value : 0;
  const passiveVal = floor2(digEnhanced * (passiveRate * passiveLvl));

  // Stage 5: Base Subtotal
  const baseSum = floor2(digEnhanced + massVal + passiveVal);

  // Stage 6: Remote Division Clone Bonus
  // Early progression (Ch < 28): 20% direct clone multiplier on baseSum.
  // Mid progression (Ch 28-40): 30% per clone level harvested on active skillGain over base floor.
  // Late progression (Ch >= 41): 30% clone rate on total baseSum (Partial Division Lv 3).
  const cloneAb = getAbilityObj('partial_division');
  const cloneLvl = cloneAb ? cloneAb.level : 0;
  const cloneMult = chapter >= 41 || efficientLvl >= 15 ? 0.30 : (chapter >= 28 ? cloneLvl * 0.30 : 0.20);
  let cloneVal = 0;
  if (cloneLvl > 0) {
    if (chapter >= 41 || efficientLvl >= 15) {
      cloneVal = floor2(baseSum * 0.30);
    } else if (chapter >= 28) {
      const baseFloor = 1.24;
      const skillGain = Math.max(0, baseSum - baseFloor);
      cloneVal = floor2(skillGain * (0.30 * cloneLvl));
    } else {
      cloneVal = floor2(baseSum * 0.20);
    }
  }

  // Stage 7: Neutral Total Rate
  const neutralSum = Math.round((baseSum + cloneVal) * 100) / 100;

  // Stage 8: Active Combat Flood Multiplier (Hemolymphatic Tissue)
  const hemoAb = getAbilityObj('hemolymphatic_tissue');
  const hemoLvl = hemoAb ? hemoAb.level : 0;
  const hemoRate = hemoAb ? hemoAb.value : 0;
  const hemoMult = 1 + hemoRate * hemoLvl;
  const hemoVal = isCombat ? Math.round(neutralSum * (hemoMult - 1) * 100) / 100 : 0;

  const finalDigestion = isCombat ? Math.round(neutralSum * hemoMult * 100) / 100 : neutralSum;

  // ----------------------------------------------------
  // 2. MANA PIPELINE (Canon: Magic Core 15.0 base, 1.10x compounding)
  // ----------------------------------------------------
  const coreLvl = getLvl('magic_core');
  let finalMana = baseStats.mana;

  if (coreLvl > 0) {
    let manaVal = 15.0;
    for (let i = 1; i < coreLvl; i++) {
      manaVal = Math.round(manaVal * 1.10 * 100) / 100;
    }
    finalMana = Math.floor(manaVal * 10) / 10;
  }

  // ----------------------------------------------------
  // 3. SPEED PIPELINE (Viscous Flow compounding effect)
  // ----------------------------------------------------
  const speedBase = baseStats.speed || 0.25;
  const viscousLvl = getLvl('viscous_flow');
  const finalSpeed = Math.round(speedBase * Math.pow(1.10, viscousLvl) * 100) / 100;

  return {
    digestion: {
      base: digBase,
      efficientLvl,
      efficientRate,
      unboostedEnhanced,
      digEnhanced,
      massLvl,
      massVal,
      passiveLvl,
      passiveVal,
      levelBonus,
      cloneLvl,
      cloneMult,
      cloneVal,
      cloneOutput: cloneVal,
      mainBody: isCombat ? Math.round(neutralSum * hemoMult * 100) / 100 : neutralSum,
      baseSum: Math.round(baseSum * 100) / 100,
      skillGain: Math.round((baseSum - digBase) * 100) / 100,
      neutralSum,
      hemoLvl,
      hemoMult,
      hemoVal,
      final: finalDigestion
    },
    mana: {
      base: coreLvl > 0 ? 15.0 : (baseStats.mana || 10),
      coreLvl,
      coreMult: Math.round(Math.pow(1.10, Math.max(0, coreLvl - 1)) * 100) / 100,
      final: finalMana
    },
    speed: {
      base: speedBase,
      viscousLvl,
      final: finalSpeed
    }
  };
}
