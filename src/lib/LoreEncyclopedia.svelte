<script>
  import { currentChapter, encyclopediaData } from "./store.js";
  import {
    BookOpen,
    Search,
    X,
    Filter,
    Sparkles,
    Shield,
    Users,
    Flame,
    Cpu,
    Compass,
    Lock,
    Unlock,
    ChevronDown,
    ChevronUp,
    ExternalLink,
    Zap,
    Crown,
    Layers,
    SlidersHorizontal,
    Info,
    Skull,
    Crosshair
  } from "lucide-svelte";

  let chapter = 1;
  currentChapter.subscribe((val) => {
    chapter = val;
  });

  // Category Configuration
  const categories = [
    { key: "all", label: "All Logs", icon: BookOpen, color: "cyan" },
    { key: "races", label: "Races", icon: Sparkles, color: "purple" },
    { key: "classes", label: "Classes", icon: Shield, color: "blue" },
    { key: "monsters", label: "Monsters", icon: Skull, color: "amber" },
    { key: "factions", label: "Factions", icon: Users, color: "red" },
    { key: "dungeons", label: "Dungeons", icon: Crosshair, color: "gold" },
    { key: "technology", label: "Tech & Items", icon: Cpu, color: "emerald" }
  ];

  let selectedCategory = "all";
  let searchQuery = "";
  let selectedGrade = "all";
  let sortBy = "newest"; // 'newest', 'oldest', 'alpha'
  let showLocked = false;
  let expandedEntryKey = null;

  // Grade color map
  const gradeColors = {
    Mythical: "mythical",
    Legendary: "legendary",
    Epic: "epic",
    Rare: "rare",
    Uncommon: "uncommon",
    Common: "common"
  };

  // Build unified entries list with category tags
  $: rawAllEntries = Object.entries(encyclopediaData).flatMap(([catKey, items]) => {
    return (items || []).map((item, idx) => ({
      ...item,
      categoryKey: catKey,
      uniqueId: `${catKey}-${item.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${idx}`
    }));
  });

  // Calculate unlock metrics
  $: totalEntriesCount = rawAllEntries.length;
  $: unlockedCount = rawAllEntries.filter((item) => item.chapter <= chapter).length;

  // Category counts
  $: categoryStats = categories.reduce((acc, cat) => {
    if (cat.key === "all") {
      acc[cat.key] = {
        unlocked: unlockedCount,
        total: totalEntriesCount
      };
    } else {
      const catItems = encyclopediaData[cat.key] || [];
      acc[cat.key] = {
        unlocked: catItems.filter((i) => i.chapter <= chapter).length,
        total: catItems.length
      };
    }
    return acc;
  }, {});

  // Extract available distinct grades for filter
  $: availableGrades = Array.from(
    new Set(rawAllEntries.map((e) => e.base).filter((g) => g && typeof g === "string"))
  );

  // Process, filter and sort entries
  $: displayedEntries = rawAllEntries
    .filter((item) => {
      // Category filter
      if (selectedCategory !== "all" && item.categoryKey !== selectedCategory) {
        return false;
      }

      // Chapter Lock filter
      const isUnlocked = item.chapter <= chapter;
      if (!showLocked && !isUnlocked) {
        return false;
      }

      // Grade filter
      if (selectedGrade !== "all") {
        if (!item.base || item.base.toLowerCase() !== selectedGrade.toLowerCase()) {
          return false;
        }
      }

      // Search Query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const matchName = item.name?.toLowerCase().includes(q);
        const matchDesc = item.description?.toLowerCase().includes(q);
        const matchBase = item.base?.toLowerCase().includes(q);
        const matchCat = item.categoryKey?.toLowerCase().includes(q);
        const matchLead = item.ruler?.toLowerCase().includes(q);
        const matchBoss = item.bosses?.toLowerCase().includes(q);
        return matchName || matchDesc || matchBase || matchCat || matchLead || matchBoss;
      }

      return true;
    })
    .sort((a, b) => {
      const aUnlocked = a.chapter <= chapter;
      const bUnlocked = b.chapter <= chapter;

      // Always put unlocked before locked when showing all
      if (aUnlocked !== bUnlocked) {
        return aUnlocked ? -1 : 1;
      }

      if (sortBy === "newest") {
        return b.chapter - a.chapter || a.name.localeCompare(b.name);
      } else if (sortBy === "oldest") {
        return a.chapter - b.chapter || a.name.localeCompare(b.name);
      } else if (sortBy === "alpha") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  const EXPAND_CHAR_THRESHOLD = 140;

  function isExpandable(entry) {
    if (!entry || !entry.description) return false;
    return entry.description.trim().length > EXPAND_CHAR_THRESHOLD;
  }

  function getCategoryMeta(catKey) {
    return categories.find((c) => c.key === catKey) || categories[0];
  }

  function toggleExpand(id) {
    expandedEntryKey = expandedEntryKey === id ? null : id;
  }

  function clearSearch() {
    searchQuery = "";
  }

  function resetFilters() {
    searchQuery = "";
    selectedGrade = "all";
    selectedCategory = "all";
  }
</script>

<div class="lore-archive-container">
  <!-- Top Command HUD & Metrics Header -->
  <header class="archive-header hologram-panel">
    <div class="header-main-row">
      <div class="header-brand">
        <div class="brand-icon-box">
          <BookOpen size={22} class="brand-icon" />
          <div class="icon-pulse-ring"></div>
        </div>
        <div class="brand-meta">
          <span class="system-code font-tech">ARSON DEVS // ARCHIVES</span>
          <h2 class="archive-title">Lore & World Compendium</h2>
        </div>
      </div>

      <div class="header-sync-stats">
        <div class="stat-bubble">
          <span class="stat-label font-tech">ACCESSIBLE LOGS</span>
          <span class="stat-value font-tech text-amber">
            {unlockedCount} <span class="stat-total">/ {totalEntriesCount}</span>
          </span>
        </div>
      </div>
    </div>

    <!-- Category Tabs Navigation -->
    <div class="category-nav-wrapper">
      <nav class="category-nav" aria-label="Lore Categories">
        {#each categories as cat}
          {@const stats = categoryStats[cat.key] || { unlocked: 0, total: 0 }}
          <button
            class="cat-tab {selectedCategory === cat.key ? 'active' : ''} color-{cat.color}"
            on:click={() => (selectedCategory = cat.key)}
          >
            <svelte:component this={cat.icon} size={15} class="tab-icon" />
            <span class="tab-label">{cat.label}</span>
            <span class="tab-badge font-tech">
              {stats.unlocked}
            </span>
          </button>
        {/each}
      </nav>
    </div>
  </header>

  <!-- Filter & Control Toolbar -->
  <div class="toolbar-panel hologram-panel">
    <div class="search-input-box">
      <Search size={16} class="search-icon" />
      <input
        type="text"
        placeholder="Search entities, lore, abilities, monsters, or keywords..."
        bind:value={searchQuery}
        class="search-field"
      />
      {#if searchQuery}
        <button class="clear-search-btn" on:click={clearSearch} title="Clear Search">
          <X size={14} />
        </button>
      {/if}
    </div>

    <div class="filter-controls-row">
      <!-- Grade/Rarity Filter -->
      {#if availableGrades.length > 0}
        <div class="select-group">
          <label class="control-label font-tech" for="grade-select">GRADE:</label>
          <select id="grade-select" bind:value={selectedGrade} class="holo-select font-tech">
            <option value="all">All Grades</option>
            {#each availableGrades as grade}
              <option value={grade}>{grade}</option>
            {/each}
          </select>
        </div>
      {/if}

      <!-- Sort By -->
      <div class="select-group">
        <label class="control-label font-tech" for="sort-select">SORT:</label>
        <select id="sort-select" bind:value={sortBy} class="holo-select font-tech">
          <option value="newest">Latest First (Ch Desc)</option>
          <option value="oldest">Earliest First (Ch Asc)</option>
          <option value="alpha">Alphabetical (A-Z)</option>
        </select>
      </div>

      <!-- Show Locked Toggle -->
      <button
        class="toggle-locked-btn font-tech {showLocked ? 'active' : ''}"
        on:click={() => (showLocked = !showLocked)}
        title="Toggle visibility of future chapter lore"
      >
        {#if showLocked}
          <Unlock size={14} class="text-cyan" />
          <span>ALL LOGS ({totalEntriesCount})</span>
        {:else}
          <Lock size={14} class="text-muted" />
          <span>UNLOCKED ONLY ({unlockedCount})</span>
        {/if}
      </button>
    </div>
  </div>

  <!-- Main Archive Content Grid -->
  {#if displayedEntries.length === 0}
    <div class="empty-results-panel hologram-panel">
      <div class="empty-icon-wrap">
        <BookOpen size={36} class="empty-icon text-muted" />
      </div>
      <h3 class="empty-title">No Lore Logs Found</h3>
      <p class="empty-desc">
        {#if searchQuery || selectedGrade !== "all"}
          No records match your active search filters. Try clearing your search parameters.
        {:else}
          No entries have been unlocked in Chapter {chapter} under this category yet. Advance the Chrono-Controller
          above or enable "All Logs" to preview future lore.
        {/if}
      </p>
      <div class="empty-actions">
        {#if searchQuery || selectedGrade !== "all"}
          <button class="hologram-btn" on:click={resetFilters}>
            <span>RESET FILTERS</span>
          </button>
        {:else if !showLocked}
          <button class="hologram-btn" on:click={() => (showLocked = true)}>
            <Unlock size={14} />
            <span>SHOW FUTURE LOGS</span>
          </button>
        {/if}
      </div>
    </div>
  {:else}
    <div class="lore-grid">
      {#each displayedEntries as entry (entry.uniqueId)}
        {@const isUnlocked = entry.chapter <= chapter}
        {@const isFreshUnlock = isUnlocked && entry.chapter === chapter}
        {@const catMeta = getCategoryMeta(entry.categoryKey)}
        {@const canExpand = isUnlocked && isExpandable(entry)}
        {@const isExpanded = canExpand && expandedEntryKey === entry.uniqueId}

        <div
          class="lore-card hologram-panel {isUnlocked ? 'unlocked' : 'locked'} {isFreshUnlock
            ? 'fresh-unlock'
            : ''} {canExpand ? 'is-expandable' : ''}"
          on:click={() => canExpand && toggleExpand(entry.uniqueId)}
          on:keydown={(e) =>
            canExpand && (e.key === "Enter" || e.key === " ") && toggleExpand(entry.uniqueId)}
          tabindex={canExpand ? 0 : undefined}
          role={canExpand ? "button" : undefined}
          aria-expanded={canExpand ? isExpanded : undefined}
        >
          <!-- Card Header Bar -->
          <div class="card-header">
            <div class="card-badges">
              <!-- Category Badge -->
              <span class="cat-pill color-{catMeta.color} font-tech">
                <svelte:component this={catMeta.icon} size={12} />
                <span>{catMeta.label}</span>
              </span>

              <!-- Grade / Rarity Badge -->
              {#if entry.base}
                <span class="grade-pill grade-{gradeColors[entry.base] || 'common'} font-tech">
                  {entry.base}
                </span>
              {/if}

              <!-- Fresh chapter unlock badge -->
              {#if isFreshUnlock}
                <span class="fresh-pill font-tech">
                  <Sparkles size={11} />
                  <span>NEW IN CH {chapter}</span>
                </span>
              {/if}
            </div>

            <!-- Chapter Unlock Badge -->
            <div class="chapter-unlock-badge font-tech {isUnlocked ? 'unlocked' : 'locked'}">
              {#if isUnlocked}
                <Unlock size={12} class="lock-icon text-cyan" />
                <span>CH. {entry.chapter}</span>
              {:else}
                <Lock size={12} class="lock-icon text-muted" />
                <span>LOCKED (CH. {entry.chapter})</span>
              {/if}
            </div>
          </div>

          <!-- Entity Name & Lead Metadata -->
          <div class="card-title-area">
            <h3 class="entry-name">
              {#if isUnlocked}
                {entry.name}
              {:else}
                <span class="classified-text">[CLASSIFIED LOG // CH. {entry.chapter}]</span>
              {/if}
            </h3>

            {#if isUnlocked}
              <!-- Subtitle / Meta chips -->
              {#if entry.level || entry.bosses || entry.ruler}
                <div class="entry-meta-chips font-tech">
                  {#if entry.level}
                    <span class="meta-chip"><span class="chip-k">RATING:</span> {entry.level}</span>
                  {/if}
                  {#if entry.bosses}
                    <span class="meta-chip"><span class="chip-k">BOSS:</span> {entry.bosses}</span>
                  {/if}
                  {#if entry.ruler}
                    <span class="meta-chip"><span class="chip-k">LEAD:</span> {entry.ruler}</span>
                  {/if}
                </div>
              {/if}
            {/if}
          </div>

          <!-- Description Body -->
          <div class="card-body">
            {#if isUnlocked}
              <p class="entry-description {canExpand ? (isExpanded ? 'expanded' : 'clamped') : ''}">
                {entry.description || "Historical data recorded from novel encounters."}
              </p>
            {:else}
              <div class="locked-placeholder">
                <div class="scanline-glitch"></div>
                <p class="locked-text">
                  Advance the Chapter Lock to <strong>Chapter {entry.chapter}</strong> or beyond to decrypt
                  this record and lore log.
                </p>
              </div>
            {/if}
          </div>

          <!-- Card Footer Info -->
          {#if isUnlocked}
            <div class="card-footer">
              <span class="card-log-tag font-tech"
                >LOG // #{entry.uniqueId.slice(0, 10).toUpperCase()}</span
              >
              {#if canExpand}
                <span class="expand-hint font-tech">
                  {isExpanded ? "COLLAPSE" : "EXPAND DETAILS"}
                  {#if isExpanded}
                    <ChevronUp size={13} />
                  {:else}
                    <ChevronDown size={13} />
                  {/if}
                </span>
              {/if}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  /* Base Container */
  .lore-archive-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    animation: fadeInArchive 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes fadeInArchive {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .font-tech {
    font-family:
      "Outfit",
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      sans-serif;
    letter-spacing: 0.05em;
  }

  /* Header Card */
  .archive-header {
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    border-radius: 12px;
    border: 1px solid rgba(0, 240, 255, 0.25);
    background: linear-gradient(180deg, rgba(8, 22, 38, 0.85) 0%, rgba(4, 11, 20, 0.95) 100%);
    box-shadow:
      0 4px 20px rgba(0, 0, 0, 0.5),
      0 0 15px rgba(0, 240, 255, 0.08);
  }

  .header-main-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
  }

  .header-brand {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .brand-icon-box {
    position: relative;
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: rgba(0, 240, 255, 0.1);
    border: 1px solid rgba(0, 240, 255, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #00f0ff;
    box-shadow: 0 0 15px rgba(0, 240, 255, 0.25);
    flex-shrink: 0;
  }

  .icon-pulse-ring {
    position: absolute;
    inset: -3px;
    border-radius: 12px;
    border: 1px solid rgba(0, 240, 255, 0.3);
    animation: iconPulse 3s infinite ease-in-out;
  }

  @keyframes iconPulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.4;
    }
    50% {
      transform: scale(1.06);
      opacity: 0.8;
    }
  }

  .brand-meta {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .system-code {
    font-size: 0.72rem;
    color: #79a5b3;
  }

  .archive-title {
    font-size: 1.35rem;
    font-weight: 800;
    letter-spacing: -0.01em;
    color: #fff;
    text-shadow: 0 0 10px rgba(0, 240, 255, 0.3);
    margin: 0;
  }

  /* Sync Stats HUD */
  .header-sync-stats {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .stat-bubble {
    background: rgba(2, 10, 18, 0.6);
    border: 1px solid rgba(0, 240, 255, 0.18);
    border-radius: 8px;
    padding: 6px 12px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    min-width: 105px;
  }

  .stat-label {
    font-size: 0.62rem;
    color: #6b8f9e;
    font-weight: 600;
  }

  .stat-value {
    font-size: 0.95rem;
    font-weight: 800;
  }

  .stat-total {
    font-size: 0.75rem;
    color: #6b8f9e;
    font-weight: normal;
  }

  .text-cyan {
    color: #00f0ff;
    text-shadow: 0 0 8px rgba(0, 240, 255, 0.4);
  }
  .text-amber {
    color: #ffb800;
    text-shadow: 0 0 8px rgba(255, 184, 0, 0.4);
  }
  .text-muted {
    color: #6b8f9e;
  }

  /* Category Navigation Tabs */
  .category-nav-wrapper {
    overflow-x: auto;
    padding-bottom: 2px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
  }

  .category-nav {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: max-content;
  }

  .cat-tab {
    background: rgba(3, 14, 26, 0.7);
    border: 1px solid rgba(0, 240, 255, 0.15);
    color: #9ac2ce;
    border-radius: 8px;
    padding: 7px 12px;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 7px;
    transition: all 0.2s ease;
  }

  .cat-tab:hover {
    background: rgba(0, 240, 255, 0.1);
    color: #e0faff;
    border-color: rgba(0, 240, 255, 0.35);
  }

  .cat-tab.active {
    background: linear-gradient(180deg, rgba(0, 240, 255, 0.22) 0%, rgba(0, 150, 200, 0.15) 100%);
    border-color: #00f0ff;
    color: #fff;
    box-shadow: 0 0 12px rgba(0, 240, 255, 0.25);
  }

  .tab-badge {
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 1px 6px;
    font-size: 0.68rem;
    color: #00f0ff;
  }

  .cat-tab.active .tab-badge {
    background: rgba(0, 240, 255, 0.25);
    border-color: rgba(0, 240, 255, 0.6);
    color: #ffffff;
  }

  /* Category colors */
  .color-purple {
    --theme-c: #a855f7;
  }
  .color-blue {
    --theme-c: #38bdf8;
  }
  .color-amber {
    --theme-c: #f59e0b;
  }
  .color-red {
    --theme-c: #ef4444;
  }
  .color-gold {
    --theme-c: #eab308;
  }
  .color-emerald {
    --theme-c: #10b981;
  }
  .color-cyan {
    --theme-c: #00f0ff;
  }

  /* Toolbar Panel */
  .toolbar-panel {
    padding: 12px 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    border-radius: 10px;
  }

  .search-input-box {
    position: relative;
    flex: 1 1 280px;
    display: flex;
    align-items: center;
    background: rgba(2, 10, 18, 0.75);
    border: 1px solid rgba(0, 240, 255, 0.2);
    border-radius: 8px;
    padding: 2px 10px 2px 14px;
    gap: 10px;
    transition: all 0.2s ease;
  }

  .search-input-box:focus-within {
    border-color: #00f0ff;
    box-shadow: 0 0 10px rgba(0, 240, 255, 0.3);
    background: rgba(2, 14, 26, 0.95);
  }

  .search-icon {
    color: #79a5b3;
    flex-shrink: 0;
    transition: color 0.2s ease;
  }

  .search-input-box:focus-within .search-icon {
    color: #00f0ff;
  }

  .search-field {
    width: 100%;
    background: transparent;
    border: none;
    padding: 7px 0;
    color: #e0faff;
    font-size: 0.85rem;
    font-family: inherit;
    outline: none;
  }

  .search-field::placeholder {
    color: #557b8a;
  }

  .clear-search-btn {
    background: transparent;
    border: none;
    color: #79a5b3;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    flex-shrink: 0;
  }

  .clear-search-btn:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }

  .filter-controls-row {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .select-group {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .control-label {
    font-size: 0.7rem;
    color: #6b8f9e;
    font-weight: 600;
  }

  .holo-select {
    background: rgba(2, 10, 18, 0.8);
    border: 1px solid rgba(0, 240, 255, 0.2);
    border-radius: 6px;
    padding: 6px 10px;
    color: #e0faff;
    font-size: 0.78rem;
    cursor: pointer;
    outline: none;
  }

  .holo-select:focus {
    border-color: #00f0ff;
    box-shadow: 0 0 8px rgba(0, 240, 255, 0.25);
  }

  .toggle-locked-btn {
    background: rgba(2, 10, 18, 0.8);
    border: 1px solid rgba(0, 240, 255, 0.2);
    color: #9ac2ce;
    border-radius: 6px;
    padding: 6px 12px;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s ease;
  }

  .toggle-locked-btn:hover {
    border-color: rgba(0, 240, 255, 0.4);
    color: #fff;
  }

  .toggle-locked-btn.active {
    border-color: #00f0ff;
    background: rgba(0, 240, 255, 0.12);
    color: #00f0ff;
    box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
  }

  /* Lore Cards Grid */
  .lore-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 16px;
  }

  .lore-card {
    border-radius: 10px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    cursor: default;
    position: relative;
    border: 1px solid rgba(0, 240, 255, 0.16);
    background: linear-gradient(180deg, rgba(8, 16, 28, 0.8) 0%, rgba(3, 9, 16, 0.9) 100%);
    transition:
      transform 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease;
  }

  .lore-card.is-expandable {
    cursor: pointer;
  }

  .lore-card.is-expandable:hover {
    transform: translateY(-2px);
    border-color: rgba(0, 240, 255, 0.4);
    box-shadow:
      0 6px 20px rgba(0, 0, 0, 0.6),
      0 0 15px rgba(0, 240, 255, 0.15);
  }

  .lore-card:not(.is-expandable):hover {
    border-color: rgba(0, 240, 255, 0.3);
  }

  .lore-card.fresh-unlock {
    border-color: rgba(255, 184, 0, 0.6);
    box-shadow: 0 0 18px rgba(255, 184, 0, 0.2);
  }

  .lore-card.locked {
    opacity: 0.65;
    border-style: dashed;
    border-color: rgba(120, 150, 170, 0.25);
    background: rgba(4, 8, 14, 0.7);
  }

  .lore-card.locked:hover {
    opacity: 0.85;
    border-color: rgba(0, 240, 255, 0.3);
  }

  /* Card Header & Badges */
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
  }

  .card-badges {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }

  .cat-pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: rgba(0, 240, 255, 0.08);
    border: 1px solid var(--theme-c, #00f0ff);
    color: var(--theme-c, #00f0ff);
    font-size: 0.65rem;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 4px;
  }

  .grade-pill {
    font-size: 0.65rem;
    font-weight: 800;
    padding: 2px 7px;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .grade-mythical {
    background: linear-gradient(135deg, rgba(255, 94, 0, 0.3) 0%, rgba(255, 184, 0, 0.3) 100%);
    border: 1px solid #ff9100;
    color: #ffc266;
    box-shadow: 0 0 8px rgba(255, 145, 0, 0.3);
  }

  .grade-legendary {
    background: rgba(245, 158, 11, 0.2);
    border: 1px solid #f59e0b;
    color: #fcd34d;
  }

  .grade-epic {
    background: rgba(168, 85, 247, 0.2);
    border: 1px solid #a855f7;
    color: #d8b4fe;
  }

  .grade-rare {
    background: rgba(14, 165, 233, 0.2);
    border: 1px solid #0ea5e9;
    color: #7dd3fc;
  }

  .grade-uncommon {
    background: rgba(16, 185, 129, 0.2);
    border: 1px solid #10b981;
    color: #6ee7b7;
  }

  .grade-common {
    background: rgba(100, 116, 139, 0.2);
    border: 1px solid #64748b;
    color: #cbd5e1;
  }

  .fresh-pill {
    background: rgba(255, 184, 0, 0.2);
    border: 1px solid #ffb800;
    color: #ffb800;
    font-size: 0.62rem;
    font-weight: 800;
    padding: 2px 6px;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .chapter-unlock-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.68rem;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 4px;
    background: rgba(2, 10, 18, 0.8);
    border: 1px solid rgba(0, 240, 255, 0.2);
  }

  .chapter-unlock-badge.unlocked {
    color: #00f0ff;
  }

  .chapter-unlock-badge.locked {
    color: #79a5b3;
    border-color: rgba(120, 150, 170, 0.2);
  }

  /* Card Title & Meta */
  .card-title-area {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .entry-name {
    font-size: 1.12rem;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.01em;
    margin: 0;
  }

  .classified-text {
    color: #79a5b3;
    font-style: italic;
    font-weight: normal;
    font-size: 0.95rem;
  }

  .entry-meta-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .meta-chip {
    font-size: 0.68rem;
    background: rgba(0, 240, 255, 0.06);
    border: 1px solid rgba(0, 240, 255, 0.15);
    padding: 2px 6px;
    border-radius: 4px;
    color: #e0faff;
  }

  .chip-k {
    color: #79a5b3;
    font-weight: 700;
  }

  /* Card Body */
  .card-body {
    flex: 1;
  }

  .entry-description {
    font-size: 0.88rem;
    line-height: 1.55;
    color: #e0faff;
    margin: 0;
    transition: all 0.2s ease;
  }

  .entry-description.clamped {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: #b0d4de;
  }

  .entry-description.expanded {
    display: block;
    color: #e0faff;
  }

  .locked-placeholder {
    padding: 8px 0;
  }

  .locked-text {
    font-size: 0.82rem;
    color: #7094a3;
    line-height: 1.45;
    margin: 0;
  }

  .locked-text strong {
    color: #00f0ff;
  }

  /* Card Footer */
  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 10px;
    border-top: 1px solid rgba(0, 240, 255, 0.1);
    font-size: 0.68rem;
    color: #6b8f9e;
  }

  .expand-hint {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: #00f0ff;
    font-weight: 600;
  }

  /* Empty State */
  .empty-results-panel {
    padding: 48px 24px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    border-radius: 12px;
  }

  .empty-icon-wrap {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background: rgba(0, 240, 255, 0.05);
    border: 1px solid rgba(0, 240, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .empty-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: #fff;
    margin: 0;
  }

  .empty-desc {
    font-size: 0.88rem;
    color: #79a5b3;
    max-width: 500px;
    line-height: 1.5;
    margin: 0;
  }

  .empty-actions {
    margin-top: 8px;
  }

  /* Mobile Responsive Breakpoints */
  @media (max-width: 768px) {
    .archive-header {
      padding: 14px 16px;
    }

    .header-main-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }

    .header-sync-stats {
      width: 100%;
      justify-content: flex-start;
    }

    .stat-bubble {
      width: auto;
      min-width: unset;
      align-items: flex-start;
    }

    .archive-title {
      font-size: 1.18rem;
    }

    .toolbar-panel {
      padding: 10px 12px;
      gap: 10px;
    }

    .filter-controls-row {
      width: 100%;
      justify-content: space-between;
    }

    .select-group {
      flex: 1 1 120px;
    }

    .holo-select {
      width: 100%;
    }

    .toggle-locked-btn {
      width: 100%;
      justify-content: center;
    }

    .lore-grid {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .lore-card {
      padding: 14px;
    }
  }
</style>
