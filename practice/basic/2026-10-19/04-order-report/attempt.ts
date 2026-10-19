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
  let activeOrders = orders.filter((order) => !order.cancelled)
  
  let customers = new Array(activeOrders.map(order => order.customer)) // get the customer list
  let customersAmount = customers.map((customer) => activeOrders.filter((order) => order.customer == customer).reduce((acc, order) => order.amount + acc, 0)) //self explanatotry but I run out of time is quite complex to make this without search for any syntax
  let totalsByCustomer = new Array([customers, customerAmount]) // combining with a map on both arrays at the same time, had no time to write this
  let topCustomer = totalsByCustomer.max(); // if it has to order the array and get the first that's fine too if there is not max function in an array
  
  let report = {
     activeCount: activeOrders.length,
     activeTotal: activeOrders.reduce((acc, order) => order.amount + acc, 0),
     totalsByCustomer: totalsByCustomer,
     topCustomer: undefined,
  };
  return report;
}

export const exampleOrders: readonly Order[] = [
  { customer: "ana", amount: 20, cancelled: false },
  { customer: "bia", amount: 50, cancelled: true },
  { customer: "ana", amount: -5, cancelled: false },
  { customer: "caio", amount: 15, cancelled: false },
  { customer: "bia", amount: 0, cancelled: false },
];

console.log(buildOrderReport(exampleOrders));
