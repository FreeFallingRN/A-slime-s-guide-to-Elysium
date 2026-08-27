import { runCalculation } from './src/lib/calc.js';

console.log('==================================================');
console.log('  ELYSIUM SLIME STAT CALCULATOR - REGRESSION TEST');
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

// ----------------------------------------------------
// TEST CASE 1: SPEED PIPELINE (Viscous Flow Compounding)
// ----------------------------------------------------
// Base Speed is 0.25
// Viscous Flow Lv 1 -> 0.28
// Viscous Flow Lv 2 -> 0.31
// Viscous Flow Lv 3 -> 0.34
// Viscous Flow Lv 16 (Chapter 47) -> 1.19
const speedAbilitiesLv3 = [{ id: 'viscous_flow', level: 3 }];
const calcSpeedLv3 = runCalculation({}, speedAbilitiesLv3, 1, false).speed.final;
assertEqual('Speed: Viscous Flow Lv 3 compounding check', calcSpeedLv3, 0.34);

const speedAbilitiesLv16 = [{ id: 'viscous_flow', level: 16 }];
const calcSpeedLv16 = runCalculation({}, speedAbilitiesLv16, 3, false).speed.final;
assertEqual('Speed: Viscous Flow Lv 16 compounding check', calcSpeedLv16, 1.19);

// Regression check for level 24 Viscous Flow
const speedAbilitiesLv24 = [{ id: 'viscous_flow', level: 24 }];
const calcSpeedLv24 = runCalculation({}, speedAbilitiesLv24, 1, false).speed.final;
assertEqual('Speed: Viscous Flow Lv 24 compounding check', calcSpeedLv24, 2.54);

// ----------------------------------------------------
// TEST CASE 2: DIGESTION PIPELINE (Chapter 9)
// ----------------------------------------------------
// In Chapter 9: player level is 1 (base is 4)
// Efficient Digestion: Lv 6
// Mass Expansion: Lv 1
// Passive Digestion: Lv 2
// Hemo Tissue: Lv 0, not in combat
const ch9Abilities = [
  { id: 'efficient_digestion', level: 6 },
  { id: 'mass_expansion', level: 1 },
  { id: 'passive_digestion', level: 2 }
];
const ch9Dig = runCalculation({}, ch9Abilities, 1, false).digestion;
assertEqual('Digestion Ch9: Base digestion', ch9Dig.base, 4);
assertEqual('Digestion Ch9: Efficient base enhanced (Lv 6)', ch9Dig.digEnhanced, 7.08); // 4 compounded 6 times with 2-decimals
assertEqual('Digestion Ch9: Mass Expansion value (+30%)', ch9Dig.massVal, 2.12); // 7.08 * 0.30
assertEqual('Digestion Ch9: Passive Digestion value (+20%)', ch9Dig.passiveVal, 1.42); // 7.08 * 0.20
assertEqual('Digestion Ch9: Neutral Sum', ch9Dig.neutralSum, 10.62); // 7.08 + 2.12 + 1.42

// ----------------------------------------------------
// TEST CASE 3: DIGESTION COMBAT PIPELINE (Chapter 47)
// ----------------------------------------------------
// In Chapter 47: player level is 3 (base is 10)
// Efficient Digestion: Lv 10
// Mass Expansion: Lv 4
// Passive Digestion: Lv 3
// Hemolymphatic Tissue: Lv 7, in combat
const ch47Abilities = [
  { id: 'efficient_digestion', level: 10 },
  { id: 'mass_expansion', level: 4 },
  { id: 'passive_digestion', level: 3 },
  { id: 'hemolymphatic_tissue', level: 7 }
];
const ch47Dig = runCalculation({}, ch47Abilities, 3, true).digestion;
assertEqual('Digestion Ch47: Base digestion', ch47Dig.base, 10);
assertEqual('Digestion Ch47: Efficient base enhanced (Lv 10)', ch47Dig.digEnhanced, 25.93);
assertEqual('Digestion Ch47: Battle Sum (with Lv 7 Hemo tissue, in combat)', ch47Dig.final, 155.59); // 64.83 * 2.40

// ----------------------------------------------------
// TEST CASE 4: MANA PIPELINE
// ----------------------------------------------------
// Base mana: 10
// Instinctive Perception: Lv 3 (+6.00)
// Memory Resonance: Lv 1 (+1.00)
// Chemosensory Aptitude: Lv 2 (+4.00)
// Magic Harmonizer: Lv 1 (x1.20)
// Magic Core: Lv 3 (+10% compounding)
const manaAbilities = [
  { id: 'instinctive_perception', level: 3 },
  { id: 'memory_resonance', level: 1 },
  { id: 'chemosensory_aptitude', level: 2 },
  { id: 'magic_harmonizer', level: 1 },
  { id: 'magic_core', level: 3 }
];
const manaCalc = runCalculation({}, manaAbilities, 1, false).mana;
assertEqual('Mana: Additive sum', manaCalc.additiveSum, 21.00); // 10 + 6 + 1 + 4
assertEqual('Mana: Multiplied sum (Harmonizer)', manaCalc.multipliedSum, 25.20); // 21 * 1.2
assertEqual('Mana: Final mana (Magic Core exponent)', manaCalc.final, 33.54); // 25.20 compounded 3 times

console.log('\n--------------------------------------------------');
console.log(`TEST SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('--------------------------------------------------');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
