<script>
  import { onMount } from 'svelte';
  import { Shield, UploadCloud, Rotate3d, Layers } from 'lucide-svelte';

  let glbFile = null;
  let glbUrl = null;
  let useFallback = true;
  let hasModelViewer = false;

  onMount(() => {
    // Dynamically load Google's model-viewer script if it hasn't been loaded yet
    if (!document.getElementById('model-viewer-script')) {
      const script = document.createElement('script');
      script.id = 'model-viewer-script';
      script.type = 'module';
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js';
      document.head.appendChild(script);
    }
    hasModelViewer = true;
  });

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file && (file.name.endsWith('.glb') || file.name.endsWith('.gltf'))) {
      glbFile = file;
      if (glbUrl) URL.revokeObjectURL(glbUrl);
      glbUrl = URL.createObjectURL(file);
      useFallback = false;
    } else {
      alert("Please upload a valid 3D file (.glb or .gltf)");
    }
  }

  function clearFile() {
    glbFile = null;
    if (glbUrl) URL.revokeObjectURL(glbUrl);
    glbUrl = null;
    useFallback = true;
  }
</script>

<div class="visual-container hologram-panel">
  <div class="panel-header">
    <div class="header-left">
      <Rotate3d size={18} class="hologram-glow-text" />
      <h3 class="hologram-glow-text">3D EVOLUTION CORE VIEWER</h3>
    </div>
    <div class="mode-toggles">
      <button class="hologram-btn {useFallback ? 'active' : ''}" on:click={() => useFallback = true}>CSS Core</button>
      <button class="hologram-btn {!useFallback ? 'active' : ''}" on:click={() => { if (glbUrl) useFallback = false; }} disabled={!glbUrl}>GLB File</button>
    </div>
  </div>

  <div class="viewer-viewport">
    {#if useFallback}
      <!-- Cyber Hologram Slime Placeholder -->
      <div class="hologram-projection">
        <div class="grid-floor"></div>
        <div class="light-beam"></div>
        <div class="hologram-frame">
          <img src="mythical_slime_placeholder.jpg" alt="Mythical Slime Hologram" class="holo-slime-img" />
          <div class="holo-scanlines"></div>
          <div class="holo-ring outer"></div>
          <div class="holo-ring inner"></div>
          <div class="holo-marker top-left"></div>
          <div class="holo-marker top-right"></div>
          <div class="holo-marker bottom-left"></div>
          <div class="holo-marker bottom-right"></div>
        </div>
      </div>
    {:else}
      <!-- Google Model Viewer -->
      {#if hasModelViewer && glbUrl}
        <model-viewer
          src={glbUrl}
          alt="User uploaded 3D asset"
          auto-rotate
          camera-controls
          shadow-intensity="1"
          style="width: 100%; height: 100%; background-color: transparent;"
        >
        </model-viewer>
      {:else}
        <div class="viewer-error">
          <p>Failed to initialize 3D player engine.</p>
        </div>
      {/if}
    {/if}
  </div>

  <!-- Uploader Panel -->
  <div class="uploader-bar">
    {#if !glbFile}
      <label class="upload-label">
        <UploadCloud size={16} />
        <span>Load custom character GLB / GLTF model</span>
        <input type="file" accept=".glb,.gltf" on:change={handleFileChange} />
      </label>
    {:else}
      <div class="loaded-file">
        <Layers size={16} class="file-icon" />
        <span class="file-name">{glbFile.name} (Ready)</span>
        <button class="remove-btn" on:click={clearFile}>Clear</button>
      </div>
    {/if}
  </div>
</div>

<style>
  .visual-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  .panel-header {
    border-bottom: 1px solid var(--color-holo-border);
    padding: 14px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .panel-header h3 {
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.1em;
  }

  .mode-toggles {
    display: flex;
    gap: 8px;
  }

  .mode-toggles :global(.hologram-btn) {
    font-size: 0.72rem;
    padding: 4px 10px;
  }

  .viewer-viewport {
    height: 350px;
    position: relative;
    overflow: hidden;
    background: radial-gradient(circle, rgba(1, 15, 30, 0.4) 0%, rgba(0, 5, 10, 0.8) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .viewer-error {
    color: var(--color-arson-fire);
    font-size: 0.8rem;
    font-weight: bold;
  }

  /* CSS 3D Core Animation */
  .hologram-projection {
    perspective: 800px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .grid-floor {
    position: absolute;
    bottom: 20px;
    width: 200px;
    height: 200px;
    background-image: radial-gradient(circle, rgba(0, 240, 255, 0.15) 1px, transparent 1px);
    background-size: 16px 16px;
    transform: rotateX(80deg);
    opacity: 0.6;
    border-radius: 50%;
  }

  .light-beam {
    position: absolute;
    bottom: 20px;
    width: 80px;
    height: 200px;
    background: linear-gradient(180deg, transparent, rgba(0, 240, 255, 0.08));
    clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
    pointer-events: none;
    animation: beam-flicker 4s infinite ease-in-out;
  }

  @keyframes beam-flicker {
    0%, 100% { opacity: 0.6; transform: scaleX(1); }
    50% { opacity: 0.3; transform: scaleX(0.9); }
  }

  .hologram-frame {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    width: 220px;
    height: 220px;
    border-radius: 50%;
    border: 2px solid var(--color-holo-primary);
    box-shadow: 0 0 25px rgba(0, 240, 255, 0.4), inset 0 0 20px rgba(0, 240, 255, 0.3);
    overflow: hidden;
    background: rgba(0, 0, 0, 0.4);
    animation: float-hologram 4s infinite ease-in-out;
  }

  @keyframes float-hologram {
    0%, 100% { transform: translate(-50%, -60%) translateY(0); }
    50% { transform: translate(-50%, -60%) translateY(-10px); }
  }

  .holo-slime-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    mix-blend-mode: screen;
    filter: hue-rotate(180deg) brightness(1.2) contrast(1.1);
    opacity: 0.95;
  }

  .holo-scanlines {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      rgba(18, 16, 16, 0) 50%,
      rgba(0, 240, 255, 0.2) 50%
    );
    background-size: 100% 4px;
    pointer-events: none;
  }

  .holo-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    border: 1px dashed var(--color-holo-primary);
    pointer-events: none;
  }

  .holo-ring.outer {
    width: 240px;
    height: 240px;
    animation: spin-clockwise 20s infinite linear;
    border-color: rgba(0, 240, 255, 0.3);
  }

  .holo-ring.inner {
    width: 200px;
    height: 200px;
    animation: spin-counter 15s infinite linear;
    border-color: rgba(0, 240, 255, 0.5);
  }

  @keyframes spin-clockwise {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }

  @keyframes spin-counter {
    from { transform: translate(-50%, -50%) rotate(360deg); }
    to { transform: translate(-50%, -50%) rotate(0deg); }
  }

  .holo-marker {
    position: absolute;
    width: 10px;
    height: 10px;
    border: 1.5px solid var(--color-holo-primary);
    pointer-events: none;
  }

  .holo-marker.top-left { top: 15px; left: 15px; border-right: none; border-bottom: none; }
  .holo-marker.top-right { top: 15px; right: 15px; border-left: none; border-bottom: none; }
  .holo-marker.bottom-left { bottom: 15px; left: 15px; border-right: none; border-top: none; }
  .holo-marker.bottom-right { bottom: 15px; right: 15px; border-left: none; border-top: none; }

  /* Uploader bar styling */
  .uploader-bar {
    padding: 12px 20px;
    border-top: 1px solid var(--color-holo-border);
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
  }

  .upload-label {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--color-holo-muted);
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition-smooth);
  }

  .upload-label:hover {
    color: var(--color-holo-primary);
  }

  .upload-label input {
    display: none;
  }

  .loaded-file {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    font-size: 0.78rem;
  }

  .file-icon {
    color: var(--color-holo-primary);
  }

  .file-name {
    color: #fff;
    font-weight: bold;
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .remove-btn {
    background: none;
    border: 1px solid var(--color-arson-fire);
    color: var(--color-arson-fire);
    font-size: 0.65rem;
    text-transform: uppercase;
    font-weight: bold;
    padding: 2px 8px;
    border-radius: 4px;
    cursor: pointer;
    transition: var(--transition-smooth);
  }

  .remove-btn:hover {
    background: var(--color-arson-fire);
    color: #000;
    box-shadow: 0 0 8px var(--color-arson-fire);
  }
</style>
