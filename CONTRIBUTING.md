# Contributing to A Slime's Guide to Elysium

Thank you for your interest in contributing to **A Slime's Guide to Elysium**! Whether you are correcting novel stat calculations, adding character lore from latest chapters, fixing bugs, or implementing new interactive tools, your contributions are welcome.

---

## 🌳 Branching Strategy

We use a standard two-branch development model:

* **`master` (Production)**: Holds stable, tested code deployed live to [GitHub Pages](https://FreeFallingRN.github.io/A-slime-s-guide-to-Elysium/). Direct pushes to `master` are restricted.
* **`dev` (Integration / Staging)**: The active development branch. All feature branches, bugfixes, and data updates should be merged into `dev` via Pull Requests.
* **`feature/<name>` or `fix/<name>` or `data/<chapter>`**: Temporary working branches created from `dev`.

```text
feature/character-update ───┐
                            ▼
fix/speed-calc-bug ────────► dev ──────► master (Deploys to GitHub Pages)
                            ▲
data/chapter-31 ────────────┘
```

---

## 🚀 Quickstart Development

1. **Fork and clone** the repository:
   ```bash
   git clone https://github.com/<your-username>/A-slime-s-guide-to-Elysium.git
   cd A-slime-s-guide-to-Elysium
   ```

2. **Check out the `dev` branch** and create a feature branch:
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/my-cool-improvement
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the local Vite dev server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) to view live changes.

---

## 🧪 Testing & Validation

All contributions must pass regression tests and build cleanly before merging:

```bash
# Run all math formula and logic tests
npm test

# Run individual test suites
npm run test:digestion
npm run test:mana
npm run test:speed

# Verify production bundle build
npm run build
```

When adding or updating calculation logic in `src/lib/calc.js`, please add corresponding test cases under the `tests/` directory to prevent regressions.

---

## 📖 Novel Data & Spoiler Rules

1. **Spoiler Integrity**: Never expose character evolutions, abilities, or plot revelations without gating them behind the correct chapter lock in `src/lib/store.js` or `src/lib/charactersData.js`.
2. **Novel Citations**: Always cite the chapter number in your PR description or commit message so maintainers can cross-verify numbers with *Slime Evolution* by NunuXD.

---

## 📬 Submitting a Pull Request

1. Push your branch to your GitHub fork:
   ```bash
   git push origin feature/my-cool-improvement
   ```
2. Open a Pull Request targeting the **`dev`** branch.
3. Fill out the Pull Request template checklist.
4. Ensure all CI checks pass. A maintainer will review and merge your PR into `dev`!
