export function longestLabel(labels: readonly string[]): string | undefined {
  if (labels.length === 0) {
    return undefined;
  }

  let longestLength = 0;
  let longestPosition = 0;

  for (const [index, label] of labels.entries()) {
    if (label.length > longestLength) {
      longestPosition = index;
      longestLength = label.length;
    }
  }

  return labels[longestPosition];
}
