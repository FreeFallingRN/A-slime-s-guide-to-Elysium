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
    images: [
      { file: "halon-avatar-neutral.png", chapter: 1 }
    ],
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
        role: "Guild Vice President",
        race: "Slime",
        raceRarity: "Mythical",
        class: "Devourer",
        classRarity: "Mythical",
        age: null,
        bio: "A unique Mythical Slime recognized for his sharp tactical mind, and mastery of clone control. Is powering up to serve as the vice guild leader of Lisa's guild.",
        revealLink: true
      }
    ]
  },
  {
    id: "lohan_human",
    linkedCharacterId: "halon_slime",
    isPlayer: true,
    defaultWorld: "Sectors",
    images: [
      { file: "lohan-ch1.png", chapter: 1 },
    ],
    stages: [
      {
        chapter: 1,
        name: "Lohan Hayes",
        world: "Sectors",
        role: "Lower Zone Student",
        age: 18,
        bio: "A former bedridden invalid who reincarnated into the body of an impoverished Sector 4 student on planet Eden 3. Struggling under crushing debt, poor physical health, and moldy living conditions in the Lower Zone, he possesses an indomitable willpower and relies on Elysium immersion to reshape his destiny.",
        revealLink: true
      }
    ]
  },
  {
    id: "oscar_landlord",
    linkedCharacterId: null,
    isPlayer: false,
    defaultWorld: "Sectors",
    images: [
      { file: "oscar-ch1.png", chapter: 1 }
    ],
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
    images: [
      { file: "lisa-16.png", chapter: 16 },
      { file: "lisa-may5.png", chapter: 80 },
      { file: "lisa-may4.png", chapter: 80 }
    ],
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
      }
    ]
  },
  {
    id: "aeliana",
    linkedCharacterId: null,
    isPlayer: false,
    defaultWorld: "Elysium",
    images: [
      { file: "aeliana-march12.png", chapter: 18 }
    ],
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
    images: [
      { file: "vulre-ch50.png", chapter: 50 }
    ],
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
    images: [
      { file: "elara-ch50.png", chapter: 50 }
    ],
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
    images: [],
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
