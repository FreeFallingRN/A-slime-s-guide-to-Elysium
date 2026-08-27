import fs from 'fs';

const bracketMatches = [];

for (let i = 1; i <= 72; i++) {
  const filePath = `chapters/${i}.txt`;
  if (!fs.existsSync(filePath)) continue;
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, lineIdx) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('[') && trimmed.includes(']')) {
      bracketMatches.push({ ch: i, line: lineIdx + 1, text: trimmed });
    }
  });
}

console.log(`Found ${bracketMatches.length} bracket system notifications in chapters 1-72:\n`);
bracketMatches.forEach(b => console.log(`Ch ${b.ch} (L${b.line}): ${b.text}`));
