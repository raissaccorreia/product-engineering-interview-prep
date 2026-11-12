# Exercício integrado: relatório de pedidos

Atividade adicional de 30 minutos, solicitada depois que a estudante informou ter concluído os três exercícios anteriores em 25 minutos. Praticar uma função com etapas de dificuldade crescente, explicando o plano em inglês antes da implementação. Aguardar a tentativa antes de apresentar feedback ou referência.

Tentativa revisada: [código original](attempt.ts), [referência](reference.ts) e [feedback completo](review.md). A tentativa inclui os comentários explicativos escritos durante os 30 minutos.

Implemente `buildOrderReport` em [exercise.ts](exercise.ts). Todas as etapas fazem parte da mesma função e usam a mesma entrada. Você pode criar funções auxiliares.

## Contrato

Cada pedido tem `customer`, `amount` e `cancelled`. Um pedido está ativo quando `cancelled` é `false`. Considere apenas os pedidos ativos em todos os campos do relatório.

- `amount` é sempre um número finito. Zero e valores negativos são válidos; valores negativos representam estornos.
- Compare nomes de clientes exatamente como aparecem. Não normalize espaços ou letras.
- Preserve o array de entrada e seus objetos.

## Parte fácil: contagem e total

Calcule `activeCount`, a quantidade de pedidos ativos, e `activeTotal`, a soma dos valores desses pedidos. Sem pedidos ativos, os dois campos são `0`.

## Parte média: total por cliente

Preencha `totalsByCustomer` com um `Map<string, number>`. Cada cliente com pelo menos um pedido ativo deve ter uma entrada com a soma dos seus pedidos ativos, inclusive quando o total for zero ou negativo. Clientes com pedidos apenas cancelados não entram no mapa. Sem pedidos ativos, o mapa fica vazio.

## Parte difícil: cliente com maior total

Preencha `topCustomer` com o nome e o total do cliente que tiver o maior total acumulado. Em caso de empate, vence quem apareceu primeiro entre os pedidos ativos da entrada. Totais negativos também participam da comparação. Sem pedidos ativos, retorne `undefined` nesse campo.

## Exemplo

Para `exampleOrders`, definido no arquivo TypeScript, o relatório deve conter:

```ts
const expected: OrderReport = {
  activeCount: 4,
  activeTotal: 30,
  totalsByCustomer: new Map([
    ["ana", 15],
    ["caio", 15],
    ["bia", 0],
  ]),
  topCustomer: { customer: "ana", total: 15 },
};
```

## Entrega

Explique o plano em inglês e implemente a função. Nos comentários ou na resposta, inclua pelo menos três casos de borda com os resultados esperados e sua estimativa de complexidade de tempo e espaço. Pode escrever a explicação nos comentários do arquivo, como no exercício anterior.

Distribuição sugerida: 5 minutos na parte fácil, 10 na média, 10 na difícil e 5 nos casos de borda e na explicação. Ao completar 30 minutos, envie o que conseguiu e indique onde ficou em dúvida, mesmo que ainda falte uma parte.
