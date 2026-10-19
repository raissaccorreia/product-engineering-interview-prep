export type Order = {
  readonly customer: string;
  readonly amount: number;
  readonly cancelled: boolean;
};

export type OrderReport = {
  activeCount: number;
  activeTotal: number;
  totalsByCustomer: Map<string, number>;
  topCustomer: { customer: string; total: number } | undefined;
};

export function buildOrderReport(orders: readonly Order[]): OrderReport {
  let activeCount = 0;
  let activeTotal = 0;
  const totalsByCustomer = new Map<string, number>();

  for (const order of orders) {
    if (order.cancelled) continue;

    activeCount += 1;
    activeTotal += order.amount;
    const previousTotal = totalsByCustomer.get(order.customer) ?? 0;
    totalsByCustomer.set(order.customer, previousTotal + order.amount);
  }

  let topCustomer: OrderReport["topCustomer"] = undefined;

  for (const [customer, total] of totalsByCustomer) {
    if (topCustomer === undefined || total > topCustomer.total) {
      topCustomer = { customer, total };
    }
  }

  return { activeCount, activeTotal, totalsByCustomer, topCustomer };
}
