---
type: coding-practice
date: 2026-10-13
session_exercise: 2
level: basic
language: TypeScript
topic: Selecting array elements
status: reviewed-needs-correction
---

# Corrigir um bug: selecionar os primeiros elementos

Reserve cerca de 12 minutos, incluindo o feedback.

## Contrato

`takeFirst` deve retornar um novo array com os primeiros `count` elementos, na ordem original. Se `count` for maior que o tamanho da entrada, retorne todos os elementos. O array recebido deve permanecer inalterado.

Considere que `count` é sempre um inteiro maior ou igual a zero e que todos os elementos são strings.

```ts
function takeFirst(values: string[], count: number): string[] {
  return values.splice(0, count);
}
```

Exemplo de comportamento esperado:

```ts
const input = ["a", "b", "c"];
const result = takeFirst(input, 2);
// result: ["a", "b"]
// input: ["a", "b", "c"]
```

Encontre e corrija o bug. [`attempt.ts`](attempt.ts) preserva a tentativa enviada pela the learner. A solução de referência está em [`reference.ts`](reference.ts).

Explique em inglês o problema, por que sua correção funciona e a complexidade de tempo e espaço. Apresente três casos com o retorno esperado e o estado esperado da entrada depois da chamada.

## Resposta da the learner

Resposta original no chat:

> nao cria um array novo, agora eu corrigi e cria, complexidade linear. takeFirst vazio, count 0 e count > values.length

## Código da tentativa

Código de [`attempt.ts`](attempt.ts), com a lógica preservada:

```ts
/** Original exercise implementation. Awaiting the student's correction. */
export function takeFirst(values: string[], count: number): string[] {
  let newArray = values.splice(0, count);
  return newArray;
}

console.log(takeFirst(["a", "b", "c"], 4));
```

## Referência e feedback

A tentativa compila, mas continua alterando o array de entrada. A versão inicial já retornava um array novo: `splice` retorna um array com os elementos removidos e também modifica o array sobre o qual foi chamado.

Guardar esse retorno em `newArray` apenas dá um nome ao resultado da mesma operação. Não muda seu efeito sobre `values`.

Exemplo com a tentativa:

```ts
const input = ["a", "b", "c"];
const result = takeFirst(input, 2);
// result: ["a", "b"]
// input: ["c"] — o contrato exigia ["a", "b", "c"]
```

Portanto, a hipótese de que a função original não criava um novo array estava incorreta. O problema era a alteração da entrada.

## Solução de referência

`slice(0, count)` copia o intervalo do índice `0` até antes de `count` e preserva o array recebido. Se o limite ultrapassar o tamanho do array, a cópia termina no último elemento disponível.

Código de [`reference.ts`](reference.ts):

```ts
export function takeFirst(values: string[], count: number): string[] {
  return values.slice(0, count);
}
```

## Casos e verificações

A revisão executou a função da tentativa isoladamente, transpilada em memória. A entrada era um array novo em cada caso.

| Entrada           | `count` | Retorno da tentativa | Entrada depois da tentativa | Preserva a entrada? |
| ----------------- | ------- | -------------------- | --------------------------- | ------------------- |
| `[]`              | `2`     | `[]`                 | `[]`                        | Sim                 |
| `["a", "b", "c"]` | `0`     | `[]`                 | `["a", "b", "c"]`           | Sim                 |
| `["a", "b", "c"]` | `4`     | `["a", "b", "c"]`    | `[]`                        | Não                 |
| `["a", "b", "c"]` | `2`     | `["a", "b"]`         | `["c"]`                     | Não                 |

O retorno é um array diferente da entrada nos quatro casos. Os valores retornados estão corretos; a violação está no estado final da entrada quando há elementos removidos.

A referência passou nos quatro casos, retornou um novo array em todos eles e preservou a entrada. A tentativa e a referência passaram individualmente no typecheck estrito.

## Avaliação e complexidade

Os casos de borda escolhidos são pertinentes: array vazio, `count = 0` e `count` maior que o tamanho. Faltou apresentar entradas concretas com os resultados esperados e conferir o array original depois de cada chamada. No código enviado, há apenas um `console.log` com `count = 4`, que mostra o retorno e não mostra a entrada depois da operação.

A afirmação de complexidade linear é adequada no pior caso, mas não foi apresentada a complexidade de espaço solicitada. Para a referência, com `k = min(count, values.length)`, a cópia leva `O(k)` tempo e ocupa `O(k)` espaço para o resultado, com custo constante para o caso vazio. O espaço auxiliar além do retorno é constante. No pior caso, `k` é o tamanho da entrada, portanto tempo e espaço do resultado são `O(n)`.

A resposta desta rodada veio em português, então não há uma explicação em inglês para avaliar. Na próxima, explique em inglês qual era o efeito da operação sobre a entrada e como conferiu o contrato. Termos úteis são _returns a new array_ e _modifies the original array_; as duas propriedades podem ocorrer na mesma chamada.
