/** Original exercise implementation: returns the wrong result for all-negative arrays. */
export function maximumWithBug(values: readonly number[]): number | undefined {
  if (values.length === 0) {
    return undefined;
  }

  let result = 0;

  for (const value of values) {
    if (value > result) {
      result = value;
    }
  }

  return result;
}

/** Corrected implementation for arrays containing finite numbers. */
export function maximum(values: readonly number[]): number | undefined {
  if (values.length === 0) {
    return undefined;
  }

  let result = -Infinity;

  for (const value of values) {
    if (value > result) {
      result = value;
    }
  }

  return result;
}
