export const LEVEL_11_BIOMASS_UNIT_SCALE = 1000;

export const BIOMASS_SKILL_COSTS = [
  {
    id: "magic_core",
    preLevel11BaseCost: 10,
    preLevel11Growth: 1.13,
    notes: "Magic Core Level 1 to 2 is established at 10 Biomass before the Level 11 refinement."
  },
  {
    id: "natural_energy_core",
    preLevel11BaseCost: 200,
    preLevel11Growth: 1.13,
    notes:
      "Natural Energy Core Level 1 to 2 is established at 200 Biomass before the Level 11 refinement."
  },
  {
    id: "viscous_flow",
    preLevel11BaseCost: 1,
    preLevel11Growth: 1.13,
    postLevel11KnownStepCosts: [{ from: 27, to: 28, cost: 0.2 }],
    notes:
      "Chapter 204 shows Viscous Flow Level 27 costing 0.2 refined Biomass units after Level 11."
  },
  {
    id: "efficient_digestion",
    preLevel11BaseCost: 1,
    preLevel11Growth: 1.13,
    postLevel11KnownRanges: [{ from: 20, to: 40, cost: 8.67 }],
    notes: "Chapter 262 establishes the exact refined-unit spend for Level 20 to Level 40."
  },
  {
    id: "claw_projection",
    postLevel11KnownRanges: [{ from: 1, to: 5, cost: 11.44 }],
    notes: "Chapter 262 establishes the exact refined-unit spend for Level 1 to Level 5."
  },
  {
    id: "synergy_link",
    postLevel11KnownRanges: [{ from: 1, to: 5, cost: 29.22 }],
    notes: "Chapter 262 establishes the exact refined-unit spend for Level 1 to Level 5."
  },
  {
    id: "racial_command",
    postLevel11KnownRanges: [{ from: 1, to: 5, cost: 17.54 }],
    notes: "Chapter 262 establishes the exact refined-unit spend for Level 1 to Level 5."
  }
];
