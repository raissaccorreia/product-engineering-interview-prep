export function collapseConsecutive(values: readonly string[]): string[] {
  const result: string[] = [];

  for (const value of values) {
    if (result.length === 0 || value !== result[result.length - 1]) {
      result.push(value);
    }
  }

  return result;
}
