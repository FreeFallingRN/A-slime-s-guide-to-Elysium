import { runCalculation } from '../src/lib/calc.js';
import { getAbilitiesForChapter, characterData, chaptersData } from '../src/lib/store.js';

const baseStats = characterData.baseStats;

function getHalonLvl(ch) {
  const chObj = chaptersData.find(c => c.index === ch);
  return chObj ? chObj.halonLvl : 1;
}

function resolveAbilities(customAbilities, chapter) {
  if (customAbilities) {
    // Object map: { efficient_digestion: 2, passive_digestion: 1 }
    if (!Array.isArray(customAbilities) && typeof customAbilities === 'object') {
      return Object.entries(customAbilities).map(([id, level]) => {
        const baseAb = characterData.abilities.find(a => a.id === id) || { id, value: 0.10, target: 'digestion' };
        return {
          ...baseAb,
          level: typeof level === 'number' ? level : (level.level || 1)
        };
      });
    }

    // Array of objects: [{ id: 'efficient_digestion', level: 2 }, ...]
    if (Array.isArray(customAbilities)) {
      return customAbilities.map(ab => {
        const baseAb = characterData.abilities.find(a => a.id === ab.id) || {};
        return {
          ...baseAb,
          ...ab,
          level: ab.level !== undefined ? ab.level : 1
        };
      });
    }
  }

  if (chapter !== undefined) {
    return getAbilitiesForChapter(chapter);
  }

  return [];
}

const STAGE_ALIAS_MAP = {
  stage1: 'base',
  base: 'base',
  digbase: 'base',
  stage2: 'digEnhanced',
  enhanced: 'digEnhanced',
  digenhanced: 'digEnhanced',
  stage3: 'massVal',
  mass: 'massVal',
  massval: 'massVal',
  stage4: 'passiveVal',
  passive: 'passiveVal',
  passiveval: 'passiveVal',
  stage5: 'baseSum',
  subtotal: 'baseSum',
  basesum: 'baseSum',
  stage6: 'cloneVal',
  clone: 'cloneVal',
  cloneval: 'cloneVal',
  stage7: 'neutralSum',
  neutral: 'neutralSum',
  neutralsum: 'neutralSum',
  stage8: 'hemoVal',
  combat: 'hemoVal',
  hemoval: 'hemoVal',
  final: 'final'
};

export function createRunner(targetStat) {
  const cases = [];

  function addTest(chapterOrObj, expected, combat = false, description = "", stage = "final") {
    // Support positional or object args
    if (typeof chapterOrObj === 'object' && chapterOrObj !== null) {
      const obj = chapterOrObj;
      cases.push({
        chapter: obj.chapter !== undefined ? obj.chapter : obj.ch,
        playerLvl: obj.playerLvl !== undefined ? obj.playerLvl : (obj.lvl !== undefined ? obj.lvl : (obj.level !== undefined ? obj.level : undefined)),
        abilities: obj.abilities || obj.skills || obj.customAbilities || obj.customSkills,
        expected: obj.expected !== undefined ? obj.expected : (obj.val !== undefined ? obj.val : obj.target),
        combat: obj.combat || false,
        description: obj.description || obj.label || "",
        stage: obj.stage || obj.step || "final"
      });
    } else {
      cases.push({ chapter: chapterOrObj, expected, combat, description, stage });
    }
  }

  function run(title) {
    console.log('==================================================');
    console.log(`  SLIME STAT CALCULATOR - ${title.toUpperCase()} TESTS`);
    console.log('==================================================\n');

    let passCount = 0;
    let failCount = 0;

    cases.forEach(({ chapter, playerLvl, abilities: customAbilities, expected, combat, description, stage }) => {
      const abilities = resolveAbilities(customAbilities, chapter);
      const lvl = playerLvl !== undefined ? playerLvl : (chapter !== undefined ? getHalonLvl(chapter) : 1);
      const calcResult = runCalculation(baseStats, abilities, lvl, combat, chapter !== undefined ? chapter : 1);
      const statObj = calcResult[targetStat];

      const key = STAGE_ALIAS_MAP[String(stage).toLowerCase()] || stage || 'final';
      const actual = statObj && (key in statObj) ? statObj[key] : statObj?.final;

      const descStr = description ? ` (${description})` : '';
      const combatStr = combat ? ' [Combat]' : '';
      const stageStr = key !== 'final' ? ` [Stage: ${key}]` : '';
      const chapterStr = chapter !== undefined ? `Ch ${chapter}` : 'Custom Test';
      const testLabel = `${chapterStr}${combatStr}${stageStr}${descStr}`;

      if (Math.abs(actual - expected) < 0.05) {
        console.log(`[PASS] ${testLabel}: ${actual}`);
        passCount++;
      } else {
        console.error(`[FAIL] ${testLabel}: Expected ${expected}, got ${actual}`);
        failCount++;
      }
    });

    console.log('\n--------------------------------------------------');
    console.log(`TEST SUMMARY (${title}): ${passCount} PASSED, ${failCount} FAILED`);
    console.log('--------------------------------------------------\n');

    if (failCount > 0) {
      process.exit(1);
    }
  }

  return { addTest, run, cases };
}
