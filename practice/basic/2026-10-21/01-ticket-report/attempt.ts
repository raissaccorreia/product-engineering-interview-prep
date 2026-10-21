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
   let openTickets = tickets.filter((ticket) => ticket.status === "open")
   // Explaining the first one is pretty easy. It's just a filter by open, so this already suffices for the easy task.
  // The medium task is very similar to the previous day's task: create a map, iterate through the open tickets, check the previous todo, and add by the way for each team. This is also enough for the medium task. 
   const totalsByTeam = new Map<string, number>();
   
   for (const ticket of openTickets) {
      const previousTotal = totalsByTeam.get(ticket.team) ?? 0;
      totalsByTeam.set(ticket.team, previousTotal + 1);
   }
   
   // The next ticket requires quite a lot of work. The steps are:
   // 1. I would sort the totals by team map to get just the top ones and crop the rest
   // 2. From these, I will run through the example tickets to get the first one to compare and find the match for each one.
   // 3. I will get the priority ticket from there, using the priority field
  // That's the order, so it's like three separate functions, each considered a step in the procedure.
   
   return {
      openIds: openTickets.map((ticket) => ticket.id),
      openCountByTeam: totalsByTeam,
      nextTicket: undefined
   }
}

export const exampleTickets: readonly Ticket[] = [
  { id: "t1", team: "design", status: "open", priority: "low" },
  { id: "t2", team: "platform", status: "closed", priority: "low" },
  { id: "t3", team: "api", status: "open", priority: "low" },
  { id: "t4", team: "api", status: "open", priority: "high" },
  { id: "t5", team: "design", status: "open", priority: "high" },
  { id: "t6", team: "platform", status: "open", priority: "high" },
];

console.log(buildTicketReport(exampleTickets));