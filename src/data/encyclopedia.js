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
    },
    {
      name: "Glass Beetle",
      base: "Common",
      description:
        "Brynnear's original player race in Elysium, initially treated by her as unlucky until the Matriarch class lets her exploit the beetle nest's hierarchy.",
      chapter: 109
    },
    {
      name: "Beast-Man",
      base: "Uncommon",
      description:
        "A humanoid beast race represented among the players captured by Brynnear and the Hogue Guild for forced Matriarch experiments.",
      chapter: 227
    },
    {
      name: "Lizardman",
      base: "Rare",
      description:
        "Varkas's rare reptilian race, giving him a strong affinity with lizard-type monsters and making him the core combatant of his raiding trio.",
      chapter: 253
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
    },
    {
      name: "Illusion Weaver",
      base: "Rare",
      description:
        "Lisa's rare class, paired with her Legendary Spirit Fox race and suited to spiritual, deceptive, and control-oriented combat.",
      chapter: 37
    },
    {
      name: "Matriarch",
      base: "Epic",
      description:
        "Brynnear's epic class, capable of controlling nests, weaving invasive threads, and enslaving or reshaping subordinate creatures.",
      chapter: 109
    },
    {
      name: "Pugilist",
      base: "Unknown",
      description: "Alice Muller's close-combat class within Astralis Requiem's hired vanguard.",
      chapter: 181
    },
    {
      name: "Druid",
      base: "Unknown",
      description:
        "WyrmWood's nature-aligned class in Alice's group, associated with natural energy and support capabilities.",
      chapter: 178
    },
    {
      name: "Veil Hunter",
      base: "Uncommon",
      description:
        "Justin's stealth-oriented class, part of a double Uncommon base with his Half-Elf race.",
      chapter: 179
    },
    {
      name: "Cold-Blooded Sovereign",
      base: "Uncommon",
      description:
        "Brant's class, used to influence lower-level reptilian creatures in conjunction with Varkas's Lizardman race and Stig's support class.",
      chapter: 253
    },
    {
      name: "Synergy Link",
      base: "Uncommon",
      description:
        "Stig's support class, capable of sharing passive and active effects among members of a linked group.",
      chapter: 253
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
    },
    {
      name: "Explosive Rabbit",
      description:
        "A volatile monster species whose speed, detonations, and elite variants force Halon to rely on traps, clones, and careful coordination instead of simple pursuit.",
      chapter: 148
    },
    {
      name: "Light Guardian",
      description:
        "A high-level light-aspected enemy whose mana stone becomes central to Halon's Sacred Light Core evolution.",
      chapter: 171
    },
    {
      name: "Gremlin",
      description:
        "A later Mythlorien monster type hunted by Astralis Requiem, dangerous enough to require coordinated group tactics and later guild-scale resource planning.",
      chapter: 219
    },
    {
      name: "Elite Kobold",
      description:
        "A higher-grade Kobold whose mana stone and combat memory lead Halon toward the rupture-mark combat style used around Level 12.",
      chapter: 247
    },
    {
      name: "Fire Lizard",
      description:
        "Reptilian monsters used in the attack on Petal Village under Varkas's control and support-class synergy.",
      chapter: 253
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
    },
    {
      name: "Astralis Requiem",
      ruler: "Lisa",
      description:
        "Lisa and Halon's guild, formally recognized after the Amber Tree dungeon victory. Its early strength comes from Lisa's leadership, Halon's rare Slime mechanics, and the strategic value of their captured base.",
      chapter: 114
    },
    {
      name: "Silver Lotus",
      description:
        "A Lower Zone group led by Skye, first seen protecting Oliver from local predators and later revealed through Devon as a possible pool of trustworthy Open World recruits.",
      chapter: 124
    },
    {
      name: "Ebony Chalice",
      description:
        "A cult connected to Dylan's hidden Elysium background, discovered through a hidden path after his Newbie Village family history turns out to be far darker than expected.",
      chapter: 232
    },
    {
      name: "Petal Village",
      ruler: "Basil",
      description:
        "A fairy settlement in Mythlorien whose treatment of Pip and Elle exposes internal prejudice before Astralis Requiem intervenes during Varkas's attack.",
      chapter: 250
    },
    {
      name: "Hogue Guild",
      ruler: "Ernesto Hogue",
      description:
        "Ernesto Hogue's Elysium organization after losing the first-guild race, later tied to Brynnear's Matriarch experiments in Silverport.",
      chapter: 227
    }
  ],
  dungeons: [
    {
      name: "Fossilized Amber Tree",
      description:
        "A titan of amber and fossilized metal-hard wood serving as a Level 10 dungeon overrun by Glass Beetles, chosen by Lisa as the prospective Astralis Guild base.",
      chapter: 93
    },
    {
      name: "Astralis Requiem Guild Base",
      description:
        "The claimed Amber Tree base after Astralis' official founding, used as the guild's strategic home, storage point, and later meeting hub.",
      chapter: 115
    },
    {
      name: "Cave of Hungry Roots",
      description:
        "A dangerous later hunting ground where Astralis Requiem and related groups confront ambushes and guild-scale tactical problems.",
      chapter: 238
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
    },
    {
      name: "Astral Chest",
      description:
        "A guild reward functioning like shared storage, allowing Halon to preserve monster corpses and solve his earlier resource-transport problem.",
      chapter: 115
    },
    {
      name: "Natural Energy Core",
      description:
        "A costly core evolution born from the Basic Life Seed, opening natural-energy pathways through Halon's body.",
      chapter: 104
    },
    {
      name: "Sacred Light Core",
      description:
        "A light-aspected core evolution formed when Holy Light successfully fuses with Halon's Natural Energy Core.",
      chapter: 173
    },
    {
      name: "Superior Magic Core",
      description:
        "The evolved form of Halon's Magic Core after High Elf evolution extraction, sharply improving mana perception and capacity.",
      chapter: 200
    },
    {
      name: "Ancient Magic Flower",
      description:
        "A plant material whose memories and structure help Halon explore later Sacred Light and natural-energy applications.",
      chapter: 261
    },
    {
      name: "Staff of Blood Desolation",
      description:
        "A significant later item connected to Halon's post-Level-11 equipment and magical development.",
      chapter: 263
    },
    {
      name: "Tear of Flowers",
      description:
        "An important Petal Village treasure sought during Varkas's raid, valuable enough to draw predatory player attention toward the fairy settlement.",
      chapter: 258
    },
    {
      name: "Aetheris Prime",
      description:
        "A high-end Upper Zone commercial district where Lohan directly experiences the social and material world Isabella can access.",
      chapter: 284
    }
  ]
};
