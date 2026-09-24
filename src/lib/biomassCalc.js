export const LEVEL_11_BIOMASS_UNIT_SCALE = 1000;

export const BIOMASS_SKILLS = [
  {
    id: "magic_core",
    name: "Magic Core / Superior Magic Core",
    chapter: 25,
    preLevel11BaseCost: 10,
    preLevel11Growth: 1.13,
    notes:
      "Magic Core Level 1 to 2 is established at 10 Biomass before the Level 11 refinement."
  },
  {
    id: "natural_energy_core",
    name: "Natural Energy Core",
    chapter: 104,
    preLevel11BaseCost: 200,
    preLevel11Growth: 1.13,
    notes:
      "Natural Energy Core Level 1 to 2 is established at 200 Biomass before the Level 11 refinement."
  },
  {
    id: "viscous_flow",
    name: "Viscous Flow",
    chapter: 2,
    preLevel11BaseCost: 1,
    preLevel11Growth: 1.13,
    postLevel11KnownStepCosts: [{ from: 27, to: 28, cost: 0.2 }],
    notes:
      "Chapter 204 shows Viscous Flow Level 27 costing 0.2 refined Biomass units after Level 11."
  },
  {
    id: "efficient_digestion",
    name: "Efficient Digestion",
    chapter: 2,
    preLevel11BaseCost: 1,
    preLevel11Growth: 1.13,
    postLevel11KnownRanges: [{ from: 20, to: 40, cost: 8.67 }],
    notes:
      "Chapter 262 establishes the exact refined-unit spend for Level 20 to Level 40."
  },
  {
    id: "claw_projection",
    name: "Claw Projection",
    chapter: 258,
    postLevel11KnownRanges: [{ from: 1, to: 5, cost: 11.44 }],
    notes: "Chapter 262 establishes the exact refined-unit spend for Level 1 to Level 5."
  },
  {
    id: "synergy_link",
    name: "Synergy Link",
    chapter: 258,
    postLevel11KnownRanges: [{ from: 1, to: 5, cost: 29.22 }],
    notes: "Chapter 262 establishes the exact refined-unit spend for Level 1 to Level 5."
  },
  {
    id: "racial_command",
    name: "Racial Command",
    chapter: 258,
    postLevel11KnownRanges: [{ from: 1, to: 5, cost: 17.54 }],
    notes: "Chapter 262 establishes the exact refined-unit spend for Level 1 to Level 5."
  }
];

export function getBiomassSkill(skillId) {
  return BIOMASS_SKILLS.find((skill) => skill.id === skillId);
}

function assertLevel(value, label) {
  if (!Number.isInteger(value) || value < 1) {
    throw new Error(`${label} must be a positive integer`);
  }
}

function findKnownRange(skill, startLevel, targetLevel) {
  return (skill.postLevel11KnownRanges || []).find(
    (range) => range.from === startLevel && range.to === targetLevel
  );
}

function findKnownStep(skill, fromLevel) {
  return (skill.postLevel11KnownStepCosts || []).find((step) => step.from === fromLevel);
}

function calculatePreLevel11Cost(skill, startLevel, targetLevel) {
  if (!skill.preLevel11BaseCost) {
    return {
      cost: 0,
      unresolved: true,
      reason: "No pre-Level-11 base cost has been established for this skill."
    };
  }

  let cost = 0;
  for (let level = startLevel; level < targetLevel; level += 1) {
    cost += skill.preLevel11BaseCost * Math.pow(skill.preLevel11Growth || 1, level - 1);
  }

  return {
    cost: Math.round(cost * 100) / 100,
    unresolved: false
  };
}

function calculatePostLevel11Cost(skill, startLevel, targetLevel) {
  const knownRange = findKnownRange(skill, startLevel, targetLevel);
  if (knownRange) {
    return {
      cost: knownRange.cost,
      unresolved: false,
      source: "known-range"
    };
  }

  let cost = 0;
  for (let level = startLevel; level < targetLevel; level += 1) {
    const knownStep = findKnownStep(skill, level);
    if (!knownStep || knownStep.to !== level + 1) {
      return {
        cost: Math.round(cost * 100) / 100,
        unresolved: true,
        reason:
          "The source establishes the Level 11 refined-unit shift but not this post-Level-11 range."
      };
    }
    cost += knownStep.cost;
  }

  return {
    cost: Math.round(cost * 100) / 100,
    unresolved: false,
    source: "known-steps"
  };
}

export function calculateBiomassCost({ skillId, startLevel, targetLevel }) {
  const skill = getBiomassSkill(skillId);
  if (!skill) {
    throw new Error(`Unknown biomass skill: ${skillId}`);
  }

  assertLevel(startLevel, "startLevel");
  assertLevel(targetLevel, "targetLevel");
  if (targetLevel <= startLevel) {
    throw new Error("targetLevel must be greater than startLevel");
  }

  const segments = [];
  let total = 0;
  let unresolved = false;
  const unresolvedReasons = [];
  const postLevel11Only =
    !skill.preLevel11BaseCost &&
    Boolean((skill.postLevel11KnownRanges || []).length || (skill.postLevel11KnownStepCosts || []).length);

  if (startLevel < 11 && !postLevel11Only) {
    const preTarget = Math.min(targetLevel, 11);
    const pre = calculatePreLevel11Cost(skill, startLevel, preTarget);
    segments.push({
      from: startLevel,
      to: preTarget,
      unit: "pre_level_11_biomass",
      cost: pre.cost,
      status: pre.unresolved ? "NEEDS_HUMAN_REVIEW" : "CONFIRMED"
    });
    total += pre.cost;
    if (pre.unresolved) {
      unresolved = true;
      unresolvedReasons.push(pre.reason);
    }
  }

  if (targetLevel > 11 || postLevel11Only) {
    const postStart = postLevel11Only ? startLevel : Math.max(startLevel, 11);
    const post = calculatePostLevel11Cost(skill, postStart, targetLevel);
    segments.push({
      from: postStart,
      to: targetLevel,
      unit: "post_level_11_refined_biomass",
      cost: post.cost,
      status: post.unresolved ? "NEEDS_HUMAN_REVIEW" : "CONFIRMED"
    });
    total += post.cost;
    if (post.unresolved) {
      unresolved = true;
      unresolvedReasons.push(post.reason);
    }
  }

  return {
    skill,
    startLevel,
    targetLevel,
    total: Math.round(total * 100) / 100,
    status: unresolved ? "NEEDS_HUMAN_REVIEW" : "CONFIRMED",
    unitNote:
      targetLevel > 11
        ? `Post-Level-11 refined Biomass units are worth ${LEVEL_11_BIOMASS_UNIT_SCALE} pre-refinement Biomass units.`
        : "Pre-Level-11 Biomass units.",
    unresolvedReasons: [...new Set(unresolvedReasons)],
    segments
  };
}
