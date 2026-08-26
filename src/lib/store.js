import { writable, derived } from 'svelte/store';

// Global Chapter Lock Store (Default: Chapter 5, Max: 50)
export const currentChapter = writable(5);

// Chapters Timeline Database (Dummy metadata)
export const chaptersData = [
  { index: 1, title: "Immersion Pod", date: "Aug 26, 2026", halonLvl: 1 },
  { index: 2, title: "Biological Evolution", date: "Aug 27, 2026", halonLvl: 1 },
  { index: 3, title: "Speed, I am Speed", date: "Aug 29, 2026", halonLvl: 1 },
  { index: 4, title: "Danger", date: "Aug 31, 2026", halonLvl: 1 },
  { index: 5, title: "Passive Gains!", date: "Sep 02, 2026", halonLvl: 1 },
  { index: 6, title: "College", date: "Sep 04, 2026", halonLvl: 1 },
  { index: 7, title: "Vance", date: "Sep 06, 2026", halonLvl: 1 },
  { index: 8, title: "Evolution", date: "Sep 09, 2026", halonLvl: 1 },
  { index: 9, title: "Literal Growth!", date: "Sep 12, 2026", halonLvl: 1 },
  { index: 10, title: "AntSlayer", date: "Sep 15, 2026", halonLvl: 1 },
  { index: 11, title: "Evolution!", date: "Sep 18, 2026", halonLvl: 1 },
  { index: 12, title: "Big Slime", date: "Sep 22, 2026", halonLvl: 1 },
  { index: 13, title: "Gelatinous Battle!", date: "Sep 25, 2026", halonLvl: 1 },
  { index: 14, title: "Carnage", date: "Sep 29, 2026", halonLvl: 1 },
  { index: 15, title: "Energy", date: "Oct 03, 2026", halonLvl: 1 },
  { index: 16, title: "Clone!", date: "Oct 06, 2026", halonLvl: 1 },
  { index: 17, title: "Noise", date: "Oct 10, 2026", halonLvl: 1 },
  { index: 18, title: "Crazy Girl", date: "Oct 14, 2026", halonLvl: 1 },
  { index: 19, title: "Mana Stone", date: "Oct 18, 2026", halonLvl: 1 },
  { index: 20, title: "Changes", date: "Oct 22, 2026", halonLvl: 1 }
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
    { name: "Mythical Slime", description: "The baseline evolutionary form Lohan receives. Extremely rare but slow to level up.", chapter: 1 },
    { name: "Human", description: "The standard baseline race. Many are poor citizens in real-world sectors.", chapter: 1 },
    { name: "Elf", description: "A forest-dwelling bipedal race with sharp senses, light speed, and deep attunement to nature.", chapter: 17 },
    { name: "Goblin", description: "Low-level humanoid monsters that form scouting packs. Fragile but dangerous in groups.", chapter: 19 },
    { name: "Dwarf", description: "A classic fantasy race mentioned as a premium choice that guilds recruit.", chapter: 1 },
    { name: "Werewolf", description: "Another premium beast-human race high-level guilds pay fortunes for.", chapter: 1 }
  ],
  classes: [
    { name: "Devourer", description: "Focuses on absorbing biological materials (Biomass) to grow, evolve, and assimilate enemy traits.", chapter: 1 },
    { name: "Paladin", description: "A holy warrior focused on exorcising lost demons in clean zones. Earns premium credits.", chapter: 6 },
    { name: "Squire", description: "A trainee knight focused on martial exercises and physical training, which alleviates body pain.", chapter: 20 },
    { name: "Monk", description: "A holy martial artist who vows poverty but uses spiritual willpower to sharpen their mind.", chapter: 20 },
    { name: "Archer", description: "A ranged class focused on long-distance tracking, raising the player's physical reflexes.", chapter: 20 }
  ],
  monsters: [
    { name: "Larva", description: "A slimy, translucent forest insect that clings to hosts and drains their biomass. Sucks vital energy.", chapter: 4 },
    { name: "Giant Slime", description: "A massive, mutated slime that grew by devouring other slimes' cores. Highly aggressive.", chapter: 3 },
    { name: "Scout Ant", description: "Large, explorer ant. Fast and has high motion perception, mapping coordinates for the colony.", chapter: 10 },
    { name: "Scout Leader Ant", description: "Larger and tougher than standard scouts, with curved metallic jaws and thick shell.", chapter: 11 },
    { name: "Beetle", description: "A forest insect with a strong chitin structure. Consuming it unlocks advanced Exoskeleton capabilities.", chapter: 15 },
    { name: "White Fox", description: "A silent, rare woodland creature that observes slimes with mysterious confusion.", chapter: 16 }
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
    { name: "Flying Motorcycle", description: "A high-speed single-rider sky craft used by upper-zone citizens, often breaking altitude limits.", chapter: 20 }
  ]
};

// Raw Character Data (Base stats & abilities)
export const charactersData = {
  halon: {
    name: "Halon (Elysium Slime)",
    race: "Mythical Slime",
    class: "Devourer",
    level: 1,
    baseStats: {
      hp: 15,
      mp: 10,
      atk: 2,
      def: 1,
      spd: 0.25
    },
    abilities: [
      { id: "efficient_digestion", name: "Efficient Digestion", target: "atk", type: "additive", value: 0.10, level: 10, chapter: 2, description: "Speeds up dissolving rate. (+10% active and passive gains per level)" },
      { id: "viscous_flow", name: "Viscous Flow", target: "spd", type: "multiplicative", value: 0.10, level: 8, chapter: 2, description: "Improves motor control of gelatin. (+10% speed per level)" },
      { id: "structural_stability", name: "Structural Stability", target: "def", type: "additive", value: 1.0, level: 5, chapter: 8, description: "Enables advanced membrane commands, snapping, and shape replication." },
      { id: "hemolymphatic_tissue", name: "Hemolymphatic Tissue", target: "atk", type: "multiplicative", value: 0.20, level: 3, chapter: 4, description: "Accelerates absorption during combat or under active damage by +20%." },
      { id: "passive_digestion", name: "Passive Digestion", target: "hp", type: "additive", value: 0.10, level: 3, chapter: 5, description: "Generates biomass slowly even when stationary." },
      { id: "mass_expansion", name: "Mass Expansion", target: "hp", type: "multiplicative", value: 0.30, level: 4, chapter: 8, description: "Increases volume, storage limit, and contact area by +30%." },
      { id: "membrane_reinforcement", name: "Membrane Reinforcement", target: "def", type: "additive", value: 1.0, level: 3, chapter: 2, description: "Strengthens outer layer against impacts and cuts." },
      { id: "instinctive_perception", name: "Instinctive Perception", target: "mp", type: "additive", value: 2.0, level: 3, chapter: 8, description: "Detects nearby vibrations and movements in detail." },
      { id: "reinforced_exoskeleton", name: "Reinforced Exoskeleton", target: "def", type: "additive", value: 2.0, level: 2, chapter: 11, description: "Generates a hard shell around the body. (+2 Def per level)" },
      { id: "body_density", name: "Body Density", target: "def", type: "multiplicative", value: 0.10, level: 3, chapter: 14, description: "Compresses gelatin density. (+10% Def/Atk compression per level)" },
      { id: "partial_division", name: "Partial Division", target: "atk", type: "multiplicative", value: 0.30, level: 2, chapter: 16, description: "Expels biomass to create remote gathering clones (+30% gathering speed per level)." }
    ]
  },
  lohan: {
    name: "Lohan (Real World)",
    race: "Human",
    class: "Student Assistant",
    level: 1,
    baseStats: {
      hp: 80,
      mp: 100,
      atk: 5,
      def: 4,
      spd: 1.2
    },
    abilities: [
      { id: "academic_stubbornness", name: "Willpower Core", target: "mp", type: "additive", value: 5.0, level: 1, chapter: 7, description: "Mental fortitude forged through assisting under stress." },
      { id: "filtration_breathing", name: "Filter Breathing", target: "def", type: "additive", value: 1.0, level: 1, chapter: 6, description: "Efficient breathing using standard mask filters." }
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
