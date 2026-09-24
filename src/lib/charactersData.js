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
        bio: "A unique blue Slime possessing a Mythical race and class in Elysium. Highly cautious and analytical, he uses infinite enzymatic digestion and biomass absorption to continuously adapt, evolve, and strengthen his body.",
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
        bio: "A unique Mythical Slime recognized for his sharp tactical mind and mastery of clone control. Is powering up to help build Lisa's planned guild.",
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
        bio: "The vice guild master of Astralis Requiem after the fossilized tree becomes the guild's first official base. His small Slime body conceals the player behind Elysium's first open-world PK and the guild's tactical core.",
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
        bio: "A Slime whose Level 11 qualitative evolution forces the system to reconcile a Mythical race, Mythical class, and multiple internal cores. His body becomes clearer, denser, and far more precise while retaining the same Slime identity.",
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
        bio: "Astralis Requiem's vice president and strategic voice, arguing for an elite recruitment model built around trustworthy, high-potential members rather than raw numbers.",
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
        bio: "A former bedridden invalid who reincarnated into the body of an impoverished Sector 4 student on planet Eden 3. Struggling under crushing debt, poor physical health, and moldy living conditions in the Lower Zone, he possesses an indomitable willpower and relies on Elysium immersion to reshape his destiny.",
        revealLink: true
      },
      {
        chapter: 120,
        name: "Lohan Hayes",
        world: "Sectors",
        role: "Elysium-Strengthened Student",
        age: 18,
        bio: "After Halon reaches Level 9, Lohan's real body begins showing the benefits of Elysium progression. The once-frail Lower Zone student now has noticeably improved strength, vitality, and physical control.",
        revealLink: true
      },
      {
        chapter: 264,
        name: "Lohan Hayes",
        world: "Sectors",
        role: "Debt-Free Guild Vice President",
        age: 18,
        bio: "Guild earnings and Lisa's payment through Alice end the debt that defined Lohan's life in Sector 4. He remains cautious, but his material situation is no longer that of a trapped Lower Zone debtor.",
        revealLink: true
      },
      {
        chapter: 283,
        name: "Lohan Hayes",
        world: "Sectors",
        role: "Upper Zone Resident",
        age: 18,
        bio: "Lohan leaves the moldy Sector 4 apartment behind and moves into a protected Upper Zone penthouse arranged through Isabella, marking a dramatic change in his real-world living conditions.",
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
        bio: "The heavy-set landlord of Lohan's suburban Sector 4 apartment building. Decked in gaudy gold jewelry with a glowing holographic eyepiece over his left eye, he is a rude, money-driven individual who strictly collects rent payments from impoverished Lower Zone tenants.",
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
        bio: "A small white fox wandering the low-level forest. Calm, perceptive, and highly observant, she watches Lohan's movements with quiet curiosity without showing aggression.",
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
        bio: "An intelligent player avatar who communicates mind-to-mind using an innate Telepathy ability. Graceful, composed, and analytical, she prefers peaceful dialogue over conflict.",
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
        bio: "A Spirit Fox whose innate telepathy reflects her race's spiritual affinity. She explains enough about races and potential for Halon to understand that she is not an ordinary fox.",
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
        bio: "The guild master of Astralis Requiem after the fossilized tree becomes an official guild base. She combines corporate training, caution, and trust in Halon to turn their partnership into a formal organization.",
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
        bio: "The reader can now connect Lisa's Elysium identity with Isabella Vance, reframing the composed Spirit Fox as both Halon's guild partner and his real-world classmate.",
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
        bio: "After reaching Level 11, Lisa undergoes a qualitative evolution into a larger, two-tailed Spirit Fox. The change makes her more openly confident in her own combat presence rather than relying on Halon for every decisive action.",
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
        bio: "Astralis Requiem's president, using her Vance upbringing and Elysium experience to plan a selective guild expansion while preserving the quality and security of the organization.",
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
        bio: "Heiress to the Vance Group megacorporation, which commands planetary governance, off-world colonies, and satellite networks on Eden 3. Distinguished by her natural red hair, flawless icy appearance, and cold, aristocratic demeanor.",
        revealLink: false
      },
      {
        chapter: 140,
        name: "Isabella Vance",
        world: "Sectors",
        role: "Corporate Heiress (Guild Leader)",
        age: 18,
        bio: "One of Lohan's classmates and heiress to the Vance Group megacorporation, which commands planetary governance, off-world colonies, and satellite networks on Eden 3. Distinguished by her natural red hair, flawless icy appearance, and cold, aristocratic demeanor.",
        revealLink: true
      },
      {
        chapter: 184,
        name: "Isabella Vance",
        world: "Sectors",
        role: "Classmate and Guild President",
        age: 18,
        bio: "The real-world identity behind Lisa is now understood by Lohan, while Isabella also recognizes that Lohan is Halon. Their school life and Elysium partnership begin to overlap directly.",
        revealLink: true
      },
      {
        chapter: 283,
        name: "Isabella Vance",
        world: "Sectors",
        role: "Vance Heiress and Lohan's Patron",
        age: 18,
        bio: "Isabella uses her Upper Zone resources to help Lohan leave his unsafe Sector 4 apartment, bringing the protection and privilege of the Vance world directly into his daily life.",
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
        bio: "Yrneha meets Halon directly and recognizes that the intelligent, mana-dense Slime is unusual enough to tempt scholarly investigation.",
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
        raceRarity: "Unknown",
        class: "Merchant",
        classRarity: "Unknown",
        age: null,
        bio: "An elven merchant at the Silver Crucible in Thalendor who evaluates and negotiates for Shadow Serpent Digestive Acid and other alchemical materials.",
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
        bio: "The elder of Kroak Village, first presenting himself as a grateful guide able to lead Halon and Lisa toward Swamp Slugs.",
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
        bio: "Gribbit reveals that his friendly guide act was a lure, using Swamp Slug poison and his village's scouts to try to trap Halon and Lisa as prey.",
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
        bio: "A polite Mana Stone shopkeeper in Thalendor's Horizon Bazaar who treats Halon and Lisa as customers and becomes interested in monster absorption results.",
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
        raceRarity: "Unknown",
        class: "Elite Tamer",
        classRarity: "Unknown",
        age: null,
        bio: "A young noble elf and Elite Tamer who insults Halon and Lisa while visiting Edgar's Mana Stone shop.",
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
        bio: "Valerius's elite Shadow Cougar familiar, initially arrogant toward Lisa before reacting fearfully to her legendary aura.",
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
        class: "Gardener",
        classRarity: "Common",
        age: null,
        bio: "A gentle, palm-sized fairy from Petal Village with translucent butterfly wings resembling flower petals. Responsible for painting rare flora and maintaining forest mana balance, she seeks Halon and Lisa's help to rescue her captured brother Pip from the Fossilized Amber Tree.",
        revealLink: false
      },
      {
        chapter: 111,
        name: "Elle",
        world: "Elysium",
        role: "Astralis Requiem Ally",
        race: "Fairy",
        raceRarity: "Uncommon",
        class: "Gardener",
        classRarity: "Common",
        age: null,
        bio: "After Pip's rescue and the founding of Astralis Requiem, Elle remains connected to the fossilized tree and to the people who protected her brother.",
        revealLink: false
      },
      {
        chapter: 294,
        name: "Elle",
        world: "Elysium",
        role: "Fairy Under Astralis Training",
        race: "Fairy",
        raceRarity: "Uncommon",
        class: "Gardener",
        classRarity: "Common",
        age: null,
        bio: "Elle begins being treated as someone Astralis Requiem can actively train and protect, no longer only as a vulnerable fairy dependent on rescue.",
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
        classRarity: "Unknown",
        age: null,
        bio: "Elle's younger brother, a playful and carefree fairy who was ambushed by Glass Beetles while polishing seeds of light near the Amber Tree and trapped in a mana cocoon.",
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
        classRarity: "Unknown",
        age: null,
        bio: "Freed from Brynnear's cocoon, Pip becomes directly tied to Halon, Lisa, and the new Astralis Requiem base rather than remaining only a helpless captive.",
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
        classRarity: "Unknown",
        age: null,
        bio: "Pip accepts Halon's careful strengthening and openly wants power to protect Elle, Halon, and Lisa. His growth reframes him from rescued child to emerging guardian.",
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
        classRarity: "Unknown",
        age: null,
        bio: "Pip refuses to crawl back to Petal Village after being treated as a burden. He identifies his new home with Halon, Lisa, Elle, and Astralis Requiem instead.",
        revealLink: false
      }
    ]
  },
  {
    id: "skye_silver_lotus",
    linkedCharacterId: null,
    isPlayer: true,
    defaultWorld: "Sectors",
    images: [{ file: "skye-march16.png", chapter: 124 }],
    stages: [
      {
        chapter: 124,
        name: "Skye",
        world: "Sectors",
        role: "Silver Lotus Leader",
        race: "Unknown",
        raceRarity: "Unknown",
        class: "Unknown",
        classRarity: "Unknown",
        age: null,
        bio: "A bold Lower Zone rider leading the Silver Lotus group. She protects vulnerable people from local predators and sees Elysium as a path for her crew to become strong enough to change their lives.",
        revealLink: false
      },
      {
        chapter: 300,
        name: "Skye",
        world: "Sectors",
        role: "Silver Lotus Leader",
        race: "Unknown",
        raceRarity: "Epic",
        class: "Unknown",
        classRarity: "Unknown",
        age: null,
        bio: "Devon's explanation identifies Skye as an Epic-race player and one of the Silver Lotus members already in the Open World, making the group a serious potential recruitment target for Astralis Requiem.",
        revealLink: false
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
        race: "Unknown",
        raceRarity: "Unknown",
        class: "Matriarch",
        classRarity: "Epic",
        age: null,
        bio: "After death and rebirth, Brynnear loses the beetle body but retains her Matriarch class. Her humiliation by Halon turns into a personal vendetta.",
        revealLink: false
      },
      {
        chapter: 227,
        name: "Brynnear",
        world: "Elysium",
        role: "Hogue Guild Matriarch",
        race: "Unknown",
        raceRarity: "Unknown",
        class: "Matriarch",
        classRarity: "Epic",
        age: null,
        bio: "Working with Ernesto Hogue, Brynnear uses the Matriarch class in a cruel attempt to manufacture power through captive players and warped mana.",
        revealLink: false
      }
    ]
  },
  {
    id: "ernesto_hogue",
    linkedCharacterId: null,
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
        bio: "The leader of the Hogue Group effort in Elysium, directing organized Level 11 players and reacting furiously when Halon and Astralis Requiem take the first-guild achievement.",
        revealLink: false
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
        bio: "Ernesto's rivalry with Astralis Requiem hardens into a darker alliance with Brynnear, driven by greed, status anxiety, and impatience with coming in second.",
        revealLink: false
      }
    ]
  },
  {
    id: "isaac_vance",
    linkedCharacterId: null,
    isPlayer: true,
    defaultWorld: "Sectors",
    images: [],
    stages: [
      {
        chapter: 116,
        name: "Isaac Vance",
        world: "Sectors",
        role: "Vance Group Player",
        race: "Unknown",
        raceRarity: "Unknown",
        class: "Unknown",
        classRarity: "Unknown",
        age: null,
        bio: "One of Evelyn Vance's children and a Vance Group player whose Elysium name is reported as Newton. His faction is important enough for Ernesto Hogue to track closely.",
        revealLink: false
      },
      {
        chapter: 138,
        name: "Isaac Vance",
        world: "Elysium",
        role: "Vance Heir in Aethelgard",
        race: "Unknown",
        raceRarity: "Unknown",
        class: "Unknown",
        classRarity: "Unknown",
        age: null,
        bio: "Isaac operates from Aethelgard with the resources and expectations of the Vance family, making him a major corporate competitor in the Open World.",
        revealLink: false
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
        bio: "The powerful head of the Vance family and mother of Isabella, Isaac, and their sibling. Her presence reveals the family pressure and affection surrounding Isabella's position.",
        revealLink: false
      },
      {
        chapter: 289,
        name: "Evelyn Vance",
        world: "Sectors",
        role: "Protective Vance Matriarch",
        age: null,
        bio: "Evelyn remains closely involved with Isabella's life and choices, showing that the Vance family's influence is personal as well as corporate.",
        revealLink: false
      }
    ]
  },
  {
    id: "alice_muller",
    linkedCharacterId: null,
    isPlayer: true,
    defaultWorld: "Elysium",
    images: [{ file: "alice-april6.png", chapter: 178 }],
    stages: [
      {
        chapter: 178,
        name: "Alice Muller",
        world: "Elysium",
        role: "Lisa's Best Friend",
        race: "Unknown",
        raceRarity: "Unknown",
        class: "Pugilist",
        classRarity: "Unknown",
        age: null,
        bio: "Lisa's energetic best friend from the real world and the first leader of the hired group joining Astralis Requiem. Her warmth contrasts sharply with Lisa's more controlled public demeanor.",
        revealLink: false
      },
      {
        chapter: 293,
        name: "Alice Muller",
        world: "Elysium",
        role: "Astralis Requiem Group Leader",
        race: "Unknown",
        raceRarity: "Unknown",
        class: "Pugilist",
        classRarity: "Unknown",
        age: null,
        bio: "Alice leads one of Astralis Requiem's player groups and remains one of Lisa's most trusted people as the guild begins planning serious expansion.",
        revealLink: false
      }
    ]
  },
  {
    id: "devon_baker",
    linkedCharacterId: null,
    isPlayer: true,
    defaultWorld: "Sectors",
    images: [],
    stages: [
      {
        chapter: 167,
        name: "Devon Baker",
        world: "Sectors",
        role: "Lower Zone Classmate",
        race: "Unknown",
        raceRarity: "Unknown",
        class: "Unknown",
        classRarity: "Unknown",
        age: null,
        bio: "A quiet classmate from the Lower Zone who notices Lohan's Elysium-linked changes and approaches him privately as another player trying to survive the same social reality.",
        revealLink: false
      },
      {
        chapter: 300,
        name: "Devon Baker",
        world: "Sectors",
        role: "Silver Lotus Contact",
        race: "Unknown",
        raceRarity: "Rare",
        class: "Unknown",
        classRarity: "Unknown",
        age: null,
        bio: "Devon reveals that he has a Rare base and that Silver Lotus has several Open World players, opening a possible path for trust-based cooperation with Astralis Requiem.",
        revealLink: false
      }
    ]
  },
  {
    id: "dylan",
    linkedCharacterId: null,
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
        bio: "The third member of Lisa and Alice's inseparable childhood trio. His arrival in Thalendor makes Halon confront how much of Lisa's life still belongs to a social world he barely knows.",
        revealLink: false
      },
      {
        chapter: 232,
        name: "Dylan",
        world: "Elysium",
        role: "Ebony Chalice Survivor",
        race: "Unknown",
        raceRarity: "Unknown",
        class: "Unknown",
        classRarity: "Unknown",
        age: null,
        bio: "Dylan explains that his Elysium path involved the Ebony Chalice and a hidden cult, giving him a darker and stranger background than his easy friendliness first suggests.",
        revealLink: false
      },
      {
        chapter: 293,
        name: "Dylan",
        world: "Elysium",
        role: "Astralis Requiem Organizer",
        race: "Unknown",
        raceRarity: "Unknown",
        class: "Unknown",
        classRarity: "Unknown",
        age: null,
        bio: "Dylan contributes real-world organizational instincts to Astralis Requiem's expansion planning, supporting Halon's preference for quality and discipline over mass recruitment.",
        revealLink: false
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
        bio: "A blunt Thalendor craftswoman whose experience with monster materials makes Halon and Lisa unusually interesting to her.",
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
        bio: "The elder and chief of Petal Village, initially seen trying to defend the village during Varkas's attack.",
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
        bio: "Basil publicly rebukes Petal Village's prejudice against Pip and Elle, acknowledging the siblings' courage and the village's hypocrisy.",
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
        bio: "A Petal Village fairy who treats Pip's new strength as something the village can demand after previously rejecting him, exposing the prejudice Pip and Elle endured.",
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
        bio: "A Low Zone player with a Rare Lizardman race who attacks Petal Village with Brant and Stig, using reptile-command tactics in pursuit of power and escape from his former life.",
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
        bio: "A divine figure associated with Elysium's system, watching events around Halon, Lisa, and the world from a much higher layer of reality.",
        revealLink: false
      },
      {
        chapter: 296,
        name: "Astraea",
        world: "Elysium",
        role: "Overworked System Goddess",
        age: null,
        bio: "Astraea's handling of Brynnear's player-boss audit reveals that even divine system administration can make mistakes with delayed consequences for Halon and Lisa.",
        revealLink: false
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
