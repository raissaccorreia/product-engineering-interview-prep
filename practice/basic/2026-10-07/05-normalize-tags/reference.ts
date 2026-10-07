export function normalizeTags(tags: readonly string[]): string[] {
  const resultTags: string[] = [];
  const seenTags = new Set<string>();

  for (const tagElement of tags) {
    const tag = tagElement.trim().toLowerCase();

    if (tag.length === 0 || seenTags.has(tag)) {
      continue;
    }

    seenTags.add(tag);
    resultTags.push(tag);
  }

  return resultTags;
}
