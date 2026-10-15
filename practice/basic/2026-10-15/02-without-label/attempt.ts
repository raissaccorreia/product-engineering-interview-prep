/** Original exercise implementation. Awaiting the student's correction. */
export function withoutLabel(labels: string[], target: string): string[] {
  const index = labels.indexOf(target);

  if (index >= 0) {
    labels.splice(index, 1);
  }

  return labels;
}
