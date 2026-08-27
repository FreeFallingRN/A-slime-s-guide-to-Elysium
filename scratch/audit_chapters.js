import fs from 'fs';
import {
  chaptersData,
  abilityProgression,
  visualsData,
  mapNodesData,
  encyclopediaData,
  charactersData
} from '../src/lib/store.js';

// 1. Disk Files
const diskFiles = fs.readdirSync('chapters')
  .filter(f => f.endsWith('.txt'))
  .map(f => parseInt(f.replace('.txt', ''), 10))
  .sort((a, b) => a - b);

console.log(`\n=== 📁 DISK AUDIT ===`);
console.log(`Disk chapter files: Chapter ${diskFiles[0]} to Chapter ${diskFiles[diskFiles.length - 1]} (Total: ${diskFiles.length} files)`);

const missingDisk = [];
for (let i = 1; i <= diskFiles[diskFiles.length - 1]; i++) {
  if (!diskFiles.includes(i)) missingDisk.push(i);
}
console.log(`Missing chapter files on disk (1 to ${diskFiles[diskFiles.length - 1]}): ${missingDisk.length > 0 ? missingDisk.join(', ') : 'None'}`);

// 2. ChaptersData Audit
console.log(`\n=== 📖 STORE: chaptersData AUDIT ===`);
const chIndices = chaptersData.map(c => c.index);
const dupesCh = chIndices.filter((item, index) => chIndices.indexOf(item) !== index);
console.log(`Duplicate chapter indices in chaptersData: ${dupesCh.length > 0 ? dupesCh.join(', ') : 'None'}`);

const missingInStore = diskFiles.filter(f => !chIndices.includes(f));
console.log(`Chapters on disk missing in chaptersData: ${missingInStore.length > 0 ? missingInStore.join(', ') : 'None'}`);

const extraInStore = chIndices.filter(f => !diskFiles.includes(f));
console.log(`Chapters in chaptersData missing on disk: ${extraInStore.length > 0 ? extraInStore.join(', ') : 'None'}`);

// 3. abilityProgression Audit
console.log(`\n=== ⚡ STORE: abilityProgression AUDIT ===`);
for (const [abId, milestones] of Object.entries(abilityProgression)) {
  const chs = milestones.map(m => m.chapter);
  const dupes = chs.filter((item, index) => chs.indexOf(item) !== index);
  if (dupes.length > 0) console.log(`[DUPLICATE] in abilityProgression[${abId}]: ${dupes}`);
  const invalid = chs.filter(c => !diskFiles.includes(c));
  if (invalid.length > 0) console.log(`[INVALID CH] in abilityProgression[${abId}]: ${invalid}`);
}

// 4. Map Nodes Audit
console.log(`\n=== 🗺️ STORE: mapNodesData AUDIT ===`);
const invalidMapCh = mapNodesData.filter(n => !diskFiles.includes(n.chapter));
console.log(`Invalid map node chapters: ${invalidMapCh.length > 0 ? invalidMapCh.map(n => `${n.name} (Ch ${n.chapter})`).join(', ') : 'None'}`);

// 5. Visuals Data Audit
console.log(`\n=== 🖼️ STORE: visualsData AUDIT ===`);
const invalidVisualCh = visualsData.filter(v => !diskFiles.includes(v.chapter));
console.log(`Invalid visual chapters: ${invalidVisualCh.length > 0 ? invalidVisualCh.map(v => `${v.name} (Ch ${v.chapter})`).join(', ') : 'None'}`);

// 6. Encyclopedia Audit
console.log(`\n=== 📚 STORE: encyclopediaData AUDIT ===`);
Object.keys(encyclopediaData).forEach(cat => {
  const invalid = (encyclopediaData[cat] || []).filter(e => e.chapter && !diskFiles.includes(e.chapter));
  if (invalid.length > 0) {
    console.log(`Invalid chapters in encyclopediaData.${cat}: ${invalid.map(i => `${i.name} (Ch ${i.chapter})`).join(', ')}`);
  }
});

// 7. Character Abilities Baseline Audit
console.log(`\n=== 🧬 STORE: charactersData.abilities AUDIT ===`);
Object.entries(charactersData).forEach(([charKey, char]) => {
  (char.abilities || []).forEach(ab => {
    if (ab.chapter && !diskFiles.includes(ab.chapter)) {
      console.log(`Invalid base chapter in character ${charKey}.${ab.id}: Ch ${ab.chapter}`);
    }
    if (ab.upgrades) {
      ab.upgrades.forEach(up => {
        if (up.chapter && !diskFiles.includes(up.chapter)) {
          console.log(`Invalid upgrade chapter in character ${charKey}.${ab.id}.${up.name}: Ch ${up.chapter}`);
        }
      });
    }
  });
});
