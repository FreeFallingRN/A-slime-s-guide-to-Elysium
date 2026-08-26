<script>
  import { currentChapter, encyclopediaData } from './store.js';
  import { BookOpen, ShieldAlert } from 'lucide-svelte';

  let activeTab = 'races'; // 'races', 'classes', 'monsters', 'factions', 'technology'
  let chapter = 5;

  currentChapter.subscribe(val => {
    chapter = val;
  });

  // Filter items in activeTab that are unlocked in or before selected chapter
  $: items = (encyclopediaData[activeTab] || []).filter(item => item.chapter <= chapter);

  const tabs = [
    { key: 'races', label: 'Races' },
    { key: 'classes', label: 'Classes' },
    { key: 'monsters', label: 'Monsters' },
    { key: 'factions', label: 'Factions' },
    { key: 'technology', label: 'Technology' }
  ];
</script>

<div class="book-container">
  <!-- Top bookmark tabs peeking out -->
  <div class="book-tabs-row">
    {#each tabs as tab}
      <button 
        class="book-tab {activeTab === tab.key ? 'active' : ''}" 
        on:click={() => activeTab = tab.key}
      >
        {tab.label}
      </button>
    {/each}
  </div>

  <!-- The Open Book Layout -->
  <div class="book-outer">
    <div class="book-spine"></div>
    
    <div class="book-page left-page">
      <div class="page-corner top-left"></div>
      <div class="page-header">
        <BookOpen size={16} />
        <span>ELYSIAN LORE ENCYCLOPEDIA</span>
      </div>

      <h1 class="page-title">{activeTab.toUpperCase()} REGISTER</h1>
      
      {#if items.length === 0}
        <div class="empty-book">
          <p>No knowledge recorded yet.</p>
          <div class="note-box">
            <ShieldAlert size={18} />
            <span>Increase your synchronized Chapter Lock above to reveal ancient writings and lore logs.</span>
          </div>
        </div>
      {:else}
        <div class="encyclopedia-list">
          {#each items.slice(0, Math.ceil(items.length / 2)) as item}
            <div class="entry-card">
              <h3>{item.name}</h3>
              {#if item.base}
                <p class="meta-tag">Grade: {item.base}</p>
              {/if}
              {#if activeTab === 'dungeons'}
                <p class="meta-tag">Rating: {item.level} | Boss: {item.bosses}</p>
              {/if}
              {#if item.ruler}
                <p class="meta-tag">Lead: {item.ruler}</p>
              {/if}
              <p class="description">{item.description || ''}</p>
              <span class="unlock-milestone">LOGGED: Chapter {item.chapter}</span>
            </div>
          {/each}
        </div>
      {/if}
      
      <div class="page-number">page I</div>
    </div>

    <!-- Right Page (For dual layout feel) -->
    <div class="book-page right-page">
      <div class="page-corner top-right"></div>
      <div class="page-header right">
        <span>Arson Devs Chronicles</span>
      </div>

      {#if items.length > 1}
        <div class="encyclopedia-list">
          {#each items.slice(Math.ceil(items.length / 2)) as item}
            <div class="entry-card">
              <h3>{item.name}</h3>
              {#if item.base}
                <p class="meta-tag">Grade: {item.base}</p>
              {/if}
              {#if activeTab === 'dungeons'}
                <p class="meta-tag">Rating: {item.level} | Boss: {item.bosses}</p>
              {/if}
              {#if item.ruler}
                <p class="meta-tag">Lead: {item.ruler}</p>
              {/if}
              <p class="description">{item.description || ''}</p>
              <span class="unlock-milestone">LOGGED: Chapter {item.chapter}</span>
            </div>
          {/each}
        </div>
      {:else if items.length === 1}
        <div class="filler-illustration">
          <div class="seal-icon">✵</div>
          <p class="seal-text">Official archives of Elysium. The runes sync to your neural level index.</p>
        </div>
      {:else}
        <div class="filler-illustration">
          <div class="seal-icon closed">۩</div>
          <p class="seal-text">Vault is chronologically locked.</p>
        </div>
      {/if}

      <div class="page-number">page II</div>
    </div>
  </div>
</div>

<style>
  .book-container {
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
  }

  .book-tabs-row {
    display: flex;
    gap: 4px;
    margin-left: 20px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .book-tabs-row::-webkit-scrollbar {
    display: none;
  }

  /* The actual book spread */
  .book-outer {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0;
    overflow: hidden;
  }

  @media (min-width: 768px) {
    .book-outer {
      grid-template-columns: 1fr 1fr;
    }
  }

  .book-spine {
    display: none;
  }

  @media (min-width: 768px) {
    .book-spine {
      display: block;
      position: absolute;
      left: 50%;
      top: 16px;
      bottom: 16px;
      width: 4px;
      background: linear-gradient(90deg, #180f08, #2a1b0e, #180f08);
      z-index: 10;
      transform: translateX(-50%);
      box-shadow: 0 0 10px rgba(0,0,0,0.5);
    }
  }

  .book-page {
    border-radius: 0;
  }

  .left-page {
    border-right: none;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  .right-page {
    border-left: none;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    display: none; /* Hide right page on small screens */
  }

  @media (min-width: 768px) {
    .right-page {
      display: block; /* Show right page on desktop spread */
    }
  }

  .page-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.72rem;
    font-weight: bold;
    color: var(--color-book-gold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 1px solid rgba(194, 157, 83, 0.2);
    padding-bottom: 6px;
    margin-bottom: 20px;
  }

  .page-header.right {
    justify-content: flex-end;
  }

  .page-title {
    font-size: 1.6rem;
    font-weight: 700;
    text-align: center;
    color: var(--color-book-red);
    margin-bottom: 24px;
    letter-spacing: 0.05em;
  }

  .empty-book {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 40px 10px;
    font-style: italic;
    color: var(--color-book-ink);
    opacity: 0.75;
  }

  .note-box {
    margin-top: 24px;
    border: 1px dashed var(--color-book-gold);
    padding: 16px;
    border-radius: 6px;
    background: rgba(194, 157, 83, 0.05);
    display: flex;
    align-items: center;
    gap: 12px;
    font-style: normal;
    text-align: left;
    color: var(--color-book-ink);
    font-size: 0.9rem;
    line-height: 1.4;
  }

  .encyclopedia-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .entry-card {
    border-bottom: 1px dashed rgba(43, 37, 24, 0.15);
    padding-bottom: 14px;
  }

  .entry-card h3 {
    font-size: 1.25rem;
    color: var(--color-book-ink);
    margin-bottom: 4px;
    border: none;
    padding: 0;
  }

  .meta-tag {
    font-size: 0.78rem;
    font-weight: bold;
    color: var(--color-book-red);
    margin-bottom: 6px;
  }

  .description {
    font-size: 0.95rem;
    color: var(--color-book-ink);
    line-height: 1.5;
    margin-bottom: 6px;
  }

  .unlock-milestone {
    display: inline-block;
    font-size: 0.68rem;
    font-weight: bold;
    text-transform: uppercase;
    color: var(--color-book-gold);
    background: rgba(194, 157, 83, 0.15);
    padding: 1px 6px;
    border-radius: 3px;
    letter-spacing: 0.05em;
  }

  .filler-illustration {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 300px;
    text-align: center;
    color: var(--color-book-ink);
    opacity: 0.6;
    padding: 20px;
  }

  .seal-icon {
    font-size: 4rem;
    color: var(--color-book-gold);
    line-height: 1;
    margin-bottom: 12px;
  }

  .seal-icon.closed {
    color: var(--color-book-border);
  }

  .seal-text {
    font-size: 0.95rem;
    font-style: italic;
    max-width: 240px;
  }

  .page-number {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.8rem;
    color: var(--color-book-gold);
    font-style: italic;
    font-weight: bold;
  }

  .page-corner {
    position: absolute;
    width: 24px;
    height: 24px;
    border: 2px solid var(--color-book-gold);
    opacity: 0.3;
  }

  .top-left { top: 12px; left: 12px; border-right: none; border-bottom: none; }
  .top-right { top: 12px; right: 12px; border-left: none; border-bottom: none; }
</style>
