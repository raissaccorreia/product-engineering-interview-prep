/** Original exercise implementation. Awaiting the student's correction. */
export function average(values: readonly number[]): number | undefined {
  let total = 0;
  let count = 0;

  for (const value of values) {
    if (value) {
      total += value;
      count++;
    }
  }

  return total / count;
}
