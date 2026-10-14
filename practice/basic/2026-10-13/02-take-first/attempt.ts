/** Original exercise implementation. Awaiting the student's correction. */
export function takeFirst(values: string[], count: number): string[] {
  let newArray = values.splice(0, count);
  return newArray;
}

console.log(takeFirst(["a", "b", "c"], 4));
