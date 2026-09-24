import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  abilityProgression,
  chaptersData,
  characterData,
  encyclopediaData,
  mapNodesData
} from "../src/lib/store.js";
import { charactersCompendium } from "../src/lib/charactersData.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
const errors = [];
const warnings = [];
const allowedSameChapterAbilityMilestones = new Set(["thermographic_perception:68", "weaver_mother:118"]);

// Fail on broken references/schema; warn on unusual-but-possibly-canon data for human review.
function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function chapterValue(value, label) {
  if (!Number.isInteger(value) || value < 1) {
    fail(`${label} has invalid chapter: ${value}`);
  }
}

function uniqueBy(items, keyFn, label) {
  const seen = new Map();
  for (const item of items) {
    const key = keyFn(item);
    if (seen.has(key)) {
      fail(`${label} has duplicate id/key: ${key}`);
    }
    seen.set(key, item);
  }
}

function validateChapterDate(dateStr, label) {
  if (!dateStr || typeof dateStr !== "string") {
    fail(`${label} is missing a publication date`);
    return;
  }
  const trimmed = dateStr.trim();
  const disallowedPlaceholders = ["tbd", "todo", "n/a", "unknown", "pending", "null", "undefined"];
  if (disallowedPlaceholders.includes(trimmed.toLowerCase())) {
    fail(
      `${label} has unfinalized placeholder date: "${dateStr}". A valid publication date is required before deployment.`
    );
    return;
  }
  const parsed = Date.parse(trimmed);
  if (Number.isNaN(parsed)) {
    fail(
      `${label} has unparseable date format: "${dateStr}" (expected format e.g. "Feb 01, 2026")`
    );
  }
}

uniqueBy(chaptersData, (ch) => ch.index, "chaptersData");
for (let i = 0; i < chaptersData.length; i += 1) {
  const ch = chaptersData[i];
  chapterValue(ch.index, `chaptersData[${i}]`);
  if (i > 0 && ch.index !== chaptersData[i - 1].index + 1) {
    fail(`chaptersData jumps from ${chaptersData[i - 1].index} to ${ch.index}`);
  }
  if (!ch.title || typeof ch.title !== "string") {
    fail(`chaptersData chapter ${ch.index} is missing a title`);
  }
  if (!Number.isInteger(ch.halonLvl) || ch.halonLvl < 1) {
    fail(`chaptersData chapter ${ch.index} has invalid halonLvl: ${ch.halonLvl}`);
  }
  validateChapterDate(ch.date, `chaptersData chapter ${ch.index}`);
}

uniqueBy(characterData.abilities, (ability) => ability.id, "characterData.abilities");
const abilityIds = new Set(characterData.abilities.map((ability) => ability.id));
for (const ability of characterData.abilities) {
  chapterValue(ability.chapter, `ability ${ability.id}`);
  for (const upgrade of ability.upgrades || []) {
    chapterValue(upgrade.chapter, `ability upgrade ${ability.id}`);
    if (upgrade.chapter < ability.chapter) {
      fail(`ability ${ability.id} has upgrade before unlock`);
    }
  }
  if (ability.aliases && !Array.isArray(ability.aliases)) {
    fail(`ability ${ability.id} aliases must be an array`);
  }
}

for (const [id, milestones] of Object.entries(abilityProgression)) {
  if (!abilityIds.has(id)) {
    fail(`abilityProgression references unknown ability: ${id}`);
  }
  const ability = characterData.abilities.find((entry) => entry.id === id);
  const byChapter = new Map();
  for (const milestone of milestones) {
    chapterValue(milestone.chapter, `abilityProgression ${id}`);
    if (!Number.isInteger(milestone.level) || milestone.level < 1) {
      fail(`abilityProgression ${id} has invalid level: ${milestone.level}`);
    }
    if (ability && milestone.chapter < ability.chapter) {
      fail(
        `abilityProgression ${id} reaches level ${milestone.level} before chapter ${ability.chapter} unlock`
      );
    }
    if (
      byChapter.has(milestone.chapter) &&
      !allowedSameChapterAbilityMilestones.has(`${id}:${milestone.chapter}`)
    ) {
      warn(`abilityProgression ${id} has multiple milestones in chapter ${milestone.chapter}`);
    }
    byChapter.set(milestone.chapter, milestone);
  }
}

const expectedEncyclopediaCategories = [
  "races",
  "classes",
  "monsters",
  "factions",
  "dungeons",
  "technology"
];
for (const [category, entries] of Object.entries(encyclopediaData)) {
  if (!expectedEncyclopediaCategories.includes(category)) {
    warn(`encyclopediaData contains unexpected category: ${category}`);
  }
  if (!Array.isArray(entries)) {
    fail(`encyclopediaData.${category} must be an array`);
    continue;
  }
  uniqueBy(entries, (entry) => entry.name, `encyclopediaData.${category}`);
  for (const entry of entries) {
    if (!entry.name || typeof entry.name !== "string") {
      fail(`encyclopediaData.${category} entry missing name`);
    }
    chapterValue(entry.chapter, `encyclopediaData.${category} "${entry.name}"`);
    if (
      !entry.description ||
      typeof entry.description !== "string" ||
      entry.description.trim().length === 0
    ) {
      fail(`encyclopediaData.${category} "${entry.name}" is missing a description`);
    }
  }
}

uniqueBy(mapNodesData, (node) => node.id, "mapNodesData");
const validWorlds = ["Elysium", "Sectors"];
for (const node of mapNodesData) {
  if (!node.id || typeof node.id !== "string") {
    fail(`map node missing id`);
  }
  if (!node.name || typeof node.name !== "string") {
    fail(`map node "${node.id}" missing name`);
  }
  if (typeof node.x !== "number" || node.x < 0 || node.x > 100) {
    fail(`map node "${node.id}" has invalid x coordinate: ${node.x} (must be between 0 and 100)`);
  }
  if (typeof node.y !== "number" || node.y < 0 || node.y > 100) {
    fail(`map node "${node.id}" has invalid y coordinate: ${node.y} (must be between 0 and 100)`);
  }
  if (!validWorlds.includes(node.world)) {
    fail(
      `map node "${node.id}" has invalid world: "${node.world}" (expected "Elysium" or "Sectors")`
    );
  }
  chapterValue(node.chapter, `map node "${node.id}"`);
}

uniqueBy(charactersCompendium, (character) => character.id, "charactersCompendium");
const characterIds = new Set(charactersCompendium.map((character) => character.id));
for (const character of charactersCompendium) {
  if (character.linkedCharacterId && !characterIds.has(character.linkedCharacterId)) {
    fail(`character ${character.id} links to unknown character ${character.linkedCharacterId}`);
  }
  let previousStageChapter = 0;
  for (const stage of character.stages) {
    chapterValue(stage.chapter, `character stage ${character.id}`);
    if (stage.chapter < previousStageChapter) {
      fail(`character ${character.id} stages are not sorted`);
    }
    previousStageChapter = stage.chapter;
  }
  for (const image of character.images || []) {
    chapterValue(image.chapter, `character image ${character.id}/${image.file}`);
    const imagePath = path.join(publicDir, image.file);
    if (!fs.existsSync(imagePath)) {
      fail(`character image asset missing: ${character.id}/${image.file}`);
    }
  }
}

const max = (values) => (values.length ? Math.max(...values) : 0);
const coverage = {
  Timeline: max(chaptersData.map((ch) => ch.index)),
  Abilities: max(characterData.abilities.map((ability) => ability.chapter)),
  "Ability Progression": max(
    Object.values(abilityProgression)
      .flat()
      .map((entry) => entry.chapter)
  ),
  "Character Stages": max(
    charactersCompendium.flatMap((character) => character.stages.map((stage) => stage.chapter))
  ),
  "Character Images": max(
    charactersCompendium.flatMap((character) =>
      (character.images || []).map((image) => image.chapter)
    )
  ),
  Encyclopedia: max(
    Object.values(encyclopediaData)
      .flat()
      .map((entry) => entry.chapter)
  ),
  Map: max(mapNodesData.map((node) => node.chapter))
};

console.log("Data coverage:");
for (const [name, chapter] of Object.entries(coverage)) {
  console.log(`- ${name}: ${chapter}`);
}

if (warnings.length) {
  console.warn("\nWARNINGS:");
  for (const message of warnings) {
    console.warn(`- ${message}`);
  }
}

if (errors.length) {
  console.error("\nFAILURES:");
  for (const message of errors) {
    console.error(`- ${message}`);
  }
  process.exit(1);
}

console.log("\nPASS: data validation completed");
