# A Slime's Guide to Elysium

An interactive Progressive Web App (PWA) companion tool for the Webnovel *Slime Evolution* by NunuXD. 
Developed and published by **Arson Devs Inc.**

---

## 🌟 Features Implemented

### 1. Dynamic Stat & Ability Simulator
* **Interactive Toggles:** Activate or deactivate skills (e.g., *Corrosive Acid*, *Slime Resiliency*) in real time to see base stats vs. buffed stats.
* **Math Scaling Pipeline:** Configurable growth values (V) and level scaling formulas (Additive, Multiplicative, and Exponential).
* **Buff Pipeline Reordering:** Drag-and-drop or push up/down buttons to change the order in which buffs apply (e.g., applying additives before or after multipliers).

### 2. Biomass Upgrade Cost Calculator
* **Evolution Tiers:** Calculates costs from Stage 1 Common Slime up to Stage 4 Elysian Lord Slime.
* **Cumulative Calculator:** Evaluates total biomass required to reach target levels for Slime Core, Cell Membrane Density, and Sensory Receptors.

### 3. Tactical Geography & Fog of War Map
* **Dual World Navigation:** Toggle between the fantasy continent of **Elysium** and Lohan's futuristic **Sectors**.
* **Progressive Fog of War:** The world map is segmented into grid zones covered in fog. As you increase the Chapter Lock slider, the fog recedes to reveal new regions, kingdoms, guild branches, and dungeon recommendations.

### 4. Elysian Lore Encyclopedia
* **Magical Open Book Layout:** A double-page leather-bound fantasy tome with bookmarks dividing entries.
* **Spoiler-Free Locks:** Lore listings (Races, Classes, Guilds, Kingdoms, Dungeons) filter out future discoveries based on your synchronized chapter progress.

### 5. 3D Evolution Core Viewer
* **Google `<model-viewer>`:** Loads and previews custom `.glb` / `.gltf` 3D character models with mobile AR integration.
* **Interactive CSS 3D Fallback:** A rotating glass prism hologram core built in pure HTML/CSS 3D transforms that animates out-of-the-box before any files are loaded.

---

## 🚀 How to Run the App (Docker Workspace)

No local installation of Node.js or npm is required. You can manage the application environment using our custom Windows batch scripts in the project root:

### 1. Run Development Mode (HMR editing)
Starts the container in the background and launches the hot-reloading dev server:
```powershell
.\dev.bat
```
👉 Open your browser to: **[http://localhost:5173](http://localhost:5173)**

### 2. Run Production Mode (Test PWA / Service Worker)
Ensures dependencies are active, compiles Svelte assets, and serves the fully cached PWA:
```powershell
.\prod.bat
```
👉 Open your browser to: **[http://localhost:5174](http://localhost:5174)**

### 3. Stop all Servers
Cleans up and stops all active Docker containers:
```powershell
.\stop.bat
```

---

## 📦 GitHub Pages Deployment (Free HTTPS Hosting)

The project includes an automated deployment pipeline at `.github/workflows/deploy.yml` which deploys your compiled code to **GitHub Pages** whenever you push to `master`:

1. **Commit and push** your changes to the remote origin:
   ```bash
   git add .
   git commit -m "Update README and project configurations"
   git push origin master
   ```
2. **Watch the build:** Go to your repository on GitHub.com -> **Actions** to watch the deployment complete.
3. **Configure Pages:** 
   * Go to **Settings -> Pages**.
   * Under **Build and deployment**, set the source to **"Deploy from a branch"**.
   * Select the branch **`gh-pages`** and folder **`/ (root)`**, then click **Save**.
4. **Access the PWA:**
   👉 Your app is live securely at: **[https://FreeFallingRN.github.io/A-slime-s-guide-to-Elysium/](https://FreeFallingRN.github.io/A-slime-s-guide-to-Elysium/)**
