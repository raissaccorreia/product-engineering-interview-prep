export function firstEven(values: readonly number[]): number | undefined {
  return values.find((value) => value % 2 === 0);
}
