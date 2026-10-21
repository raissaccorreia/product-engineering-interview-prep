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
  throw new Error("Not implemented");
}

export const exampleTickets: readonly Ticket[] = [
  { id: "t1", team: "design", status: "open", priority: "low" },
  { id: "t2", team: "platform", status: "closed", priority: "low" },
  { id: "t3", team: "api", status: "open", priority: "low" },
  { id: "t4", team: "api", status: "open", priority: "high" },
  { id: "t5", team: "design", status: "open", priority: "high" },
  { id: "t6", team: "platform", status: "open", priority: "high" },
];
