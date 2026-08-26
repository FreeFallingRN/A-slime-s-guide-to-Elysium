# A Slime's Guide to Elysium (Design Document)

*A companion and utility application for the Webnovel **Slime Evolution** by **NunuXD**.*
**Developed by:** Arson Devs Inc.

---

## 1. Project Overview & Aesthetics
**A Slimes Guide to Elysium** is a premium interactive companion app designed to track characters, statistics, world geography, and lore from the webnovel *Slime Evolution*. 

### 1.1. UI/UX Theme: The Fantasy-SciFi Dichotomy
The application features a unique visual dichotomy reflecting the two sides of the novel's universe:
* **The Magic Companion Book (Elysium Lore)**:
  * Styled as a heavy, ancient magical tome.
  * The initial loading screen displays the ornate front cover of the book.
  * Main sections are accessed via bookmarks peeking out of the top/side of the pages.
  * Holds lore sections, descriptions, and the final stat readouts.
* **The Holographic System (Futuristic UI/Real World)**:
  * Styled with glowing, semi-transparent, neon-blue futuristic windows (simulating the advanced holographic tech from Lohan's real world).
  * Used for editing values, the interactive map projection HUD, and the interactive skill toggling panels.

---

## 2. Core Features & Functional Requirements

### 2.1. Interactive Character Sheet & Stat Simulator
A core utility representing characters (e.g., Halon, Lohan) with editable base and scaled stats.

* **Interactive Skill Toggles**: 
  * View characters with or without skills active.
  * Users can click check-boxes/toggle-switches to activate or deactivate specific skills in real time.
  * Stats update dynamically to show base vs. fully buffed numbers.
* **Base Stats Pipeline**: A flow showing how a character's base stats are transformed by their abilities/skills.
* **Scaling Selectors**:
  * **Additive**: Flat or percentage-based addition (e.g., `Stat + (Value * Level)`).
  * **Multiplicative**: Multiplies current stat value (e.g., `Stat * (1 + Value * Level)`).
  * **Exponential**: Scales exponentially per level (e.g., `Stat * (1 + Value) ^ Level`).
* **Pipelines & Execution Ordering**:
  * Drag-and-drop ordering to rearrange which buffs apply first (e.g., additive before multiplicative).

---

### 2.2. Progressive Maps & Sector Navigation
Instead of a static map, geography expands dynamically as the user progresses through the book.

* **Two-World Geography**:
  * **Elysium Map**: The fantasy continent.
  * **Lohan's World Map**: Sector maps representing the futuristic physical reality.
* **Interactive 2D Projections**:
  * Styled as a futuristic holographic projection rising from the magical book.
  * Sidebar lets users click on regions/zones to smoothly zoom and pan.
* **Chapter-Linked Fog of War**:
  * The map is covered in a mystical/technological shroud (fog of war).
  * The fog recedes dynamically as the user increases their global **Chapter Lock** setting.
  * Area-specific info is revealed: Factions, guilds, monster level suggestions, kingdoms, dungeons.

---

### 2.3. Biomass Upgrade Cost Calculator
* Tracks and projects the Biomass required for Slime evolution pathways.
* Users input current status and targeted paths to see total cost calculations.

---

### 2.4. Chapter Lock System ("Back in Time")
* **Global Chapter Selector**: Controls the active chapter timeline state.
* **Spoiler Prevention**: Locks and hides all characters, statistics, world map details, guild entries, and races discovered in future chapters.

---

### 2.5. World & Lore Encyclopedia
A book-formatted registry covering the entire setting:
* **Character Directory**: Main cast, guild members, IRL acquaintances, antagonists, and key NPCs.
* **World Entities**: Detailed info about Guilds, Factions, Kingdoms, and Dungeons.
* **System Lore**: A comprehensive list of Races (e.g., Slime subtypes) and Classes.

---

## 3. Technology Stack Recommendation

To achieve a **zero-cost hosting model** with **offline mobile capabilities** and **3D rendering**, we recommend the following modern static web stack:

### 3.1. Hosting & Deployment
* **GitHub Pages (Free)**: Since there is no database server required, the application can be built into static HTML/JS/CSS assets and hosted directly for free via GitHub Pages.
* **Local Storage API**: User progress, chapter lock settings, custom calculator configurations, and notes will be saved locally using the browser's `localStorage` (or `IndexedDB` for larger data).

### 3.2. Framework & PWA
* **Vite + Svelte**: Replaces standard Virtual DOM with a fast, compiler-based reactive system, generating lightweight bundles ideal for mobile processors.
* **Vite PWA Plugin (`vite-plugin-pwa`)**: Configures service workers to cache app resources, routes, and local databases. This allows users to download the app directly to their home screens via Chrome/Safari and use it completely offline.

### 3.3. 3D Model Rendering
* **Google's `<model-viewer>` Component**: A web component by Google that enables loading and displaying interactive 3D `.glb` or `.gltf` files with a single HTML tag. It provides built-in touch navigation (zoom/rotate), lighting, and AR support, requiring zero complex WebGL programming.
* **Three.js**: (Alternative) If custom shader effects or complex scene interactions are needed, though `<model-viewer>` is lighter and highly recommended for cataloging items/characters.

### 3.4. Assets & Icons
* **Lucide Icons**: Clean, light icon library for UI elements (book, map, key, eye, lock).

### 3.5. Native Mobile Wrapper (Capacitor)
* If publishing a standalone app to the **Google Play Store** or **Apple App Store** is desired later, **Capacitor** by Ionic can wrap this Vite + Svelte build directory (`dist`) into native iOS and Android binaries.
* It remains completely free, runs client-side, and can be added via simple CLI commands to target native platforms.

---

## 4. Next Steps
1. Create mock character data for **Halon** showing base stats and skills.
2. Outline the chapter-wise unlock milestones for the map fog of war.
3. Design and build the interactive UI prototype.
