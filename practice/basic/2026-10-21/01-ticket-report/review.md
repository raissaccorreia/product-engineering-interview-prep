# Revisão do relatório de tickets

As partes fácil e média estão corretas. A função compila e preserva a entrada. A parte difícil tem uma proposta nos comentários, mas não foi implementada: o retorno contém sempre `nextTicket: undefined`.

## Enunciado e contrato

Implementar `buildTicketReport(tickets)` para produzir IDs dos tickets abertos na ordem da entrada, um `Map<string, number>` com as contagens por equipe e o próximo ticket. Considere apenas tickets abertos e preserve o array e os objetos recebidos. Os IDs são únicos e nomes de equipes são comparados exatamente.

Escolha primeiro a equipe com mais tickets abertos. No empate, vence a equipe cujo primeiro ticket aberto aparece antes na entrada. Depois escolha, dentro dessa equipe, o primeiro ticket aberto de prioridade `high`; na ausência dele, o primeiro de prioridade `low`. Sem tickets abertos, retorne lista e mapa vazios e `nextTicket: undefined`. Veja o [enunciado completo](README.md).

## Resposta original da estudante

> All right, I consider myself to have run out of things to implement for the interview, so I wrote my comments and I wrote my code in exercise.ts. would love your review.

O código e os comentários foram preservados byte por byte em [attempt.ts](attempt.ts). `exercise.ts` voltou ao enunciado inicial. O tempo real desta tentativa não foi informado; o exercício previa 30 minutos.

```ts
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
```

## Correção e raciocínio

### Parte fácil: correta

`filter` seleciona tickets com `status === "open"`. Na montagem do relatório, `map` extrai seus IDs, preservando a ordem. Os comentários mencionam só a filtragem, mas a implementação completa também faz a transformação exigida. Com entrada vazia ou somente tickets fechados, `openIds` é `[]`.

### Parte média: correta

O `Map<string, number>` associa cada equipe à sua contagem. `get(ticket.team) ?? 0` lê o total ou usa zero para a chave ausente; `set(ticket.team, previousTotal + 1)` atualiza a contagem. Como o loop percorre `openTickets`, equipes com tickets apenas fechados ficam de fora.

Em relação à tentativa de pedidos de 19 de outubro, esta implementação usa corretamente `Map`, `get` e `set` e já não tenta combinar arrays paralelos como se fossem um mapa. `totalsByTeam` funciona como identificador, mas `openCountByTeam` tornaria mais explícito que os valores são contagens de tickets abertos.

### Parte difícil: incompleta

O plano nos comentários separa a escolha da equipe e a prioridade do ticket, o que corresponde à ordem principal do contrato. Ainda faltam decisões precisas sobre desempate, exclusão de tickets fechados, primeira ocorrência da prioridade alta e fallback para prioridade baixa.

Ordenar equipes por contagem é uma possibilidade. Um `Map` não tem método `sort`; seria necessário converter suas entradas em um array e definir como preservar o desempate. A referência escolhe a maior contagem em uma passagem pelo mapa. Como as chaves foram inseridas na ordem do primeiro ticket aberto de cada equipe, atualizar a equipe vencedora somente com `count > highestCount` preserva a primeira no empate.

Depois de escolher a equipe, a referência usa `find` para procurar seu primeiro ticket de prioridade alta. Se a busca retorna `undefined`, `??` permite fazer uma segunda busca, pela prioridade baixa. A prioridade é considerada apenas dentro da equipe vencedora. O nome vazio de uma equipe, se recebido, também é tratado como string válida: a ausência de equipe é checada com `=== undefined`, sem depender de truthiness.

O retorno atual é correto para `nextTicket` apenas quando não há tickets abertos. Com a entrada do enunciado, os dois primeiros campos estão corretos, mas falta devolver `t5`.

## Referência

A referência preserva a estrutura das duas partes que já estavam corretas e acrescenta a seleção da equipe e as buscas pelo ticket.

```ts
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
```

Arquivo separado: [reference.ts](reference.ts).

## Casos de borda e verificação

A tentativa inclui a chamada com o exemplo do enunciado, mas não registra três casos de borda com resultados esperados. Os casos avaliados foram:

| Caso                                                        | Resultado exigido para o próximo ticket     |
| ----------------------------------------------------------- | ------------------------------------------- |
| Exemplo original                                            | `t5`, da equipe `design`                    |
| Array vazio                                                 | `undefined`                                 |
| Somente tickets fechados                                    | `undefined`                                 |
| Equipe vencedora com dois tickets de prioridade baixa       | O primeiro deles                            |
| Outra equipe tem prioridade alta, mas menos tickets abertos | Ticket da equipe com mais abertos           |
| Primeira ocorrência fechada de uma equipe que depois empata | Desempate pela primeira ocorrência aberta   |
| Equipe vencedora com vários tickets de prioridade alta      | O primeiro ticket aberto de prioridade alta |
| Equipe que assume a maior contagem mais tarde na entrada    | Ticket da equipe com a maior contagem final |

O typecheck estrito passa na tentativa e na referência. Nos oito cenários, a tentativa acertou `openIds` e `openCountByTeam`. Os relatórios completos da tentativa atenderam ao contrato apenas nos dois casos sem tickets abertos. A referência atendeu aos oito casos, incluindo todos os campos. Os arrays e objetos da entrada estavam congelados e permaneceram preservados.

## Complexidade

A tentativa não apresentou uma estimativa. Sua implementação atual leva O(n) de tempo sob o custo usual das operações de `Map`. A referência também leva O(n): percorre os tickets, as equipes distintas e faz até duas buscas adicionais nos tickets abertos. Uma quantidade fixa de passagens lineares continua O(n).

Com m tickets abertos e k equipes, ambas usam O(m + k) de espaço no pior caso, equivalente a O(n), contando o array filtrado e os campos de saída. Excluindo o resultado, o array `openTickets` ainda ocupa O(m) de espaço auxiliar. Os nomes são tratados como chaves de custo unitário nesta análise. A alternativa de ordenar k equipes teria custo adicional de O(k log k) com uma ordenação usual por comparação.

## Explicação em inglês

O comentário da parte média acompanha o loop, mas “previous todo” e “add by the way” não identificam a operação com precisão. Use os conceitos de contagem anterior e incremento de uma unidade para cada ticket aberto da equipe.

Na parte difícil, “top ones” e “crop the rest” deixam ambíguo quantas equipes continuam e como o empate é resolvido. Explique os critérios na ordem do contrato e diferencie `tickets` da entrada de `exampleTickets`, que é apenas a amostra. A explicação fica mais útil quando cada passo diz qual valor produz, mesmo antes de escrever a sintaxe.

## Próxima revisão autônoma

Refaça a escolha da equipe com maior contagem, incluindo empate. Depois pratique `find` para obter um ticket e `??` para o fallback de prioridade. Mantenha as duas partes já corretas e acrescente os casos de borda antes de executar.
