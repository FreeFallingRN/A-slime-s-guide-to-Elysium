import assert from 'assert/strict';
import {
  clampChapter,
  getChapterRange,
  getLevelMilestoneIndex,
  getLevelMilestones,
  getTimelineMarkers
} from '../src/lib/chapterUtils.js';

function runTest(name, fn) {
  try {
    fn();
    console.log(`[PASS] ${name}`);
  } catch (error) {
    console.error(`[FAIL] ${name}: ${error.message}`);
    process.exitCode = 1;
  }
}

console.log('==================================================');
console.log('  CHAPTER CONTROLLER HELPER TESTS');
console.log('==================================================\n');

runTest('chapter range is derived from unordered data', () => {
  assert.deepEqual(
    getChapterRange([
      { index: 10 },
      { index: 1 },
      { index: 7 }
    ]),
    { minChapter: 1, maxChapter: 10 }
  );
});

runTest('empty chapter range falls back safely', () => {
  assert.deepEqual(getChapterRange([]), { minChapter: 1, maxChapter: 1 });
});

runTest('timeline markers span medium range without duplicates', () => {
  assert.deepEqual(getTimelineMarkers(1, 92, 5), [1, 24, 47, 69, 92]);
});

runTest('timeline markers span large range without duplicates', () => {
  assert.deepEqual(getTimelineMarkers(1, 391, 5), [1, 99, 196, 294, 391]);
});

runTest('timeline markers avoid duplicates for small ranges', () => {
  assert.deepEqual(getTimelineMarkers(1, 3, 5), [1, 2, 3]);
});

runTest('level milestones collapse repeated levels to first chapter', () => {
  assert.deepEqual(
    getLevelMilestones([
      { index: 68, halonLvl: 3 },
      { index: 69, halonLvl: 3 },
      { index: 70, halonLvl: 3 },
      { index: 71, halonLvl: 4 },
      { index: 72, halonLvl: 4 }
    ]),
    [
      { level: 3, chapter: 68 },
      { level: 4, chapter: 71 }
    ]
  );
});

runTest('level milestones preserve non-sequential level jumps', () => {
  const milestones = getLevelMilestones([
    { index: 1, halonLvl: 1 },
    { index: 2, halonLvl: 1 },
    { index: 3, halonLvl: 14 },
    { index: 4, halonLvl: 14 },
    { index: 5, halonLvl: 16 }
  ]);

  assert.deepEqual(milestones, [
    { level: 1, chapter: 1 },
    { level: 14, chapter: 3 },
    { level: 16, chapter: 5 }
  ]);
  assert.equal(getLevelMilestoneIndex(milestones, 14), 1);
});

runTest('chapter clamping rejects NaN and clamps to derived range', () => {
  const chapters = [{ index: 10 }, { index: 20 }];

  assert.equal(clampChapter('not-a-number', chapters), 10);
  assert.equal(clampChapter(3, chapters), 10);
  assert.equal(clampChapter(12, chapters), 12);
  assert.equal(clampChapter(99, chapters), 20);
});

if (process.exitCode) {
  console.error('\nTEST SUMMARY (CHAPTER UTILS): FAILED');
  process.exit(process.exitCode);
}

console.log('\nTEST SUMMARY (CHAPTER UTILS): 8 PASSED, 0 FAILED');
