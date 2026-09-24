import assert from "assert/strict";
import {
  LEVEL_11_BIOMASS_UNIT_SCALE,
  calculateBiomassCost
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

runTest("known pre-Level-11 Magic Core cost is calculated", () => {
  const result = calculateBiomassCost({ skillId: "magic_core", startLevel: 1, targetLevel: 2 });

  assert.equal(result.status, "CONFIRMED");
  assert.equal(result.total, 10);
  assert.equal(result.segments[0].unit, "pre_level_11_biomass");
});

runTest("known pre-Level-11 Natural Energy Core cost is calculated", () => {
  const result = calculateBiomassCost({
    skillId: "natural_energy_core",
    startLevel: 1,
    targetLevel: 2
  });

  assert.equal(result.status, "CONFIRMED");
  assert.equal(result.total, 200);
});

runTest("Level 11 refined Biomass unit scale is explicit", () => {
  assert.equal(LEVEL_11_BIOMASS_UNIT_SCALE, 1000);
});

runTest("known post-Level-11 Efficient Digestion range uses source example", () => {
  const result = calculateBiomassCost({
    skillId: "efficient_digestion",
    startLevel: 20,
    targetLevel: 40
  });

  assert.equal(result.status, "CONFIRMED");
  assert.equal(result.total, 8.67);
  assert.equal(result.segments[0].unit, "post_level_11_refined_biomass");
});

runTest("known post-Level-11 extracted evolutions use source examples", () => {
  assert.equal(
    calculateBiomassCost({ skillId: "claw_projection", startLevel: 1, targetLevel: 5 }).total,
    11.44
  );
  assert.equal(
    calculateBiomassCost({ skillId: "synergy_link", startLevel: 1, targetLevel: 5 }).total,
    29.22
  );
  assert.equal(
    calculateBiomassCost({ skillId: "racial_command", startLevel: 1, targetLevel: 5 }).total,
    17.54
  );
});

runTest("cross-boundary ranges keep pre-Level-11 math and flag unresolved post range", () => {
  const result = calculateBiomassCost({
    skillId: "magic_core",
    startLevel: 8,
    targetLevel: 13
  });

  assert.equal(result.status, "NEEDS_HUMAN_REVIEW");
  assert.equal(result.segments.length, 2);
  assert.equal(result.segments[0].status, "CONFIRMED");
  assert.equal(result.segments[1].status, "NEEDS_HUMAN_REVIEW");
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

if (process.exitCode) {
  console.error("\nTEST SUMMARY (BIOMASS): FAILED");
  process.exit(process.exitCode);
}

console.log("\nTEST SUMMARY (BIOMASS): 8 PASSED, 0 FAILED");
