export function countLongWords(words: readonly string[], minLength: number): number {
  return words.filter((word) => word.length > minLength).length;
}
