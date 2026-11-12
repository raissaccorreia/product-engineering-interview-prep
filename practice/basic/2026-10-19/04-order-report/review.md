# Revisão do relatório de pedidos

Tentativa enviada após 30 minutos. A parte fácil tem a lógica correta. A parte média expressa a intenção de somar por cliente, mas mistura arrays com mapas e não compila. A parte difícil ficou em uma hipótese de API e não foi implementada.

## Enunciado e contrato

Implementar `buildOrderReport(orders)` para produzir `activeCount`, `activeTotal`, `totalsByCustomer: Map<string, number>` e `topCustomer`, contendo cliente e total ou `undefined`. Somente pedidos com `cancelled: false` participam. Zero e valores negativos são válidos. Compare clientes exatamente e preserve a entrada e seus objetos.

Em caso de empate no maior total final, vence o cliente que apareceu primeiro entre os pedidos ativos. Sem pedidos ativos, os contadores são zero, o mapa é vazio e `topCustomer` é `undefined`. O [enunciado original](README.md) inclui os tipos e a entrada de exemplo.

## Resposta original da estudante

> Well, I did my best in half an hour, and this is what I could make with the comments as reference. all on exercise.ts

A tentativa completa, incluindo os comentários e a chamada de exemplo, foi copiada de `exercise.ts` para [attempt.ts](attempt.ts) sem alterar seus bytes. O arquivo `exercise.ts` voltou ao enunciado inicial.

```ts
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
```

## Feedback por etapa

### Parte fácil

`filter((order) => !order.cancelled)` seleciona corretamente os pedidos ativos. `activeOrders.length` conta esses pedidos, e `reduce((acc, order) => order.amount + acc, 0)` soma seus valores, incluindo zero e estornos. No exemplo, essas expressões produzem `4` e `30`; sem pedidos ativos, produzem `0` e `0`.

Essas expressões estão corretas, mas a função completa não chega a devolver um relatório válido: as linhas anteriores têm erros de tipo e um identificador inexistente.

### Parte média

Você descreveu a intenção de obter os nomes e somar os pedidos de cada cliente. A expressão com `filter` seguido de `reduce` representa essa soma, mas os dados usados por ela não têm o formato esperado.

- `activeOrders.map(...)` já retorna um array de strings. `new Array(activeOrders.map(...))` cria um array que contém esse array como único elemento. Assim, `customer` no próximo `map` seria um array de nomes, enquanto `order.customer` é uma string.
- Mesmo removendo `new Array`, os nomes estariam repetidos. `map` preserva a quantidade de posições; ele não agrupa clientes.
- `customersAmount` é declarado, mas a linha seguinte usa `customerAmount`, que não existe.
- `new Array([customers, customerAmount])` produz outro array aninhado. Ele não cria o `Map<string, number>` exigido pelo contrato.

Para acumular por chave, a referência usa um mapa: `get(customer)` lê o total anterior, `?? 0` trata a chave ainda ausente e `set(customer, total)` grava o novo total. Esse padrão evita buscar todos os pedidos novamente para cada cliente.

### Parte difícil

Arrays não têm método `.max()`. Além disso, a comparação deve usar o total final de cada cliente e preservar a regra de desempate. O `topCustomer` calculado na tentativa não seria usado no retorno: o objeto `report` contém explicitamente `topCustomer: undefined`.

A referência primeiro termina as somas. Depois compara os totais finais. O mapa mantém a ordem da primeira inserção de cada chave, que aqui corresponde ao primeiro pedido ativo de cada cliente. Atualizar um total existente não muda essa ordem. Trocar o líder apenas quando o próximo total é estritamente maior preserva o primeiro cliente em caso de empate.

O líder começa como `undefined`, para que totais negativos também possam vencer. Comparar totais parciais durante a soma exige mais cuidado: estornos posteriores podem reduzir o total de um cliente que estava na liderança.

## Referência

```ts
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
  let activeCount = 0;
  let activeTotal = 0;
  const totalsByCustomer = new Map<string, number>();

  for (const order of orders) {
    if (order.cancelled) continue;

    activeCount += 1;
    activeTotal += order.amount;
    const previousTotal = totalsByCustomer.get(order.customer) ?? 0;
    totalsByCustomer.set(order.customer, previousTotal + order.amount);
  }

  let topCustomer: OrderReport["topCustomer"] = undefined;

  for (const [customer, total] of totalsByCustomer) {
    if (topCustomer === undefined || total > topCustomer.total) {
      topCustomer = { customer, total };
    }
  }

  return { activeCount, activeTotal, totalsByCustomer, topCustomer };
}
```

Arquivo separado: [reference.ts](reference.ts).

## Casos de borda e complexidade

A tentativa não registrou os três casos de borda nem uma estimativa de complexidade. A chamada de exemplo é útil, mas não cobre entrada vazia, somente cancelados, totais negativos ou desempate.

Na abordagem pretendida de filtrar novamente todos os pedidos para cada nome, a soma por cliente pode custar O(n²). Como o código atual não compila, essa é uma avaliação da estratégia descrita, não de uma execução correta da tentativa.

A referência percorre os pedidos e depois os clientes distintos: O(n + k) de tempo sob o custo usual de operações de `Map`, equivalente a O(n), pois k ≤ n. Usa O(k) de espaço para o mapa e O(1) adicional fora do resultado. A análise trata nomes como chaves de custo unitário.

## Verificação

O typecheck estrito da tentativa retornou TS2367 (comparação de string com array de strings), TS2552 (`customerAmount` inexistente), TS2339 (`.max()` ausente) e TS2322 (array no campo que exige `Map`). A referência passou no mesmo typecheck.

Oito casos da referência passaram com arrays e objetos congelados: entrada vazia; exemplo original; somente cancelados; todos os totais negativos; empate em zero; primeiro pedido cancelado sem prioridade no desempate; empate alcançado após pedidos adicionais; estorno que muda o líder. Os resultados incluíram contagem, soma, entradas do mapa, líder e preservação da entrada.

## Explicação em inglês

Os comentários ajudam a identificar a intenção e reconhecem onde faltou tempo. Em vez de “self explanatory”, descreva o dado produzido pela expressão e o tipo esperado no passo seguinte. “Customer names” é mais preciso para o array de nomes; “total per customer” identifica a soma por chave. Ao ter dúvida sobre uma API, diga qual operação você precisa executar, por exemplo comparar os totais finais, e registre a dúvida de sintaxe separadamente. Não é necessário chamar o código de complexo para explicar seu funcionamento.

## Revisão autônoma

Priorize três pontos: um `map` já retorna um array; `Map` armazena valores por chave com `get` e `set`; o maior total deve ser escolhido depois de concluir as somas. Refaça primeiro a acumulação por cliente e depois a seleção do líder, incluindo empate e estorno.
