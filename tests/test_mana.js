import { createRunner } from "./test_runner_base.js";

const suite = createRunner("mana");

// =========================================================================
// MANA TEST SUITE (Canon Mapped Mana Milestones)
// Add a single line to add new chapter test cases:
// Syntax: suite.addTest(chapter, expectedValue, combatMode = false, description = "")
// =========================================================================

suite.addTest(25, 15, false, "Magic Core Lv 1");
suite.addTest(26, 18.1, false, "Magic Core Lv 3");
suite.addTest(40, 19.9, false, "Lv 4");
suite.addTest(54, 26.47, false, "Lv 7");
suite.addTest(100, 38.9, false, "Magic Core Lv 11");
suite.addTest(181, 100.5, false, "Level 10 max mana");
suite.addTest(204, 200, false, "Superior Magic Core / Level 11 mana");
suite.addTest(221, 220, false, "Superior Magic Core Lv 2 max mana");
suite.addTest(248, 220, false, "Level 12 mana");
suite.addTest(249, 242, false, "Superior Magic Core Lv 3 max mana");
suite.addTest(263, 292, false, "Superior Magic Core Lv 5 max mana");

// Run mana tests if executed directly
suite.run("MANA");
