import { createRunner } from './test_runner_base.js';

const suite = createRunner('speed');

// =========================================================================
// SPEED TEST SUITE (Canon Mapped Speed Milestones)
// Add a single line to add new chapter test cases:
// Syntax: suite.addTest(chapter, expectedValue, combatMode = false, description = "")
// =========================================================================

suite.addTest(1, 0.25, false, "Base speed");
suite.addTest(3, 0.33, false, "Ch 3 Viscous Flow Lv 3");

// Run speed tests if executed directly
suite.run('SPEED');
