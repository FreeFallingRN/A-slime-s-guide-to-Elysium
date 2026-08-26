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
  { index: 60, title: "Humiliation", date: "Feb 22, 2026", halonLvl: 3 }
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
    name: "Halon (Elysium Slime)",
    race: "Mythical Slime",
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
      { id: "efficient_digestion", name: "Efficient Digestion", target: "digestion", type: "exponential", value: 0.10, level: 10, chapter: 2, description: "Speeds up dissolving rate. (+10% active and passive gains per level)" },
      { id: "viscous_flow", name: "Viscous Flow", target: "speed", type: "multiplicative", value: 0.10, level: 8, chapter: 2, description: "Improves motor control of gelatin. (+10% speed per level)" },
      { id: "structural_stability", name: "Structural Stability", target: "none", type: "additive", value: 1.0, level: 5, chapter: 8, description: "Enables advanced membrane commands, snapping, and shape replication." },
      { id: "hemolymphatic_tissue", name: "Hemolymphatic Tissue", target: "digestion", type: "multiplicative", value: 0.20, level: 3, chapter: 4, description: "Accelerates absorption during combat or under active damage by +20%." },
      { id: "passive_digestion", name: "Passive Digestion", target: "digestion", type: "additive", value: 0.10, level: 3, chapter: 5, description: "Generates biomass slowly even when stationary." },
      { id: "mass_expansion", name: "Mass Expansion", target: "none", type: "multiplicative", value: 0.30, level: 4, chapter: 8, description: "Increases volume, storage limit, and contact area by +30%." },
      { id: "membrane_reinforcement", name: "Membrane Reinforcement", target: "none", type: "additive", value: 1.0, level: 3, chapter: 2, description: "Strengthens outer layer against impacts and cuts." },
      { id: "instinctive_perception", name: "Instinctive Perception", target: "mana", type: "additive", value: 2.0, level: 3, chapter: 8, description: "Detects nearby vibrations and movements in detail." },
      { id: "reinforced_exoskeleton", name: "Reinforced Exoskeleton", target: "none", type: "additive", value: 2.0, level: 2, chapter: 11, description: "Generates a hard shell around the body. (+2 Def per level)" },
      { id: "body_density", name: "Body Density", target: "none", type: "multiplicative", value: 0.10, level: 3, chapter: 14, description: "Compresses gelatin density. (+10% Def/Atk compression per level)" },
      { id: "partial_division", name: "Partial Division", target: "digestion", type: "multiplicative", value: 0.30, level: 2, chapter: 16, description: "Expels biomass to create remote gathering clones (+30% gathering speed per level)." },
      { id: "memory_resonance", name: "Memory Resonance", target: "mana", type: "additive", value: 1.0, level: 1, chapter: 25, description: "Transmits part of the core's memories and instincts from consumed targets." },
      { id: "magic_core", name: "Magic Core", target: "mana", type: "exponential", value: 0.10, level: 3, chapter: 25, description: "Transmutes vital core to a magical energy engine. (+10% mana exponent per level)" },
      { id: "ice_spike", name: "Ice Spike", target: "none", type: "multiplicative", value: 0.15, level: 1, chapter: 26, description: "Channels frozen mana to conjure and fire a crystalline ice projectile." },
      { id: "chemosensory_aptitude", name: "Chemosensory Aptitude", target: "mana", type: "additive", value: 2.0, level: 2, chapter: 31, description: "Allows outer membrane to detect subtle odor particles and mana residues." },
      { id: "pigmentation_mimicry", name: "Pigmentation Mimicry", target: "speed", type: "multiplicative", value: 0.10, level: 1, chapter: 41, description: "Enables skin to blend with the environment, acting as an active camouflage." },
      { id: "pack_instinct", name: "Pack Instinct", target: "digestion", type: "multiplicative", value: 0.15, level: 1, chapter: 49, description: "Improves synchronization and coordination speed with remote clones." },
      { id: "magic_harmonizer", name: "Magic Core Harmonizer", target: "mana", type: "multiplicative", value: 0.20, level: 1, chapter: 54, description: "Synchronizes Magic Core mana output directly with motor actions to reduce latency." },
      { id: "monocular_vision", name: "Telescopic Vision", target: "speed", type: "additive", value: 0.10, level: 1, chapter: 55, description: "Narrowed peripheral focus allowing long-distance telescopic zoom." }
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
