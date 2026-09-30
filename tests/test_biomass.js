import assert from "assert/strict";
import {
  LEVEL_11_BIOMASS_UNIT_SCALE,
  calculateBiomassCost,
  getAvailableBiomassSkills,
  getAbilityLevelAtChapter,
  estimateDigestionTime,
  calculatePortfolioCost,
  formatDuration
} from "../src/lib/biomassCalc.js";

function runTest(name, fn) {
  try {
    fn();
    console.log(`[PASS] ${name}`);
  } catch (error) {
    console.error(`[FAIL] ${name}: ${error.message}`);
    process.exitCode = 1;
  }
}

console.log("==================================================");
console.log("  BIOMASS CALCULATOR TESTS");
console.log("==================================================\n");

runTest("known pre-Level-11 Magic Core cost is calculated in standard BM", () => {
  const result = calculateBiomassCost({
    skillId: "magic_core",
    startLevel: 1,
    targetLevel: 2,
    characterLevel: 1,
    chapter: 1
  });

  assert.equal(result.total, 10);
  assert.equal(result.unit, "BM");
  assert.equal(result.isRefined, false);
});

runTest("known pre-Level-11 Natural Energy Core cost is calculated in standard BM", () => {
  const result = calculateBiomassCost({
    skillId: "natural_energy_core",
    startLevel: 1,
    targetLevel: 2,
    characterLevel: 1,
    chapter: 1
  });

  assert.equal(result.total, 200);
  assert.equal(result.unit, "BM");
  assert.equal(result.isRefined, false);
});

runTest("Level 11 refined Biomass unit scale is explicit (1,000:1 ratio)", () => {
  assert.equal(LEVEL_11_BIOMASS_UNIT_SCALE, 1000);
});

runTest("known post-Level-11 Efficient Digestion range uses source example", () => {
  const result = calculateBiomassCost({
    skillId: "efficient_digestion",
    startLevel: 20,
    targetLevel: 40,
    characterLevel: 12,
    chapter: 262
  });

  assert.equal(result.total, 8.67);
  assert.equal(result.unit, "Refined BM");
  assert.equal(result.isRefined, true);
});

runTest("known post-Level-11 extracted evolutions use source examples", () => {
  assert.equal(
    calculateBiomassCost({
      skillId: "claw_projection",
      startLevel: 1,
      targetLevel: 5,
      characterLevel: 12,
      chapter: 262
    }).total,
    11.44
  );
  assert.equal(
    calculateBiomassCost({
      skillId: "synergy_link",
      startLevel: 1,
      targetLevel: 5,
      characterLevel: 12,
      chapter: 262
    }).total,
    29.22
  );
  assert.equal(
    calculateBiomassCost({
      skillId: "racial_command",
      startLevel: 1,
      targetLevel: 5,
      characterLevel: 12,
      chapter: 262
    }).total,
    17.54
  );
});

runTest(
  "skill upgrades beyond level 11 in early chapters remain in standard BM with no mixed splits",
  () => {
    const result = calculateBiomassCost({
      skillId: "magic_core",
      startLevel: 8,
      targetLevel: 13,
      characterLevel: 5,
      chapter: 50
    });

    assert.equal(result.isRefined, false);
    assert.equal(result.unit, "BM");
    assert.equal(result.segments.length, 1);
    assert.equal(result.segments[0].unit, "BM");
  }
);

runTest("post-refinement skill upgrades scale by 1,000 into Refined BM", () => {
  const result = calculateBiomassCost({
    skillId: "magic_core",
    startLevel: 21,
    targetLevel: 25,
    characterLevel: 12,
    chapter: 263
  });

  assert.equal(result.unit, "Refined BM");
  assert.equal(result.isRefined, true);
  assert.ok(result.total > 0);
});

runTest("invalid ranges are rejected", () => {
  assert.throws(
    () => calculateBiomassCost({ skillId: "magic_core", startLevel: 5, targetLevel: 5 }),
    /targetLevel must be greater/
  );
  assert.throws(
    () => calculateBiomassCost({ skillId: "magic_core", startLevel: 0, targetLevel: 2 }),
    /startLevel must be a positive integer/
  );
});

runTest("unknown skills are rejected", () => {
  assert.throws(
    () => calculateBiomassCost({ skillId: "missing_skill", startLevel: 1, targetLevel: 2 }),
    /Unknown biomass skill/
  );
});

runTest("expanded canonical abilities are available and unlocked per chapter", () => {
  const ch2Skills = getAvailableBiomassSkills(2);
  assert.ok(ch2Skills.some((s) => s.id === "efficient_digestion"));
  assert.ok(ch2Skills.some((s) => s.id === "viscous_flow"));
  assert.ok(ch2Skills.some((s) => s.id === "structural_stability"));

  const ch300Skills = getAvailableBiomassSkills(300);
  assert.ok(ch300Skills.length >= 30);
  assert.ok(ch300Skills.some((s) => s.id === "killing_intent"));
});

runTest("chapter progression helpers resolve canonical levels without level resets", () => {
  const lvlCh20 = getAbilityLevelAtChapter("efficient_digestion", 20);
  assert.equal(lvlCh20, 10);

  const lvlCh262 = getAbilityLevelAtChapter("efficient_digestion", 262);
  assert.equal(lvlCh262, 40);

  const coreCh157 = getAbilityLevelAtChapter("magic_core", 157);
  assert.equal(coreCh157, 21);

  const coreCh200 = getAbilityLevelAtChapter("magic_core", 200);
  assert.equal(coreCh200, 21);

  const coreCh263 = getAbilityLevelAtChapter("magic_core", 263);
  assert.equal(coreCh263, 25);
});

runTest("digestion time estimation handles both standard and refined biomass", () => {
  const standardTime = estimateDigestionTime(100, 50, 10, false);
  assert.equal(standardTime.activeHours, 2);
  assert.equal(standardTime.activeFormatted, "2h");
  assert.equal(standardTime.passiveHours, 10);
  assert.equal(standardTime.passiveFormatted, "10h");

  const refinedTime = estimateDigestionTime(1, 500, 100, true);
  assert.equal(refinedTime.activeHours, 2); // 1 Refined BM = 1,000 BM -> 1,000 / 500 = 2h
  assert.equal(refinedTime.activeFormatted, "2h");
  assert.equal(refinedTime.passiveHours, 10);
  assert.equal(refinedTime.passiveFormatted, "10h");

  assert.equal(formatDuration(0.5), "30m");
  assert.equal(formatDuration(25.5), "1d 1h");
});

runTest(
  "multi-skill portfolio planner computes aggregate totals correctly in active chapter unit",
  () => {
    const prePortfolio = calculatePortfolioCost({
      upgrades: [
        { skillId: "magic_core", startLevel: 1, targetLevel: 2 },
        { skillId: "viscous_flow", startLevel: 1, targetLevel: 3 }
      ],
      characterLevel: 1,
      chapter: 1
    });

    assert.equal(prePortfolio.unit, "BM");
    assert.equal(prePortfolio.isRefined, false);
    assert.equal(prePortfolio.total, 12.13); // 10 (Magic Core) + 1 + 1.13 (Viscous Flow)

    const postPortfolio = calculatePortfolioCost({
      upgrades: [
        { skillId: "claw_projection", startLevel: 1, targetLevel: 5 },
        { skillId: "racial_command", startLevel: 1, targetLevel: 5 }
      ],
      characterLevel: 12,
      chapter: 262
    });

    assert.equal(postPortfolio.unit, "Refined BM");
    assert.equal(postPortfolio.isRefined, true);
    assert.equal(postPortfolio.total, 28.98); // 11.44 + 17.54
  }
);

if (process.exitCode) {
  console.error("\nTEST SUMMARY (BIOMASS): FAILED");
  process.exit(process.exitCode);
}

console.log("\nTEST SUMMARY (BIOMASS): 13 PASSED, 0 FAILED");
