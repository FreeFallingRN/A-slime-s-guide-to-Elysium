# A Slimes Guide to Elysium

An interactive Progressive Web App (PWA) companion tool for the webnovel *Slime Evolution* by NunuXD. 
Developed by **Arson Devs Inc.**

---

## 🚀 How to Run the App (Docker Workspace)

Because this project is configured to run inside a Docker container workspace, you do not need to install Node.js or npm on your local host computer. We have set up simple shorthand batch scripts for Windows to manage your environments with single commands from your project root:

### 1. Run Development Mode
To start the container in the background and launch the hot-reloading dev server:
```bash
.\dev.bat
```
👉 Open your browser to: **[http://localhost:5173](http://localhost:5173)**

### 2. Run Production Mode (Test PWA / Service Worker)
To compile Svelte, package static files, and serve the fully cached PWA:
```bash
.\prod.bat
```
👉 Open your browser to: **[http://localhost:5174](http://localhost:5174)**

### 3. Stop all Servers
To shut down all active Docker containers and clear network resources:
```bash
.\stop.bat
```

---

## 📦 Building for Production & GitHub Pages (Free Hosting)

To compile the application into standard static HTML/JS/CSS assets ready to be deployed to **GitHub Pages** for zero-cost hosting:

### 1. Compile the build
While the container is running, execute:
```bash
docker compose exec app npm run build
```
Or, if the containers are stopped:
```bash
docker compose run --rm app npm run build
```

This will generate a `dist/` folder in your workspace containing highly optimized, minified files:
* Fully self-contained SPA scripts.
* Configured service workers and manifests for **PWA installation** on mobile devices.
* Asset caching.

### 2. Deploy to GitHub Pages
You can configure a GitHub Action to auto-deploy the contents of the `dist/` folder to the `gh-pages` branch, or use tools like `gh-pages` npm package. Since it is entirely client-side, it will run for free indefinitely.

---

## 📱 Compiling to a Native Mobile App (iOS / Android)

If you decide to package this web application into standalone native packages for the Google Play Store or iOS App Store, you can do so by wrapping the project using **Capacitor**:

### 1. Initialize Capacitor
Run this in your workspace directory (using the Docker container context or local environment):
```bash
# Install Capacitor CLI
docker compose exec app npm install @capacitor/core @capacitor/cli

# Initialize the project config
docker compose exec app npx cap init "A Slimes Guide to Elysium" "com.arsondevs.slimeelysium" --web-dir=dist
```

### 2. Add Mobile Platforms
```bash
# Install platform integrations
docker compose exec app npm install @capacitor/android @capacitor/ios

# Create native folders
docker compose exec app npx cap add android
docker compose exec app npx cap add ios
```

### 3. Sync Assets
Every time you compile the Svelte build (`npm run build`), synchronize the updated assets into your native Android/iOS folder structures:
```bash
# Build Svelte files
docker compose exec app npm run build

# Sync built assets to Android & iOS projects
docker compose exec app npx cap sync
```

Once sync completes, you can open the `/android` folder in **Android Studio** or the `/ios` folder in **Xcode** on your developer machine to compile `.apk`, `.aab`, or `.ipa` app packages!

---

## 🛠️ Tech Stack Features Included
1. **Svelte 4**: Handles reactive stats recalculations and order transitions.
2. **Vite PWA Plugin**: Configures the service worker cache and registers native-prompt install listeners.
3. **Google `<model-viewer>` Integration**: Renders `.glb`/`.gltf` 3D files.
4. **Interactive Pure-CSS 3D Fallback**: Displays a rotating holographic crystal core when no 3D file is loaded.
5. **Lucide Svelte**: Dynamic vector icon representation.
