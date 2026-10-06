import { BIOMASS_SKILL_COSTS, LEVEL_11_BIOMASS_UNIT_SCALE } from "../data/biomass.js";
import { characterData, abilityProgression } from "../data/abilities.js";

export { LEVEL_11_BIOMASS_UNIT_SCALE } from "../data/biomass.js";

const abilityById = new Map(characterData.abilities.map((ability) => [ability.id, ability]));

/**
 * @typedef {Object} BiomassSkill
 * @property {string} id
 * @property {string} name
 * @property {number} chapter
 * @property {number} [baseCost]
 * @property {number} [growth]
 * @property {Array<{from: number, to: number, cost: number}>} [knownRanges]
 * @property {Array<{from: number, to: number, cost: number}>} [knownSteps]
 * @property {import("../data/abilities.js").Ability} [ability]
 */

/**
 * Enriches a biomass cost entry with metadata from abilities.js
 * @param {import("../data/abilities.js").AbilityBiomassConfig & { id: string }} skill
 * @returns {BiomassSkill}
 */
function enrichBiomassSkill(skill) {
  const ability = abilityById.get(skill.id);
  return {
    ...skill,
    name: ability?.name || skill.id,
    chapter: ability?.chapter || 1,
    ability
  };
}

/**
 * Get single biomass skill definition by ID
 * @param {string} skillId
 * @returns {BiomassSkill | undefined}
 */
export function getBiomassSkill(skillId) {
  const skill = BIOMASS_SKILL_COSTS.find((entry) => entry.id === skillId);
  return skill ? enrichBiomassSkill(skill) : undefined;
}

/**
 * Returns all biomass skills unlocked at or before a given chapter
 * @param {number} chapter
 * @returns {BiomassSkill[]}
 */
export function getAvailableBiomassSkills(chapter) {
  return BIOMASS_SKILL_COSTS.map(enrichBiomassSkill)
    .filter((skill) => skill.chapter <= chapter)
    .sort((a, b) => a.chapter - b.chapter || a.name.localeCompare(b.name));
}

/**
 * Returns Halon's canonical level for an ability at a specific chapter
 * @param {string} skillId
 * @param {number} chapter
 * @returns {number}
 */
export function getAbilityLevelAtChapter(skillId, chapter) {
  const progression = abilityProgression[skillId];
  if (!progression || progression.length === 0) {
    const ability = abilityById.get(skillId);
    return ability && (ability.category === "evolution" || !ability.category) && ability.chapter <= chapter ? 1 : 0;
  }

  let currentLevel = 0;
  for (const milestone of progression) {
    if (milestone.chapter <= chapter) {
      currentLevel = milestone.level;
    } else {
      break;
    }
  }

  if (currentLevel === 0) {
    const ability = abilityById.get(skillId);
    if (ability && (ability.category === "evolution" || !ability.category) && ability.chapter <= chapter) {
      currentLevel = 1;
    }
  }

  return currentLevel;
}

function assertLevel(value, label) {
  if (!Number.isInteger(value) || value < 1) {
    throw new Error(`${label} must be a positive integer`);
  }
}

function findKnownRange(skill, startLevel, targetLevel) {
  return (skill.knownRanges || []).find(
    (range) => range.from === startLevel && range.to === targetLevel
  );
}

function findKnownStep(skill, fromLevel) {
  return (skill.knownSteps || []).find((step) => step.from === fromLevel);
}

/**
 * Calculates Biomass upgrade cost between two levels based on Halon's Character Level
 * @param {Object} params
 * @param {string} params.skillId - Ability ID
 * @param {number} params.startLevel - Starting skill level (>= 1)
 * @param {number} params.targetLevel - Target skill level (> startLevel)
 * @param {number} [params.characterLevel=1] - Halon's character level (refinement occurs at Character Lv 11+)
 * @param {number} [params.chapter=1] - Current novel chapter
 */
export function calculateBiomassCost({
  skillId,
  startLevel,
  targetLevel,
  characterLevel = 1,
  chapter = 1
}) {
  const skill = getBiomassSkill(skillId);
  if (!skill) {
    throw new Error(`Unknown biomass skill: ${skillId}`);
  }

  assertLevel(startLevel, "startLevel");
  assertLevel(targetLevel, "targetLevel");
  if (targetLevel <= startLevel) {
    throw new Error("targetLevel must be greater than startLevel");
  }

  // Refinement occurs when Halon (the character) hits Level 11 (Chapter 201+)
  const isRefined = characterLevel >= 11 || chapter >= 201;
  const unit = isRefined ? "Refined BM" : "BM";

  // Check for exact post-refinement known canon range
  if (isRefined) {
    const knownRange = findKnownRange(skill, startLevel, targetLevel);
    if (knownRange) {
      return {
        skill,
        startLevel,
        targetLevel,
        characterLevel,
        isRefined: true,
        unit,
        total: knownRange.cost,
        unitNote: `Condensed Refined Biomass (Character Lv ${characterLevel || 11}+ / Ch. ${chapter}): 1 Refined Unit = ${LEVEL_11_BIOMASS_UNIT_SCALE} Standard Units.`,
        segments: [
          {
            from: startLevel,
            to: targetLevel,
            unit,
            cost: knownRange.cost,
            source: "known-range"
          }
        ]
      };
    }

    // Check for exact step-by-step costs
    let stepCost = 0;
    let allStepsKnown = true;
    for (let lvl = startLevel; lvl < targetLevel; lvl += 1) {
      const step = findKnownStep(skill, lvl);
      if (step && step.to === lvl + 1) {
        stepCost += step.cost;
      } else {
        allStepsKnown = false;
        break;
      }
    }

    if (allStepsKnown && (skill.knownSteps || []).length > 0) {
      const roundedStepCost = Math.round(stepCost * 100) / 100;
      return {
        skill,
        startLevel,
        targetLevel,
        characterLevel,
        isRefined: true,
        unit,
        total: roundedStepCost,
        unitNote: `Condensed Refined Biomass (Character Lv ${characterLevel || 11}+ / Ch. ${chapter}): 1 Refined Unit = ${LEVEL_11_BIOMASS_UNIT_SCALE} Standard Units.`,
        segments: [
          {
            from: startLevel,
            to: targetLevel,
            unit,
            cost: roundedStepCost,
            source: "known-steps"
          }
        ]
      };
    }
  }

  // Continuous Mathematical Formula: BaseCost * Growth^(level - 1)
  const baseCost = skill.baseCost ?? 1;
  const growth = skill.growth ?? 1.13;

  let rawTotal = 0;
  for (let lvl = startLevel; lvl < targetLevel; lvl += 1) {
    rawTotal += baseCost * Math.pow(growth, lvl - 1);
  }

  // Scale down by 1,000 if Halon has condensed biomass (Character Lv 11+)
  const finalCost = isRefined
    ? Math.round((rawTotal / LEVEL_11_BIOMASS_UNIT_SCALE) * 100) / 100
    : Math.round(rawTotal * 100) / 100;

  return {
    skill,
    startLevel,
    targetLevel,
    characterLevel,
    isRefined,
    unit,
    total: finalCost,
    unitNote: isRefined
      ? `Condensed Refined Biomass (Character Lv ${characterLevel || 11}+ / Ch. ${chapter}): 1 Refined Unit = ${LEVEL_11_BIOMASS_UNIT_SCALE} Standard Units.`
      : `Standard Pre-Refinement Biomass (Character Lv ${characterLevel || 1}).`,
    segments: [
      {
        from: startLevel,
        to: targetLevel,
        unit,
        cost: finalCost,
        source: "formula"
      }
    ]
  };
}

/**
 * Estimates digestion time in hours and human-readable text
 * @param {number} biomassAmount - Amount of biomass required (in current unit)
 * @param {number} digestionRatePerHour - Active digestion speed (BM/h)
 * @param {number} [passiveDigestionRatePerHour=0] - Passive digestion speed (BM/h)
 * @param {boolean} [isRefined=false] - Whether the amount is in refined units
 */
export function estimateDigestionTime(
  biomassAmount,
  digestionRatePerHour,
  passiveDigestionRatePerHour = 0,
  isRefined = false
) {
  if (!biomassAmount || biomassAmount <= 0) {
    return {
      activeHours: 0,
      activeFormatted: "0m",
      passiveHours: 0,
      passiveFormatted: "0m"
    };
  }

  // Standardize amount to match digestion rate scale
  const effectiveBiomass = isRefined ? biomassAmount * LEVEL_11_BIOMASS_UNIT_SCALE : biomassAmount;
  const activeRate = Math.max(0.01, digestionRatePerHour || 1);
  const activeHours = effectiveBiomass / activeRate;

  let passiveHours = null;
  let passiveFormatted = "N/A";
  if (passiveDigestionRatePerHour && passiveDigestionRatePerHour > 0) {
    passiveHours = effectiveBiomass / passiveDigestionRatePerHour;
    passiveFormatted = formatDuration(passiveHours);
  }

  return {
    activeHours: Math.round(activeHours * 100) / 100,
    activeFormatted: formatDuration(activeHours),
    passiveHours: passiveHours ? Math.round(passiveHours * 100) / 100 : null,
    passiveFormatted
  };
}

/**
 * Formats fractional hours into clean readable strings (e.g. "45m", "2h 15m", "1d 4h")
 * @param {number} hours
 * @returns {string}
 */
export function formatDuration(hours) {
  if (hours <= 0) return "0m";
  const totalMinutes = Math.round(hours * 60);
  if (totalMinutes < 60) {
    return `${totalMinutes}m`;
  }
  const days = Math.floor(totalMinutes / (24 * 60));
  const remainingHours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const remainingMinutes = totalMinutes % 60;

  if (days > 0) {
    return `${days}d ${remainingHours}h`;
  }
  if (remainingMinutes === 0) {
    return `${remainingHours}h`;
  }
  return `${remainingHours}h ${remainingMinutes}m`;
}

/**
 * Calculates portfolio upgrade cost across multiple skills for the current chapter
 * @param {Object} params
 * @param {Array<{skillId: string, startLevel: number, targetLevel: number}>} params.upgrades
 * @param {number} [params.characterLevel=1]
 * @param {number} [params.chapter=1]
 */
export function calculatePortfolioCost({ upgrades, characterLevel = 1, chapter = 1 }) {
  const isRefined = characterLevel >= 11 || chapter >= 201;
  const unit = isRefined ? "Refined BM" : "BM";
  const results = [];
  let totalCost = 0;

  for (const item of upgrades) {
    if (item.targetLevel <= item.startLevel) continue;
    try {
      const calc = calculateBiomassCost({
        skillId: item.skillId,
        startLevel: item.startLevel,
        targetLevel: item.targetLevel,
        characterLevel,
        chapter
      });
      results.push(calc);
      totalCost += calc.total;
    } catch {
      // Ignore invalid single entries in portfolio loop
    }
  }

  const roundedTotal = Math.round(totalCost * 100) / 100;

  return {
    upgrades: results,
    total: roundedTotal,
    unit,
    isRefined
  };
}
