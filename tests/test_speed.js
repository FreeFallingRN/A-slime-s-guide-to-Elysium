import { createRunner } from './test_runner_base.js';

const suite = createRunner('speed');

// =========================================================================
// SPEED TEST SUITE (Canon Mapped Speed Milestones)
// Add a single line to add new chapter test cases:
// Syntax: suite.addTest(chapter, expectedValue, combatMode = false, description = "")
// =========================================================================

suite.addTest(3,   0.34, false, "Ch 3 Viscous Flow Lv 3");
suite.addTest(10,  0.55, false, "Ch 10 Viscous Flow Lv 8");
suite.addTest(25,  0.67, false, "Ch 25 Viscous Flow Lv 10");
suite.addTest(27,  0.74, false, "Ch 27 Viscous Flow Lv 11");
suite.addTest(28,  0.81, false, "Ch 28 Viscous Flow Lv 12");
suite.addTest(31,  0.89, false, "Ch 31 Viscous Flow Lv 13");
suite.addTest(41,  1.08, false, "Ch 41 Viscous Flow Lv 14");
suite.addTest(47,  1.31, false, "Ch 47 Viscous Flow Lv 16");
suite.addTest(55,  1.31, false, "Ch 55 Viscous Flow Lv 16");
suite.addTest(68,  1.31, false, "Ch 68 Viscous Flow Lv 16");

// Run speed tests if executed directly
suite.run('SPEED');
