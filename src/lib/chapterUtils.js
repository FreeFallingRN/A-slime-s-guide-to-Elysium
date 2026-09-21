export function getChapterRange(chapters) {
  // Derive bounds from data, not array position, so future chapter imports can be unordered.
  const chapterNumbers = chapters
    .map((chapter) => chapter.index)
    .filter((chapter) => Number.isFinite(chapter));

  if (chapterNumbers.length === 0) {
    return { minChapter: 1, maxChapter: 1 };
  }

  return {
    minChapter: Math.min(...chapterNumbers),
    maxChapter: Math.max(...chapterNumbers)
  };
}

export function clampChapter(value, chapters) {
  const parsed = Number.parseInt(value, 10);
  const { minChapter, maxChapter } = getChapterRange(chapters);

  if (Number.isNaN(parsed)) {
    return minChapter;
  }

  return Math.max(minChapter, Math.min(maxChapter, parsed));
}

export function getTimelineMarkers(minChapter, maxChapter, count = 5) {
  const min = Number.isFinite(minChapter) ? minChapter : 1;
  const max = Number.isFinite(maxChapter) ? maxChapter : min;
  const markerCount = Math.max(1, count);

  if (max <= min || markerCount === 1) {
    return [min];
  }

  const markers = new Set();
  const steps = Math.min(markerCount, max - min + 1);

  // Rounded intervals keep the first and final labels anchored while avoiding tiny-range duplicates.
  for (let i = 0; i < steps; i += 1) {
    const marker = Math.round(min + ((max - min) * i) / (steps - 1));
    markers.add(Math.max(min, Math.min(max, marker)));
  }

  markers.add(min);
  markers.add(max);

  return [...markers].sort((a, b) => a - b);
}

export function getLevelMilestones(chapters) {
  const sortedChapters = [...chapters]
    .filter((chapter) => Number.isFinite(chapter.index) && Number.isFinite(chapter.halonLvl))
    .sort((a, b) => a.index - b.index);

  const milestones = [];
  const seenLevels = new Set();

  // A milestone is the first chapter where a level appears, even if levels skip numbers.
  for (const chapter of sortedChapters) {
    if (!seenLevels.has(chapter.halonLvl)) {
      seenLevels.add(chapter.halonLvl);
      milestones.push({ level: chapter.halonLvl, chapter: chapter.index });
    }
  }

  return milestones;
}

export function getLevelMilestoneIndex(levelMilestones, currentLevel) {
  let activeIndex = -1;

  for (let i = 0; i < levelMilestones.length; i += 1) {
    if (levelMilestones[i].level === currentLevel) {
      activeIndex = i;
    }
  }

  return activeIndex;
}
