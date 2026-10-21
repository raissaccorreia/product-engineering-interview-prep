export type Ticket = {
  readonly id: string;
  readonly team: string;
  readonly status: "open" | "closed";
  readonly priority: "low" | "high";
};

export type TicketReport = {
  openIds: string[];
  openCountByTeam: Map<string, number>;
  nextTicket: Ticket | undefined;
};

export function buildTicketReport(tickets: readonly Ticket[]): TicketReport {
  const openTickets = tickets.filter((ticket) => ticket.status === "open");
  const totalsByTeam = new Map<string, number>();

  for (const ticket of openTickets) {
    const previousTotal = totalsByTeam.get(ticket.team) ?? 0;
    totalsByTeam.set(ticket.team, previousTotal + 1);
  }

  let selectedTeam: string | undefined = undefined;
  let highestCount = 0;

  for (const [team, count] of totalsByTeam) {
    if (count > highestCount) {
      highestCount = count;
      selectedTeam = team;
    }
  }

  const nextTicket =
    selectedTeam === undefined
      ? undefined
      : (openTickets.find((ticket) => ticket.team === selectedTeam && ticket.priority === "high") ??
        openTickets.find((ticket) => ticket.team === selectedTeam && ticket.priority === "low"));

  return {
    openIds: openTickets.map((ticket) => ticket.id),
    openCountByTeam: totalsByTeam,
    nextTicket,
  };
}
