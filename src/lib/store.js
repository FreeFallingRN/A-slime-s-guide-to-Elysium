import { writable, derived } from "svelte/store";
import { clampChapter, getChapterRange } from "./chapterUtils.js";

// Modular Data Re-exports (100% Backwards Compatible)
export { chaptersData } from "../data/chapters.js";
export { encyclopediaData } from "../data/encyclopedia.js";
export { characterData, charactersData, abilityProgression } from "../data/abilities.js";
export { mapNodesData } from "../data/mapNodes.js";

// Internal imports for reactive stores and helper methods
import { chaptersData } from "../data/chapters.js";
import { characterData, charactersData, abilityProgression } from "../data/abilities.js";
import { mapNodesData } from "../data/mapNodes.js";

export const chapterRange = getChapterRange(chaptersData);

// Get saved chapter from localStorage or default to the earliest known chapter.
const savedChapter =
  typeof window !== "undefined" ? localStorage.getItem("slime_elysium_chapter") : null;
const initialChapter = clampChapter(savedChapter, chaptersData);

// Global Chapter Lock Store (Default: earliest chapter or user's last valid choice)
export const currentChapter = writable(initialChapter);

if (typeof window !== "undefined") {
  currentChapter.subscribe((value) => {
    // Persist only valid chapter selections so stale saves cannot point beyond current data.
    localStorage.setItem("slime_elysium_chapter", clampChapter(value, chaptersData).toString());
  });
}

// Helper to calculate required EXP for a given level (doubles every level: 100 * 2^(level - 1))
export function getRequiredExp(level) {
  const lvl = parseInt(level, 10) || 1;
  return 100 * Math.pow(2, Math.max(0, lvl - 1));
}

// Active Chapter Details Store
export const activeChapterDetails = derived([currentChapter], ([$ch]) => {
  const chObj = chaptersData.find((c) => c.index === $ch);
  const lvl = chObj ? chObj.halonLvl : 1;
  const reqExp = getRequiredExp(lvl);

  return {
    index: $ch,
    title: chObj ? chObj.title : "Unknown Chapter",
    date: chObj ? chObj.date : "N/A",
    halonLvl: lvl,
    reqExp: reqExp
  };
});

// Active items matching current chapter limits
export const activeMapNodes = derived([currentChapter], ([$ch]) =>
  mapNodesData.filter((node) => node.chapter <= $ch)
);

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

// Expose a helper to fetch active character abilities mapped with level progression for a given chapter
export function getAbilitiesForChapter(characterKey, ch) {
  let targetCh = ch;
  let character = characterData;
  if (typeof characterKey === "number") {
    targetCh = characterKey;
  } else if (typeof characterKey === "string" && charactersData[characterKey]) {
    character = charactersData[characterKey];
  }
  if (!character || !character.abilities) return [];

  const baseAbilities = character.abilities.filter((ab) => {
    if (ab.chapter > targetCh) return false;

    const isAbsorbed = character.abilities.some((otherAb) => {
      if (otherAb.chapter > targetCh) return false;
      if (
        otherAb.replaces &&
        (otherAb.replaces === ab.id ||
          (Array.isArray(otherAb.replaces) && otherAb.replaces.includes(ab.id)))
      ) {
        return true;
      }
      if (
        otherAb.absorbs &&
        (otherAb.absorbs === ab.id ||
          (Array.isArray(otherAb.absorbs) && otherAb.absorbs.includes(ab.id)))
      ) {
        return true;
      }
      if (otherAb.upgrades) {
        return otherAb.upgrades.some((up) => {
          return (
            targetCh >= up.chapter &&
            up.type === "fusion" &&
            up.absorbs &&
            up.absorbs.includes(ab.id)
          );
        });
      }
      return false;
    });

    return !isAbsorbed;
  });

  return baseAbilities.map((ab) => {
    const currentLvl = getAbilityLevel(ab.id, targetCh);
    let updatedAb = {
      ...ab,
      level: currentLvl,
      traits: []
    };

    if (ab.upgrades) {
      for (const upgrade of ab.upgrades) {
        if (targetCh >= upgrade.chapter) {
          if (upgrade.type === "trait") {
            updatedAb.traits = [
              ...updatedAb.traits,
              {
                name: upgrade.traitName || upgrade.name,
                description: upgrade.traitDescription || upgrade.description,
                chapter: upgrade.chapter
              }
            ];
          } else {
            updatedAb = {
              ...updatedAb,
              ...upgrade,
              name: upgrade.name || updatedAb.name,
              level: upgrade.level !== undefined ? upgrade.level : updatedAb.level,
              traits: updatedAb.traits
            };
          }
        }
      }
    }
    return updatedAb;
  });
}
