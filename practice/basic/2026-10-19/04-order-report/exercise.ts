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
  throw new Error("Not implemented");
}

export const exampleOrders: readonly Order[] = [
  { customer: "ana", amount: 20, cancelled: false },
  { customer: "bia", amount: 50, cancelled: true },
  { customer: "ana", amount: -5, cancelled: false },
  { customer: "caio", amount: 15, cancelled: false },
  { customer: "bia", amount: 0, cancelled: false },
];
