/**
 * Chapter-Progressive Character Compendium Database
 * Supports progressive timeline unlocks, dual-world identities (Elysium vs. Sectors),
 * player persona linkages (e.g. Lisa the Fox <-> Isabella Vance), multiple unlocked gallery images,
 * and Race / Class with Rarity tiers.
 */

export const charactersCompendium = [
  {
    id: "halon_slime",
    linkedCharacterId: "lohan_human",
    isPlayer: true,
    defaultWorld: "Elysium",
    images: [{ file: "halon-avatar-neutral.png", chapter: 1 }],
    stages: [
      {
        chapter: 1,
        name: "Halon",
        world: "Elysium",
        role: "Solo slime",
        race: "Slime",
        raceRarity: "Mythical",
        class: "Devourer",
        classRarity: "Mythical",
        age: null,
        bio: "A unique blue Slime possessing a Mythical race and class in Elysium. Highly cautious, analytical, and relentless, he utilizes infinite enzymatic digestion and biomass absorption to adapt, evolve, and continuously reshape his gelatinous physiology.",
        revealLink: true
      },
      {
        chapter: 37,
        name: "Halon",
        world: "Elysium",
        role: "Prospective Guild Partner",
        race: "Slime",
        raceRarity: "Mythical",
        class: "Devourer",
        classRarity: "Mythical",
        age: null,
        bio: "A unique Mythical Slime known for his acute tactical mind, clone manipulation, and mastery of multi-core energy. Cautious yet ambitious, he partners closely with Lisa, utilizing his growing array of digested traits to lay the foundation for Elysium's premier independent guild.",
        revealLink: true
      },
      {
        chapter: 115,
        name: "Halon",
        world: "Elysium",
        role: "Astralis Requiem Vice Guild Master",
        race: "Slime",
        raceRarity: "Mythical",
        class: "Devourer",
        classRarity: "Mythical",
        age: null,
        bio: "The vice guild master and tactical core of Astralis Requiem, based at the ancient Amber Tree headquarters. Appearing as a deceptively unassuming blue slime, he conceals overwhelming physical resilience, high-density mana cores, and lethal clone control behind his fluid form.",
        revealLink: true
      },
      {
        chapter: 201,
        name: "Halon",
        world: "Elysium",
        role: "Evolved Mythical Slime",
        race: "Slime",
        raceRarity: "Mythical",
        class: "Devourer",
        classRarity: "Mythical",
        age: null,
        bio: "A Level 11 evolved Mythical Slime whose body has transformed into a denser, clearer, and far more refined gelatinous structure. Balancing multiple internal elemental and magical cores, he commands enhanced speed, spatial awareness, and lethal precision in combat.",
        revealLink: true
      },
      {
        chapter: 293,
        name: "Halon",
        world: "Elysium",
        role: "Astralis Requiem Strategist",
        race: "Slime",
        raceRarity: "Mythical",
        class: "Devourer",
        classRarity: "Mythical",
        age: null,
        bio: "The chief strategist and vice president of Astralis Requiem. Possessing immense biomass reserves and diverse biological adaptations, Halon champions an elite, quality-driven guild philosophy, using his analytical genius to outmaneuver corporate syndicates.",
        revealLink: true
      },
      {
        chapter: 338,
        name: "Halon",
        world: "Elysium",
        role: "Astralis Requiem Vice Guild Master",
        race: "Slime",
        raceRarity: "Mythical",
        class: "Devourer",
        classRarity: "Mythical",
        age: null,
        bio: "A high-speed, battle-hardened Mythical Slime and vice guild master of Astralis Requiem. Endowed with an expanded magic core, massive biomass integration, and lightning agility exceeding 24 m/s, he wields devastating biological capabilities like Vital Pulse Injection alongside advanced clone manipulation.",
        revealLink: true
      },
      {
        chapter: 378,
        name: "Halon",
        world: "Elysium",
        role: "Level 16 Mythical Slime",
        race: "Slime",
        raceRarity: "Mythical",
        class: "Devourer",
        classRarity: "Mythical",
        age: null,
        bio: "A Level 16 Mythical Slime and supreme combat strategist of Astralis Requiem. Sporting a dense, radiant cyan form, he wields an elite suite of evolved traits including Active Purification, Ethereal Resonance, Instant Flow, and Penetrating Vision, standing as one of Elysium's most versatile and terrifying powerhouses.",
        revealLink: true
      }
    ]
  },
  {
    id: "lohan_human",
    linkedCharacterId: "halon_slime",
    isPlayer: true,
    defaultWorld: "Sectors",
    images: [{ file: "lohan-ch1.png", chapter: 1 }],
    stages: [
      {
        chapter: 1,
        name: "Lohan Hayes",
        world: "Sectors",
        role: "Lower Zone Student",
        age: 18,
        bio: "A former bedridden invalid who reincarnated into the body of an impoverished 18-year-old student in Sector 4 on planet Eden-3. Living in a moldy, dilapidated apartment under crushing medical debt and severe physical weakness, he possesses unbreakable willpower and turns to Elysium immersion to reshape his destiny.",
        revealLink: true
      },
      {
        chapter: 120,
        name: "Lohan Hayes",
        world: "Sectors",
        role: "Elysium-Strengthened Student",
        age: 18,
        bio: "An 18-year-old student in Sector 4 whose physical body is undergoing dramatic rejuvenation as a result of Level 9 Elysium stat integration. Once frail and sickly, Lohan now possesses athletic musculature, superhuman stamina, and heightened sensory reflexes in the real world.",
        revealLink: true
      },
      {
        chapter: 264,
        name: "Lohan Hayes",
        world: "Sectors",
        role: "Debt-Free Guild Vice President",
        age: 18,
        bio: "An 18-year-old Lower Zone student and debt-free vice president of Astralis Requiem. Having erased his family debts through Elysium earnings, Lohan is calm, disciplined, and quietly confident, using his growing real-world physical enhancements to navigate Sector 4 safely.",
        revealLink: true
      },
      {
        chapter: 278,
        name: "Lohan Hayes",
        world: "Sectors",
        role: "Lower Zone Survivor",
        age: 18,
        bio: "A battle-hardened young man from Sector 4 whose Elysium progression has permanently integrated superhuman physical conditioning, dense musculature, and sharp predator reflexes into his real body. Pragmatic and resolute, he is prepared to use decisive force to protect his freedom and his access to Elysium.",
        revealLink: true
      },
      {
        chapter: 283,
        name: "Lohan Hayes",
        world: "Sectors",
        role: "Upper Zone Resident",
        age: 18,
        bio: "The real-world identity behind Halon and co-founder of Astralis Requiem, now residing in a luxurious, heavily secured Upper Zone penthouse arranged by Isabella. With his physical body reinforced by Elysium stats and his living conditions radically elevated, Lohan operates with quiet authority and absolute focus.",
        revealLink: true
      },
      {
        chapter: 346,
        name: "Lohan Hayes",
        world: "Sectors",
        role: "Sector 4 Vanguard",
        age: 18,
        bio: "Co-founder of Astralis Requiem and an imposing real-world figure in the Upper Zone. Armed with corporate resources, an armored luxury aerocar, and elite full-dive immersion technology, Lohan maintains strong ties to trusted Lower Zone allies while safeguarding his dual identity.",
        revealLink: true
      },
      {
        chapter: 386,
        name: "Lohan Hayes",
        world: "Sectors",
        role: "Level 16 Integrated Fighter",
        age: 18,
        bio: "A Level 16 integrated fighter in the real world. Possessing extraordinary superhuman physical strength, flawless stamina, and hyper-acute sensory perception bled over from his Mythical avatar, Lohan is a quiet, formidable force in the Sectors, coordinating high-stakes operations while shielding his identity.",
        revealLink: true
      }
    ]
  },
  {
    id: "oscar_landlord",
    linkedCharacterId: null,
    isPlayer: false,
    defaultWorld: "Sectors",
    images: [{ file: "oscar-ch1.png", chapter: 1 }],
    stages: [
      {
        chapter: 1,
        name: "Oscar",
        world: "Sectors",
        role: "Sector 4 Landlord",
        age: 52,
        bio: "The heavy-set landlord of Lohan's suburban Sector 4 apartment building. Adorned with gaudy gold jewelry and a glowing holographic eyepiece over his left eye, he is a greedy, ruthless slumlord who relentlessly extorts impoverished Lower Zone tenants.",
        revealLink: false
      },
      {
        chapter: 278,
        name: "Oscar V. Malcolm",
        world: "Sectors",
        role: "Eliminated Sector 4 Landlord",
        age: 52,
        bio: "The corrupt and treacherous landlord of Sector 4. Behind his facade of petty rent extortion, Oscar is a dangerous underworld informant who disables tenant security, hires street thugs, and sells player locations to the highest corporate bidder.",
        revealLink: false
      }
    ]
  },
  {
    id: "lisa_fox",
    linkedCharacterId: "isabella_vance",
    isPlayer: true,
    defaultWorld: "Elysium",
    images: [{ file: "lisa-16.png", chapter: 16 }],
    stages: [
      {
        chapter: 16,
        name: "Intelligent White Fox",
        world: "Elysium",
        role: "Curious Observer",
        race: "White Fox",
        raceRarity: "Unknown",
        class: "Unknown",
        classRarity: "Unknown",
        age: null,
        bio: "A small, elegant white fox wandering the low-level forest. Calm, intelligent, and highly observant, she watches Halon's movements with quiet curiosity and dignified poise.",
        revealLink: false
      },
      {
        chapter: 34,
        name: "Telepathic White Fox",
        world: "Elysium",
        role: "Curious Observer",
        race: "White Fox",
        raceRarity: "Unknown",
        class: "Unknown",
        classRarity: "Unknown",
        age: null,
        bio: "An intelligent player avatar who communicates mind-to-mind using an innate Telepathy ability. Graceful, composed, and analytical, she possesses keen social perception and an aristocratic presence.",
        revealLink: false
      },
      {
        chapter: 35,
        name: "Telepathic White Fox",
        world: "Elysium",
        role: "Guild Leader",
        race: "White Fox",
        raceRarity: "Rare",
        class: "Unknown",
        classRarity: "Unknown",
        age: null,
        bio: "A confident player hailing from an elite corporate family background. Raised with strong leadership instincts and social poise, she actively seeks out exceptional talent to build a premier guild.",
        revealLink: false
      },
      {
        chapter: 36,
        name: "Spirit Fox",
        world: "Elysium",
        role: "Prospective Guild Leader",
        race: "Spirit Fox",
        raceRarity: "Unknown",
        class: "Unknown",
        classRarity: "Unknown",
        age: null,
        bio: "A Spirit Fox whose innate telepathy reflects her race's spiritual affinity. Wise and insightful, she possesses deep knowledge of player race hierarchies and potential.",
        revealLink: false
      },
      {
        chapter: 37,
        name: "Lisa",
        world: "Elysium",
        role: "Guild Leader",
        race: "Spiritual Fox",
        raceRarity: "Legendary",
        class: "Illusion Weaver",
        classRarity: "Rare",
        age: null,
        bio: "A Legendary Spiritual Fox race and a Rare Illusion Weaver class. Elegant, strategic, and fiercely loyal to her chosen allies, she works closely with Halon to establish a powerhouse faction in Elysium.",
        revealLink: false
      },
      {
        chapter: 115,
        name: "Lisa",
        world: "Elysium",
        role: "Astralis Requiem Guild Master",
        race: "Spiritual Fox",
        raceRarity: "Legendary",
        class: "Illusion Weaver",
        classRarity: "Rare",
        age: null,
        bio: "The guild master of Astralis Requiem, based at the ancient Amber Tree headquarters. Combining elite corporate upbringing, sharp tactical caution, and total trust in Halon, she leads the guild with regal poise and keen administrative mastery.",
        revealLink: false
      },
      {
        chapter: 140,
        name: "Lisa",
        world: "Elysium",
        role: "Astralis Requiem Guild Master",
        race: "Spiritual Fox",
        raceRarity: "Legendary",
        class: "Illusion Weaver",
        classRarity: "Rare",
        age: null,
        bio: "The radiant Legendary Spiritual Fox guild master of Astralis Requiem. Backed by elite corporate training and deep magical insight, she wields potent telepathy and illusion weaving, guiding Astralis's elite growth while maintaining absolute trust in Halon.",
        revealLink: true
      },
      {
        chapter: 195,
        name: "Lisa",
        world: "Elysium",
        role: "Two-Tailed Spirit Fox",
        race: "Spiritual Fox",
        raceRarity: "Legendary",
        class: "Illusion Weaver",
        classRarity: "Rare",
        age: null,
        bio: "A majestic, Level 11 two-tailed Spirit Fox and guild master of Astralis Requiem. Her qualitative evolution grants her a larger, more imposing physical presence, amplified spiritual pressure, and formidable combat confidence in weaving high-tier illusions.",
        revealLink: true
      },
      {
        chapter: 293,
        name: "Lisa",
        world: "Elysium",
        role: "Astralis Requiem President",
        race: "Spiritual Fox",
        raceRarity: "Legendary",
        class: "Illusion Weaver",
        classRarity: "Rare",
        age: null,
        bio: "The visionary president and two-tailed Spirit Fox guild master of Astralis Requiem. Combining elite corporate leadership acumen from her Vance lineage with mastery over mind and illusion arts, she enforces strict quality-over-quantity standards to ensure Astralis remains uncompromised and supreme.",
        revealLink: true
      },
      {
        chapter: 327,
        name: "Lisa",
        world: "Elysium",
        role: "Astralis Requiem Guild Master",
        race: "Spiritual Fox",
        raceRarity: "Legendary",
        class: "Illusion Weaver",
        classRarity: "Rare",
        age: null,
        bio: "The commanding guild master of Astralis Requiem, appearing as a regal two-tailed Spirit Fox. Master of high-tier illusion magic and guild sovereignty powers like Stellar Lament, she oversees Elysium's premier independent guild with aristocratic elegance, sharp intellect, and unwavering resolve.",
        revealLink: true
      },
      {
        chapter: 378,
        name: "Lisa",
        world: "Elysium",
        role: "Astralis Requiem Leader",
        race: "Spiritual Fox",
        raceRarity: "Legendary",
        class: "Illusion Weaver",
        classRarity: "Rare",
        age: null,
        bio: "A Level 15 Legendary Spirit Fox and the supreme leader of Astralis Requiem. Clad in an aura of refined spiritual authority, she commands profound mental and illusion magic, expertly directing the guild's elite vanguards and strategic expansion from the Silent Star Garden.",
        revealLink: true
      }
    ]
  },
  {
    id: "isabella_vance",
    linkedCharacterId: "lisa_fox",
    isPlayer: true,
    defaultWorld: "Sectors",
    images: [
      { file: "isabella-march12.png", chapter: 7 },
      { file: "isabella-april23.png", chapter: 46 }
    ],
    stages: [
      {
        chapter: 7,
        name: "Isabella Vance",
        world: "Sectors",
        role: "Corporate Heiress",
        age: 18,
        bio: "Heiress to the Vance Group megacorporation, which commands planetary governance, off-world colonies, and satellite networks on Eden-3. Distinguished by her natural red hair, flawless icy appearance, and cold, aristocratic demeanor.",
        revealLink: false
      },
      {
        chapter: 140,
        name: "Isabella Vance",
        world: "Sectors",
        role: "Corporate Heiress (Guild Leader)",
        age: 18,
        bio: "An 18-year-old high-society student and heiress to the Vance Group megacorporation on Eden-3. Possessing striking crimson hair, sharp intellect, and an aloof exterior, she conceals her identity as Lisa while managing vast corporate assets and school life.",
        revealLink: true
      },
      {
        chapter: 184,
        name: "Isabella Vance",
        world: "Sectors",
        role: "Classmate and Guild President",
        age: 18,
        bio: "The brilliant red-haired heiress of the Vance Group and real-world persona behind Lisa. Elegant, guarded, and deeply calculating, she balances high corporate expectations with her secret partnership alongside Lohan, commanding premier resources from the Upper Zone.",
        revealLink: true
      },
      {
        chapter: 283,
        name: "Isabella Vance",
        world: "Sectors",
        role: "Vance Heiress and Lohan's Patron",
        age: 18,
        bio: "The influential Vance Group heiress and Lohan's primary Upper Zone benefactor. Decisive and protective, she uses her family's vast resources and security networks to provide Lohan with a fortified penthouse, shielding him from corporate espionage.",
        revealLink: true
      },
      {
        chapter: 346,
        name: "Isabella Vance",
        world: "Sectors",
        role: "Vance Heiress & Astralis Benefactor",
        age: 18,
        bio: "Heiress to the Vance Group and executive benefactor of Astralis Requiem. Armed with state-of-the-art armored transport, top-tier Syn neural immersion hardware, and boundless corporate capital, she oversees the real-world expansion and equipment logistics of the guild.",
        revealLink: true
      },
      {
        chapter: 400,
        name: "Isabella Vance",
        world: "Sectors",
        role: "Allied Heiress & Close Companion",
        age: 18,
        bio: "The brilliant red-haired heiress of the Vance Group megacorporation and co-founder of Astralis Requiem. Balancing immense family influence with independent ambition, she acts as Lohan's closest confidante, patron, and equal partner in the Upper Zone, commanding vast corporate intelligence networks and top-tier logistics.",
        revealLink: true
      }
    ]
  },
  {
    id: "aeliana",
    linkedCharacterId: null,
    isPlayer: false,
    defaultWorld: "Elysium",
    images: [{ file: "aeliana-march12.png", chapter: 18 }],
    stages: [
      {
        chapter: 18,
        name: "Elven Girl (Crazy Girl)",
        world: "Elysium",
        role: "Elven Mage",
        race: "Elf",
        raceRarity: "Uncommon",
        class: "Elven Mage",
        classRarity: "Unknown",
        age: null,
        bio: "An energetic and eccentric young Elven mage carrying a wooden staff. Deeply curious about forest creatures, she exhibits a lively, passionate personality and an enthusiastic fascination with unique magic.",
        revealLink: false
      },
      {
        chapter: 19,
        name: "Elven Girl",
        world: "Elysium",
        role: "Elven Mage Apprentice",
        race: "Elf",
        raceRarity: "Uncommon",
        class: "Elven Mage",
        classRarity: "Rare",
        age: null,
        bio: "A warm-hearted Elven mage apprentice who adores rare and intelligent forest creatures. Generous, cheerful, and protective, she frequently shares valuable magical resources with her friends.",
        revealLink: false
      },
      {
        chapter: 24,
        name: "Aeliana",
        world: "Elysium",
        role: "Elven Mage Apprentice",
        race: "Elf",
        raceRarity: "Uncommon",
        class: "Elven Mage",
        classRarity: "Rare",
        age: 159,
        bio: "A 159-year-old Elven mage apprentice proficient in elemental fire and arcane arts. Kind, expressive, and fiercely protective of her companions, she acts as a loyal friend and benefactor to Halon.",
        revealLink: false
      },
      {
        chapter: 52,
        name: "Aeliana",
        world: "Elysium",
        role: "High Elven Noble / Archmage Apprentice",
        race: "Elf",
        raceRarity: "Rare",
        class: "Elven Mage",
        classRarity: "Rare",
        age: 159,
        bio: "A 159-year-old Elven mage who holds high noble standing in the capital of Thalendor, where she is respectfully known as 'Lady Aeliana'. Studying under Archmage Yrneha, she balances demanding lessons with her warm, generous friendship with Halon.",
        revealLink: false
      },
      {
        chapter: 341,
        name: "Aeliana",
        world: "Elysium",
        role: "Archmage Apprentice & Tower Liaison",
        race: "Elf",
        raceRarity: "Uncommon",
        class: "Mage",
        classRarity: "Rare",
        age: null,
        bio: "A noble Elven mage apprentice studying under Archmage Yrneha in the capital city of Thalendor. Wielding advanced fire and arcane magic, she serves as an influential liaison between Thalendor's high mage tower and Astralis Requiem, maintaining deep loyalty and personal affection for Halon.",
        revealLink: false
      }
    ]
  },
  {
    id: "vulre",
    linkedCharacterId: null,
    isPlayer: false,
    defaultWorld: "Elysium",
    images: [{ file: "vulre-ch50.png", chapter: 50 }],
    stages: [
      {
        chapter: 50,
        name: "Vulre",
        world: "Elysium",
        role: "Royal Elven Bodyguard",
        race: "Elf",
        raceRarity: "Rare",
        class: "Swordsman",
        classRarity: "Common",
        age: null,
        bio: "A distinguished high-elven royal guard and master swordsman charged with protecting Thalendor's young nobility. Possesses the refined, aristocratic poise of an elite royal butler, commands centuries of refined swordsmanship, and holds deep respect for Lady Aeliana.",
        revealLink: false
      }
    ]
  },
  {
    id: "elara",
    linkedCharacterId: null,
    isPlayer: false,
    defaultWorld: "Elysium",
    images: [{ file: "elara-ch50.png", chapter: 50 }],
    stages: [
      {
        chapter: 50,
        name: "Elara",
        world: "Elysium",
        role: "Royal Elven Bodyguard",
        race: "Elf",
        raceRarity: "Rare",
        class: "Archer",
        classRarity: "Common",
        age: null,
        bio: "A composed and sharp-eyed high-elven archer guarding Thalendor's young nobility alongside Vulre. Soft-spoken yet lethal in archery combat, she fires rapid multi-arrow volleys, possesses extensive knowledge of legendary spirit beasts, and treats allies with dignified courtesy.",
        revealLink: false
      }
    ]
  },
  {
    id: "elven_princess",
    linkedCharacterId: null,
    isPlayer: false,
    defaultWorld: "Elysium",
    images: [],
    stages: [
      {
        chapter: 50,
        name: "Noble High-Elven Girl",
        world: "Elysium",
        role: "High-Elven Royalty",
        race: "Elf",
        raceRarity: "Rare",
        class: "Unknown",
        classRarity: "Unknown",
        age: null,
        bio: "A cheerful young noble high-elf girl from Thalendor featuring long white hair and an ornate green gown of silk and colorful leaves. Fearless and expressive, she affectionately calls Aeliana 'Lia' and bondlessly laughs over shared dread of Archmage Yrneha's homework.",
        revealLink: false
      }
    ]
  },
  {
    id: "elven_prince",
    linkedCharacterId: null,
    isPlayer: false,
    defaultWorld: "Elysium",
    images: [],
    stages: [
      {
        chapter: 50,
        name: "Noble High-Elven Boy",
        world: "Elysium",
        role: "High-Elven Royalty",
        race: "Elf",
        raceRarity: "Rare",
        class: "Unknown",
        classRarity: "Unknown",
        age: null,
        bio: "A young white-haired noble high-elf boy from Thalendor traveling under royal guard protection. Naturally curious and wide-eyed, he is fascinated by unique creatures and takes an instant liking to Halon's glowing blue slime form.",
        revealLink: false
      }
    ]
  },
  {
    id: "yrneha",
    linkedCharacterId: null,
    isPlayer: false,
    defaultWorld: "Elysium",
    images: [{ file: "yrneha-march12.png", chapter: 53 }],
    stages: [
      {
        chapter: 53,
        name: "Yrneha",
        world: "Elysium",
        role: "High Elven Archmage & Royal Instructor",
        race: "Elf",
        raceRarity: "Rare",
        class: "Elven Archmage",
        classRarity: "Epic",
        age: null,
        bio: "A renowned High Elven Archmage residing in the capital of Thalendor. Revered for her supreme mastery over arcana, she serves as the strict, exacting master and magic teacher to Aeliana, imposing rigorous lessons and endless homework infamous among Thalendor's nobility.",
        revealLink: false
      },
      {
        chapter: 74,
        name: "Yrneha",
        world: "Elysium",
        role: "High Elven Archmage & Researcher",
        race: "Elf",
        raceRarity: "Rare",
        class: "Elven Archmage",
        classRarity: "Epic",
        age: null,
        bio: "The preeminent High Elven Archmage of Thalendor, legendary for her profound arcane research and peerless mana perception. Possessing an analytical, calculating demeanor beneath regal elegance, she takes a keen scholarly interest in Halon's unprecedented intelligence, dense mana core, and rapid evolution.",
        revealLink: false
      },
      {
        chapter: 379,
        name: "Yrneha Ylasys",
        world: "Elysium",
        role: "Archmage of Thalendor",
        race: "High Elf",
        raceRarity: "Epic",
        class: "Archmage",
        classRarity: "Legendary",
        age: null,
        bio: "The supreme High Elven Archmage of Thalendor, commanding Legendary-tier arcana and boundless authority across the realm. Endowed with near-omnipresent mana perception, she observes the escalating global shifts in Elysium, recognizing Halon's terrifying growth, Level 16 evolution, and Sacred Light aura as power rivaling ancient entities.",
        revealLink: false
      }
    ]
  },
  {
    id: "intervar",
    linkedCharacterId: null,
    isPlayer: false,
    defaultWorld: "Elysium",
    images: [],
    stages: [
      {
        chapter: 76,
        name: "Intervar",
        world: "Elysium",
        role: "Silver Crucible Merchant",
        race: "Elf",
        raceRarity: "rare",
        class: "Merchant",
        classRarity: "Unknown",
        age: null,
        bio: "A shrewd, calculating Elven alchemical trader and appraiser at the prestigious Silver Crucible in Thalendor. Highly knowledgeable in rare monster reagents, beast venom, and alchemical refining, he deals in top-tier monster drops with discerning professionalism.",
        revealLink: false
      }
    ]
  },
  {
    id: "gribbit",
    linkedCharacterId: null,
    isPlayer: false,
    defaultWorld: "Elysium",
    images: [],
    stages: [
      {
        chapter: 83,
        name: "Gribbit",
        world: "Elysium",
        role: "Kroak Village Elder",
        race: "Swamp Toad",
        raceRarity: "Unknown",
        class: "Unknown",
        classRarity: "Unknown",
        age: null,
        bio: "The deceptively polite elder of Kroak Village, an amphibian Swamp Toad elder who feigns humble gratitude and hospitality toward travelers. Underneath his helpful guise as a knowledgeable swamp guide, he calculates how to exploit unsuspecting outsiders.",
        revealLink: false
      },
      {
        chapter: 85,
        name: "Gribbit",
        world: "Elysium",
        role: "Kroak Village Ambusher",
        race: "Swamp Toad",
        raceRarity: "Unknown",
        class: "Unknown",
        classRarity: "Unknown",
        age: null,
        bio: "The treacherous elder of Kroak Village and ruthless swamp trapper. Masking predatory cunning behind a subservient facade, he coordinates swamp scouts and paralytic Swamp Slug toxins to ambush and harvest foreign travelers who enter the wetlands.",
        revealLink: false
      }
    ]
  },
  {
    id: "edgar",
    linkedCharacterId: null,
    isPlayer: false,
    defaultWorld: "Elysium",
    images: [],
    stages: [
      {
        chapter: 89,
        name: "Edgar",
        world: "Elysium",
        role: "Mana Stone Seller",
        race: "Unknown",
        raceRarity: "Unknown",
        class: "Merchant",
        classRarity: "Unknown",
        age: null,
        bio: "A courteous and perceptive Mana Stone merchant operating a specialty shop in Thalendor's bustling Horizon Bazaar. Unbiased toward non-human customers, he possesses deep knowledge of elemental mana stones, crystal purity grades, and monster absorption affinities.",
        revealLink: false
      }
    ]
  },
  {
    id: "valerius",
    linkedCharacterId: null,
    isPlayer: false,
    defaultWorld: "Elysium",
    images: [],
    stages: [
      {
        chapter: 91,
        name: "Valerius",
        world: "Elysium",
        role: "Elite Tamer",
        race: "Elf",
        raceRarity: "rare",
        class: "Elite Tamer",
        classRarity: "Unknown",
        age: null,
        bio: "An arrogant high-elven noble youth and Elite Tamer in Thalendor. Proud of his aristocratic lineage and rare beast-taming talents, he looks down on ordinary adventurers and wild beasts, flaunting his bonded Shadow Cougar as a symbol of status and superiority.",
        revealLink: false
      }
    ]
  },
  {
    id: "nero",
    linkedCharacterId: "valerius",
    isPlayer: false,
    defaultWorld: "Elysium",
    images: [],
    stages: [
      {
        chapter: 91,
        name: "Nero",
        world: "Elysium",
        role: "Shadow Cougar Familiar",
        race: "Shadow Cougar",
        raceRarity: "Unknown",
        class: "Unknown",
        classRarity: "Unknown",
        age: null,
        bio: "A sleek, shadowy feline spirit beast serving as Valerius's bonded familiar. Boasting heightened predatory instincts, stealth camouflage, and lethal shadow strikes, it maintains an aggressive predatory pride until confronted by creatures of true Mythic or Legendary rank.",
        revealLink: false
      }
    ]
  },
  {
    id: "elle_fairy",
    linkedCharacterId: null,
    isPlayer: false,
    defaultWorld: "Elysium",
    images: [{ file: "elle-march12.png", chapter: 95 }],
    stages: [
      {
        chapter: 95,
        name: "Elle",
        world: "Elysium",
        role: "Mythlorien Gardener / Wood Sprite",
        race: "Fairy",
        raceRarity: "Uncommon",
        class: "Unknown",
        classRarity: "Common",
        age: null,
        bio: "A gentle, palm-sized fairy from Petal Village with translucent butterfly wings resembling flower petals. Dedicated to cultivating rare luminous flora and maintaining forest mana balance, she is fiercely protective of her younger brother Pip and holds deep affection for her companions.",
        revealLink: false
      },
      {
        chapter: 111,
        name: "Elle",
        world: "Elysium",
        role: "Astralis Requiem Ally",
        race: "Fairy",
        raceRarity: "Uncommon",
        class: "Unknown",
        classRarity: "Common",
        age: null,
        bio: "A gentle, winged wood sprite residing within the living ivory canopy of the Fossilized Amber Tree. Serving as the nurturing caretaker of the guild's blooming gardens, Elle shares a deep bond of gratitude and trust with Halon and Lisa, finding a true home within Astralis Requiem.",
        revealLink: false
      },
      {
        chapter: 294,
        name: "Elle",
        world: "Elysium",
        role: "Fairy Under Astralis Training",
        race: "Fairy",
        raceRarity: "Uncommon",
        class: "Unknown",
        classRarity: "Common",
        age: null,
        bio: "A cherished member and resident botanical caretaker of Astralis Requiem. No longer a vulnerable village sprite, Elle actively tends to the blooming mana gardens of the Silent Star Garden, supported and protected by the guild's frontline fighters while contributing to guild herbalism and ambient forest purification.",
        revealLink: false
      }
    ]
  },
  {
    id: "pip_fairy",
    linkedCharacterId: null,
    isPlayer: false,
    defaultWorld: "Elysium",
    images: [{ file: "pip-march12.png", chapter: 95 }],
    stages: [
      {
        chapter: 95,
        name: "Pip",
        world: "Elysium",
        role: "Petal Village Sprite",
        race: "Fairy",
        raceRarity: "Uncommon",
        class: "Unknown",
        classRarity: "Common",
        age: null,
        bio: "A spirited, palm-sized fairy boy with delicate translucent wings and a courageous heart. Playful and adventurous, he cares deeply for his older sister Elle and possesses an innate connection to forest light and natural mana.",
        revealLink: false
      },
      {
        chapter: 111,
        name: "Pip",
        world: "Elysium",
        role: "Rescued Petal Village Sprite",
        race: "Fairy",
        raceRarity: "Uncommon",
        class: "Unknown",
        classRarity: "Common",
        age: null,
        bio: "A joyful, energetic fairy boy residing in the living ivory sanctum of Astralis Requiem alongside his sister Elle. Full of vibrant curiosity and unbounded admiration for Halon and Lisa, he considers the guild headquarters his true family sanctuary.",
        revealLink: false
      },
      {
        chapter: 228,
        name: "Pip",
        world: "Elysium",
        role: "Strengthened Fairy Protector",
        race: "Fairy",
        raceRarity: "Uncommon",
        class: "Unknown",
        classRarity: "Common",
        age: null,
        bio: "An ambitious, brave-hearted fairy youth undergoing rigorous magical training under Halon's guidance. Determined to evolve beyond a helpless sprite to protect his sister Elle and his guildmates, he demonstrates fierce loyalty and exceptional mana receptivity.",
        revealLink: false
      },
      {
        chapter: 250,
        name: "Pip",
        world: "Elysium",
        role: "Exiled Fairy Guardian",
        race: "Fairy",
        raceRarity: "Uncommon",
        class: "Unknown",
        classRarity: "Common",
        age: null,
        bio: "A proud, self-reliant fairy guardian who decisively severed ties with Petal Village after their rejection and prejudice. Unwaveringly loyal to Astralis Requiem, he channels his burgeoning strength solely to defend Halon, Lisa, and the Amber Tree sanctuary.",
        revealLink: false
      },
      {
        chapter: 359,
        name: "Pip",
        world: "Elysium",
        role: "Armed Fairy Vanguard",
        race: "Fairy",
        raceRarity: "Uncommon",
        class: "Unknown",
        classRarity: "Common",
        age: null,
        bio: "A lethal miniature vanguard and aerial scout for Astralis Requiem. Clad in Halon's Level 15 Mythic slime armor clone and wielding high-speed Wind Blade magic, Pip possesses blinding flight velocity and impenetrable defense, acting as an elite combat escort and guardian across high-danger wilderness zones.",
        revealLink: false
      }
    ]
  },
  {
    id: "skye_silver_lotus",
    linkedCharacterId: "skye_elysium",
    isPlayer: true,
    defaultWorld: "Sectors",
    images: [{ file: "skye-march16.png", chapter: 124 }],
    stages: [
      {
        chapter: 124,
        name: "Skye",
        world: "Sectors",
        role: "Silver Lotus Gang Leader",
        age: 19,
        bio: "A sharp-witted Lower Zone gang leader with long blonde hair and piercing blue eyes, wearing a silver jacket. Riding a white hover-motorcycle emblazoned with the Silver Lotus crest, she protects her 7-member crew and possesses an acute sensory ability to detect and smell mana that bled over from her high virtual-to-real Elysium synchronization.",
        revealLink: false
      },
      {
        chapter: 300,
        name: "Skye",
        world: "Sectors",
        role: "Silver Lotus Leader & Coordinator",
        age: 19,
        bio: "The fiercely independent leader of the Silver Lotus gang operating out of an abandoned hangar in Sector 4. Commanding deep loyalty from her seven-member crew, she strategically balances real-world survival in the Lower Zone with their breakthrough into Elysium's Open World, fiercely guarding her team's freedom against corporate exploitation.",
        revealLink: true
      },
      {
        chapter: 348,
        name: "Skye",
        world: "Sectors",
        role: "Astralis Requiem Vanguard Commander",
        age: 19,
        bio: "Commander of the Silver Lotus vanguard and core allied partner of Astralis Requiem in Sector 4. Equipped with high-end neural immersion hardware provided by Lohan and Isabella Vance, Skye leads her full crew under guaranteed guild autonomy and fair dividend contracts, transitioning from street survivalists into an elite real-world and virtual strikeforce.",
        revealLink: true
      }
    ]
  },
  {
    id: "skye_elysium",
    linkedCharacterId: "skye_silver_lotus",
    isPlayer: true,
    defaultWorld: "Elysium",
    images: [],
    stages: [
      {
        chapter: 124,
        name: "Lotus",
        world: "Elysium",
        role: "Silver Lotus Novata Vanguard",
        race: "Unknown",
        raceRarity: "Epic",
        class: "Dual-Blade Vanguard",
        classRarity: "Unknown",
        age: null,
        bio: "The Elysium player avatar of Skye, known in-game as Lotus. Possessing an Epic race with acute olfactory sensitivity to smell and track mana signatures, she grinds through Novata Village alongside her crew, her blonde hair reacting with a soft celestial glow in high-mana environments.",
        revealLink: false
      },
      {
        chapter: 300,
        name: "Lotus",
        world: "Elysium",
        role: "Silver Lotus Open World Vanguard",
        race: "Unknown",
        raceRarity: "Epic",
        class: "Dual-Blade Vanguard",
        classRarity: "Unknown",
        age: null,
        bio: "An agile Epic-race vanguard wielding twin silver swords. Having broken through into the Open World with Silver Lotus, she utilizes her mana-scenting perception to navigate wilderness hazards and scout for her crew.",
        revealLink: true
      },
      {
        chapter: 370,
        name: "Lotus",
        world: "Elysium",
        role: "Astralis Requiem Vanguard Leader",
        race: "Unknown",
        raceRarity: "Epic",
        class: "Dual-Blade Vanguard",
        classRarity: "Unknown",
        age: null,
        bio: "An elite Dual-Blade Vanguard clad in gleaming silver armor and the in-game leader of the Silver Lotus squad within Astralis Requiem. Channeling celestial golden radiance through her twin silver blades, she executes lethal high-speed crossing strikes and utilizes acute olfactory mana-tracking to detect hidden threats across Mythlorien.",
        revealLink: true
      },
      {
        chapter: 383,
        name: "Lotus",
        world: "Elysium",
        role: "Level 12 Vanguard Commander",
        race: "Unknown",
        raceRarity: "Epic",
        class: "Dual-Blade Vanguard",
        classRarity: "Unknown",
        age: null,
        bio: "A Level 12 Epic-race Vanguard Commander sporting a refined white combat jacket from Thalendor and wielding twin silver blades infused with celestial light. Highly respected across Astralis Requiem, Lotus commands the seven-member Silver Lotus strike team as the guild's premier reconnaissance and frontline assault unit.",
        revealLink: true
      }
    ]
  },
  {
    id: "brynnear",
    linkedCharacterId: null,
    isPlayer: true,
    defaultWorld: "Elysium",
    images: [{ file: "brynn-march18.png", chapter: 109 }],
    stages: [
      {
        chapter: 109,
        name: "Brynnear",
        world: "Elysium",
        role: "Glass Beetle Matriarch",
        race: "Glass Beetle",
        raceRarity: "Common",
        class: "Matriarch",
        classRarity: "Epic",
        age: null,
        bio: "A player who began as a Common Glass Beetle but used an Epic Matriarch class to seize control of the beetle nest, command high-level beetles, and turn the fossilized tree into her dungeon-like stronghold.",
        revealLink: false
      },
      {
        chapter: 129,
        name: "Brynnear",
        world: "Elysium",
        role: "Reborn Matriarch",
        race: "Human",
        raceRarity: "Common",
        class: "Matriarch",
        classRarity: "Epic",
        age: null,
        bio: "A vengeful player reborn in a Common Human body while retaining her rare Epic Matriarch class. Bitterly resentful after losing her Amber Tree stronghold to Halon and Lisa, she is consumed by obsessive malice and seeks powerful corporate patrons to rebuild her dominance.",
        revealLink: false
      },
      {
        chapter: 227,
        name: "Brynnear",
        world: "Elysium",
        role: "Hogue Guild Matriarch",
        race: "Human",
        raceRarity: "Common",
        class: "Matriarch",
        classRarity: "Epic",
        age: null,
        bio: "A ruthless faction lieutenant allied with Ernesto Hogue, wielding her Epic Matriarch class to exploit captive players and manipulate corrupted mana streams. Driven by cruelty and unyielding hatred for Astralis Requiem, she pursues power through illicit syndicate experimentation.",
        revealLink: false
      }
    ]
  },
  {
    id: "ernesto_hogue_sectors",
    linkedCharacterId: "ernesto_hogue",
    isPlayer: true,
    defaultWorld: "Sectors",
    images: [],
    stages: [
      {
        chapter: 116,
        name: "Ernesto Hogue",
        world: "Sectors",
        role: "Hogue Group Heir",
        age: null,
        bio: "An ambitious, arrogant heir to the Hogue Group megacorporation in the Upper Zone of Eden 3. Driven by cutthroat corporate rivalry against the Vance Group, he mobilizes immense corporate capital, syndicate contacts, and elite player networks to dominate Elysium's frontier.",
        revealLink: true
      },
      {
        chapter: 227,
        name: "Ernesto Hogue",
        world: "Sectors",
        role: "Hogue Megacorp Executive",
        age: null,
        bio: "A ruthless Hogue Group corporate executive commanding extensive financial syndicates and Lower Zone mercenary squads. Obsessed with crushing the Vance Group and Astralis Requiem, he leverages black-market investments, coercive player contracts, and illegal bio-neural assets.",
        revealLink: true
      }
    ]
  },
  {
    id: "ernesto_hogue",
    linkedCharacterId: "ernesto_hogue_sectors",
    isPlayer: true,
    defaultWorld: "Elysium",
    images: [{ file: "hernesto_hogue-april2.png", chapter: 116 }],
    stages: [
      {
        chapter: 116,
        name: "Ernesto Hogue",
        world: "Elysium",
        role: "Hogue Group Guild Aspirant",
        race: "Unknown",
        raceRarity: "Unknown",
        class: "Unknown",
        classRarity: "Unknown",
        age: null,
        bio: "The Elysium leader of the Hogue Group corporate faction, commanding heavily funded player legions and high-tier mercenary squads. Accustomed to undisputed dominance through overwhelming financial power, he regards any independent opposition as a direct threat to his empire.",
        revealLink: true
      },
      {
        chapter: 227,
        name: "Ernesto Hogue",
        world: "Elysium",
        role: "Hogue Guild Leader",
        race: "Unknown",
        raceRarity: "Unknown",
        class: "Unknown",
        classRarity: "Unknown",
        age: null,
        bio: "Leader of the Hogue corporate guild in Elysium, allied with Brynnear in a desperate, predatory push to manufacture high-level player power. Arrogant, vindictive, and anxious over Astralis Requiem's rising supremacy, he deploys aggressive guild monopolies, player traps, and black-market strategies.",
        revealLink: true
      }
    ]
  },
  {
    id: "isaac_vance",
    linkedCharacterId: "newton",
    isPlayer: true,
    defaultWorld: "Sectors",
    images: [],
    stages: [
      {
        chapter: 116,
        name: "Isaac Vance",
        world: "Sectors",
        role: "Vance Group Heir",
        age: null,
        bio: "One of Evelyn Vance's children and a prominent Vance Group heir. Managing corporate interests on Eden 3 and overseeing elite player squads deployed into Elysium.",
        revealLink: true
      },
      {
        chapter: 138,
        name: "Isaac Vance",
        world: "Sectors",
        role: "Vance Corporate Strategist",
        age: null,
        bio: "A sharp, calculated corporate heir and strategic director within the Vance Group on Eden 3. Managing high-stakes corporate investments, security details, and elite player rosters from the Upper Zone, he meticulously tracks Open World guild movements to safeguard family hegemony.",
        revealLink: true
      }
    ]
  },
  {
    id: "newton",
    linkedCharacterId: "isaac_vance",
    isPlayer: true,
    defaultWorld: "Elysium",
    images: [],
    stages: [
      {
        chapter: 116,
        name: "Newton",
        world: "Elysium",
        role: "Vance Group Faction Leader",
        race: "Human",
        raceRarity: "Common",
        class: "Unknown",
        classRarity: "Epic",
        age: null,
        bio: "The reported Elysium player identity of Isaac Vance. Confirmed to possess an Epic-rarity base as one of Evelyn Vance's children, his faction is closely monitored by rival corporations like the Hogue Group.",
        revealLink: true
      },
      {
        chapter: 138,
        name: "Newton",
        world: "Elysium",
        role: "Vance Faction Leader in Aethelgard",
        race: "Human",
        raceRarity: "Common",
        class: "Unknown",
        classRarity: "Epic",
        age: null,
        bio: "The Elysium player identity of Isaac Vance, commanding the primary Vance corporate guild from the major metropolis of Aethelgard. Endowed with an Epic base and boundless financial backing, Newton represents the disciplined, powerhouse standard of Upper Zone corporate nobility.",
        revealLink: true
      }
    ]
  },
  {
    id: "evelyn_vance",
    linkedCharacterId: null,
    isPlayer: false,
    defaultWorld: "Sectors",
    images: [{ file: "evelyn-march24.png", chapter: 141 }],
    stages: [
      {
        chapter: 141,
        name: "Evelyn Vance",
        world: "Sectors",
        role: "Vance Family Matriarch",
        age: null,
        bio: "The formidable, elegant matriarch of the Vance Group megacorporation on Eden 3. Commanding astronomical planetary wealth and political authority, she maintains an imposing, aristocratic presence while harboring protective, high expectations for her daughter Isabella.",
        revealLink: false
      },
      {
        chapter: 289,
        name: "Evelyn Vance",
        world: "Sectors",
        role: "Protective Vance Matriarch",
        age: null,
        bio: "Matriarch of the Vance Group and ultimate authority over the family's planetary conglomerate. Astute, commanding, and fiercely protective of the Vance lineage, she monitors Isabella's independent ventures with a blend of aristocratic scrutiny and maternal pride.",
        revealLink: false
      }
    ]
  },
  {
    id: "alice_muller",
    linkedCharacterId: "alice_elysium",
    isPlayer: true,
    defaultWorld: "Sectors",
    images: [{ file: "alice-april6.png", chapter: 178 }],
    stages: [
      {
        chapter: 178,
        name: "Alice Muller",
        world: "Sectors",
        role: "Isabella's Best Friend",
        age: 18,
        bio: "Isabella Vance's energetic and fiercely loyal best friend in the Upper Zone. Her warm, lively personality balances Isabella's icy composure, and she serves as a key personal confidante and real-world liaison.",
        revealLink: true
      },
      {
        chapter: 264,
        name: "Alice Muller",
        world: "Sectors",
        role: "Astralis Real-World Liaison",
        age: 18,
        bio: "Isabella Vance's closest confidante and energetic real-world liaison for Astralis Requiem in the Upper Zone. Bright, loyal, and socially perceptive, she manages discrete financial transactions, member logistics, and high-level communications to safeguard guild operations.",
        revealLink: true
      }
    ]
  },
  {
    id: "alice_elysium",
    linkedCharacterId: "alice_muller",
    isPlayer: true,
    defaultWorld: "Elysium",
    images: [],
    stages: [
      {
        chapter: 178,
        name: "Alice",
        world: "Elysium",
        role: "Astralis Combat Squad Leader",
        race: "Unknown",
        raceRarity: "Unknown",
        class: "Pugilist",
        classRarity: "Unknown",
        age: null,
        bio: "The in-game avatar of Alice Muller and Lisa's fiercely loyal best friend. An energetic and athletic Pugilist fighter, she commands frontline player squads for Astralis Requiem, utilizing rapid martial arts strikes, high agility, and infectious morale.",
        revealLink: true
      },
      {
        chapter: 293,
        name: "Alice",
        world: "Elysium",
        role: "Astralis Requiem Group Leader",
        race: "Unknown",
        raceRarity: "Unknown",
        class: "Pugilist",
        classRarity: "Unknown",
        age: null,
        bio: "A core frontline commander of Astralis Requiem and Lisa's steadfast companion. Mastering agile Pugilist close-quarters combat, Alice leads elite player detachments in the Open World and oversees internal guild discipline with high-spirited loyalty.",
        revealLink: true
      }
    ]
  },
  {
    id: "devon_baker",
    linkedCharacterId: "devon_elysium",
    isPlayer: true,
    defaultWorld: "Sectors",
    images: [],
    stages: [
      {
        chapter: 167,
        name: "Devon Baker",
        world: "Sectors",
        role: "Lower Zone Classmate / Silver Lotus Scout",
        age: 18,
        bio: "An observant Lower Zone student in Lohan's class and second-in-command scout of the Silver Lotus gang. Having shared a single stolen Elysium immersion helmet with his crew, his Rare-tier mana perception enables him to detect Lohan's subtle mana vibration and superhuman reflexes in the real world.",
        revealLink: false
      },
      {
        chapter: 188,
        name: "Devon Baker",
        world: "Sectors",
        role: "Silver Lotus Liaison",
        age: 18,
        bio: "Second-in-command and tactical liaison of the Silver Lotus gang in Sector 4. Possessing a Rare-tier mana constitution that allows him to manifest glowing purple energy in the real world, Devon combines sharp diplomatic intelligence with fierce dedication to his street family.",
        revealLink: true
      },
      {
        chapter: 300,
        name: "Devon Baker",
        world: "Sectors",
        role: "Open World Liaison",
        age: 18,
        bio: "The primary diplomatic liaison of the Silver Lotus gang in Sector 4. Strategic and analytical, Devon manages external relations and guild alliances, seeking an independent path for his crew away from predatory corporate taxation and exploitation.",
        revealLink: true
      },
      {
        chapter: 348,
        name: "Devon Baker",
        world: "Sectors",
        role: "Astralis Requiem Lower Zone Coordinator",
        age: 18,
        bio: "The Lower Zone operations coordinator for Astralis Requiem in Sector 4. Acting as the trusted right hand to Skye and key contact for Lohan, Devon oversees guild logistics, immersion hardware distribution, and strategic communications for their Sector 4 division.",
        revealLink: true
      },
      {
        chapter: 372,
        name: "Devon Baker",
        world: "Sectors",
        role: "Astralis Vanguard Officer",
        age: 18,
        bio: "A prosperous vanguard officer and operations manager for Astralis Requiem in Sector 4. Leveraging daily guild dividends of hundreds of credits, Devon manages guild supply lines and real-world assets, securing fresh provisions, quality gear, and financial freedom for his crew.",
        revealLink: true
      }
    ]
  },
  {
    id: "devon_elysium",
    linkedCharacterId: "devon_baker",
    isPlayer: true,
    defaultWorld: "Elysium",
    images: [],
    stages: [
      {
        chapter: 167,
        name: "Vonde",
        world: "Elysium",
        role: "Novata Village Scout",
        race: "Human",
        raceRarity: "Rare",
        class: "Void Scout",
        classRarity: "Uncommon",
        age: null,
        bio: "Devon's player avatar in Elysium, known as Vonde. Grinding in Novata Village 1,512 under a strict shared-helmet rotation schedule, he utilizes a Rare race with heightened sensory perception and an Uncommon magic-affinity class to track resources and monsters.",
        revealLink: false
      },
      {
        chapter: 300,
        name: "Vonde",
        world: "Elysium",
        role: "Silver Lotus Open World Scout",
        race: "Human",
        raceRarity: "Rare",
        class: "Void Scout",
        classRarity: "Uncommon",
        age: null,
        bio: "A Level 9 Void Scout wielding a wooden staff and leading reconnaissance for the Silver Lotus squad. Utilizing a Rare sensory race and void magic, Vonde navigates hazardous wilderness terrain and detects hostile ambushes across the Open World.",
        revealLink: true
      },
      {
        chapter: 358,
        name: "Vonde",
        world: "Elysium",
        role: "Astralis Requiem Tactical Scout",
        race: "Human",
        raceRarity: "Rare",
        class: "Void Scout",
        classRarity: "Uncommon",
        age: null,
        bio: "An elite tactical scout and void mage within Astralis Requiem. Operating in Mythlorien, Vonde wields gravity-destabilizing void spells and suction portals to disrupt enemy formations, lock down high-level monsters, and guide allied strikes.",
        revealLink: true
      },
      {
        chapter: 389,
        name: "Vonde",
        world: "Elysium",
        role: "Level 12 Infiltration Vanguard",
        race: "Human",
        raceRarity: "Rare",
        class: "Void Scout",
        classRarity: "Uncommon",
        age: null,
        bio: "A Level 12 Infiltration Vanguard and master Void Scout within Astralis Requiem. Handpicked by Halon for high-stakes covert operations in Aethelgard, Vonde combines keen reconnaissance intellect with gravity-warping void magic to neutralize syndicate threats.",
        revealLink: true
      }
    ]
  },
  {
    id: "dylan_sectors",
    linkedCharacterId: "dylan",
    isPlayer: true,
    defaultWorld: "Sectors",
    images: [],
    stages: [
      {
        chapter: 229,
        name: "Dylan",
        world: "Sectors",
        role: "Upper Zone Childhood Friend",
        age: 18,
        bio: "The third member of Isabella Vance and Alice Muller's close childhood trio from the Upper Zone. Charismatic, intelligent, and socially adept, he shares long-standing ties with their families.",
        revealLink: true
      },
      {
        chapter: 293,
        name: "Dylan",
        world: "Sectors",
        role: "Astralis Real-World Strategist",
        age: 18,
        bio: "A suave, well-connected Upper Zone scion and childhood friend of Isabella and Alice. Gifted with sharp diplomatic acumen and high-society connections, he coordinates strategic planning, elite networking, and real-world resource allocation for Astralis Requiem.",
        revealLink: true
      }
    ]
  },
  {
    id: "dylan",
    linkedCharacterId: "dylan_sectors",
    isPlayer: true,
    defaultWorld: "Elysium",
    images: [{ file: "dylan-may1.png", chapter: 229 }],
    stages: [
      {
        chapter: 229,
        name: "Dylan",
        world: "Elysium",
        role: "Lisa and Alice's Childhood Friend",
        race: "Unknown",
        raceRarity: "Unknown",
        class: "Unknown",
        classRarity: "Unknown",
        age: null,
        bio: "A charismatic, aristocratic youth and lifelong companion of Lisa and Alice from the Upper Zone. Polished, observant, and naturally confident, he brings refined combat discipline and high-society tact into the Open World of Thalendor.",
        revealLink: true
      },
      {
        chapter: 232,
        name: "Dylan",
        world: "Elysium",
        role: "Ebony Chalice Survivor",
        race: "Dhampir",
        raceRarity: "Rare",
        class: "Blood Aristocrat",
        classRarity: "Rare",
        age: null,
        bio: "A refined Dhampir noble in Elysium bearing the Rare Blood Aristocrat class, obtained through surviving the esoteric Ebony Chalice trial. Wielding dark sanguine magic, heightened speed, and aristocratic poise, he provides Astralis Requiem with unique esoteric abilities.",
        revealLink: true
      },
      {
        chapter: 293,
        name: "Dylan",
        world: "Elysium",
        role: "Astralis Requiem Organizer",
        race: "Dhampir",
        raceRarity: "Rare",
        class: "Blood Aristocrat",
        classRarity: "Rare",
        age: null,
        bio: "An elite Dhampir vanguard and strategic planner within Astralis Requiem. Combining blood magic prowess with aristocratic insight, Dylan helps oversee guild coordination and specialized combat tactics while upholding Halon's strict standard of elite, quality-focused recruitment.",
        revealLink: true
      }
    ]
  },
  {
    id: "kora",
    linkedCharacterId: null,
    isPlayer: false,
    defaultWorld: "Elysium",
    images: [],
    stages: [
      {
        chapter: 206,
        name: "Kora",
        world: "Elysium",
        role: "Thalendor Craftswoman",
        race: "Unknown",
        raceRarity: "Unknown",
        class: "Craftswoman",
        classRarity: "Unknown",
        age: null,
        bio: "A blunt, master artisan and monster-leather craftswoman based in the artisan quarter of Thalendor. Highly experienced in handling exotic beast pelts, serpent scales, and elemental hides, she respects genuine craftsmanship and evaluates rare monster materials with expert scrutiny.",
        revealLink: false
      }
    ]
  },
  {
    id: "basil_petal_village",
    linkedCharacterId: null,
    isPlayer: false,
    defaultWorld: "Elysium",
    images: [],
    stages: [
      {
        chapter: 253,
        name: "Basil",
        world: "Elysium",
        role: "Petal Village Elder",
        race: "Fairy",
        raceRarity: "Unknown",
        class: "Unknown",
        classRarity: "Unknown",
        age: null,
        bio: "The dignified elder and tribal chief of Petal Village in Mythlorien. Charged with the preservation and spiritual defense of the fairy community, he commands deep reverence among his kin while carrying the heavy burden of village survival against outside predators.",
        revealLink: false
      },
      {
        chapter: 256,
        name: "Basil",
        world: "Elysium",
        role: "Petal Village Chief",
        race: "Fairy",
        raceRarity: "Unknown",
        class: "Unknown",
        classRarity: "Unknown",
        age: null,
        bio: "The wise and principled chief of Petal Village. Renowned for his moral integrity and respect for true strength, he openly denounces traditional village prejudice, honoring Pip and Elle's heroic growth and maintaining respectful relations with Astralis Requiem.",
        revealLink: false
      }
    ]
  },
  {
    id: "peoni",
    linkedCharacterId: null,
    isPlayer: false,
    defaultWorld: "Elysium",
    images: [],
    stages: [
      {
        chapter: 250,
        name: "Peoni",
        world: "Elysium",
        role: "Petal Village Fairy",
        race: "Fairy",
        raceRarity: "Unknown",
        class: "Unknown",
        classRarity: "Unknown",
        age: null,
        bio: "A conventional fairy resident of Petal Village whose self-centered, entitled nature embodies the petty prejudice of the fairy commune. Quick to ostracize the weak and equally swift to demand protection from those who gain power, she represents the rigid traditionalism of Petal Village.",
        revealLink: false
      }
    ]
  },
  {
    id: "varkas",
    linkedCharacterId: null,
    isPlayer: true,
    defaultWorld: "Elysium",
    images: [],
    stages: [
      {
        chapter: 253,
        name: "Varkas",
        world: "Elysium",
        role: "Lizardman Raider",
        race: "Lizardman",
        raceRarity: "Rare",
        class: "Unknown",
        classRarity: "Unknown",
        age: null,
        bio: "A savage, power-hungry Lower Zone player possessing a Rare Lizardman race. Driven by desperate ambition to escape poverty through brute force in Elysium, he commands predatory reptilian tactics and leads ruthless raider squads to pillage peaceful settlements like Petal Village.",
        revealLink: false
      }
    ]
  },
  {
    id: "astraea",
    linkedCharacterId: null,
    isPlayer: false,
    defaultWorld: "Elysium",
    images: [{ file: "astraea-march12.png", chapter: 112 }],
    stages: [
      {
        chapter: 112,
        name: "Astraea",
        world: "Elysium",
        role: "Goddess of Elysium",
        age: null,
        bio: "The enigmatic Goddess and higher-dimensional administrator of the Elysium world system. Overseeing universal algorithms, player reincarnation cycles, and world balance from celestial sanctums, she observes Halon's anomalous evolution with quiet, profound curiosity.",
        revealLink: false
      },
      {
        chapter: 296,
        name: "Astraea",
        world: "Elysium",
        role: "Overworked System Goddess",
        age: null,
        bio: "The supreme administrator Goddess of the Elysium system. Tasked with managing infinite cosmic calculations, anomaly audits, and global balance patches, she works under immense celestial strain, grappling with unforeseen player anomalies and system loopholes that ripple across mortal reality.",
        revealLink: false
      }
    ]
  },
  {
    id: "garius_broken_suns",
    linkedCharacterId: null,
    isPlayer: true,
    defaultWorld: "Elysium",
    images: [],
    stages: [
      {
        chapter: 393,
        name: "Garius",
        world: "Elysium",
        role: "Broken Suns Leader",
        race: "Human",
        raceRarity: "Uncommon",
        class: "Commander",
        classRarity: "Rare",
        age: null,
        bio: "A commanding and ambitious guild leader of the Broken Suns in the grand city of Aethelgard. Boasting a Rare Commander class, he operates with aggressive military efficiency, scouting high-potential independent players and establishing tight territorial dominance across local hunting grounds.",
        revealLink: false
      }
    ]
  },
  {
    id: "dan_player",
    linkedCharacterId: null,
    isPlayer: true,
    defaultWorld: "Elysium",
    images: [],
    stages: [
      {
        chapter: 311,
        name: "Dan",
        world: "Elysium",
        role: "Independent Player",
        race: "Human",
        raceRarity: "Rare",
        class: "Unknown",
        classRarity: "Rare",
        age: null,
        bio: "A determined and capable independent player in Elysium possessing a Rare Human race. Traveling alongside his partner Lily, he steadily grinds through the wilderness with disciplined teamwork, drawing inspiration from Astralis Requiem's legendary rise.",
        revealLink: false
      },
      {
        chapter: 393,
        name: "Dan",
        world: "Elysium",
        role: "Level 13 Broken Suns Recruit",
        race: "Human",
        raceRarity: "Rare",
        class: "Warrior",
        classRarity: "Rare",
        age: null,
        bio: "A skilled Level 13 frontline Warrior with a Rare race and combat class. Operating in tandem with Lily as an elite duo in Aethelgard, Dan combines heavy martial defense with practical survival savvy, navigating the complex politics of major regional guilds like the Broken Suns.",
        revealLink: false
      }
    ]
  },
  {
    id: "lily_player",
    linkedCharacterId: null,
    isPlayer: true,
    defaultWorld: "Elysium",
    images: [],
    stages: [
      {
        chapter: 393,
        name: "Lily",
        world: "Elysium",
        role: "Level 13 Broken Suns Recruit",
        race: "Human",
        raceRarity: "Rare",
        class: "Mage",
        classRarity: "Rare",
        age: null,
        bio: "A sharp, capable Level 13 Mage endowed with a Rare race and magical class. Partnered with Dan as a coordinated independent duo in Aethelgard, Lily provides devastating ranged elemental support and perceptive tactical awareness during high-tier hunts.",
        revealLink: false
      }
    ]
  },
  {
    id: "zach_silver_lotus",
    linkedCharacterId: "zach_elysium",
    isPlayer: true,
    defaultWorld: "Sectors",
    images: [],
    stages: [
      {
        chapter: 188,
        name: "Zach",
        world: "Sectors",
        role: "Silver Lotus Chief Mechanic",
        age: 18,
        bio: "A burly, dependable Lower Zone youth with grease-stained hands and burn scars on his ears from welding torches. As the gang's master mechanic, he maintains their eight white sports flying motorcycles using salvaged parts and defends the crew with a giant steel wheel wrench.",
        revealLink: false
      },
      {
        chapter: 191,
        name: "Zach",
        world: "Sectors",
        role: "Gang Technician & Defender",
        age: 18,
        bio: "The chief technician and hardware craftsman of the Silver Lotus gang in Sector 4. Highly skilled at fabricating encrypted shortwave radio chips and modifying scrap electronics, he combines street-smart defensive vigilance with deep loyalty to his crew.",
        revealLink: true
      },
      {
        chapter: 348,
        name: "Zach",
        world: "Sectors",
        role: "Astralis Requiem Hardware Specialist",
        age: 18,
        bio: "The dedicated hardware specialist for Silver Lotus and Astralis Requiem in Sector 4. Responsible for maintaining the squad's six high-tier neural immersion rigs, he manages power conduits, sensory calibration, and full-dive workstation security with passionate expertise.",
        revealLink: true
      },
      {
        chapter: 372,
        name: "Zach",
        world: "Sectors",
        role: "Astralis Frontline Specialist",
        age: 18,
        bio: "Master mechanic and frontline hardware technician for Astralis Requiem's Sector 4 division. Earning substantial guild dividends, he upgrades the crew's vehicles and workshop with pristine components, securing long-sought financial freedom and top-tier gear for his teammates.",
        revealLink: true
      }
    ]
  },
  {
    id: "zach_elysium",
    linkedCharacterId: "zach_silver_lotus",
    isPlayer: true,
    defaultWorld: "Elysium",
    images: [],
    stages: [
      {
        chapter: 188,
        name: "Zach",
        world: "Elysium",
        role: "Novata Village Guardian",
        race: "Human",
        raceRarity: "Common",
        class: "Guardian",
        classRarity: "Uncommon",
        age: null,
        bio: "Zach's player avatar in Elysium, appearing as a massive, metal-clad juggernaut resembling an armored cabinet. He wields a colossal heavy shield to anchor the Silver Lotus frontline.",
        revealLink: false
      },
      {
        chapter: 358,
        name: "Zach",
        world: "Elysium",
        role: "Astralis Requiem Heavy Tank",
        race: "Human",
        raceRarity: "Common",
        class: "Guardian",
        classRarity: "Uncommon",
        age: null,
        bio: "The stalwart main tank of the Silver Lotus vanguard within Astralis Requiem. Resembling an impenetrable walking fortress with his colossal tower shield, Zach anchors the guild's frontline in Mythlorien, absorbing crushing strikes from high-level beasts to keep his companions safe.",
        revealLink: true
      },
      {
        chapter: 371,
        name: "Zach",
        world: "Elysium",
        role: "Level 12 Bastion Guardian",
        race: "Human",
        raceRarity: "Common",
        class: "Guardian",
        classRarity: "Uncommon",
        age: null,
        bio: "A Level 12 Bastion Guardian and beloved frontline pillar of Astralis Requiem. Anchoring operations from the Silent Star Garden in Mythlorien, Zach combines immense defensive durability with genuine camaraderie, seamlessly collaborating with guild veterans on high-risk expeditions.",
        revealLink: true
      }
    ]
  },
  {
    id: "jenny_silver_lotus",
    linkedCharacterId: "jenny_elysium",
    isPlayer: true,
    defaultWorld: "Sectors",
    images: [],
    stages: [
      {
        chapter: 124,
        name: "Jenny",
        world: "Sectors",
        role: "Silver Lotus Street Enforcer",
        age: 18,
        bio: "A tough, fierce Lower Zone youth whose father fell ill after years of industrial refinery labor. Wearing an oil-stained silver jacket, she rides a white sports flying motorcycle and fiercely protects her crew, sharing a deep sister-like bond with Sara.",
        revealLink: false
      },
      {
        chapter: 191,
        name: "Jenny",
        world: "Sectors",
        role: "Silver Lotus Frontline Fighter",
        age: 18,
        bio: "A fierce, outspoken street enforcer and heavy combatant of the Silver Lotus gang. Tough, protective, and driven by fierce loyalty to her crew, she respects genuine martial strength above all else and dreams of lifting her family out of refinery poverty.",
        revealLink: true
      },
      {
        chapter: 348,
        name: "Jenny",
        world: "Sectors",
        role: "Astralis Requiem Heavy Vanguard",
        age: 18,
        bio: "A core heavy vanguard and dedicated enforcer within Astralis Requiem's Sector 4 detachment. Emboldened by full immersion hardware and fair dividend contracts, Jenny channels her relentless fighting spirit into securing a debt-free future for her family.",
        revealLink: true
      },
      {
        chapter: 372,
        name: "Jenny",
        world: "Sectors",
        role: "Astralis Vanguard Enforcer",
        age: 18,
        bio: "A high-earning vanguard enforcer for Astralis Requiem in Sector 4. Thriving under the guild's generous dividend structure, she stands as a proud, financially independent street fighter capable of providing top-tier medical care and luxury for her household.",
        revealLink: true
      }
    ]
  },
  {
    id: "jenny_elysium",
    linkedCharacterId: "jenny_silver_lotus",
    isPlayer: true,
    defaultWorld: "Elysium",
    images: [],
    stages: [
      {
        chapter: 126,
        name: "Jenny",
        world: "Elysium",
        role: "Novata Village Berserker",
        race: "Human",
        raceRarity: "Common",
        class: "Berserker",
        classRarity: "Rare",
        age: null,
        bio: "Jenny's avatar in Elysium, appearing as a towering two-meter-tall warrior. Her Rare Berserker class grants heightened combat instincts, massive pain tolerance, and the ability to channel damage taken into surging physical strength.",
        revealLink: false
      },
      {
        chapter: 358,
        name: "Jenny",
        world: "Elysium",
        role: "Astralis Requiem Frontline Berserker",
        race: "Human",
        raceRarity: "Common",
        class: "Berserker",
        classRarity: "Rare",
        age: null,
        bio: "A towering, two-meter-tall Berserker vanguard wielding a massive double-edged battleaxe in Astralis Requiem. Radiating explosive crimson rage auras, Jenny channels incoming damage into devastating physical power, shattering heavy beast carapaces on the frontline.",
        revealLink: true
      },
      {
        chapter: 389,
        name: "Jenny",
        world: "Elysium",
        role: "Level 12 Frontline Striker",
        race: "Human",
        raceRarity: "Common",
        class: "Berserker",
        classRarity: "Rare",
        age: null,
        bio: "A fearsome Level 12 Berserker vanguard serving as one of Astralis Requiem's elite frontline shock troopers. Handpicked by Halon for covert strike missions in Aethelgard, Jenny combines unmatched pain tolerance with brutal axe strikes to crush heavily armored adversaries.",
        revealLink: true
      }
    ]
  },
  {
    id: "kai_silver_lotus",
    linkedCharacterId: "kai_elysium",
    isPlayer: true,
    defaultWorld: "Sectors",
    images: [],
    stages: [
      {
        chapter: 124,
        name: "Kai",
        world: "Sectors",
        role: "Silver Lotus Street Scout",
        age: 18,
        bio: "An energetic, hot-blooded Lower Zone youth and frontline scout of the Silver Lotus gang. Riding a white sports flying motorcycle and wielding an electric vibrating bat in street skirmishes, he brings bold enthusiasm, fast reflexes, and fierce loyalty to his crew.",
        revealLink: false
      },
      {
        chapter: 189,
        name: "Kai",
        world: "Sectors",
        role: "Silver Lotus Sentry",
        age: 18,
        bio: "A vigilant street scout and alert sentry for the Silver Lotus gang in Sector 4. Always on edge against rival gangs and corporate sweeps, Kai guards the hangar perimeter with high-voltage weapons and restless vigilance.",
        revealLink: true
      },
      {
        chapter: 302,
        name: "Kai",
        world: "Sectors",
        role: "Silver Lotus Member",
        age: 18,
        bio: "A determined Lower Zone player fighting to carve out a future despite the oppressive corporate monopolies of Aethelgard. Grateful for honest opportunities that value skill over pedigree, he is fiercely committed to proving the worth of Common-tier players.",
        revealLink: true
      },
      {
        chapter: 348,
        name: "Kai",
        world: "Sectors",
        role: "Astralis Requiem Vanguard Scout",
        age: 18,
        bio: "A proud vanguard scout of Astralis Requiem in Sector 4, equipped with a top-tier neural immersion helmet. Reinvigorated by the leadership of Lohan and Isabella, Kai dedicates his boundless energy to mastering vanguard combat and supporting his squad.",
        revealLink: true
      }
    ]
  },
  {
    id: "kai_elysium",
    linkedCharacterId: "kai_silver_lotus",
    isPlayer: true,
    defaultWorld: "Elysium",
    images: [],
    stages: [
      {
        chapter: 126,
        name: "Kaicent",
        world: "Elysium",
        role: "Novata Village Warrior",
        race: "Human",
        raceRarity: "Common",
        class: "Warrior",
        classRarity: "Common",
        age: null,
        bio: "Known in-game as Kaicent (or Kai). A Common-tier warrior who leveled through Novata Village on shared helmet sessions, constantly practicing combat fundamentals.",
        revealLink: false
      },
      {
        chapter: 358,
        name: "Kaicent",
        world: "Elysium",
        role: "Astralis Requiem Flanker",
        race: "Human",
        raceRarity: "Common",
        class: "Warrior",
        classRarity: "Common",
        age: null,
        bio: "A swift and courageous Warrior flanker in the Silver Lotus vanguard of Astralis Requiem. Wielding one-handed blades, Kaicent excels at agile skirmishing, harassing enemy flanks and coordinating tight pincer strikes with Jay.",
        revealLink: true
      },
      {
        chapter: 373,
        name: "Kaicent",
        world: "Elysium",
        role: "Level 12 Astralis Warrior",
        race: "Human",
        raceRarity: "Common",
        class: "Warrior",
        classRarity: "Common",
        age: null,
        bio: "A battle-hardened Level 12 Warrior within Astralis Requiem, celebrated for his agile swordplay and fearless frontline flanking in Mythlorien. Fully integrated into the guild's elite core, Kaicent trains relentlessly toward his next martial class promotion.",
        revealLink: true
      }
    ]
  },
  {
    id: "sara_silver_lotus",
    linkedCharacterId: "sara_elysium",
    isPlayer: true,
    defaultWorld: "Sectors",
    images: [],
    stages: [
      {
        chapter: 188,
        name: "Sara",
        world: "Sectors",
        role: "Silver Lotus Sensory Specialist",
        age: 16,
        bio: "Skye's younger sister and the sensory anchor of the Silver Lotus gang. Confined to a wheelchair in the real world, she possesses an extraordinary natural sensitivity to ambient mana and energy pulses, accurately identifying high-tier players from afar.",
        revealLink: false
      },
      {
        chapter: 191,
        name: "Sara",
        world: "Sectors",
        role: "Mana Radar",
        age: 16,
        bio: "Skye's perceptive younger sister and the tactical sensory anchor of the Silver Lotus in Sector 4. Confined to a wheelchair in the physical world, her heightened extrasensory mana perception allows her to gauge the exact energy density and potential of visiting players with unerring accuracy.",
        revealLink: true
      },
      {
        chapter: 349,
        name: "Sara",
        world: "Sectors",
        role: "Silver Lotus Core Observer",
        age: 16,
        bio: "The core sensory specialist of Astralis Requiem's Sector 4 division. Equipped with high-grade immersion hardware, Sara provides acute ambient energy tracking and real-time situational awareness for her sister Skye and the entire Silver Lotus team.",
        revealLink: true
      }
    ]
  },
  {
    id: "sara_elysium",
    linkedCharacterId: "sara_silver_lotus",
    isPlayer: true,
    defaultWorld: "Elysium",
    images: [],
    stages: [
      {
        chapter: 188,
        name: "Sara",
        world: "Elysium",
        role: "Novata Village Sensor",
        race: "Human",
        raceRarity: "Rare",
        class: "Water Mage",
        classRarity: "Uncommon",
        age: null,
        bio: "Sara's avatar in Elysium, endowed with a Rare race granting acute magical sensory awareness. In Elysium, she is fully mobile and acts as the squad's primary mana tracker.",
        revealLink: false
      },
      {
        chapter: 363,
        name: "Sara",
        world: "Elysium",
        role: "Astralis Requiem Tactical Sensor",
        race: "Human",
        raceRarity: "Rare",
        class: "Water Mage",
        classRarity: "Uncommon",
        age: null,
        bio: "A graceful Water Mage and the tactical mana radar for Astralis Requiem in Mythlorien. Fully mobile in Elysium with a Rare sensory race, Sara detects stealthed enemies from vast distances and casts fluid water spells to control enemy mobility.",
        revealLink: true
      },
      {
        chapter: 369,
        name: "Sara",
        world: "Elysium",
        role: "Level 12 Environmental Sensor",
        race: "Human",
        raceRarity: "Rare",
        class: "Water Mage",
        classRarity: "Uncommon",
        age: null,
        bio: "A Level 12 Water Mage and master environmental sensor stationed at the Silent Star Garden in Mythlorien. Possessing unparalleled sensitivity to ambient mana currents, Sara monitors boundary wards and tracks foreign energy signatures across the entire forest canopy.",
        revealLink: true
      }
    ]
  },
  {
    id: "jay_silver_lotus",
    linkedCharacterId: "jay_elysium",
    isPlayer: true,
    defaultWorld: "Sectors",
    images: [],
    stages: [
      {
        chapter: 351,
        name: "Jay",
        world: "Sectors",
        role: "Silver Lotus Member",
        age: 18,
        bio: "A quiet, disciplined Lower Zone youth and core member of the Silver Lotus squad in Sector 4. Level-headed and reliable, he supports the gang's day-to-day operations and trains diligently with high-end immersion hardware under Astralis Requiem.",
        revealLink: true
      },
      {
        chapter: 372,
        name: "Jay",
        world: "Sectors",
        role: "Astralis Requiem Vanguard Member",
        age: 18,
        bio: "A dedicated vanguard operative for Astralis Requiem in Sector 4. Thriving under daily guild dividends, Jay works in tandem with Kai and Zach to maintain their workshop while achieving genuine economic stability.",
        revealLink: true
      }
    ]
  },
  {
    id: "jay_elysium",
    linkedCharacterId: "jay_silver_lotus",
    isPlayer: true,
    defaultWorld: "Elysium",
    images: [],
    stages: [
      {
        chapter: 351,
        name: "Jay",
        world: "Elysium",
        role: "Silver Lotus Spearman",
        race: "Human",
        raceRarity: "Common",
        class: "Spearman",
        classRarity: "Common",
        age: null,
        bio: "A disciplined Common-tier Spearman in Elysium who anchors the skirmishing lines alongside Kaicent. Methodical and composed, he utilizes long reach and precise thrusts to control space and protect squadmates.",
        revealLink: false
      },
      {
        chapter: 365,
        name: "Jay",
        world: "Elysium",
        role: "Astralis Requiem Frontline Spearman",
        race: "Human",
        raceRarity: "Common",
        class: "Spearman",
        classRarity: "Common",
        age: null,
        bio: "A frontline Spearman in Astralis Requiem known for his calm courage and swift tactical spearwork. Specializing in mid-range thrusts and defensive parries, Jay coordinates closely with the guild's tanks and flankers in Mythlorien.",
        revealLink: true
      },
      {
        chapter: 373,
        name: "Jay",
        world: "Elysium",
        role: "Level 12 Astralis Spearman",
        race: "Human",
        raceRarity: "Common",
        class: "Spearman",
        classRarity: "Common",
        age: null,
        bio: "A Level 12 Spearman in Astralis Requiem, celebrated for his precision martial technique and unshakeable composure under fire. Stationed in Mythlorien, Jay trains alongside guild veterans to master advanced polearm arts and prepare for future class advancements.",
        revealLink: true
      }
    ]
  }
];

/**
 * Get the active state of a character for a given chapter, including unlocked gallery images
 * and complete stage history for stacked logs.
 */
export function getCharacterState(charDef, chapter) {
  const availableStages = charDef.stages.filter((s) => s.chapter <= chapter);
  if (availableStages.length === 0) {
    return {
      isEncountered: false,
      firstAppearedChapter: charDef.stages[0].chapter
    };
  }

  // Get current active stage for this chapter milestone
  const currentStage = availableStages[availableStages.length - 1];

  // Unlocked images for current chapter
  const unlockedImages = (charDef.images || []).filter((img) => img.chapter <= chapter);

  return {
    isEncountered: true,
    ...currentStage,
    unlockedImages,
    stageHistory: availableStages
  };
}
