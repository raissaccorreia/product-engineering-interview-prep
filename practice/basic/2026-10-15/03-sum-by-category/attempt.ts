export type Entry = {
  category: string;
  amount: number;
};

/** Starter for the implementation exercise. Awaiting the student's attempt. */
export function sumByCategory(entries: readonly Entry[]): Map<string, number> {
  let setSum = new Set<Entry>(entries);
  // this should create a set version of entries, so categories don't repeat now, maybe is not that simple

  for (const category of entries) {
    entries.get(category).reduce((sum) => amount + sum, 0); //find all category in entries and sum the amount occurances with reduce
    setSum.get(category).set(amount, count); // set the correct amount in the set
  }

  return setSum;
}
