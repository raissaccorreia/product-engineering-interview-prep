"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleOrders = void 0;
exports.buildOrderReport = buildOrderReport;
function buildOrderReport(orders) {
    var activeOrders = orders.filter(function (order) { return !order.cancelled; });
    var customers = new Array(activeOrders.map(function (order) { return order.customer; }));
    var customersAmount = customers.map(function (customer) { return activeOrders.filter(function (order) { return order.customer === customer; }).reduce(function (acc, order) { return order.amount + acc; }, 0); });
    var report = {
        activeCount: activeOrders.length,
        activeTotal: activeOrders.reduce(function (acc, order) { return order.amount + acc; }, 0),
        totalsByCustomer: new Map([["a", 0]]),
        customers: customersAmount,
        topCustomer: undefined,
    };
    return report;
}
exports.exampleOrders = [
    { customer: "ana", amount: 20, cancelled: false },
    { customer: "bia", amount: 50, cancelled: true },
    { customer: "ana", amount: -5, cancelled: false },
    { customer: "caio", amount: 15, cancelled: false },
    { customer: "bia", amount: 0, cancelled: false },
];
console.log(buildOrderReport(exports.exampleOrders));
