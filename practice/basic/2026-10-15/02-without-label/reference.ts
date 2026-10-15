export function withoutLabel(labels: string[], target: string): string[] {
  const result: string[] = [];

  for (const label of labels) {
    if (label !== target) {
      result.push(label);
    }
  }

  return result;
}
