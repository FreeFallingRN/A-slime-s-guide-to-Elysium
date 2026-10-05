import { createRunner } from "./test_runner_base.js";

const suite = createRunner("speed");

// =========================================================================
// SPEED TEST SUITE (Canon Mapped Speed Milestones)
// Add a single line to add new chapter test cases:
// Syntax: suite.addTest(chapter, expectedValue, combatMode = false, description = "")
// =========================================================================

suite.addTest(1, 0.25, false, "Base speed");
suite.addTest(3, 0.33, false, "Ch 3 Viscous Flow Lv 3");
suite.addTest(93, 1.9, false, "Ch 93 Viscous Flow Lv 23");
suite.addTest(98, 2.09, false, "Ch 98 Viscous Flow Lv 24");
suite.addTest(150, 2.29, false, "Ch 150 Viscous Flow Lv 25");
suite.addTest(157, 2.77, false, "Ch 157 Viscous Flow Lv 27");
suite.addTest(204, 6.52, false, "Ch 204 Viscous Flow Lv 36");
suite.addTest(218, 6.52, false, "Ch 218 base speed confirmation");
suite.addTest(300, 6.52, false, "Ch 300 latest confirmed Viscous Flow speed");

// Run speed tests if executed directly
suite.run("SPEED");
