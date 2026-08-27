import { writable, derived } from 'svelte/store';

// Get saved chapter from localStorage or default to 1
const savedChapter = typeof window !== 'undefined' ? localStorage.getItem('slime_elysium_chapter') : null;
const initialChapter = savedChapter ? parseInt(savedChapter, 10) : 1;

// Global Chapter Lock Store (Default: 1 or User's Last Choice)
export const currentChapter = writable(initialChapter);

if (typeof window !== 'undefined') {
  currentChapter.subscribe(value => {
    localStorage.setItem('slime_elysium_chapter', value.toString());
  });
}

// Chapters Timeline Database (Canon mapped dates and levels)
export const chaptersData = [
  { index: 1, title: "World Without Hope", date: "Feb 01, 2026", halonLvl: 1 },
  { index: 2, title: "Biological Evolution", date: "Feb 01, 2026", halonLvl: 1 },
  { index: 3, title: "Speed, I am Speed", date: "Feb 01, 2026", halonLvl: 1 },
  { index: 4, title: "Danger", date: "Feb 02, 2026", halonLvl: 1 },
  { index: 5, title: "Passive Gains!", date: "Feb 02, 2026", halonLvl: 1 },
  { index: 6, title: "College", date: "Feb 02, 2026", halonLvl: 1 },
  { index: 7, title: "Vance", date: "Feb 03, 2026", halonLvl: 1 },
  { index: 8, title: "Evolution", date: "Feb 03, 2026", halonLvl: 1 },
  { index: 9, title: "Literal Growth!", date: "Feb 03, 2026", halonLvl: 1 },
  { index: 10, title: "AntSlayer", date: "Feb 04, 2026", halonLvl: 1 },
  { index: 11, title: "Evolution!", date: "Feb 04, 2026", halonLvl: 1 },
  { index: 12, title: "Big Slime", date: "Feb 04, 2026", halonLvl: 1 },
  { index: 13, title: "Gelatinous Battle!", date: "Feb 05, 2026", halonLvl: 1 },
  { index: 14, title: "Carnage", date: "Feb 05, 2026", halonLvl: 1 },
  { index: 15, title: "Energy", date: "Feb 05, 2026", halonLvl: 1 },
  { index: 16, title: "Clone!", date: "Feb 06, 2026", halonLvl: 1 },
  { index: 17, title: "Noise", date: "Feb 06, 2026", halonLvl: 1 },
  { index: 18, title: "Crazy Girl", date: "Feb 06, 2026", halonLvl: 1 },
  { index: 19, title: "Mana Stone", date: "Feb 07, 2026", halonLvl: 1 },
  { index: 20, title: "Changes", date: "Feb 07, 2026", halonLvl: 1 },
  { index: 21, title: "Mythical Reject", date: "Feb 07, 2026", halonLvl: 1 },
  { index: 22, title: "Growth", date: "Feb 08, 2026", halonLvl: 1 },
  { index: 23, title: "New Feature", date: "Feb 08, 2026", halonLvl: 1 },
  { index: 24, title: "Competitor", date: "Feb 08, 2026", halonLvl: 1 },
  { index: 25, title: "Bird?", date: "Feb 09, 2026", halonLvl: 1 },
  { index: 26, title: "Spike", date: "Feb 09, 2026", halonLvl: 1 },
  { index: 27, title: "Observer", date: "Feb 09, 2026", halonLvl: 1 },
  { index: 28, title: "31 People?", date: "Feb 10, 2026", halonLvl: 1 },
  { index: 29, title: "Creature", date: "Feb 10, 2026", halonLvl: 1 },
  { index: 30, title: "Bloody Fight", date: "Feb 10, 2026", halonLvl: 1 },
  { index: 31, title: "Strange Situation", date: "Feb 11, 2026", halonLvl: 1 },
  { index: 32, title: "Ego", date: "Feb 11, 2026", halonLvl: 1 },
  { index: 33, title: "Familiar Smell", date: "Feb 11, 2026", halonLvl: 1 },
  { index: 34, title: "Stressful Encounter", date: "Feb 12, 2026", halonLvl: 1 },
  { index: 35, title: "Invitation", date: "Feb 12, 2026", halonLvl: 1 },
  { index: 36, title: "Guild", date: "Feb 12, 2026", halonLvl: 1 },
  { index: 37, title: "Lisa", date: "Feb 13, 2026", halonLvl: 1 },
  { index: 38, title: "New Mount", date: "Feb 13, 2026", halonLvl: 1 },
  { index: 39, title: "Adrenaline", date: "Feb 13, 2026", halonLvl: 1 },
  { index: 40, title: "Scammed", date: "Feb 14, 2026", halonLvl: 1 },
  { index: 41, title: "Level 02", date: "Feb 14, 2026", halonLvl: 2 },
  { index: 42, title: "Level 02 Changes", date: "Feb 14, 2026", halonLvl: 2 },
  { index: 43, title: "Wrong Data", date: "Feb 15, 2026", halonLvl: 2 },
  { index: 44, title: "Showing Something Cool", date: "Feb 15, 2026", halonLvl: 2 },
  { index: 45, title: "Real World", date: "Feb 15, 2026", halonLvl: 2 },
  { index: 46, title: "Open World", date: "Feb 16, 2026", halonLvl: 2 },
  { index: 47, title: "Evolutions", date: "Feb 16, 2026", halonLvl: 2 },
  { index: 48, title: "10 In Me 40 In You", date: "Feb 16, 2026", halonLvl: 2 },
  { index: 49, title: "Level 03", date: "Feb 17, 2026", halonLvl: 3 },
  { index: 50, title: "Confrontation", date: "Feb 17, 2026", halonLvl: 3 },
  { index: 51, title: "Trap", date: "Feb 18, 2026", halonLvl: 3 },
  { index: 52, title: "Suspicious Presentation", date: "Feb 18, 2026", halonLvl: 3 },
  { index: 53, title: "Reward", date: "Feb 19, 2026", halonLvl: 3 },
  { index: 54, title: "Great Harvest!", date: "Feb 19, 2026", halonLvl: 3 },
  { index: 55, title: "Many Evolutions!", date: "Feb 20, 2026", halonLvl: 3 },
  { index: 56, title: "Gift", date: "Feb 20, 2026", halonLvl: 3 },
  { index: 57, title: "Inside Information", date: "Feb 21, 2026", halonLvl: 3 },
  { index: 58, title: "Evolution in the Real World", date: "Feb 21, 2026", halonLvl: 3 },
  { index: 59, title: "Anger", date: "Feb 22, 2026", halonLvl: 3 },
  { index: 60, title: "Humiliation", date: "Feb 22, 2026", halonLvl: 3 },
  { index: 61, title: "Weaver Spider", date: "Feb 22, 2026", halonLvl: 3 },
  { index: 62, title: "Oppressive Memories", date: "Feb 22, 2026", halonLvl: 3 },
  { index: 63, title: "Spider-Slime", date: "Feb 23, 2026", halonLvl: 3 },
  { index: 64, title: "Valuable Reward", date: "Feb 23, 2026", halonLvl: 3 },
  { index: 65, title: "Money?!", date: "Feb 23, 2026", halonLvl: 3 },
  { index: 66, title: "Skipping Class", date: "Feb 24, 2026", halonLvl: 3 },
  { index: 67, title: "Serpent’s Crevice", date: "Feb 24, 2026", halonLvl: 3 },
  { index: 68, title: "Many Evolutions", date: "Feb 24, 2026", halonLvl: 3 },
  { index: 69, title: "Giant Snake", date: "Feb 25, 2026", halonLvl: 3 },
  { index: 70, title: "Giant Snake 2", date: "Feb 25, 2026", halonLvl: 3 },
  { index: 71, title: "Level 04!", date: "Feb 25, 2026", halonLvl: 4 }
];

// Active Chapter Details Store
export const activeChapterDetails = derived(
  [currentChapter],
  ([$ch]) => {
    return chaptersData.find(c => c.index === $ch) || {
      index: $ch,
      title: "Unknown Chapter",
      date: "N/A",
      halonLvl: "N/A"
    };
  }
);

// Encyclopedia Database
export const encyclopediaData = {
  races: [
    { name: "Mythical Slime", base: "Mythical", description: "The baseline evolutionary form Lohan receives. Extremely rare but slow to level up.", chapter: 1 },
    { name: "Human", base: "Common", description: "The standard baseline race. Many are poor citizens in real-world sectors.", chapter: 1 },
    { name: "Elf", base: "Uncommon", description: "A forest-dwelling bipedal race with sharp senses, light speed, and deep attunement to nature.", chapter: 17 },
    { name: "Goblin", base: "Common", description: "Low-level humanoid monsters that form scouting packs. Fragile but dangerous in groups.", chapter: 19 },
    { name: "Dwarf", base: "Common", description: "A classic fantasy race mentioned as a premium choice that guilds recruit.", chapter: 1 },
    { name: "Werewolf", base: "Rare", description: "Another premium beast-human race high-level guilds pay fortunes for.", chapter: 1 },
    { name: "Spirit Fox", base: "Legendary", description: "A legendary beast race with high agility, stealth, spiritual affinity, and telepathic abilities.", chapter: 36 },
    { name: "High Elf", base: "Epic", description: "An ancient elven lineage characterized by deep mana connections, which built the capital Thalendor.", chapter: 45 },
    { name: "Dark Elf", base: "Epic", description: "An elven lineage that split after the Great Rupture and isolated itself in the deep underground.", chapter: 45 }
  ],
  classes: [
    { name: "Devourer", base: "Mythical", description: "Focuses on absorbing biological materials (Biomass) to grow, evolve, and assimilate enemy traits.", chapter: 1 },
    { name: "Paladin", base: "Rare", description: "A holy warrior focused on exorcising lost demons in clean zones. Earns premium credits.", chapter: 6 },
    { name: "Squire", base: "Common", description: "A trainee knight focused on martial exercises and physical training, which alleviates body pain.", chapter: 20 },
    { name: "Monk", base: "Common", description: "A holy martial artist who vows poverty but uses spiritual willpower to sharpen their mind.", chapter: 20 },
    { name: "Archer", base: "Common", description: "A ranged class focused on long-distance tracking, raising the player's physical reflexes.", chapter: 20 },
    { name: "Wizard", base: "Common", description: "A magical spellcaster class requiring the memorization of complex chant phrases to channel powerful spells.", chapter: 21 },
    { name: "Assassin", base: "Common", description: "A stealth-oriented physical class that utilizes poisons and swift mobility skills.", chapter: 50 }
  ],
  monsters: [
    { name: "Larva", description: "A slimy, translucent forest insect that clings to hosts and drains their biomass. Sucks vital energy.", chapter: 4 },
    { name: "Giant Slime", description: "A massive, mutated slime that grew by devouring other slimes' cores. Highly aggressive.", chapter: 3 },
    { name: "Scout Ant", description: "Large, explorer ant. Fast and has high motion perception, mapping coordinates for the colony.", chapter: 10 },
    { name: "Scout Leader Ant", description: "Larger and tougher than standard scouts, with curved metallic jaws and thick shell.", chapter: 11 },
    { name: "Beetle", description: "A forest insect with a strong chitin structure. Consuming it unlocks advanced Exoskeleton capabilities.", chapter: 15 },
    { name: "White Fox", description: "A silent, rare woodland creature that observes slimes with mysterious confusion.", chapter: 16 },
    { name: "Weaver Spider", description: "A Level 11 arachnid monster whose mana stone contains dense, high-grade magical residues.", chapter: 32 },
    { name: "Kobold", description: "Canine humanoid forest monsters that are slightly superior to Goblins and guard camp areas.", chapter: 39 },
    { name: "Gray Wolf", description: "A swift forest predator that coordinates and hunts in packs, ranging from Level 1 to 2.", chapter: 47 },
    { name: "Bear", description: "A large forest beast ranging from Level 2 to 4, representing a significant source of experience.", chapter: 49 }
  ],
  factions: [
    { name: "Vance Group", description: "An inter-planetary mega-corporation that controls colonies, satellites, patents, and hospitals.", chapter: 6 }
  ],
  dungeons: [],
  technology: [
    { name: "Neural Helmet", description: "Dystopian hardware enabling full-sensory immersion into Elysium. Highly expensive.", chapter: 1 },
    { name: "Nutritional Powder", description: "Rancid metal-tasting food paste eaten by citizens of the Lower Zone.", chapter: 1 },
    { name: "Flying Bus", description: "Air-transit bus crossing the dark smog layers from the Lower Zone to the Upper Zone.", chapter: 6 },
    { name: "Mana Stone", description: "A concentrated crystal of pure mana that slimes love to absorb, giving massive biomass (98 units).", chapter: 19 },
    { name: "Flying Motorcycle", description: "A high-speed single-rider sky craft used by upper-zone citizens, often breaking altitude limits.", chapter: 20 },
    { name: "Dungeon Core", description: "A high-tier monster drop required for non-human races to establish recognized guilds in Elysium.", chapter: 36 },
    { name: "Sovereignty Seal", description: "A systemic key required to claim monster territories and obtain official faction status.", chapter: 36 },
    { name: "Artificial Magic Core Harmonizer", description: "An organ that reduces casting latency by syncing Magic Core mana flow with physical needs.", chapter: 54 }
  ]
};

// Raw Character Data (Base stats & abilities)
export const charactersData = {
  halon: {
    name: "Halon",
    race: "Slime",
    raceBase: "Mythical",
    class: "Devourer",
    classBase: "Mythical",
    level: 1,
    baseStats: {
      mana: 10,
      speed: 0.25,
      digestion: 10.48
    },
    abilities: [
      {
        id: "efficient_digestion",
        name: "Efficient Digestion",
        target: "digestion",
        type: "exponential",
        value: 0.10,
        level: 10,
        chapter: 2,
        description: "Optimizes the enzymatic breakdown of absorbed matter, accelerating cellular processing.",
        effect: "Compounds ×1.10 per level on Digestion.",
        upgrades: [
          { chapter: 33, name: "Hyper Efficient Digestion", description: "Mastery over dissolving biology, with residual energy spilling into mana.", effect: "Compounds ×1.10 per level on Digestion. Also compounds ×1.01 per level on Mana" }
        ]
      },
      {
        id: "viscous_flow",
        name: "Viscous Flow",
        target: "speed",
        type: "multiplicative",
        value: 0.10,
        level: 8,
        chapter: 2,
        description: "Improves motor control of the gelatin body, enabling smoother and faster locomotion.",
        effect: "Compounds ×1.10 per level on Agility.",
        upgrades: [
          { chapter: 68, name: "Liquid Shadow Shift", type: "fusion", absorbs: ["pigmentation_mimicry"], description: "Fuses camouflage instincts with fluid motor control into a single seamless reflex.", effect: "Compounds ×1.12 per level on Agility (upgraded from ×1.10)." }
        ]
      },
      { id: "structural_stability", name: "Structural Stability", target: "none", type: "additive", value: 1.0, level: 5, chapter: 8, description: "Reinforces the internal gelatinous lattice, reducing uncontrolled deformations and slippage." },
      { id: "hemolymphatic_tissue", name: "Hemolymphatic Tissue", target: "digestion", type: "multiplicative", value: 0.20, level: 3, chapter: 4, description: "During active combat, hemolymph flood accelerates biomass conversion into vital energy.", effect: "(Combat Only) Multiplies Digestion by ×(1 + 0.20 × level)." },
      { id: "passive_digestion", name: "Passive Digestion", target: "digestion", type: "additive", value: 0.10, level: 3, chapter: 5, description: "Maintains a steady trickle of biomass conversion even while stationary.", effect: "Adds +10% × level to Digestion." },
      { id: "mass_expansion", name: "Mass Expansion", target: "digestion", type: "multiplicative", value: 0.30, level: 4, chapter: 8, description: "Expands the body's volumetric capacity, creating more surface area for absorption.", effect: "Adds +30% × level to Digestion (additive)." },
      { id: "membrane_reinforcement", name: "Membrane Reinforcement", target: "none", type: "additive", value: 1.0, level: 3, chapter: 2, description: "Thickens the outer gelatinous membrane, increasing resistance to physical impacts and sharp edges." },
      { id: "instinctive_perception", name: "Instinctive Perception", target: "mana", type: "additive", value: 2.0, level: 3, chapter: 8, description: "Tunes the membrane to detect ground vibrations and motion disturbances.", effect: "Adds +2 mana per level." },
      {
        id: "reinforced_exoskeleton",
        name: "Reinforced Exoskeleton",
        target: "none",
        type: "additive",
        value: 2.0,
        level: 2,
        chapter: 11,
        description: "Generates a hardened chitinous shell from beetle-derived biomass compounds.",
        upgrades: [
          { chapter: 71, name: "Obsidian Exoskeleton", type: "fusion", description: "Consumes biomass reserves to generate a rigid, near-indestructible Obsidian shell." }
        ]
      },
      { id: "body_density", name: "Body Density", target: "none", type: "multiplicative", value: 0.10, level: 3, chapter: 14, description: "Compresses internal gelatin layers to increase structural integrity and impact force." },
      { id: "partial_division", name: "Partial Division", target: "digestion", type: "multiplicative", value: 0.30, level: 2, chapter: 16, description: "Expels a biomass fragment to form a remote gathering clone.", effect: "Adds +10% × level to Digestion." },
      { id: "memory_resonance", name: "Memory Resonance", target: "mana", type: "additive", value: 1.0, level: 1, chapter: 25, description: "Absorbs and retransmits instinctual memory imprints from consumed creatures.", effect: "Adds +1 mana per level." },
      { id: "magic_core", name: "Magic Core", target: "mana", type: "exponential", value: 0.10, level: 3, chapter: 25, description: "Transmutes the vital core into a mana-generating engine that feeds on biological output.", effect: "Compounds ×1.10 per level on Mana." },
      { id: "ice_spike", name: "Ice Spike", target: "none", type: "multiplicative", value: 0.15, level: 1, chapter: 26, description: "Channels concentrated frozen mana to conjure and launch a crystalline ice projectile." },
      { id: "chemosensory_aptitude", name: "Chemosensory Aptitude", target: "mana", type: "additive", value: 2.0, level: 2, chapter: 31, description: "Enables the outer membrane to parse subtle chemical gradients and residual mana traces.", effect: "Adds +2 mana per level." },
      { id: "pigmentation_mimicry", name: "Pigmentation Mimicry", target: "speed", type: "multiplicative", value: 0.10, level: 1, chapter: 41, description: "Rewires skin chromatophores to mirror surrounding textures as active camouflage.", effect: "Multiplies compounded speed by ×(1 + 0.10 × level)." },
      { id: "pack_instinct", name: "Pack Instinct", target: "digestion", type: "multiplicative", value: 0.15, level: 1, chapter: 49, description: "Tunes synchronization protocols between the main body and remote clones.", effect: "Adds +15% × level of to Digestion." },
      { id: "magic_harmonizer", name: "Magic Core Harmonizer", target: "mana", type: "multiplicative", value: 0.20, level: 1, chapter: 54, description: "Synchronizes the Magic Core's mana output cadence with physical motor signals to reduce conversion loss.", effect: "Multiplies Mana by ×(1 + 0.20 × level)." },
      { id: "monocular_vision", name: "Telescopic Vision", target: "speed", type: "additive", value: 0.10, level: 1, chapter: 55, description: "Narrows peripheral focus into a precise long-range zoom, improving spatial reaction time.", effect: "Adds +0.10 m/s per level to Speed." },
      { id: "thermographic_perception", name: "Thermographic Perception", target: "none", type: "additive", value: 0.0, level: 1, chapter: 68, description: "Maps thermal signatures of living beings through the membrane's infrared sensitivity, detecting hidden or camouflaged targets in total darkness." },
      { id: "threshold_mimicry", name: "Threshold Mimicry", target: "none", type: "additive", value: 0.0, level: 1, chapter: 68, description: "While in shadowed or dark environments, the body passively absorbs ambient darkness to suppress its own visual signature against low-level detection." }
    ]
  }
};

// Map Locations Database (Coordinates relative to map size)
export const mapNodesData = [
  // Elysium World Nodes
  { id: "slime_clearing", name: "Forest Clearing", x: 25, y: 30, level: "Starting Zone", world: "Elysium", chapter: 1, details: "The starting forest clearing where Lohan devours grass and avoids corporate paladins." },
  { id: "ant_trail", name: "Ant Colony Trail", x: 55, y: 38, level: "Suggested Lv: 5-8", world: "Elysium", chapter: 10, details: "Coordinate line of giant ant workers and fast scout ants." },
  { id: "elven_woods", name: "Elven Woods Crossing", x: 74, y: 48, level: "Suggested Lv: 10-15", world: "Elysium", chapter: 17, details: "Lush ancient woodland pathways where Lohan first encounters the Elven girl." },
  { id: "goblin_outpost", name: "Goblin Sentry Outpost", x: 80, y: 35, level: "Suggested Lv: 15-20", world: "Elysium", chapter: 19, details: "Low-level goblin outpost where scout sentries guard the pathways." },
  { id: "kobold_camp", name: "Kobold Camp", x: 45, y: 22, level: "Suggested Lv: 2-4", world: "Elysium", chapter: 39, details: "A campground of level 1-2 Kobolds where Halon and Lisa hunt together." },
  { id: "thalendor", name: "Thalendor Royal Capital", x: 85, y: 70, level: "Elven Capital", world: "Elysium", chapter: 45, details: "The high elven capital built over 30,000 years ago with suspended glowing vine bridges." },
  { id: "gray_wolf_forest", name: "Gray Wolf Woodlands", x: 62, y: 15, level: "Suggested Lv: 2-3", world: "Elysium", chapter: 47, details: "Territory of pack Gray Wolves where Halon coordinates his combat skills." },
  { id: "bear_grounds", name: "Bear Hunting Grounds", x: 50, y: 10, level: "Suggested Lv: 3-5", world: "Elysium", chapter: 49, details: "Deep woodlands inhabited by level 2-4 bears, used for cooperative grinding." },

  // Sectors World Nodes (Real World)
  { id: "operator_pod", name: "Lohan's Pod Room", x: 22, y: 45, level: "Lower Zone", world: "Sectors", chapter: 1, details: "Small operator cube pod housing Lohan's neural immersion tank and metal paste." },
  { id: "bus_transit", name: "Air-Bus Route", x: 48, y: 55, level: "Mid Zone Route", world: "Sectors", chapter: 6, details: "Flying transit line crossing the cloud limits from the lower zone." },
  { id: "academic_dome", name: "University Campus Dome", x: 72, y: 68, level: "Upper Zone", world: "Sectors", chapter: 6, details: "A clear acrylic globe keeping pollution out. Site of Lohan's assistant job." },
  { id: "flight_route", name: "Dystopian Airway Corridor", x: 60, y: 75, level: "Upper Zone", world: "Sectors", chapter: 20, details: "The transit skyline where flying motorcycles swerve around corporate buses." }
];

// Active items matching current chapter limits
export const activeMapNodes = derived(
  [currentChapter],
  ([$ch]) => mapNodesData.filter(node => node.chapter <= $ch)
);

// Locked skill levels progression milestones configuration
export const abilityProgression = {
  efficient_digestion: [
    { chapter: 22, level: 3 },
    { chapter: 23, level: 5 },
    { chapter: 33, level: 7 },
    { chapter: 54, level: 10 }
  ],
  viscous_flow: [
    { chapter: 31, level: 13 },
    { chapter: 47, level: 16 }
  ],
  hemolymphatic_tissue: [
    { chapter: 47, level: 7 }
  ],
  passive_digestion: [
    { chapter: 54, level: 5 }
  ],
  mass_expansion: [
    { chapter: 54, level: 7 }
  ],
  partial_division: [
    { chapter: 54, level: 3 }
  ],
  magic_core: [
    { chapter: 26, level: 3 }
  ]
};

// Expose a helper to dynamically fetch locked skill level matching current chapter progression
export function getAbilityLevel(id, ch) {
  const milestones = abilityProgression[id] || [];
  let currentLevel = 1;
  for (const m of milestones) {
    if (ch >= m.chapter) {
      currentLevel = m.level;
    }
  }
  return currentLevel;
}

// Chronological Character/Faction Illustrations Gallery Database
export const visualsData = [
  { id: "lohan_march12", name: "Lohan", date: "March 12", file: "lohan-march12.png", chapter: 1, desc: "Real-world avatar of Lohan during the early phase of Elysium immersion." },
  { id: "aeliana_march12", name: "Aeliana", date: "March 12", file: "aeliana-march12.png", chapter: 37, desc: "Elven mage who guides Lohan through the forest border territories." },
  { id: "astraea_march12", name: "Astraea", date: "March 12", file: "astraea-march12.png", chapter: 40, desc: "A high-ranking Elf sentinel guarding the ancient grove gateways." },
  { id: "elle_march12", name: "Elle", date: "March 12", file: "elle-march12.png", chapter: 30, desc: "Mysterious traveler met during early dungeon raids." },
  { id: "isabella_march12", name: "Isabella", date: "March 12", file: "isabella-march12.png", chapter: 20, desc: "Daughter of a corporate director in the Sector dome." },
  { id: "pip_march12", name: "Pip", date: "March 12", file: "pip-march12.png", chapter: 15, desc: "A small woodland sprite captured during early level grinds." },
  { id: "yrneha_march12", name: "Yrneha", date: "March 12", file: "yrneha-march12.png", chapter: 45, desc: "Grand Elder of the Elven Council at Thalendor Capital." },
  { id: "skye_march16", name: "Skye", date: "March 16", file: "skye-march16.png", chapter: 36, desc: "Beast-kin guide who aids in establishing the guild house." },
  { id: "brynn_march18", name: "Brynn", date: "March 18", file: "brynn-march18.png", chapter: 38, desc: "Corporate contractor managing Sector 4 bus lanes." },
  { id: "evelyn_march24", name: "Evelyn", date: "March 24", file: "evelyn-march24.png", chapter: 42, desc: "A high-level archer helping the elven refugees." },
  { id: "hernesto_hogue_april2", name: "Hernesto Hogue", date: "April 02", file: "hernesto_hogue-april2.png", chapter: 40, desc: "Vance Group's lead security inspector for the Lower Zone." },
  { id: "alice_april6", name: "Alice", date: "April 06", file: "alice-april6.png", chapter: 44, desc: "Lohan's sister who remains in the Sector hospital." },
  { id: "isabella_april23", name: "Isabella", date: "April 23", file: "isabella-april23.png", chapter: 46, desc: "Isabella in her formal corporate attire during the dome Gala." },
  { id: "lohan_april24", name: "Lohan", date: "April 24", file: "lohan-april24.png", chapter: 50, desc: "Lohan following his initial physiological modifications in the Sector lab." },
  { id: "dylan_may1", name: "Dylan", date: "May 01", file: "dylan-may1.png", chapter: 52, desc: "A human mercenary commander contracted by Vance Group." },
  { id: "halon_may2", name: "Halon", date: "May 02", file: "halon-may2.png", chapter: 54, desc: "Slime avatar after developing dense magical tissue." },
  { id: "lisa_may4", name: "Lisa", date: "May 04", file: "lisa-may4.png", chapter: 55, desc: "Spirit Fox companion in her standard woodland hunting form." },
  { id: "lisa_may5", name: "Lisa", date: "May 05", file: "lisa-may5.png", chapter: 56, desc: "Lisa channeling her Spiritual Flame during the cave boss fight." },
  { id: "elle_may13", name: "Elle", date: "May 13", file: "elle-may13.png", chapter: 58, desc: "Elle wearing full combat plate during the border skirmish." },
  { id: "pip_may13", name: "Pip", date: "May 13", file: "pip-may13.png", chapter: 58, desc: "Pip in evolved wood-sprite form, radiating natural mana." },
  { id: "lohan_may20", name: "Lohan", date: "May 20", file: "lohan-may20.png", chapter: 60, desc: "Lohan operating the Sector hacker node." },
  { id: "lohan_may27", name: "Lohan", date: "May 27", file: "lohan-may27.png", chapter: 62, desc: "Lohan's advanced Sector avatar after purchasing genetic enhancements." },
  { id: "astralis_base_june6", name: "Astralis Base", date: "June 06", file: "astralis_base-june6.png", chapter: 66, desc: "The external gate of the Astralis Guild sanctuary." },
  { id: "astralis_banner_june9", name: "Astralis Banner", date: "June 09", file: "astralis_banner-june9.png", chapter: 68, desc: "The glowing holographic banner representing the guild." },
  { id: "astralis_hall_june9", name: "Astralis Hall", date: "June 09", file: "astralis_hall-june9.png", chapter: 68, desc: "The internal Grand Hall of the Astralis guild branch." }
];
