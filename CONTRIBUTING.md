# Contributing to A Slime's Guide to Elysium

Thank you for your interest in contributing to **A Slime's Guide to Elysium**!  
This companion app is built and maintained by readers and developers to track the canon stats, abilities, lore, and characters of _Slime Evolution_ by NunuXD.

---

## 🌿 Git Branching Strategy

We follow a structured branching model to keep development smooth and prevent broken releases:

- **`master` (Production)**: The stable release branch deployed to GitHub Pages and production. Direct commits to `master` are reserved for release merges.
- **`dev` (Main Development)**: The active development branch. **All feature branches and Pull Requests should target `dev`**.
- **`feature/*` or `fix/*` (Working Branches)**: Create your working branch off `dev` (e.g., `feature/chapter-101-stats`, `fix/skill-multiplier`).

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js**: v20 or higher
- **npm**: v10 or higher
- _(Optional)_ **Docker & Docker Compose**

### Setup

```bash
# 1. Clone your fork
git clone https://github.com/<your-username>/A-slime-s-guide-to-Elysium.git
cd A-slime-s-guide-to-Elysium

# 2. Switch to dev branch
git switch dev

# 3. Create a feature branch
git switch -c feature/your-feature-name

# 4. Install dependencies
npm install

# 5. Start dev server
npm run dev
```

Or run via Docker:

```bash
docker compose up
```

---

## 📂 Data Architecture & Contribution Guidelines

The app's data is organized into modular files:

| Data Area                 | File Path                   | Description                                                                              |
| ------------------------- | --------------------------- | ---------------------------------------------------------------------------------------- |
| **Chapters Timeline**     | `src/data/chapters.js`      | Chronological list of novel chapters, titles, release dates, and Halon levels.           |
| **Abilities & Skills**    | `src/data/abilities.js`     | Halon's base abilities, traits, and chapter level milestones.                            |
| **Lore Encyclopedia**     | `src/data/encyclopedia.js`  | Races, classes, monsters, factions, dungeons, and technology records.                    |
| **Characters Compendium** | `src/lib/charactersData.js` | Character stage progression, roles, descriptions, linked personas, and image milestones. |
| **Map Coordinates**       | `src/data/mapNodes.js`      | Elysium and Sector world coordinate pins and zone details.                               |
| **Math Engine**           | `src/lib/calc.js`           | Digestion, speed, and mana mathematical scaling calculations.                            |

---

## 🧪 Running Validation & Tests

Before opening a Pull Request, verify that all regression tests and data schema validations pass:

```bash
# Run full automated test suite
npm test

# Target specific tests
npm run test:digestion
npm run test:mana
npm run test:speed
npm run test:chapter-control
npm run test:ability-aliases
npm run validate:data
```

### Data Validation Rules

1. **Chapter Index Continuity**: Chapters must be sequentially indexed without skipping numbers.
2. **Canon Dates**: All chapters must have valid publication dates (no `TBD` or `N/A` placeholders).
3. **Artwork Files**: Any artwork referenced in character stages must exist in `/public`.
4. **Ability Unlocks**: Upgrades and level milestones cannot precede the chapter in which the ability was first acquired.

---

## 🚀 Submitting a Pull Request

1. Push your branch to your GitHub fork:
   ```bash
   git push origin feature/your-feature-name
   ```
2. Open a Pull Request targeting the **`dev`** branch.
3. Fill out the PR template with a summary of what was added/fixed.
4. Verify that the automated **CI & Build Checks** GitHub Actions workflow passes.
