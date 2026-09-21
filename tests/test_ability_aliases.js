import assert from 'assert/strict';
import {
  abilityProgression,
  characterData,
  getAbilitiesForChapter
} from '../src/lib/store.js';

function runTest(name, fn) {
  try {
    fn();
    console.log(`[PASS] ${name}`);
  } catch (error) {
    console.error(`[FAIL] ${name}: ${error.message}`);
    process.exitCode = 1;
  }
}

function matchesAbilitySearch(ability, query) {
  const q = query.trim().toLowerCase();
  const aliasText = (ability.aliases || []).join(' ').toLowerCase();
  return ability.name.toLowerCase().includes(q) || aliasText.includes(q);
}

console.log('==================================================');
console.log('  ABILITY ALIAS TESTS');
console.log('==================================================\n');

runTest('thermal wording maps to one canonical ability object', () => {
  const matches = characterData.abilities.filter((ability) =>
    matchesAbilitySearch(ability, 'thermal perception')
  );

  assert.equal(matches.length, 1);
  assert.equal(matches[0].id, 'thermographic_perception');
  assert.equal(matches[0].name, 'Thermographic Perception');
});

runTest('canonical wording still matches the same ability object', () => {
  const matches = characterData.abilities.filter((ability) =>
    matchesAbilitySearch(ability, 'thermographic perception')
  );

  assert.equal(matches.length, 1);
  assert.equal(matches[0].id, 'thermographic_perception');
});

runTest('chapter-gated ability unlock remains Chapter 68', () => {
  assert.equal(
    getAbilitiesForChapter(67).some((ability) => ability.id === 'thermographic_perception'),
    false
  );
  assert.equal(
    getAbilitiesForChapter(68).some((ability) => ability.id === 'thermographic_perception'),
    true
  );
});

runTest('progression remains unchanged at Chapter 68', () => {
  assert.deepEqual(abilityProgression.thermographic_perception, [
    { chapter: 68, level: 1 },
    { chapter: 68, level: 4 },
    { chapter: 93, level: 9 }
  ]);
});

if (process.exitCode) {
  console.error('\nTEST SUMMARY (ABILITY ALIASES): FAILED');
  process.exit(process.exitCode);
}

console.log('\nTEST SUMMARY (ABILITY ALIASES): 4 PASSED, 0 FAILED');
