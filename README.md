# A Slime's Guide to Elysium

An interactive Progressive Web App (PWA) companion tool for the webnovel *Slime Evolution* by NunuXD.  
Developed and published by **Arson Devs Inc.**

---

## 🌐 Access the Live App

You can access and use the latest version of the companion tool directly in your browser:

👉 **[https://FreeFallingRN.github.io/A-slime-s-guide-to-Elysium/](https://FreeFallingRN.github.io/A-slime-s-guide-to-Elysium/)**

> **💡 PWA Offline Support:** You can install this app directly onto your mobile device or desktop. Once loaded, it works completely offline and checks for updates automatically in the background.

---

## 🌟 Currently Accessible Features

### 1. Global Chrono-Controller (Chapter Lock & Sync)
* **Spoiler-Free Progression:** Scrub through chapters or jump directly to character level milestones.
* **Universal Synchronization:** All stat values, unlocked abilities, active buffs, and character lore dynamically adjust based on your current reading progress.

### 2. Dynamic Stat & Ability Simulator
* **Interactive Skill Toggles:** Activate or deactivate abilities (e.g., *Corrosive Acid*, *Slime Resiliency*, *Combat State*) in real time to compare base versus buffed attributes.
* **Math Scaling Pipeline:** Configurable base growth values and calculation pipelines supporting Additive, Multiplicative, and Exponential scaling.
* **Buff Pipeline Reordering:** Adjust calculation order and priority to see how compounding multipliers affect final stats.
* **Dedicated Stat Breakdowns:**
  * **Overall Pipeline:** Comprehensive step-by-step breakdown from base stats to final values.
  * **Digestion Rate Breakdown:** Base digestion speeds, tier bonuses, skills, and target digestion thresholds.
  * **Mana Capacity & Regeneration:** Core mana pools, regeneration rates, and passive scaling.
  * **Speed & Velocity Scaling:** Movement speed multipliers and agility boosts.
* **Ability Filter & Search:** Quickly find abilities by name, target stat, or scaling type.

### 3. Interactive Character Compendium
* **Chapter-Synced Encounters:** Characters and their details only appear once encountered in the story.
* **Faction & Origin Categorization:** Filter across Elysium natives, futuristic Sectors, Players, and other factions.
* **Evolutionary Profiles:** Track character forms, status conditions, affiliations, and appearance timelines.
* **Artwork & Gallery Lightbox:** View character illustrations and portraits with full-size lightbox zoom.
* **Character Links:** Explore connections and relationships between key characters.

---

## 🤝 How to Contribute

We welcome contributions, bug reports, and lore/stat data updates from readers and developers alike!

### 🛠️ Local Development Setup

#### Option A: Node.js & npm (Recommended)
1. **Clone the repository:**
   ```bash
   git clone https://github.com/FreeFallingRN/A-slime-s-guide-to-Elysium.git
   cd A-slime-s-guide-to-Elysium
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open **[http://localhost:5173](http://localhost:5173)** in your browser.

#### Option B: Docker Compose
If you prefer running in a containerized environment:
```bash
docker compose up
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

### 🧪 Running Tests

Ensure all mathematical calculation formulas and regression tests pass before submitting changes:

```bash
# Run all test suites
npm test

# Run individual test suites
npm run test:digestion
npm run test:mana
npm run test:speed
```

---

### 📂 Key Data Files for Contributions

If you'd like to add or update content from latest novel chapters:

* **Chapters & Stat Formulas:** `src/lib/store.js`
* **Calculation Engine:** `src/lib/calc.js`
* **Character Data & Lore:** `src/lib/charactersData.js`
* **Regression Tests:** `tests/`

---

### 🚀 Submitting Your Changes

1. **Fork** the repository and create a new branch for your feature or data update:
   ```bash
   git checkout -b feature/chapter-update
   ```
2. **Commit** your changes with a clear message:
   ```bash
   git commit -m "Add Chapter 31 stat milestones and character updates"
   ```
3. **Push** to your fork and submit a **Pull Request** to the `master` branch.

Automated GitHub Actions will test and deploy updates to GitHub Pages upon merge to `master`.

---

## 📜 Credits & License

* Inspired by the webnovel **[Slime Evolution](https://www.webnovel.com/book/35006015000821605)** by **NunuXD**.
* Developed and maintained by **Arson Devs Inc.**
