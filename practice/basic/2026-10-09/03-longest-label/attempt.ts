/** Starter for the implementation exercise. Awaiting the student's attempt. */
export function longestLabel(labels: readonly string[]): string | undefined {
  if (labels.length === 0) {
    return undefined;
  }

  let longestLength = 0;
  let longestPosition = 0;

  for (const label of labels) {
    if (label.length > longestLength) {
      longestPosition = i; // forgot how to get the iterator position from a for structure like this
      longestLength = label.length;
    }
  }

  return labels[longestPosition];
}
