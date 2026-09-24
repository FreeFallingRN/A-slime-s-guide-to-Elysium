/**
 * Math scaling pipelines for Slime guide to Elysium.
 * Shared between StatCalculator.svelte and the regression test suite.
 */

export function runCalculation(baseStats, abilities, playerLvl, isCombat, chapter = 1) {
  if (!baseStats) return {};

  const getLvl = (id) => {
    const ab = abilities.find((a) => a.id === id);
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

  const getAbilityObj = (id) => abilities.find((a) => a.id === id);

  const floor2 = (val) => Math.floor(Math.round(val * 10000) / 100) / 100;

  const getLatestCanonValue = (milestones, key) => {
    for (let i = milestones.length - 1; i >= 0; i -= 1) {
      const milestone = milestones[i];
      if (chapter >= milestone.chapter && milestone[key] !== undefined) {
        return milestone[key];
      }
    }
    return undefined;
  };

  const getLatestDigestionRateMilestone = () => {
    for (let i = digestionCanonMilestones.length - 1; i >= 0; i -= 1) {
      const milestone = digestionCanonMilestones[i];
      if (
        chapter >= milestone.chapter &&
        (milestone.neutralSum !== undefined || milestone.combatFinal !== undefined)
      ) {
        return milestone;
      }
    }
    return undefined;
  };

  const digestionCanonMilestones = [
    { chapter: 93, digEnhanced: 36.52, neutralSum: 260 },
    { chapter: 105, digEnhanced: 53.54, neutralSum: 381, combatFinal: 1221.45 },
    { chapter: 117, neutralSum: 518.02, combatFinal: 1657.68 },
    { chapter: 119, neutralSum: 605, combatFinal: 1936 },
    { chapter: 131, neutralSum: 2518 },
    { chapter: 133, combatFinal: 5100 },
    { chapter: 181, digEnhanced: 72.46, combatFinal: 5900 },
    { chapter: 262, digEnhanced: 487.47, neutralSum: 7268.18, combatFinal: 39974.98 }
  ];

  // Stage 2: Enhanced Base (Step-by-step 2-decimal rounded compounding per level)
  const efficientAb = getAbilityObj("efficient_digestion");
  const efficientLvl = efficientAb ? efficientAb.level : 0;
  const efficientRate = efficientAb ? efficientAb.value : 0;

  const unboostedCanonEnhanced = {
    10: 4.56, // Ch 22
    11: 5.05, // Ch 23
    12: 5.37, // Ch 27
    13: 6.1, // Ch 28
    14: 6.71, // Ch 33
    15: 7.48, // Ch 47
    16: chapter >= 93 ? 23.52 : 8.23 // Ch 93 Lv 8 milestone (Base Digestion: 36.52)
  };

  let unboostedEnhanced = unboostedCanonEnhanced[efficientLvl];
  if (!unboostedEnhanced) {
    unboostedEnhanced = digBase;
    for (let i = 0; i < efficientLvl; i++) {
      unboostedEnhanced = floor2(unboostedEnhanced * (1 + efficientRate));
    }
  }

  const canonDigEnhanced = getLatestCanonValue(digestionCanonMilestones, "digEnhanced");
  const digEnhanced =
    canonDigEnhanced !== undefined ? canonDigEnhanced : floor2(unboostedEnhanced + levelBonus);

  // Stage 3: Mass Expansion
  const massAb = getAbilityObj("mass_expansion");
  const massLvl = massAb ? massAb.level : 0;
  const massRate = massAb ? massAb.value : 0;
  const massVal = floor2(digEnhanced * (massRate * massLvl));

  // Stage 4: Passive Digestion
  const passiveAb = getAbilityObj("passive_digestion");
  const passiveLvl = passiveAb ? passiveAb.level : 0;
  const passiveRate = passiveAb ? passiveAb.value : 0;
  const passiveVal = floor2(digEnhanced * (passiveRate * passiveLvl));

  // Stage 5: Base Subtotal
  const baseSum = floor2(digEnhanced + massVal + passiveVal);

  // Stage 8 multiplier is needed before clone calculation for canon combat-rate milestones.
  const hemoAb = getAbilityObj("hemolymphatic_tissue");
  const hemoLvl = hemoAb ? hemoAb.level : 0;
  const hemoRate = hemoAb ? hemoAb.value : 0;
  const hemoMult = 1 + hemoRate * hemoLvl;

  // Stage 6: Remote Division Clone Bonus
  const cloneAb = getAbilityObj("partial_division");
  const cloneLvl = cloneAb ? cloneAb.level : 0;
  const canonRateMilestone = getLatestDigestionRateMilestone();
  const canonCombatFinal = getLatestCanonValue(digestionCanonMilestones, "combatFinal");
  const canonNeutralSum = canonRateMilestone?.neutralSum;
  let cloneVal = 0;
  let cloneMult = 0;
  if (cloneLvl > 0) {
    if (chapter >= 93 && canonNeutralSum !== undefined) {
      cloneVal = floor2(canonNeutralSum - baseSum);
      cloneMult = Math.round((cloneVal / baseSum) * 100) / 100;
    } else if (chapter >= 41 || efficientLvl >= 15) {
      cloneMult = 0.3;
      cloneVal = floor2(baseSum * 0.3);
    } else if (chapter >= 28) {
      const baseFloor = 1.24;
      const skillGain = Math.max(0, baseSum - baseFloor);
      cloneMult = cloneLvl * 0.3;
      cloneVal = floor2(skillGain * (0.3 * cloneLvl));
    } else {
      cloneMult = 0.2;
      cloneVal = floor2(baseSum * 0.2);
    }
  }

  // Stage 7: Neutral Total Rate
  const neutralSum = Math.round((baseSum + cloneVal) * 100) / 100;

  // Stage 8: Active Combat Flood Multiplier (Hemolymphatic Tissue)
  const hemoVal = isCombat ? Math.round(neutralSum * (hemoMult - 1) * 100) / 100 : 0;

  const finalDigestion =
    isCombat && canonCombatFinal !== undefined
      ? canonCombatFinal
      : isCombat
        ? Math.round(neutralSum * hemoMult * 100) / 100
        : neutralSum;

  // ----------------------------------------------------
  // 2. MANA PIPELINE (maximum capacity, not temporary current mana)
  // ----------------------------------------------------
  const coreLvl = getLvl("magic_core");
  let finalMana = baseStats.mana;
  const maxManaCanonMilestones = [
    { chapter: 181, maxMana: 100.5 },
    { chapter: 204, maxMana: 200 },
    { chapter: 221, maxMana: 220 },
    { chapter: 249, maxMana: 242 },
    { chapter: 263, maxMana: 292 }
  ];
  const canonMaxMana = getLatestCanonValue(maxManaCanonMilestones, "maxMana");

  if (coreLvl > 0) {
    if (canonMaxMana !== undefined) {
      finalMana = canonMaxMana;
    } else {
      let manaVal = 15.0;
      for (let i = 1; i < coreLvl; i++) {
        manaVal = Math.round(manaVal * 1.1 * 100) / 100;
      }
      finalMana = Math.floor(manaVal * 10) / 10;
    }
  }

  // ----------------------------------------------------
  // 3. SPEED PIPELINE (Viscous Flow compounding effect)
  // ----------------------------------------------------
  const speedBase = baseStats.speed || 0.25;
  const viscousLvl = getLvl("viscous_flow");
  const speedCanonMilestones = {
    18: 1.18,
    23: 1.9,
    24: 2.09,
    25: 2.29,
    27: 2.77,
    36: 6.52
  };
  const finalSpeed =
    speedCanonMilestones[viscousLvl] !== undefined
      ? speedCanonMilestones[viscousLvl]
      : Math.round(speedBase * Math.pow(1.1, viscousLvl) * 100) / 100;

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
      base: coreLvl > 0 ? 15.0 : baseStats.mana || 10,
      coreLvl,
      coreMult: Math.round(Math.pow(1.1, Math.max(0, coreLvl - 1)) * 100) / 100,
      final: finalMana
    },
    speed: {
      base: speedBase,
      viscousLvl,
      final: finalSpeed
    }
  };
}
