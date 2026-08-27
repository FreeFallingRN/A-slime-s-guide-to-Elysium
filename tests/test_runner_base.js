import { runCalculation } from '../src/lib/calc.js';
import { getAbilitiesForChapter, charactersData, chaptersData } from '../src/lib/store.js';

const baseStats = charactersData.halon.baseStats;

function getHalonLvl(ch) {
  const chObj = chaptersData.find(c => c.index === ch);
  return chObj ? chObj.halonLvl : 1;
}

export function createRunner(targetStat) {
  const cases = [];

  function addTest(chapter, expected, combat = false, description = "") {
    // Support positional or object args
    if (typeof chapter === 'object') {
      const obj = chapter;
      cases.push({
        chapter: obj.chapter || obj.ch,
        expected: obj.expected || obj.val || obj.target,
        combat: obj.combat || false,
        description: obj.description || obj.label || ""
      });
    } else {
      cases.push({ chapter, expected, combat, description });
    }
  }

  function run(title) {
    console.log('==================================================');
    console.log(`  SLIME STAT CALCULATOR - ${title.toUpperCase()} TESTS`);
    console.log('==================================================\n');

    let passCount = 0;
    let failCount = 0;

    cases.forEach(({ chapter, expected, combat, description }) => {
      const abilities = getAbilitiesForChapter('halon', chapter);
      const lvl = getHalonLvl(chapter);
      const calcResult = runCalculation(baseStats, abilities, lvl, combat, chapter);
      const actual = calcResult[targetStat].final;

      const descStr = description ? ` (${description})` : '';
      const combatStr = combat ? ' [Combat]' : '';
      const testLabel = `Ch ${chapter}${combatStr}${descStr}`;

      if (Math.abs(actual - expected) < 0.1) {
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
