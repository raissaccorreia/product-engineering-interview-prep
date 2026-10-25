"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleTickets = void 0;
exports.buildTicketReport = buildTicketReport;
function buildTicketReport(tickets) {
    var _a;
    var openTickets = tickets.filter(function (ticket) { return ticket.status === "open"; });
    var totalsByTeam = new Map();
    for (var _i = 0, openTickets_1 = openTickets; _i < openTickets_1.length; _i++) {
        var ticket = openTickets_1[_i];
        var previousTotal = (_a = totalsByTeam.get(ticket.team)) !== null && _a !== void 0 ? _a : 0;
        totalsByTeam.set(ticket.team, previousTotal + 1);
    }
    return {
        openIds: openTickets.map(function (ticket) { return ticket.id; }),
        openCountByTeam: totalsByTeam,
        nextTicket: undefined
    };
}
exports.exampleTickets = [
    { id: "t1", team: "design", status: "open", priority: "low" },
    { id: "t2", team: "platform", status: "closed", priority: "low" },
    { id: "t3", team: "api", status: "open", priority: "low" },
    { id: "t4", team: "api", status: "open", priority: "high" },
    { id: "t5", team: "design", status: "open", priority: "high" },
    { id: "t6", team: "platform", status: "open", priority: "high" },
];
console.log(buildTicketReport(exports.exampleTickets));
