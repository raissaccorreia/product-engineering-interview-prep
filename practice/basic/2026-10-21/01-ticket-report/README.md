# Exercício integrado: relatório de tickets

Implemente `buildTicketReport` em [exercise.ts](exercise.ts). Tempo sugerido: 30 minutos. Explique seu plano em inglês antes de implementar; pode usar comentários no arquivo. Aguarde a revisão antes de consultar uma solução de referência.

## Contrato

Cada ticket tem `id`, `team`, `status` e `priority`, conforme os tipos no arquivo. Os IDs são únicos. Compare nomes de equipes exatamente como aparecem, sem normalização. Considere somente tickets abertos (`status: "open"`) em todas as partes. Preserve o array e seus objetos. Você pode criar funções auxiliares.

### Parte fácil: listar os tickets abertos

Preencha `openIds` com os IDs dos tickets abertos, na ordem da entrada.

### Parte média: contar por equipe

Preencha `openCountByTeam`, um `Map<string, number>`, com a quantidade de tickets abertos de cada equipe. Equipes com tickets apenas fechados não entram no mapa.

### Parte difícil: escolher o próximo ticket

Preencha `nextTicket` obedecendo a esta ordem de decisão:

1. Escolha a equipe com mais tickets abertos. Se houver empate, escolha a equipe cujo primeiro ticket aberto aparece antes na entrada.
2. Dentro da equipe escolhida, selecione o primeiro ticket aberto de prioridade `high`. Se essa equipe não tiver nenhum ticket aberto de prioridade `high`, selecione seu primeiro ticket aberto de prioridade `low`.

A prioridade é comparada apenas dentro da equipe escolhida. Você pode devolver o próprio objeto da entrada ou uma cópia com os mesmos campos.

Sem tickets abertos, retorne `openIds: []`, um mapa vazio e `nextTicket: undefined`.

## Exemplo

Use `exampleTickets`, definido no arquivo TypeScript. O resultado esperado é:

```ts
const expected: TicketReport = {
  openIds: ["t1", "t3", "t4", "t5", "t6"],
  openCountByTeam: new Map([
    ["design", 2],
    ["api", 2],
    ["platform", 1],
  ]),
  nextTicket: {
    id: "t5",
    team: "design",
    status: "open",
    priority: "high",
  },
};
```

`design` e `api` têm dois tickets abertos cada. A equipe escolhida é `design`, pois `t1` aparece antes de `t3`. Entre seus tickets abertos, `t5` é o primeiro de prioridade `high`.

## Entrega

Inclua sua implementação, a explicação em inglês, pelo menos três casos de borda com os resultados esperados e a estimativa de tempo e espaço. Distribuição sugerida: 5 minutos na parte fácil, 10 na média, 10 na difícil e 5 na revisão. Ao completar 30 minutos, envie o que conseguiu e indique onde ficou em dúvida.

O feedback será em português e avaliará correção, estratégia, casos de borda e clareza da explicação em inglês. A tentativa será preservada separadamente da referência após a resposta.
