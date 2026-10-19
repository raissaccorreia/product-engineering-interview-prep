# Leitura de código: pipeline de array

## Enunciado e contrato

Leia o código e informe, em inglês, o que cada `console.log` imprime, o que acontece em cada etapa e o que seria impresso se `amounts` começasse vazio.

O código filtra números positivos, cria rótulos com o índice de cada elemento filtrado e seleciona os dois primeiros rótulos. A entrada de exemplo é `[4, 0, -2, 7]`.

## Resposta original da the learner

> Let's get started with positive amounts.
>
> 1. We'll definitely filter by amount > 0, so positive amounts would be just an array containing 4 and 7.
> 2. Labels will get the 4 and 7 array, and we'll map to the amount index. It's like `["1:4","2:7"]`. This is labels.
> 3. The first two labels are the same because there are only two, so they will be the same as labels.
>
> Now, if `amounts` is empty, it will filter for values above zero, so `positive amounts` will also be an empty array. `labels` will also be an empty array, and the first two labels will also be an empty array. It will console log an empty array four times if it's empty from the beginning.

## Revisão

A filtragem foi entendida corretamente: `filter` mantém `4` e `7`, nessa ordem. Também foi correto concluir que `slice(0, 2)` contém os mesmos dois rótulos quando `labels` tem exatamente dois itens. O caso de entrada vazia está correto: as quatro chamadas exibem arrays vazios.

Há dois pontos a corrigir no caso normal:

- O primeiro `console.log` imprime `amounts` sem filtrar: `[4, 0, -2, 7]`.
- O índice recebido por `map` começa em zero e é contado dentro de `positiveAmounts`. Assim, os rótulos são `"0:4"` e `"1:7"`, não `"1:4"` e `"2:7"`.

`filter`, `map` e `slice` retornam novos arrays; essas chamadas não alteram `amounts`. `map` recebe cada valor e seu índice, enquanto `slice(0, 2)` usa o limite final exclusivo e seleciona os índices 0 e 1.

## Código de referência

```ts
const amounts = [4, 0, -2, 7];

const positiveAmounts = amounts.filter((amount) => amount > 0);
const labels = positiveAmounts.map((amount, index) => `${index}:${amount}`);
const firstTwoLabels = labels.slice(0, 2);

console.log(amounts); // [4, 0, -2, 7]
console.log(positiveAmounts); // [4, 7]
console.log(labels); // ["0:4", "1:7"]
console.log(firstTwoLabels); // ["0:4", "1:7"]
```

Arquivo separado: [reference.ts](reference.ts).

## Resultados esperados

| Entrada         | `amounts`       | `positiveAmounts` | `labels`         | `firstTwoLabels` |
| --------------- | --------------- | ----------------- | ---------------- | ---------------- |
| `[4, 0, -2, 7]` | `[4, 0, -2, 7]` | `[4, 7]`          | `["0:4", "1:7"]` | `["0:4", "1:7"]` |
| `[]`            | `[]`            | `[]`              | `[]`             | `[]`             |

As quatro chamadas de `console.log` exibem, na ordem, os quatro valores da tabela.

## Feedback sobre a explicação em inglês

A explicação ficou organizada em etapas e identificou as operações principais. Para ficar mais precisa, use “the index in the filtered array” ao falar do índice de `map` e percorra explicitamente os quatro logs na ordem. “Map to the amount index” ficou ambíguo: o callback recebe o valor e o índice como argumentos separados.
