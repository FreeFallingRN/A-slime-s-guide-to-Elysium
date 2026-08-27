import { createRunner } from './test_runner_base.js';

const suite = createRunner('digestion');

// =========================================================================
// DIGESTION TEST SUITE (Separate Main Body & Clone Gathering Pipeline)
// Add a single line to add new chapter test cases:
// Syntax: suite.addTest(chapter, expectedValue, combatMode = false, description = "")
// =========================================================================

suite.addTest(12,   7.20,  false, "Ch 12 Digestion Subtotal");
suite.addTest(15,   8.80,  false, "Ch 15 Digestion Subtotal");
suite.addTest(26,  13.92,  false, "Ch 26 Digestion (Main + Clone)");
suite.addTest(28,  14.40,  false, "Ch 28 Digestion (Main + Clone)");
suite.addTest(47, 101.87,  true,  "Ch 47 Combat Digestion (Main Body 90.55 + Clone 11.32)");
suite.addTest(54,  49.03,  false, "Ch 54 Neutral Digestion (NunuNote Canon Match)");
suite.addTest(71,  79.27,  false, "Ch 71 Level 4 Base Digestion (Canon Match)");

// Run digestion tests if executed directly
suite.run('DIGESTION');
