import { createRunner } from './test_runner_base.js';

const suite = createRunner('mana');

// =========================================================================
// MANA TEST SUITE (Canon Mapped Mana Milestones)
// Add a single line to add new chapter test cases:
// Syntax: suite.addTest(chapter, expectedValue, combatMode = false, description = "")
// =========================================================================

suite.addTest(25,  15.00,  false, "Ch 25 Magic Core Lv 1 (Canon: 15.0)");
suite.addTest(26,  18.15,  false, "Ch 26 Magic Core Lv 3 (Canon: 18.1)");
suite.addTest(40,  19.97,  false, "Ch 40 Magic Core Lv 4 (Canon: 19.9)");
suite.addTest(54,  26.47,  false, "Ch 54 Magic Core Lv 7 + Harmonizer Lv 2 (Canon: 26.47)");
suite.addTest(71,  26.47,  false, "Ch 71 Status Check (Canon: 26.47)");

// Run mana tests if executed directly
suite.run('MANA');
