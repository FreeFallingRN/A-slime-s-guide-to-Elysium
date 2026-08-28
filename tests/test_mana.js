import { createRunner } from './test_runner_base.js';

const suite = createRunner('mana');

// =========================================================================
// MANA TEST SUITE (Canon Mapped Mana Milestones)
// Add a single line to add new chapter test cases:
// Syntax: suite.addTest(chapter, expectedValue, combatMode = false, description = "")
// =========================================================================

suite.addTest(25,  15,  false, "Magic Core Lv 1");
suite.addTest(26,  18.1,  false, "Magic Core Lv 3");
suite.addTest(40,  19.9,  false, "Lv 4");
suite.addTest(54,  26.47,  false, "Lv 7");

// Run mana tests if executed directly
suite.run('MANA');
