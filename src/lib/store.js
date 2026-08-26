import { writable, derived } from 'svelte/store';

// Global Chapter Lock Store (Default: Chapter 5, Max: 50)
export const currentChapter = writable(5);

// Encyclopedia Database
export const encyclopediaData = {
  races: [
    { name: "Common Slime", description: "The baseline evolutionary form. Highly vulnerable but possesses endless adaptive potential.", chapter: 1 },
    { name: "Acidic Slime", description: "An evolved subtype containing internal corrosive reservoirs. Acid secretion boosts attack damage.", chapter: 3 },
    { name: "Steel-Skin Slime", description: "An evolution utilizing metallic minerals to harden the outer membrane, dramatically raising defenses.", chapter: 10 },
    { name: "Elysian High Slime", description: "A legendary cosmic slime subtype containing celestial essence. Capable of complex spellcast operations.", chapter: 25 }
  ],
  classes: [
    { name: "Devourer", description: "Focuses on absorbing biological materials (Biomass) to grow, evolve, and assimilate enemy traits.", chapter: 1 },
    { name: "Acid Mage", description: "Specializes in corrosive ranged attacks, melting armor, and area denial.", chapter: 6 },
    { name: "Guardian Core", description: "A defensive class specialized in shield generation and taking massive blunt force impacts.", chapter: 12 }
  ],
  guilds: [
    { name: "The Blue Crests", description: "An early-game adventurers guild based in the borderlands. Mostly copper and bronze ranks.", chapter: 2 },
    { name: "Elysium Vanguard", description: "A high-tier coalition dedicated to clearing S-rank dungeons and stopping regional collapse.", chapter: 18 }
  ],
  dungeons: [
    { name: "Damp Cave", level: "Levels 1-5", bosses: "Acid Crawler", chapter: 1, world: "Elysium" },
    { name: "Forgotten Mines", level: "Levels 8-15", bosses: "Iron Golem", chapter: 8, world: "Elysium" },
    { name: "Crystalline Abyss", level: "Levels 25-40", bosses: "Shard Archmage", chapter: 22, world: "Elysium" }
  ],
  kingdoms: [
    { name: "Oakhaven Duchy", ruler: "Duke Alden", description: "A peaceful forest kingdom under the human domain.", chapter: 2 },
    { name: "Elysia Empire", ruler: "Empress Valeria", description: "The central powerhouse of the region, utilizing advanced magic-tech.", chapter: 15 }
  ]
};

// Raw Character Data (Base stats & abilities)
export const charactersData = {
  halon: {
    name: "Halon",
    race: "Acidic Slime",
    class: "Devourer",
    level: 12,
    baseStats: {
      hp: 150,
      mp: 90,
      atk: 18,
      def: 12,
      spd: 15
    },
    abilities: [
      { id: "acid_spray", name: "Corrosive Acid", target: "atk", type: "additive", value: 1.5, level: 5, chapter: 2, description: "Adds acid burn damage to attacks. (+1.5 Flat Atk per Ability Level)" },
      { id: "slime_body", name: "Slime Resiliency", target: "def", type: "multiplicative", value: 0.05, level: 4, chapter: 4, description: "Flexible body absorbs impacts. (+5% Def per Ability Level)" },
      { id: "evolved_muscles", name: "Apex Agility", target: "spd", type: "exponential", value: 0.08, level: 3, chapter: 8, description: "Fibers contract rapidly. (+8% Exponential Speed per Ability Level)" },
      { id: "core_overload", name: "Elysian Core Overload", target: "hp", type: "multiplicative", value: 0.15, level: 2, chapter: 15, description: "Unleashes raw core energy. (+15% HP per Ability Level)" }
    ]
  },
  lohan: {
    name: "Lohan (Real World)",
    race: "Human",
    class: "Terminal Operator",
    level: 8,
    baseStats: {
      hp: 100,
      mp: 120,
      atk: 10,
      def: 8,
      spd: 11
    },
    abilities: [
      { id: "hologram_hacking", name: "Holo Hack", target: "mp", type: "additive", value: 5.0, level: 3, chapter: 3, description: "Hacks adjacent holographic terminals. (+5 MP per level)" },
      { id: "cyber_reflexes", name: "Neural Boost", target: "spd", type: "multiplicative", value: 0.06, level: 4, chapter: 7, description: "Implants boost reaction times. (+6% speed per level)" },
      { id: "firewall_armor", name: "Data Aegis", target: "def", type: "additive", value: 2.0, level: 2, chapter: 12, description: "Creates static barrier. (+2 Def per level)" }
    ]
  }
};

// Map Locations Database (Coordinates relative to map size, say 100%)
export const mapNodesData = [
  // Elysium Nodes
  { id: "damp_cave", name: "Damp Cave Dungeon", x: 28, y: 35, level: "Suggested Lv: 1-5", world: "Elysium", chapter: 1, details: "The starting cavern where Lohan first awakens. Loaded with low-tier iron ores." },
  { id: "oakhaven", name: "Oakhaven Town", x: 50, y: 45, level: "Safe Zone", world: "Elysium", chapter: 2, details: "A peaceful hub town. Home to the Blue Crests guild branch." },
  { id: "forgotten_mines", name: "Forgotten Mines", x: 62, y: 28, level: "Suggested Lv: 8-15", world: "Elysium", chapter: 8, details: "Infested with iron and stone gargoyles. Deep shafts hold valuable biomass." },
  { id: "elysia_capital", name: "Elysian Capital", x: 45, y: 72, level: "Imperial Sector", world: "Elysium", chapter: 15, details: "The sprawling capital of the Empire. Floating magitech structures." },
  { id: "crystalline_abyss", name: "Crystalline Abyss", x: 78, y: 65, level: "Suggested Lv: 25-40", world: "Elysium", chapter: 22, details: "A glowing rift in the canyon. High risk zone with massive crystal bosses." },

  // Lohan's Sector World Nodes (Real World)
  { id: "terminal_room", name: "Lohan's Operator Pod", x: 30, y: 40, level: "Sector 1", world: "Sectors", chapter: 1, details: "A small, claustrophobic apartment cube containing Lohan's neural immersion tank." },
  { id: "hologram_plaza", name: "Sector 4 Neon Plaza", x: 55, y: 55, level: "Sector 4", world: "Sectors", chapter: 6, details: "A bustling market filled with holographic advertisements and high-tech corporate hubs." },
  { id: "server_vault", name: "Arson Devs Database", x: 75, y: 30, level: "Restricted Sector", world: "Sectors", chapter: 14, details: "A secure datacenter housing forbidden records regarding the Slime project." }
];

// Active items matching current chapter limits
export const activeMapNodes = derived(
  [currentChapter],
  ([$ch]) => mapNodesData.filter(node => node.chapter <= $ch)
);
