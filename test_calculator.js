import { runCalculation } from './src/lib/calc.js';
import { getAbilitiesForChapter, charactersData, getRequiredExp } from './src/lib/store.js';

console.log('==================================================');
console.log('  SLIME STAT CALCULATOR - REGRESSION TEST');
console.log('==================================================\n');

let passCount = 0;
let failCount = 0;

function assertEqual(testName, actual, expected) {
  if (actual === expected) {
    console.log(`[PASS] ${testName}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${testName}: Expected ${expected}, got ${actual}`);
    failCount++;
  }
}

const baseStats = charactersData.halon.baseStats;

// ----------------------------------------------------
// TEST CASE 0: REQUIRED EXP FORMULA (Doubles per level: 100 * 2^(Lvl - 1))
// ----------------------------------------------------
assertEqual('EXP Formula: Level 1 required EXP', getRequiredExp(1), 100);
assertEqual('EXP Formula: Level 2 required EXP', getRequiredExp(2), 200);
assertEqual('EXP Formula: Level 3 required EXP', getRequiredExp(3), 400);
assertEqual('EXP Formula: Level 4 required EXP', getRequiredExp(4), 800);

// ----------------------------------------------------
// TEST CASE 1: SPEED PIPELINE (Viscous Flow)
// ----------------------------------------------------
const speedAbilitiesLv3 = getAbilitiesForChapter('halon', 4);
const calcSpeedLv3 = runCalculation(baseStats, speedAbilitiesLv3, 1, false, 4).speed.final;
assertEqual('Speed: Viscous Flow Lv 3 compounding check', calcSpeedLv3, 0.34);

const speedAbilitiesLv16 = getAbilitiesForChapter('halon', 47);
const calcSpeedLv16 = runCalculation(baseStats, speedAbilitiesLv16, 3, false, 47).speed.final;
assertEqual('Speed: Viscous Flow Lv 16 compounding check', calcSpeedLv16, 1.31);

// ----------------------------------------------------
// TEST CASE 2: DIGESTION PIPELINE (Chapter 9)
// ----------------------------------------------------
const ch9Abilities = getAbilitiesForChapter('halon', 9);
const ch9Dig = runCalculation(baseStats, ch9Abilities, 1, false, 9).digestion;
assertEqual('Digestion Ch9: Base digestion', ch9Dig.base, 4);
assertEqual('Digestion Ch9: Efficient base enhanced (Lv 6)', ch9Dig.digEnhanced, 7.08);
assertEqual('Digestion Ch9: Mass Expansion value (+30%)', ch9Dig.massVal, 1.20);
assertEqual('Digestion Ch9: Passive Digestion value (+20%)', ch9Dig.passiveVal, 0.80);
assertEqual('Digestion Ch9: Neutral Sum', ch9Dig.neutralSum, 9.08);

// ----------------------------------------------------
// TEST CASE 3: DIGESTION COMBAT PIPELINE (Chapter 47)
// ----------------------------------------------------
const ch47Abilities = getAbilitiesForChapter('halon', 47);
const ch47Dig = runCalculation(baseStats, ch47Abilities, 3, true, 47).digestion;
assertEqual('Digestion Ch47: Base digestion', ch47Dig.base, 10.48);
assertEqual('Digestion Ch47: Efficient base enhanced (Lv 15)', ch47Dig.digEnhanced, 43.80);
assertEqual('Digestion Ch47: Battle Sum (with Lv 7 Hemo tissue, in combat)', ch47Dig.final, 117.72);

// ----------------------------------------------------
// TEST CASE 4: MANA PIPELINE (Chapter 33 & 71)
// ----------------------------------------------------
const ch33Abilities = getAbilitiesForChapter('halon', 33);
const ch33ManaCalc = runCalculation(baseStats, ch33Abilities, 1, false, 33).mana;
assertEqual('Mana: Ch33 Hyper Efficient Digestion extra mana check', ch33ManaCalc.final, 42.49);

const ch71Abilities = getAbilitiesForChapter('halon', 71);
const ch71ManaCalc = runCalculation(baseStats, ch71Abilities, 4, false, 71).mana.final;
assertEqual('Mana: Ch71 Stat Screen check', ch71ManaCalc, 135.40);

// ----------------------------------------------------
// TEST CASE 5: SPEED FUSION (Chapter 68 Liquid Shadow Shift)
// ----------------------------------------------------
const ch68Abilities = getAbilitiesForChapter('halon', 68);
const ch68SpeedCalc = runCalculation(baseStats, ch68Abilities, 1, false, 68).speed.final;
assertEqual('Speed: Ch68 Liquid Shadow Shift (Viscous Flow Lv 16 fused)', ch68SpeedCalc, 2.13);

// ----------------------------------------------------
// TEST CASE 6: DIGESTION CANON MATCHES (Chapter 54 & Chapter 71)
// ----------------------------------------------------
const ch54Abilities = getAbilitiesForChapter('halon', 54);
const ch54DigCalc = runCalculation(baseStats, ch54Abilities, 3, false, 54).digestion;
assertEqual('Digestion Ch54 NunuNote: Base digestion (10.48)', ch54DigCalc.base, 10.48);

const ch71DigCalc = runCalculation(baseStats, ch71Abilities, 4, false, 71).digestion;
assertEqual('Digestion Ch71: Level 4 Base digestion (14.52)', ch71DigCalc.base, 14.52);

console.log('\n--------------------------------------------------');
console.log(`TEST SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('--------------------------------------------------');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
