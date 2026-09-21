/**
 * @typedef {Object} AbilityUpgrade
 * @property {number} chapter - Chapter in which this upgrade/trait unlocks
 * @property {string} type - Upgrade type (e.g. "trait", "fusion", "evolution")
 * @property {string} [traitName] - Name of the unlocked trait
 * @property {string} [traitDescription] - Lore and functional description of the trait
 * @property {string} [name] - Upgraded ability name if renamed
 * @property {string} [description] - Upgraded description
 * @property {number} [level] - Direct level jump or setting
 * @property {string[]} [absorbs] - IDs of absorbed abilities
 */

/**
 * @typedef {Object} Ability
 * @property {string} id - Unique identifier for the ability
 * @property {string} name - Display name
 * @property {string[]} [aliases] - Alternative canonical search/match terms
 * @property {"digestion"|"mana"|"speed"|"none"} target - Stat axis modified
 * @property {number} [value] - Stat calculation multiplier or factor
 * @property {number} chapter - Chapter in which the ability is unlocked
 * @property {string} [description] - In-depth description of the skill
 * @property {string} [effect] - Formatted mathematical or functional stat effect summary
 * @property {string|string[]} [replaces] - ID of prior ability replaced by this evolution
 * @property {string|string[]} [absorbs] - IDs of abilities absorbed by this ability
 * @property {AbilityUpgrade[]} [upgrades] - Trait milestones and evolutions
 */

/**
 * @typedef {Object} BaseStats
 * @property {number} mana - Baseline Mana pool
 * @property {number} speed - Baseline Speed factor
 * @property {number} digestion - Baseline Digestion throughput
 */

/**
 * @typedef {Object} CharacterData
 * @property {string} name - Character name
 * @property {string} race - Current baseline race
 * @property {string} raceBase - Rarity tier of race
 * @property {string} class - Current class
 * @property {string} classBase - Rarity tier of class
 * @property {number} level - Starting level
 * @property {BaseStats} baseStats - Starting base stats
 * @property {Ability[]} abilities - Unlocked abilities and trait trees
 */

/**
 * @typedef {Object} ProgressionMilestone
 * @property {number} chapter - Chapter in which milestone is reached
 * @property {number} level - New ability level
 */

/** @type {CharacterData} */
export const characterData = {
  name: "Halon",
  race: "Slime",
  raceBase: "Mythical",
  class: "Devourer",
  classBase: "Mythical",
  level: 1,
  baseStats: {
    mana: 10,
    speed: 0.25,
    digestion: 1.8
  },
  abilities: [
    {
      id: "efficient_digestion",
      name: "Efficient Digestion",
      target: "digestion",
      value: 0.1,
      chapter: 2,
      description: "Increases the speed at which organic matter is dissolved.",
      effect: "+10% to current Digestion rate.",
      upgrades: [
        {
          chapter: 23,
          type: "trait",
          traitName: "Digestive Filter",
          traitDescription:
            "The organism is now able to identify and isolate specific components during molecular breakdown. It can choose not to digest certain parts of an object or creature, keeping them intact inside its body or expelling them after cleaning."
        }
      ]
    },
    {
      id: "viscous_flow",
      name: "Viscous Flow",
      target: "speed",
      value: 0.1,
      chapter: 2,
      description: "Increases agility in controlling one’s own body.",
      effect: "+10% of current agility and controls.",
      upgrades: [
        {
          chapter: 27,
          type: "trait",
          traitName: "Selective Viscosity",
          traitDescription:
            "The organism can now alter the viscosity of the part of the body in contact with the ground to become perfectly slippery or extremely adhesive at will."
        }
      ]
    },
    {
      id: "structural_stability",
      name: "Structural Stability",
      target: "none",
      value: 1.0,
      chapter: 2,
      description: "Improves basic body control.",
      upgrades: [
        {
          chapter: 47,
          type: "trait",
          traitName: "Morphological Memory",
          traitDescription:
            "After understanding a new physical deformity, it is possible to learn and memorize that shape, reducing biomass cost and energy required to maintain complex body forms."
        }
      ]
    },
    {
      id: "hemolymphatic_tissue",
      name: "Hemolymphatic Tissue",
      target: "digestion",
      value: 0.2,
      chapter: 4,
      description:
        "Pulsating channels adapted from the larva react to pain and stress stimuli. During combat or under active damage, the conversion of absorbed matter into vital energy is accelerated.",
      effect: "(Combat Only) Multiplies Digestion by additional 20% × level.",
      upgrades: [
        {
          chapter: 100,
          type: "trait",
          traitName: "Bio-Synthetic Mana Circulation",
          traitDescription:
            "The hemolymphatic system becomes capable of channeling byproducts of accelerated molecular breakdown directly to the core. During the processing of biomass under combat stress, a percentage of the converted matter is refined into pure mana, replenishing the user’s reservoir proportionally to the digestion rate."
        }
      ]
    },
    {
      id: "passive_digestion",
      name: "Passive Digestion",
      target: "digestion",
      value: 0.1,
      chapter: 5,
      description:
        "The body develops autonomous microprocesses of energy conversion, absorbing traces of mana and matter from the environment. It slowly generates Biomass even at rest.",
      effect: "Adds +10% × level to Digestion."
    },
    {
      id: "mass_expansion",
      name: "Mass Expansion",
      target: "digestion",
      value: 0.3,
      chapter: 9,
      description: "Increases maximum Bio-Mass capacity and body volume proportionally.",
      effect: "Adds +30% × level to Digestion (additive)."
    },
    {
      id: "membrane_reinforcement",
      name: "Membrane Reinforcement",
      target: "none",
      value: 1.0,
      chapter: 2,
      description:
        "Thickens the outer gelatinous membrane, increasing resistance to physical impacts and sharp edges.",
      upgrades: [
        {
          chapter: 80,
          type: "trait",
          traitName: "Non-Newtonian Resilience",
          traitDescription:
            "The membrane is now able to instantly change its molecular viscosity in response to kinetic force."
        }
      ]
    },
    {
      id: "instinctive_perception",
      name: "Instinctive Perception",
      target: "none",
      value: 0.0,
      chapter: 8,
      description: "Detects nearby vibrations and movements.",
      upgrades: [
        {
          chapter: 80,
          type: "trait",
          traitName: "Spatial Echo Location",
          traitDescription:
            "The core now interprets atmospheric and ground vibrations as a continuous three-dimensional mapping, independent of line of sight, limited to the distance of the target."
        }
      ]
    },
    {
      id: "reinforced_exoskeleton",
      name: "Reinforced Exoskeleton",
      target: "none",
      chapter: 11,
      description: "Consumes Biomass to generate a resistant Exoskeleton around the body."
    },
    {
      id: "obsidian_exoskeleton",
      name: "Obsidian Exoskeleton",
      target: "none",
      chapter: 71,
      replaces: "reinforced_exoskeleton",
      description:
        "Consumes biomass reserves to generate a rigid, near-indestructible Obsidian shell."
    },
    {
      id: "body_density",
      name: "Body Density",
      target: "none",
      value: 0.1,
      chapter: 14,
      description: "Consumes Biomass to increase body density.",
      effect: "+10% × level to Body Density."
    },
    {
      id: "partial_division",
      name: "Partial Division",
      target: "digestion",
      value: 0.3,
      chapter: 16,
      description: "Consumes biomass to create a small extension to collect nearby matter.",
      effect: "Adds +10% × level to Digestion."
    },
    {
      id: "memory_resonance",
      name: "Memory Resonance",
      target: "none",
      value: 0.0,
      chapter: 25,
      description:
        "By absorbing another creature’s brain or core, Memory Fragments and the creature’s instincts can be absorbed."
    },
    {
      id: "magic_core",
      name: "Magic Core",
      target: "mana",
      value: 0.1,
      chapter: 25,
      description:
        "The vital core undergoes a qualitative transmutation, becoming a magical energy engine. It emits constant pulses that saturate the cellular structure, forcing the opening of conductivity channels (Mana Paths) through the biomass to support, filter, and circulate raw energy throughout the organism.",
      effect: "Compounds ×1.10 per level on Mana.",
      upgrades: [
        {
          chapter: 100,
          type: "trait",
          traitName: "Parallel Processing Core",
          traitDescription:
            "The vital core expands its internal architecture to support the opening of multiple independent mana paths operating simultaneously, allowing clones and main body to channel spells concurrently."
        }
      ]
    },
    {
      id: "ice_spike",
      name: "Ice Spike",
      target: "none",
      value: 0.15,
      chapter: 26,
      description:
        "Channels concentrated frozen mana to conjure and launch a crystalline ice projectile."
    },
    {
      id: "chemosensory_aptitude",
      name: "Chemosensory Aptitude",
      target: "none",
      value: 0.0,
      chapter: 30,
      description:
        "The outer membrane can detect odor particles and mana residues in a much more refined way."
    },
    {
      id: "pigmentation_mimicry",
      name: "Pigmentation Mimicry",
      target: "none",
      value: 0.0,
      chapter: 41,
      description:
        "Rewires skin chromatophores to mirror surrounding textures as active camouflage."
    },
    {
      id: "pack_instinct",
      name: "Pack Instinct",
      target: "none",
      value: 0.0,
      chapter: 49,
      description:
        "The user’s consciousness projects beyond the main core, establishing a sensory and motor link with allied or subordinate units."
    },
    {
      id: "magic_harmonizer",
      name: "Magic Core Harmonizer",
      target: "none",
      value: 0.0,
      chapter: 54,
      description:
        "Synchronizes the Magic Core's mana output cadence with physical motor signals to reduce conversion loss during active skill usage."
    },
    {
      id: "monocular_vision",
      name: "Telescopic Vision",
      target: "none",
      value: 0.0,
      chapter: 55,
      description:
        "Narrows peripheral focus into a precise long-range zoom, improving spatial reaction time."
    },
    {
      id: "heavy_weapons_affinity",
      name: "Affinity with Heavy Weapons",
      target: "none",
      value: 0.0,
      chapter: 55,
      description:
        "Assimilates muscle memory to handle heavy impact weapons and axes with enhanced balance and leverage."
    },
    {
      id: "static_shadow",
      name: "Static Shadow",
      target: "none",
      value: 0.0,
      chapter: 55,
      description:
        "Alters body pigmentation and density to blend seamlessly into shadows as long as the user remains completely motionless."
    },
    {
      id: "magic_weaving",
      name: "Magic Weaving",
      target: "none",
      value: 0.0,
      chapter: 61,
      description:
        "Produces biological threads fused with mana, creating highly adhesive webs capable of immobilizing targets and siphoning energy."
    },
    {
      id: "thermographic_perception",
      name: "Thermographic Perception",
      aliases: ["Thermal Perception"],
      target: "none",
      value: 0.0,
      chapter: 68,
      description:
        "Maps thermal signatures of living beings through the membrane's infrared sensitivity, detecting hidden or camouflaged targets in total darkness."
    },
    {
      id: "threshold_mimicry",
      name: "Threshold Mimicry",
      target: "none",
      value: 0.0,
      chapter: 68,
      description:
        "While in shadowed or dark environments, the body passively absorbs ambient darkness to suppress its own visual signature against low-level detection."
    },
    {
      id: "biological_elasticity",
      name: "Biological Elasticity",
      target: "none",
      value: 0.0,
      chapter: 80,
      description: "Improves biological compression and elastic recovery capacity."
    },
    {
      id: "hydrophobic_coating",
      name: "Hydrophobic Coating",
      target: "none",
      value: 0.0,
      chapter: 80,
      description: "Reduces the dilution of gelatinous mass in contact with water."
    },
    {
      id: "poison_production",
      name: "Poison Production",
      target: "none",
      value: 0.0,
      chapter: 88,
      description: "Consumes biomass to produce small amounts of poison."
    }
  ]
};

export const charactersData = {
  halon: characterData
};

/** @type {Record<string, ProgressionMilestone[]>} */
export const abilityProgression = {
  efficient_digestion: [
    { chapter: 2, level: 1 },
    { chapter: 4, level: 2 },
    { chapter: 9, level: 6 },
    { chapter: 14, level: 7 },
    { chapter: 15, level: 8 },
    { chapter: 20, level: 10 },
    { chapter: 23, level: 11 },
    { chapter: 27, level: 12 },
    { chapter: 28, level: 13 },
    { chapter: 33, level: 14 },
    { chapter: 47, level: 15 },
    { chapter: 68, level: 16 }
  ],
  viscous_flow: [
    { chapter: 2, level: 1 },
    { chapter: 3, level: 3 },
    { chapter: 10, level: 8 },
    { chapter: 22, level: 9 },
    { chapter: 25, level: 10 },
    { chapter: 27, level: 11 },
    { chapter: 28, level: 12 },
    { chapter: 31, level: 13 },
    { chapter: 41, level: 14 },
    { chapter: 47, level: 16 },
    { chapter: 83, level: 18 },
    { chapter: 93, level: 23 },
    { chapter: 98, level: 24 }
  ],
  structural_stability: [
    { chapter: 2, level: 1 },
    { chapter: 8, level: 2 },
    { chapter: 14, level: 3 },
    { chapter: 16, level: 4 },
    { chapter: 17, level: 5 },
    { chapter: 22, level: 6 },
    { chapter: 30, level: 8 },
    { chapter: 33, level: 9 },
    { chapter: 47, level: 11 },
    { chapter: 93, level: 17 },
    { chapter: 98, level: 18 }
  ],
  hemolymphatic_tissue: [
    { chapter: 4, level: 1 },
    { chapter: 13, level: 2 },
    { chapter: 14, level: 3 },
    { chapter: 22, level: 4 },
    { chapter: 41, level: 5 },
    { chapter: 47, level: 7 },
    { chapter: 93, level: 10 },
    { chapter: 100, level: 11 }
  ],
  passive_digestion: [
    { chapter: 5, level: 1 },
    { chapter: 9, level: 2 },
    { chapter: 15, level: 3 },
    { chapter: 22, level: 4 },
    { chapter: 27, level: 5 },
    { chapter: 80, level: 6 },
    { chapter: 93, level: 8 }
  ],
  mass_expansion: [
    { chapter: 9, level: 1 },
    { chapter: 12, level: 2 },
    { chapter: 15, level: 3 },
    { chapter: 17, level: 4 },
    { chapter: 22, level: 5 },
    { chapter: 35, level: 6 },
    { chapter: 47, level: 7 },
    { chapter: 55, level: 8 },
    { chapter: 71, level: 9 }
  ],
  membrane_reinforcement: [
    { chapter: 16, level: 3 },
    { chapter: 22, level: 6 },
    { chapter: 30, level: 9 },
    { chapter: 33, level: 10 },
    { chapter: 80, level: 11 },
    { chapter: 87, level: 12 },
    { chapter: 93, level: 22 },
    { chapter: 98, level: 23 }
  ],
  instinctive_perception: [
    { chapter: 12, level: 1 },
    { chapter: 15, level: 2 },
    { chapter: 16, level: 3 },
    { chapter: 22, level: 4 },
    { chapter: 27, level: 5 },
    { chapter: 33, level: 6 },
    { chapter: 55, level: 8 },
    { chapter: 68, level: 9 },
    { chapter: 80, level: 11 },
    { chapter: 93, level: 15 }
  ],
  reinforced_exoskeleton: [
    { chapter: 11, level: 1 },
    { chapter: 15, level: 2 },
    { chapter: 22, level: 4 },
    { chapter: 33, level: 5 },
    { chapter: 55, level: 7 }
  ],
  obsidian_exoskeleton: [
    { chapter: 71, level: 1 },
    { chapter: 93, level: 3 },
    { chapter: 96, level: 4 }
  ],
  body_density: [
    { chapter: 14, level: 1 },
    { chapter: 16, level: 3 },
    { chapter: 22, level: 4 },
    { chapter: 33, level: 5 },
    { chapter: 41, level: 6 },
    { chapter: 55, level: 7 },
    { chapter: 68, level: 8 },
    { chapter: 83, level: 9 },
    { chapter: 96, level: 10 }
  ],
  partial_division: [
    { chapter: 16, level: 1 },
    { chapter: 22, level: 2 },
    { chapter: 40, level: 3 },
    { chapter: 93, level: 7 }
  ],
  memory_resonance: [
    { chapter: 25, level: 1 },
    { chapter: 33, level: 2 },
    { chapter: 55, level: 5 }
  ],
  magic_core: [
    { chapter: 25, level: 1 },
    { chapter: 26, level: 3 },
    { chapter: 40, level: 4 },
    { chapter: 54, level: 7 },
    { chapter: 100, level: 11 }
  ],
  ice_spike: [{ chapter: 26, level: 1 }],
  chemosensory_aptitude: [
    { chapter: 30, level: 1 },
    { chapter: 33, level: 2 },
    { chapter: 55, level: 5 },
    { chapter: 68, level: 7 },
    { chapter: 93, level: 11 }
  ],
  pigmentation_mimicry: [{ chapter: 41, level: 1 }],
  pack_instinct: [
    { chapter: 49, level: 1 },
    { chapter: 55, level: 3 },
    { chapter: 96, level: 10 }
  ],
  magic_harmonizer: [
    { chapter: 54, level: 2 },
    { chapter: 93, level: 7 },
    { chapter: 100, level: 8 }
  ],
  monocular_vision: [
    { chapter: 55, level: 1 },
    { chapter: 93, level: 9 }
  ],
  heavy_weapons_affinity: [{ chapter: 55, level: 1 }],
  static_shadow: [{ chapter: 55, level: 1 }],
  magic_weaving: [
    { chapter: 61, level: 1 },
    { chapter: 93, level: 3 }
  ],
  thermographic_perception: [
    { chapter: 68, level: 1 },
    { chapter: 68, level: 4 },
    { chapter: 93, level: 9 }
  ],
  threshold_mimicry: [{ chapter: 68, level: 1 }],
  biological_elasticity: [
    { chapter: 80, level: 1 },
    { chapter: 93, level: 5 }
  ],
  hydrophobic_coating: [
    { chapter: 80, level: 1 },
    { chapter: 93, level: 3 }
  ],
  poison_production: [
    { chapter: 88, level: 1 },
    { chapter: 93, level: 7 }
  ]
};
