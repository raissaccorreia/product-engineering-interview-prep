export function countOccurrences(values: readonly string[]): Map<string, number> {
  const occurrences = new Map<string, number>();

  for (const value of values) {
    const previousCount = occurrences.get(value) ?? 0;
    occurrences.set(value, previousCount + 1);
  }

  return occurrences;
}
