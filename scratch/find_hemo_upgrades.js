import fs from 'fs';

for (let i = 1; i <= 72; i++) {
  const filePath = `chapters/${i}.txt`;
  if (!fs.existsSync(filePath)) continue;
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, lineIdx) => {
    const l = line.toLowerCase();
    if (l.includes('hemolymph') || l.includes('hemo') || l.includes('tissue') || l.includes('tecido')) {
      console.log(`Ch ${i} (L${lineIdx+1}): ${line.trim()}`);
    }
  });
}
