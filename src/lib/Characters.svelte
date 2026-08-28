<script>
  import { currentChapter } from "./store.js";
  import { charactersCompendium, getCharacterState } from "./charactersData.js";
  import {
    Users,
    Globe,
    ShieldAlert,
    Link as LinkIcon,
    Search,
    Sparkles,
    ChevronLeft,
    ChevronRight,
    Image as ImageIcon,
    ZoomIn,
    X
  } from "lucide-svelte";

  let chapter = 1;
  currentChapter.subscribe((val) => {
    chapter = val;
  });

  let activeFilter = "all"; // 'all', 'elysium', 'sectors', 'players'
  let searchQuery = "";
  let highlightedCharId = null;

  // Track active image index per character id
  let activeImageIndexes = {};
  let expandedHistory = {};

  function toggleHistory(charId) {
    expandedHistory[charId] = !expandedHistory[charId];
    expandedHistory = { ...expandedHistory };
  }

  // Modal Lightbox state

  $: processedCharacters = charactersCompendium.map((def) => {
    const state = getCharacterState(def, chapter);
    let linkedState = null;

    if (def.linkedCharacterId) {
      const linkedDef = charactersCompendium.find((c) => c.id === def.linkedCharacterId);
      if (linkedDef) {
        linkedState = getCharacterState(linkedDef, chapter);
      }
    }

    return {
      def,
      state,
      linkedState
    };
  });

  function getLatestChapter(item) {
    if (!item.state.isEncountered) return -1;
    let stageCh = item.state.chapter !== undefined ? item.state.chapter : -1;
    let imgCh = -1;
    if (item.state.unlockedImages && item.state.unlockedImages.length > 0) {
      imgCh = Math.max(...item.state.unlockedImages.map((img) => img.chapter || 0));
    }
    return Math.max(stageCh, imgCh);
  }

  function getFirstChapter(item) {
    if (item.state.firstAppearedChapter !== undefined) {
      return item.state.firstAppearedChapter;
    }
    return item.def.stages && item.def.stages.length > 0 ? item.def.stages[0].chapter : 9999;
  }

  $: filteredCharacters = processedCharacters
    .filter((item) => {
      if (activeFilter === "elysium") {
        if (!item.state.isEncountered || item.state.world !== "Elysium") return false;
      } else if (activeFilter === "sectors") {
        if (!item.state.isEncountered || item.state.world !== "Sectors") return false;
      } else if (activeFilter === "players") {
        if (!item.def.isPlayer) return false;
      }

      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        if (!item.state.isEncountered) return false;
        const matchName = item.state.name?.toLowerCase().includes(q);
        const matchRole = item.state.role?.toLowerCase().includes(q);
        const matchRace = item.state.race?.toLowerCase().includes(q);
        const matchClass = item.state.class?.toLowerCase().includes(q);
        return matchName || matchRole || matchRace || matchClass;
      }

      return true;
    })
    .sort((a, b) => {
      const latestA = getLatestChapter(a);
      const latestB = getLatestChapter(b);
      if (latestB !== latestA) {
        return latestB - latestA; // Newly unlocked/updated stages move to top!
      }
      return getFirstChapter(a) - getFirstChapter(b);
    });

  function focusLinkedCharacter(linkedId) {
    highlightedCharId = linkedId;
    activeFilter = "all";
    setTimeout(() => {
      const el = document.getElementById(`char-card-${linkedId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  }

  function prevImage(charId, total) {
    const curr = activeImageIndexes[charId] || 0;
    activeImageIndexes[charId] = (curr - 1 + total) % total;
    activeImageIndexes = { ...activeImageIndexes };
  }

  function nextImage(charId, total) {
    const curr = activeImageIndexes[charId] || 0;
    activeImageIndexes[charId] = (curr + 1) % total;
    activeImageIndexes = { ...activeImageIndexes };
  }

  let modalData = null;

  function openModal(item, initialIdx) {
    if (!item || !item.state.unlockedImages || item.state.unlockedImages.length === 0) return;
    modalData = {
      item,
      index: initialIdx !== undefined ? Math.min(initialIdx, item.state.unlockedImages.length - 1) : item.state.unlockedImages.length - 1
    };
  }

  function closeModal() {
    modalData = null;
  }

  function switchModalPersona(targetId) {
    const targetItem = processedCharacters.find((item) => item.def.id === targetId);
    if (targetItem && targetItem.state.isEncountered) {
      focusLinkedCharacter(targetId);
      openModal(targetItem);
    }
  }

  function modalPrev() {
    if (!modalData || !modalData.item.state.unlockedImages) return;
    const len = modalData.item.state.unlockedImages.length;
    modalData.index = (modalData.index - 1 + len) % len;
    modalData = { ...modalData };
  }

  function modalNext() {
    if (!modalData || !modalData.item.state.unlockedImages) return;
    const len = modalData.item.state.unlockedImages.length;
    modalData.index = (modalData.index + 1) % len;
    modalData = { ...modalData };
  }

  function handleKeydown(e) {
    if (!modalData) return;
    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowLeft") {
      modalPrev();
    } else if (e.key === "ArrowRight") {
      modalNext();
    }
  }

  function getRarityClass(rarity) {
    if (!rarity) return "rarity-common";
    const r = rarity.toLowerCase();
    if (r.includes("legendary") || r.includes("mythic") || r.includes("unique")) return "rarity-legendary";
    if (r.includes("epic")) return "rarity-epic";
    if (r.includes("rare")) return "rarity-rare";
    if (r.includes("uncommon")) return "rarity-uncommon";
    return "rarity-common";
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="compendium-container">
  <!-- Header -->
  <div class="compendium-header hologram-panel">
    <div class="header-main">
      <div class="title-with-badge">
        <h2 class="hologram-glow-text">CHARACTER COMPENDIUM</h2>
        <span class="chrono-tag font-tech">CHRONO-SYNC: CH {chapter}</span>
      </div>
      <p class="subtitle">
        Encountered entities, corporate personas, and Elysium players in Elysium and Sector Domes.
      </p>
    </div>

    <!-- Controls Bar -->
    <div class="controls-bar">
      <div class="filter-tabs">
        <button
          class="filter-btn {activeFilter === 'all' ? 'active' : ''}"
          on:click={() => (activeFilter = "all")}
        >
          <Users size={14} /> All Entities
        </button>
        <button
          class="filter-btn {activeFilter === 'elysium' ? 'active' : ''}"
          on:click={() => (activeFilter = "elysium")}
        >
          <Globe size={14} /> Elysium World
        </button>
        <button
          class="filter-btn {activeFilter === 'sectors' ? 'active' : ''}"
          on:click={() => (activeFilter = "sectors")}
        >
          <Sparkles size={14} /> Sector Domes
        </button>
        <button
          class="filter-btn {activeFilter === 'players' ? 'active' : ''}"
          on:click={() => (activeFilter = "players")}
        >
          <LinkIcon size={14} /> Elysium Players
        </button>
      </div>

      <div class="search-box">
        <Search size={14} class="search-icon" />
        <input
          type="text"
          placeholder="Search name, race, class..."
          bind:value={searchQuery}
          spellcheck="false"
        />
        {#if searchQuery}
          <button class="clear-search" on:click={() => (searchQuery = "")}>✕</button>
        {/if}
      </div>
    </div>
  </div>

  <!-- Character Grid -->
  <div class="character-grid">
    {#each filteredCharacters as item (item.def.id)}
      {@const def = item.def}
      {@const state = item.state}
      {@const isHighlighted = highlightedCharId === def.id}
      {@const images = state.unlockedImages || []}
      {@const imgIdx = activeImageIndexes[def.id] !== undefined ? activeImageIndexes[def.id] : (images.length > 0 ? images.length - 1 : 0)}
      {@const activeImg = images.length > 0 ? images[Math.min(imgIdx, images.length - 1)] : null}

      <div
        id="char-card-{def.id}"
        class="character-card hologram-panel {state.isEncountered ? 'active' : 'classified'} {isHighlighted ? 'highlighted' : ''}"
      >
        {#if !state.isEncountered}
          <!-- Locked / Unencountered State -->
          <div class="classified-overlay">
            <ShieldAlert size={32} class="classified-icon" />
            <span class="classified-title">CLASSIFIED SIGNAL</span>
            <span class="classified-sub">
              UNENCOUNTERED · UNLOCKS AT CHAPTER {state.firstAppearedChapter}
            </span>
          </div>
        {:else}
          <!-- Unlocked Character Card Header -->
          <div class="card-header">
            <div class="char-identity">
              <div class="title-top-row">
                <h3>{state.name}</h3>
                <span class="world-badge {state.world.toLowerCase()}">{state.world}</span>
              </div>
              <div class="badge-row">
                <span class="role-badge">{state.role}</span>
                {#if def.isPlayer}
                  <span class="player-badge">Elysium Player</span>
                {/if}
              </div>
            </div>
          </div>

          <!-- Multi-Image Avatar Gallery Box -->
          <div class="gallery-box">
            {#if activeImg}
              <button
                class="image-display"
                on:click={() => openModal(item, imgIdx)}
                type="button"
                aria-label="Enlarge image for {state.name}"
              >
                <img src={activeImg.file} alt={state.name} class="gallery-img" />
                <div class="zoom-overlay">
                  <ZoomIn size={16} />
                  <span>Click to Enlarge</span>
                </div>
              </button>
              {#if images.length > 1}
                <div class="gallery-nav">
                  <button
                    class="gallery-nav-btn"
                    on:click={() => prevImage(def.id, images.length)}
                    aria-label="Previous Image"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <span class="gallery-counter font-tech">
                    <ImageIcon size={10} /> {Math.min(imgIdx + 1, images.length)} / {images.length}
                  </span>
                  <button
                    class="gallery-nav-btn"
                    on:click={() => nextImage(def.id, images.length)}
                    aria-label="Next Image"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              {/if}
            {:else}
              <div class="image-display placeholder-display">
                <Users size={48} class="placeholder-icon" />
                <span class="placeholder-text font-tech">NO VISUAL DISPATCH RECORD</span>
              </div>
            {/if}
          </div>

          <!-- Race, Age, Class & Rarities -->
          {#if state.age || (state.world === "Elysium" && (state.race || state.class))}
            <div class="attributes-box">
              {#if state.race && state.world === "Elysium"}
                <div class="attribute-pill">
                  <span class="attr-label">RACE:</span>
                  <span class="attr-val">{state.race}</span>
                  {#if state.raceRarity}
                    <span class="rarity-tag {getRarityClass(state.raceRarity)}">{state.raceRarity}</span>
                  {/if}
                </div>
              {/if}

              {#if state.age}
                <div class="attribute-pill">
                  <span class="attr-label">AGE:</span>
                  <span class="attr-val">{state.age}</span>
                </div>
              {/if}

              {#if state.class && state.world === "Elysium"}
                <div class="attribute-pill">
                  <span class="attr-label">CLASS:</span>
                  <span class="attr-val">{state.class}</span>
                  {#if state.classRarity}
                    <span class="rarity-tag {getRarityClass(state.classRarity)}">{state.classRarity}</span>
                  {/if}
                </div>
              {/if}
            </div>
          {/if}

          <div class="card-body">
            <p class="char-bio">{state.bio}</p>

            {#if state.stageHistory && state.stageHistory.length > 1}
              <button
                class="history-toggle-btn font-tech"
                on:click={() => toggleHistory(def.id)}
                type="button"
              >
                <span>{expandedHistory[def.id] ? '▼ HIDE PREVIOUS LOGS' : `► VIEW PAST LOGS (${state.stageHistory.length - 1})`}</span>
              </button>

              {#if expandedHistory[def.id]}
                <div class="stage-timeline font-tech">
                  <span class="timeline-label">PREVIOUS STAGE HISTORY:</span>
                  {#each state.stageHistory.slice(0, -1) as stageLog}
                    <div class="timeline-entry">
                      <div class="timeline-entry-header">
                        <span class="timeline-chapter">CH {stageLog.chapter}</span>
                        <span class="timeline-name">{stageLog.name}</span>
                      </div>
                      <p class="timeline-bio">{stageLog.bio}</p>
                    </div>
                  {/each}
                </div>
              {/if}
            {/if}

            <!-- Linked Persona Section (Only visible when unlocked) -->
            {#if def.linkedCharacterId && state.revealLink && item.linkedState && item.linkedState.isEncountered}
              <div class="linked-persona-box">
                <div class="link-header">
                  <LinkIcon size={12} />
                  <span>LINKED DUAL IDENTITY UNLOCKED</span>
                </div>
                <button
                  class="link-action-btn"
                  on:click={() => focusLinkedCharacter(def.linkedCharacterId)}
                >
                  VIEW {state.world === 'Elysium' ? 'REAL WORLD' : 'ELYSIUM'} PERSONA:
                  <strong>{item.linkedState.name}</strong>
                </button>
              </div>
            {/if}
          </div>
        {/if}
      </div>
    {/each}

    {#if filteredCharacters.length === 0}
      <div class="empty-state hologram-panel">
        <Users size={36} class="empty-icon" />
        <p>No entities encountered matching your current criteria at Chapter {chapter}.</p>
      </div>
    {/if}
  </div>
</div>

<!-- Holographic Dossier & Image Lightbox Modal Overlay -->
{#if modalData}
  {@const mItem = modalData.item}
  {@const mState = mItem.state}
  {@const mDef = mItem.def}
  {@const mImages = mState.unlockedImages || []}
  {@const activeModalImg = mImages[modalData.index]}

  <div
    class="modal-backdrop"
    on:click={closeModal}
    role="button"
    tabindex="0"
  >
    <div class="modal-content hologram-panel" on:click|stopPropagation role="document">
      <button class="modal-close-btn" on:click={closeModal} aria-label="Close modal">
        <X size={20} />
      </button>

      <div class="modal-layout">
        <!-- Left Column: Portrait Gallery -->
        <div class="modal-left-col">
          {#if activeModalImg}
            {#if mImages.length > 1}
              <button
                class="modal-arrow-btn prev"
                on:click={modalPrev}
                aria-label="Previous Image"
              >
                <ChevronLeft size={24} />
              </button>
            {/if}

            <img src={activeModalImg.file} alt={mState.name} class="modal-img" />

            {#if mImages.length > 1}
              <button
                class="modal-arrow-btn next"
                on:click={modalNext}
                aria-label="Next Image"
              >
                <ChevronRight size={24} />
              </button>
            {/if}
          {/if}

          {#if mImages.length > 1}
            <span class="modal-counter font-tech">
              <ImageIcon size={12} /> Image {modalData.index + 1} of {mImages.length} (Use ◀ ▶ arrow keys)
            </span>
          {/if}
        </div>

        <!-- Right Column: Character Information Dossier -->
        <div class="modal-right-col">
          <div class="modal-dossier-header">
            <div class="title-top-row">
              <h3>{mState.name}</h3>
              <span class="world-badge {mState.world.toLowerCase()}">{mState.world}</span>
            </div>
            <div class="badge-row">
              <span class="role-badge">{mState.role}</span>
              {#if mDef.isPlayer}
                <span class="player-badge">Elysium Player</span>
              {/if}
            </div>
          </div>

          <!-- Attributes Box -->
          {#if mState.age || (mState.world === "Elysium" && (mState.race || mState.class))}
            <div class="attributes-box">
              {#if mState.race && mState.world === "Elysium"}
                <div class="attribute-pill">
                  <span class="attr-label">RACE:</span>
                  <span class="attr-val">{mState.race}</span>
                  {#if mState.raceRarity}
                    <span class="rarity-tag {getRarityClass(mState.raceRarity)}">{mState.raceRarity}</span>
                  {/if}
                </div>
              {/if}

              {#if mState.age}
                <div class="attribute-pill">
                  <span class="attr-label">AGE:</span>
                  <span class="attr-val">{mState.age}</span>
                </div>
              {/if}

              {#if mState.class && mState.world === "Elysium"}
                <div class="attribute-pill">
                  <span class="attr-label">CLASS:</span>
                  <span class="attr-val">{mState.class}</span>
                  {#if mState.classRarity}
                    <span class="rarity-tag {getRarityClass(mState.classRarity)}">{mState.classRarity}</span>
                  {/if}
                </div>
              {/if}
            </div>
          {/if}

          <!-- Spacious Readable Bio -->
          <div class="modal-bio-section">
            <span class="section-label font-tech">CHARACTER DOSSIER & PROFILE:</span>
            <p class="modal-bio">{mState.bio}</p>
          </div>

          <!-- Stage Timeline Log (if available) -->
          {#if mState.stageHistory && mState.stageHistory.length > 1}
            <div class="modal-history-section">
              <span class="section-label font-tech">PREVIOUS STAGE HISTORY LOGS:</span>
              <div class="stage-timeline font-tech">
                {#each mState.stageHistory as stageLog}
                  <div class="timeline-entry">
                    <div class="timeline-entry-header">
                      <span class="timeline-chapter">CH {stageLog.chapter}</span>
                      <span class="timeline-name">{stageLog.name}</span>
                    </div>
                    <p class="timeline-bio">{stageLog.bio}</p>
                  </div>
                {/each}
              </div>
            </div>
          {/if}

          <!-- Linked Persona Switcher -->
          {#if mDef.linkedCharacterId && mState.revealLink && mItem.linkedState && mItem.linkedState.isEncountered}
            <div class="linked-persona-box">
              <div class="link-header">
                <LinkIcon size={12} />
                <span>LINKED DUAL IDENTITY UNLOCKED</span>
              </div>
              <button
                class="link-action-btn"
                on:click={() => switchModalPersona(mDef.linkedCharacterId)}
              >
                VIEW {mState.world === 'Elysium' ? 'REAL WORLD' : 'ELYSIUM'} PERSONA:
                <strong>{mItem.linkedState.name}</strong>
              </button>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .compendium-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }

  .compendium-header {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .header-main {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .title-with-badge {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }

  .chrono-tag {
    font-size: 0.68rem;
    color: var(--color-holo-primary);
    background: rgba(0, 240, 255, 0.08);
    border: 1px solid var(--color-holo-primary);
    padding: 4px 10px;
    border-radius: 4px;
  }

  .subtitle {
    font-size: 0.82rem;
    color: var(--color-holo-muted);
  }

  .controls-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  .filter-tabs {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .filter-btn {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: var(--color-holo-muted);
    font-size: 0.75rem;
    font-weight: 700;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: var(--transition-smooth);
  }

  .filter-btn:hover {
    color: #fff;
    border-color: rgba(0, 240, 255, 0.3);
  }

  .filter-btn.active {
    background: rgba(0, 240, 255, 0.1);
    border-color: var(--color-holo-primary);
    color: var(--color-holo-primary);
  }

  .search-box {
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(0, 240, 255, 0.2);
    border-radius: 6px;
    padding: 4px 10px;
    gap: 8px;
    width: 240px;
  }

  .search-icon {
    color: var(--color-holo-muted);
  }

  .search-box input {
    background: transparent;
    border: none;
    outline: none;
    color: #fff;
    font-size: 0.78rem;
    width: 100%;
  }

  .clear-search {
    background: none;
    border: none;
    color: var(--color-holo-muted);
    cursor: pointer;
  }

  /* Grid */
  .character-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
  }

  .character-card {
    padding: 16px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 14px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .character-card.highlighted {
    border-color: var(--color-arson-fire) !important;
    box-shadow: 0 0 20px var(--color-arson-glow) !important;
  }

  .classified-overlay {
    position: absolute;
    inset: 0;
    background: rgba(8, 12, 20, 0.92);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-align: center;
    padding: 20px;
    border-radius: 8px;
    z-index: 10;
  }

  .classified-icon {
    color: #ff3344;
    filter: drop-shadow(0 0 8px #ff3344);
  }

  .classified-title {
    font-weight: 900;
    color: #ff3344;
    letter-spacing: 0.1em;
    font-size: 0.88rem;
  }

  .classified-sub {
    font-size: 0.68rem;
    color: var(--color-holo-muted);
  }

  .card-header {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .title-top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }

  .char-identity h3 {
    font-size: 1.05rem;
    font-weight: 800;
    color: #fff;
  }

  .world-badge {
    font-size: 0.62rem;
    font-weight: 800;
    padding: 2px 8px;
    border-radius: 4px;
    text-transform: uppercase;
  }

  .world-badge.elysium {
    background: rgba(0, 240, 255, 0.15);
    color: var(--color-holo-primary);
    border: 1px solid var(--color-holo-primary);
  }

  .world-badge.sectors {
    background: rgba(255, 170, 0, 0.15);
    color: #ffaa00;
    border: 1px solid #ffaa00;
  }

  .badge-row {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-top: 4px;
  }

  .role-badge {
    font-size: 0.68rem;
    background: rgba(255, 255, 255, 0.06);
    color: var(--color-holo-muted);
    padding: 2px 8px;
    border-radius: 4px;
  }

  .player-badge {
    font-size: 0.68rem;
    background: rgba(180, 0, 255, 0.15);
    color: #d070ff;
    border: 1px solid rgba(180, 0, 255, 0.4);
    padding: 2px 8px;
    border-radius: 4px;
    font-weight: bold;
  }

  /* Multi-Image Gallery Box */
  .gallery-box {
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid var(--color-holo-border);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .image-display {
    position: relative;
    width: 100%;
    height: 320px;
    background: radial-gradient(circle at center, rgba(14, 26, 44, 0.95), rgba(3, 7, 14, 0.98));
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 0;
    cursor: pointer;
    overflow: hidden;
  }

  .placeholder-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background: radial-gradient(circle at center, rgba(14, 26, 44, 0.6), rgba(4, 9, 16, 0.8));
    color: var(--color-holo-muted);
    border: 1px dashed rgba(0, 240, 255, 0.25);
    cursor: default;
  }

  .placeholder-icon {
    opacity: 0.35;
    color: var(--color-holo-primary);
  }

  .placeholder-text {
    font-size: 0.65rem;
    letter-spacing: 0.08em;
    opacity: 0.6;
    color: var(--color-holo-primary);
  }

  .gallery-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    transition: transform 0.3s ease, filter 0.3s ease;
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.6));
  }

  .image-display:hover .gallery-img {
    transform: scale(1.04);
    filter: drop-shadow(0 6px 18px rgba(0, 240, 255, 0.3));
  }

  .zoom-overlay {
    position: absolute;
    top: 8px;
    right: 8px;
    background: rgba(4, 9, 16, 0.85);
    border: 1px solid var(--color-holo-primary);
    color: var(--color-holo-primary);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.65rem;
    display: flex;
    align-items: center;
    gap: 4px;
    opacity: 0.8;
    transition: opacity 0.2s ease;
    backdrop-filter: blur(4px);
  }

  .image-display:hover .zoom-overlay {
    opacity: 1;
    box-shadow: 0 0 10px var(--color-holo-glow);
  }

  .image-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(4px);
    color: var(--color-holo-primary);
    font-size: 0.65rem;
    padding: 4px 8px;
    text-align: center;
    border-top: 1px solid rgba(0, 240, 255, 0.2);
  }

  .gallery-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(8, 14, 24, 0.9);
    padding: 4px 10px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .gallery-nav-btn {
    background: rgba(0, 240, 255, 0.1);
    border: 1px solid var(--color-holo-primary);
    color: var(--color-holo-primary);
    width: 24px;
    height: 24px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition-smooth);
  }

  .gallery-nav-btn:hover {
    background: var(--color-holo-primary);
    color: #000;
  }

  .gallery-counter {
    font-size: 0.68rem;
    color: var(--color-holo-muted);
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* Race & Class Attributes Box */
  .attributes-box {
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    padding: 8px 12px;
    border-radius: 6px;
  }

  .attribute-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.76rem;
  }

  .attr-label {
    color: var(--color-holo-muted);
    font-weight: 800;
    font-size: 0.65rem;
    min-width: 45px;
  }

  .attr-val {
    color: #fff;
    font-weight: 700;
  }

  .rarity-tag {
    margin-left: auto;
    font-size: 0.60rem;
    font-weight: 800;
    padding: 1px 6px;
    border-radius: 3px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .rarity-common {
    background: rgba(136, 153, 166, 0.15);
    color: #8899a6;
    border: 1px solid #8899a6;
  }

  .rarity-uncommon {
    background: rgba(0, 255, 136, 0.15);
    color: #00ff88;
    border: 1px solid #00ff88;
  }

  .rarity-rare {
    background: rgba(0, 240, 255, 0.15);
    color: #00f0ff;
    border: 1px solid #00f0ff;
  }

  .rarity-epic {
    background: rgba(180, 0, 255, 0.15);
    color: #d070ff;
    border: 1px solid #d070ff;
  }

  .rarity-legendary {
    background: rgba(255, 170, 0, 0.15);
    color: #ffaa00;
    border: 1px solid #ffaa00;
  }

  .card-body {
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex-grow: 1;
  }

  .char-bio {
    font-size: 0.78rem;
    color: #ccc;
    line-height: 1.4;
  }

  .history-toggle-btn {
    background: transparent;
    border: none;
    color: var(--color-holo-primary);
    font-size: 0.65rem;
    font-weight: bold;
    cursor: pointer;
    text-align: left;
    padding: 0;
    margin-top: 2px;
    margin-bottom: 4px;
    display: inline-flex;
    align-items: center;
    transition: var(--transition-smooth);
    opacity: 0.85;
  }

  .history-toggle-btn:hover {
    opacity: 1;
    text-shadow: 0 0 8px var(--color-holo-glow);
  }

  .linked-persona-box {
    margin-top: auto;
    background: rgba(0, 240, 255, 0.04);
    border: 1px dashed rgba(0, 240, 255, 0.3);
    padding: 8px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .stage-timeline {
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(0, 240, 255, 0.15);
    padding: 10px;
    border-radius: 6px;
  }

  .timeline-label {
    font-size: 0.62rem;
    font-weight: 800;
    color: var(--color-holo-primary);
    letter-spacing: 0.05em;
  }

  .timeline-entry {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding-left: 8px;
    border-left: 2px solid var(--color-holo-primary);
  }

  .timeline-entry-header {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .timeline-chapter {
    font-size: 0.6rem;
    background: rgba(0, 240, 255, 0.15);
    color: var(--color-holo-primary);
    padding: 1px 5px;
    border-radius: 3px;
    font-weight: bold;
  }

  .timeline-name {
    font-size: 0.74rem;
    font-weight: bold;
    color: #fff;
  }

  .timeline-bio {
    font-size: 0.72rem;
    color: #ccc;
    line-height: 1.35;
  }

  .linked-persona-box.locked {
    border-color: rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.2);
    color: var(--color-holo-muted);
    font-size: 0.68rem;
  }

  .link-header {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.65rem;
    font-weight: 800;
    color: var(--color-holo-primary);
    letter-spacing: 0.05em;
  }

  .link-action-btn {
    background: rgba(0, 240, 255, 0.12);
    border: 1px solid var(--color-holo-primary);
    color: #fff;
    padding: 6px 10px;
    border-radius: 4px;
    font-size: 0.7rem;
    cursor: pointer;
    text-align: left;
    transition: var(--transition-smooth);
  }

  .link-action-btn:hover {
    background: var(--color-holo-primary);
    color: #000;
  }

  .empty-state {
    grid-column: 1 / -1;
    padding: 40px;
    text-align: center;
    color: var(--color-holo-muted);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  /* --- LIGHTBOX MODAL STYLES --- */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(4, 8, 14, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .modal-content {
    position: relative;
    width: 950px;
    max-width: 92vw;
    max-height: 88vh;
    background: rgba(7, 12, 22, 0.96);
    border: 1px solid var(--color-holo-primary);
    box-shadow: 0 0 50px rgba(0, 240, 255, 0.3);
    border-radius: 12px;
    padding: 24px;
    overflow-y: auto;
  }

  .modal-close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    background: rgba(255, 0, 80, 0.2);
    border: 1px solid #ff0055;
    color: #ff0055;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: var(--transition-smooth);
  }

  .modal-close-btn:hover {
    background: #ff0055;
    color: #fff;
    box-shadow: 0 0 14px #ff0055;
  }

  .modal-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    align-items: start;
  }

  @media (max-width: 768px) {
    .modal-layout {
      grid-template-columns: 1fr;
    }
  }

  .modal-left-col {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at center, rgba(14, 26, 44, 0.95), rgba(3, 7, 14, 0.98));
    border-radius: 8px;
    border: 1px solid rgba(0, 240, 255, 0.2);
    padding: 12px;
    min-height: 360px;
  }

  .modal-img {
    max-width: 100%;
    max-height: 55vh;
    object-fit: contain;
    border-radius: 6px;
    filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.8));
  }

  .modal-arrow-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(4, 9, 16, 0.85);
    border: 1px solid var(--color-holo-primary);
    color: var(--color-holo-primary);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: var(--transition-smooth);
    backdrop-filter: blur(6px);
  }

  .modal-arrow-btn:hover {
    background: var(--color-holo-primary);
    color: #000;
    box-shadow: 0 0 16px var(--color-holo-glow);
  }

  .modal-arrow-btn.prev {
    left: 12px;
  }

  .modal-arrow-btn.next {
    right: 12px;
  }

  .modal-counter {
    font-size: 0.75rem;
    color: var(--color-holo-muted);
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .modal-right-col {
    display: flex;
    flex-direction: column;
    gap: 16px;
    color: #fff;
  }

  .modal-dossier-header {
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-bottom: 1px solid rgba(0, 240, 255, 0.15);
    padding-bottom: 12px;
  }

  .modal-dossier-header h3 {
    font-size: 1.35rem;
    font-weight: 800;
    color: #fff;
  }

  .modal-bio-section,
  .modal-history-section {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .section-label {
    font-size: 0.65rem;
    font-weight: 800;
    color: var(--color-holo-primary);
    letter-spacing: 0.05em;
  }

  .modal-bio {
    font-size: 0.9rem;
    line-height: 1.5;
    color: #e2e8f0;
    background: rgba(0, 0, 0, 0.25);
    padding: 12px;
    border-radius: 6px;
    border-left: 3px solid var(--color-holo-primary);
  }
</style>
