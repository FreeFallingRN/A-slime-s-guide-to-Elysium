import { createRunner } from './test_runner_base.js';

const suite = createRunner('digestion');

// =========================================================================
// DIGESTION TEST SUITE (Separate Main Body & Clone Gathering Pipeline)
// Add a single line to add new chapter test cases:
// Syntax: suite.addTest(chapter, expectedValue, combatMode = false, description = "", stage = "final")
// Stages available: "stage1" / "base", "stage2" / "enhanced", "stage3" / "mass", "stage4" / "passive", "stage5" / "subtotal", "stage6" / "clone", "stage7" / "neutral", "stage8" / "combat", "final"

suite.addTest(1, 1.8, false, "Base Digestion");
suite.addTest(2, 1.98, false, "Efficient digestion lv 1");

// Chapter 8 Stage Breakdown Tests
suite.addTest(8, 2.38, false, "Total Digestion", "final");

// Chapter 9 Stage Breakdown Tests
suite.addTest(9, 0.94, false, "Mass Expansion", "stage3");
suite.addTest(9, 0.63, false, "Passive Digestion", "stage4");
suite.addTest(9, 4.72, false, "Total Digestion", "final");

// Custom Skills & Level Tests (Without needing a chapter number)
suite.addTest({
    skills: { efficient_digestion: 2, passive_digestion: 1 },
    playerLvl: 1,
    expected: 2.38
});

suite.addTest({
    skills: { efficient_digestion: 3, passive_digestion: 1 },
    playerLvl: 1,
    expected: 2.61
});

suite.addTest({
    skills: { efficient_digestion: 4, passive_digestion: 1 },
    playerLvl: 1,
    expected: 2.87
});

suite.addTest({
    skills: { efficient_digestion: 5, passive_digestion: 1 },
    playerLvl: 1,
    expected: 3.16
});

suite.addTest({
    skills: { efficient_digestion: 5, passive_digestion: 2 },
    playerLvl: 1,
    expected: 3.44
});

suite.addTest({
    skills: { efficient_digestion: 6, passive_digestion: 2 },
    playerLvl: 1,
    expected: 3.78
});

// Run digestion tests if executed directly
suite.run('DIGESTION');
