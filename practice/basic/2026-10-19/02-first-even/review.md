# Correção de bug: primeiro número par

## Enunciado e contrato

Corrigir `firstEven` para retornar o primeiro número par na ordem da entrada, ou `undefined` quando nenhum valor for par. A função recebe uma lista somente para leitura e não deve alterá-la.

## Tentativa original da estudante

```ts
export function firstEven(values: readonly number[]): number | undefined {
  return values.some((value) => value % 2 === 0)[0] ?? undefined;
}
```

Explicação original da estudante:

> The fact is that, with `values.sum`, we already get all the even values. I added `0` between the square brackets so we can only get the first one. If getting the first one from this expression is falsy, it will return `undefined`, as requested. This will happen both when there is no even number and when there is no `values` array. I think this is enough to debug, if I'm not mistaken.

## Revisão

A estratégia pretendida ficou clara: identificar valores pares e devolver só o primeiro. O problema está no contrato da API escolhida. `some` verifica se existe pelo menos um elemento que satisfaz o callback e retorna `boolean`. Ele não retorna os elementos encontrados. Por isso, `[0]` tenta acessar uma posição de um booleano; o TypeScript rejeita essa expressão, e ela não recupera o primeiro número par.

APIs próximas, com resultados diferentes:

| API                 | Resultado                                         |
| ------------------- | ------------------------------------------------- |
| `some(predicate)`   | `boolean`: informa se existe uma correspondência  |
| `find(predicate)`   | O primeiro elemento correspondente ou `undefined` |
| `filter(predicate)` | Um array com todas as correspondências            |

Aqui, `find` representa diretamente o contrato. O valor `0` é par e será retornado como `0`; não se deve usar uma checagem de truthiness para decidir se o resultado existe. O retorno de `find` já é `undefined` quando não há correspondência. Um array vazio é uma entrada válida e também produz `undefined`. “Não há array” é diferente de receber `[]` e está fora do contrato, que exige um array.

## Código de referência

```ts
export function firstEven(values: readonly number[]): number | undefined {
  return values.find((value) => value % 2 === 0);
}
```

Arquivo separado: [reference.ts](reference.ts).

## Casos considerados

| Entrada        | Resultado   |
| -------------- | ----------- |
| `[]`           | `undefined` |
| `[1, 3]`       | `undefined` |
| `[1, 0, 4]`    | `0`         |
| `[1, 3, 8, 6]` | `8`         |

`find` visita elementos até encontrar o primeiro par ou chegar ao fim: tempo O(n) no pior caso. A função não cria nem modifica um array.

## Verificação

O typecheck estrito confirma que a tentativa não compila: `some` retorna `boolean`, que não pode ser indexado como um array. A referência passa no typecheck estrito. Os quatro casos da tabela foram executados contra a referência; os resultados corresponderam ao contrato.

## Feedback sobre a explicação em inglês

A explicação comunica sua intenção de pegar o primeiro resultado. Para descrever a API com precisão, chame o retorno de `some` de “a boolean” e diferencie “the input array is empty” de “there is no array”: a assinatura exige um array, que pode estar vazio. `values.sum` também não é o nome da expressão usada no código; mencione o método pelo identificador que aparece nele.
