/** Starter for the implementation exercise. Awaiting the student's attempt. */
export function countOccurrences(values: readonly string[]): Map<string, number> {
  let occurrences = new Map(); // create new map object
  for (const [index, value] of values) {
    if (occurrences.length === 0 || !occurrences[value]) {
      // not on the map push it with 1 ocurrences
      occurences.push([value, 1]);
    }
    if (ocurrences[value]) {
      occurences[value]++; // if its there increment the number value related to the string key
    }
  }
}
