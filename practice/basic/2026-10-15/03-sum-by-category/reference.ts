export type Entry = {
  category: string;
  amount: number;
};

export function sumByCategory(entries: readonly Entry[]): Map<string, number> {
  const totals = new Map<string, number>();

  for (const entry of entries) {
    const previousTotal = totals.get(entry.category) ?? 0;
    totals.set(entry.category, previousTotal + entry.amount);
  }

  return totals;
}
