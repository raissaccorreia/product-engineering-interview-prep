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

  return count === 0 ? 0 : total / count;
}

console.log(average([]));
console.log(average([1, 2, 3]));
console.log(average([32, -4, 0, 7]));
console.log(average(undefined));
