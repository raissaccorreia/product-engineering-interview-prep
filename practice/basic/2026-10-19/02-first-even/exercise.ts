export function firstEven(values: readonly number[]): number | undefined {
  return values.some((value) => value % 2 === 0);
}
