/**
 * @typedef {Object} EncyclopediaItem
 * @property {string} name - Entity or item name
 * @property {string} [base] - Rarity/grade (e.g. "Mythical", "Rare", "Common")
 * @property {string} description - Lore analysis and context
 * @property {number} chapter - Chapter in which this entry is unlocked
 * @property {string} [level] - Dungeon rating or monster difficulty
 * @property {string} [bosses] - Dungeon boss entity
 * @property {string} [ruler] - Faction leader or prominent persona
 */

/**
 * @typedef {Object} EncyclopediaData
 * @property {EncyclopediaItem[]} races
 * @property {EncyclopediaItem[]} classes
 * @property {EncyclopediaItem[]} monsters
 * @property {EncyclopediaItem[]} factions
 * @property {EncyclopediaItem[]} dungeons
 * @property {EncyclopediaItem[]} technology
 */

/** @type {EncyclopediaData} */
export const encyclopediaData = {
  races: [
    {
      name: "Mythical Slime",
      base: "Mythical",
      description:
        "The baseline evolutionary form Lohan receives. Extremely rare but slow to level up.",
      chapter: 1
    },
    {
      name: "Human",
      base: "Common",
      description: "The standard baseline race. Many are poor citizens in real-world sectors.",
      chapter: 1
    },
    {
      name: "Elf",
      base: "Uncommon",
      description:
        "A forest-dwelling bipedal race with sharp senses, light speed, and deep attunement to nature.",
      chapter: 17
    },
    {
      name: "Goblin",
      base: "Common",
      description:
        "Low-level humanoid monsters that form scouting packs. Fragile but dangerous in groups.",
      chapter: 19
    },
    {
      name: "Dwarf",
      base: "Common",
      description: "A classic fantasy race mentioned as a premium choice that guilds recruit.",
      chapter: 1
    },
    {
      name: "Werewolf",
      base: "Rare",
      description: "Another premium beast-human race high-level guilds pay fortunes for.",
      chapter: 1
    },
    {
      name: "Spirit Fox",
      base: "Legendary",
      description:
        "A legendary beast race with high agility, stealth, spiritual affinity, and telepathic abilities.",
      chapter: 36
    },
    {
      name: "High Elf",
      base: "Epic",
      description:
        "An ancient elven lineage characterized by deep mana connections, which built the capital Thalendor.",
      chapter: 45
    },
    {
      name: "Dark Elf",
      base: "Epic",
      description:
        "An elven lineage that split after the Great Rupture and isolated itself in the deep underground.",
      chapter: 45
    },
    {
      name: "Fairy",
      base: "Uncommon",
      description:
        "Small, palm-sized winged humanoids native to Mythlorien who act as invisible caretakers and gardeners of the forest's flora and vital mana balance.",
      chapter: 95
    }
  ],
  classes: [
    {
      name: "Devourer",
      base: "Mythical",
      description:
        "Focuses on absorbing biological materials (Biomass) to grow, evolve, and assimilate enemy traits.",
      chapter: 1
    },
    {
      name: "Paladin",
      base: "Rare",
      description:
        "A holy warrior focused on exorcising lost demons in clean zones. Earns premium credits.",
      chapter: 6
    },
    {
      name: "Squire",
      base: "Common",
      description:
        "A trainee knight focused on martial exercises and physical training, which alleviates body pain.",
      chapter: 20
    },
    {
      name: "Monk",
      base: "Common",
      description:
        "A holy martial artist who vows poverty but uses spiritual willpower to sharpen their mind.",
      chapter: 20
    },
    {
      name: "Archer",
      base: "Common",
      description:
        "A ranged class focused on long-distance tracking, raising the player's physical reflexes.",
      chapter: 20
    },
    {
      name: "Wizard",
      base: "Common",
      description:
        "A magical spellcaster class requiring the memorization of complex chant phrases to channel powerful spells.",
      chapter: 21
    },
    {
      name: "Assassin",
      base: "Common",
      description:
        "A stealth-oriented physical class that utilizes poisons and swift mobility skills.",
      chapter: 50
    }
  ],
  monsters: [
    {
      name: "Larva",
      description:
        "A slimy, translucent forest insect that clings to hosts and drains their biomass. Sucks vital energy.",
      chapter: 4
    },
    {
      name: "Giant Slime",
      description:
        "A massive, mutated slime that grew by devouring other slimes' cores. Highly aggressive.",
      chapter: 3
    },
    {
      name: "Scout Ant",
      description:
        "Large, explorer ant. Fast and has high motion perception, mapping coordinates for the colony.",
      chapter: 10
    },
    {
      name: "Scout Leader Ant",
      description:
        "Larger and tougher than standard scouts, with curved metallic jaws and thick shell.",
      chapter: 11
    },
    {
      name: "Beetle",
      description:
        "A forest insect with a strong chitin structure. Consuming it unlocks advanced Exoskeleton capabilities.",
      chapter: 15
    },
    {
      name: "White Fox",
      description:
        "A silent, rare woodland creature that observes slimes with mysterious confusion.",
      chapter: 16
    },
    {
      name: "Weaver Spider",
      description:
        "A Level 11 arachnid monster whose mana stone contains dense, high-grade magical residues.",
      chapter: 32
    },
    {
      name: "Kobold",
      description:
        "Canine humanoid forest monsters that are slightly superior to Goblins and guard camp areas.",
      chapter: 39
    },
    {
      name: "Gray Wolf",
      description:
        "A swift forest predator that coordinates and hunts in packs, ranging from Level 1 to 2.",
      chapter: 47
    },
    {
      name: "Bear",
      description:
        "A large forest beast ranging from Level 2 to 4, representing a significant source of experience.",
      chapter: 49
    },
    {
      name: "Shadow Serpent",
      description:
        "A cave serpent whose darkness-adapted body and digestive acid make it valuable and dangerous prey.",
      chapter: 67
    },
    {
      name: "Giant Shadow Serpent",
      description:
        "A larger Shadow Serpent encountered while digesting prey, dangerous enough to force Halon and Lisa into a high-risk attrition fight.",
      chapter: 69
    },
    {
      name: "Swamp Slug",
      description:
        "A swamp monster that saturates water with paralyzing poison and can be sold alive as an alchemical source.",
      chapter: 81
    },
    {
      name: "Swamp Toad",
      description:
        "Amphibious inhabitants of Kroak Village who use swamp terrain and slug poison to trap prey.",
      chapter: 83
    },
    {
      name: "Shadow Cougar",
      description: "An elite stealth predator associated with Thalendor's noble tamers.",
      chapter: 91
    },
    {
      name: "Glass Beetle",
      description:
        "A Level 10 arachnid-like insect monster inhabiting the Fossilized Amber Tree. Features hard, mirror-like glass carapaces and razor-sharp jointed legs.",
      chapter: 93
    },
    {
      name: "Glass Beetle Queen",
      description:
        "The Level 10+ dungeon boss at the top observatory of the Fossilized Amber Tree, controlling the hive mind and draining captured creatures' essence into mana cocoons.",
      chapter: 95
    }
  ],
  factions: [
    {
      name: "Vance Group",
      description:
        "An inter-planetary mega-corporation that controls colonies, satellites, patents, and hospitals.",
      chapter: 6
    },
    {
      name: "Elite Tamers",
      description:
        "A rising Thalendor class or social group associated with monster familiars and ceremonial whips.",
      chapter: 91
    },
    {
      name: "Hogue Group",
      description:
        "A rival real-world organization whose player team races to establish an official Open World guild.",
      chapter: 92
    }
  ],
  dungeons: [
    {
      name: "Fossilized Amber Tree",
      description:
        "A titan of amber and fossilized metal-hard wood serving as a Level 10 dungeon overrun by Glass Beetles, chosen by Lisa as the prospective Astralis Guild base.",
      chapter: 93
    }
  ],
  technology: [
    {
      name: "Neural Helmet",
      description:
        "Dystopian hardware enabling full-sensory immersion into Elysium. Highly expensive.",
      chapter: 1
    },
    {
      name: "Nutritional Powder",
      description: "Rancid metal-tasting food paste eaten by citizens of the Lower Zone.",
      chapter: 1
    },
    {
      name: "Flying Bus",
      description:
        "Air-transit bus crossing the dark smog layers from the Lower Zone to the Upper Zone.",
      chapter: 6
    },
    {
      name: "Mana Stone",
      description:
        "A concentrated crystal of pure mana that slimes love to absorb, giving massive biomass (98 units).",
      chapter: 19
    },
    {
      name: "Flying Motorcycle",
      description:
        "A high-speed single-rider sky craft used by upper-zone citizens, often breaking altitude limits.",
      chapter: 20
    },
    {
      name: "Dungeon Core",
      description:
        "A high-tier monster drop required for non-human races to establish recognized guilds in Elysium.",
      chapter: 36
    },
    {
      name: "Sovereignty Seal",
      description:
        "A systemic key required to claim monster territories and obtain official faction status.",
      chapter: 36
    },
    {
      name: "Artificial Magic Core Harmonizer",
      description:
        "An organ that reduces casting latency by syncing Magic Core mana flow with physical needs.",
      chapter: 54
    },
    {
      name: "Shadow Serpent Digestive Acid",
      description:
        "A valuable alchemical ingredient whose purified form commands a higher price at the Silver Crucible.",
      chapter: 76
    },
    {
      name: "Slug Poison",
      description:
        "A paralyzing toxin produced by Swamp Slugs and valued by alchemists when collected safely.",
      chapter: 84
    },
    {
      name: "Silver Coin",
      description:
        "A Thalendor trade coin valuable enough to convert into real-world money through the system.",
      chapter: 77
    },
    {
      name: "Minor Forest Spirit Mana Stone",
      description:
        "A light-element mana stone purchased for its potential to grant a size or speed-related monster skill.",
      chapter: 90
    },
    {
      name: "Basic Life Seed",
      description:
        "A rare life-element seed item capable of triggering qualitative resonance and fusion evolutions when absorbed into a Magic Core.",
      chapter: 95
    }
  ]
};
