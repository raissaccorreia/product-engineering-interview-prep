---
type: coding-practice
date: 2026-10-09
session_exercise: 2
level: basic
language: TypeScript
topic: Arithmetic mean
status: reviewed-needs-correction
---

# Encontrar e corrigir bugs na média

Reserve cerca de 15 minutos, incluindo o feedback. A função deve retornar a média aritmética dos valores ou `undefined` para um array vazio. Considere que todos os elementos são números finitos. Não altere o array de entrada.

## Enunciado

```ts
function average(values: readonly number[]): number | undefined {
  let total = 0;
  let count = 0;

  for (const value of values) {
    if (value) {
      total += value;
      count++;
    }
  }

  return total / count;
}
```

Encontre os bugs e envie a função corrigida. Explique em inglês por que a correção funciona, apresente três entradas com resultados esperados e informe a complexidade de tempo.

[`attempt.ts`](attempt.ts) preserva a implementação e as chamadas enviadas pela estudante. A correção está no arquivo separado [`reference.ts`](reference.ts).

## Resposta da estudante

Resposta original no chat:

> 1. I only changed the line return count === 0 ? 0 : total / count; because if there are no valid numbers it will divide by zero, and return nan instead of zero is not the concept of average
> 2. it's linear
> 3. I used the three on the attempt.ts file

## Código da tentativa

O código abaixo preserva a lógica da tentativa e suas quatro chamadas, com a formatação ajustada:

```ts
/** Original exercise implementation. Awaiting the student's correction. */
export function average(values: readonly number[]): number | undefined {
  let total = 0;
  let count = 0;

  for (const value of values) {
    if (value) {
      total += value;
      count++;
    }
  }

  return count === 0 ? 0 : total / count;
}

console.log(average([]));
console.log(average([1, 2, 3]));
console.log(average([32, -4, 0, 7]));
console.log(average(undefined));
```

## Referência e feedback

Você identificou corretamente que o código inicial pode calcular `0 / 0`, cujo resultado é `NaN`. A complexidade de tempo linear também está correta.

Há dois ajustes necessários:

- O contrato define `undefined` para um array vazio. Trocar `NaN` por `0` evita aquele resultado, mas ainda descumpre o comportamento solicitado.
- `if (value)` ignora o número `0` porque ele é falsy. Zero é um número válido e precisa contar no denominador da média. Todos os elementos já são considerados finitos pelo contrato; o loop não precisa filtrar números por truthiness.

Em `[32, -4, 0, 7]`, a soma é `35`. A tentativa conta apenas três valores e retorna `35 / 3`; o correto é dividir por quatro e retornar `8.75`.

O caso vazio precisa ser identificado pela entrada vazia, não pela ausência de valores truthy. Um array como `[0, 0]` contém dois números válidos.

## Solução de referência

Implementação de [`reference.ts`](reference.ts):

```ts
export function average(values: readonly number[]): number | undefined {
  if (values.length === 0) {
    return undefined;
  }

  let total = 0;

  for (const value of values) {
    total += value;
  }

  return total / values.length;
}
```

A referência soma todos os elementos e usa o tamanho do array como quantidade. A verificação inicial evita a divisão por zero e atende ao retorno exigido. O tempo é `O(n)` e o espaço auxiliar é `O(1)`.

## Casos e resultados observados

As verificações executaram a função isolada, transpilada em memória, sem os `console.log` do arquivo:

| Entrada          | Resultado da tentativa | Esperado    | Resultado |
| ---------------- | ---------------------- | ----------- | --------- |
| `[]`             | `0`                    | `undefined` | Falhou    |
| `[1, 2, 3]`      | `2`                    | `2`         | Passou    |
| `[32, -4, 0, 7]` | `11.666666666666666`   | `8.75`      | Falhou    |
| `[0, 10]`        | `10`                   | `5`         | Falhou    |

A entrada permaneceu inalterada nos quatro casos. A última entrada foi acrescentada na revisão para isolar o efeito do zero na contagem.

A referência passou nesses quatro casos e em `[0, 0]`, cuja média é `0`, preservando a entrada. Também passou no typecheck estrito com `noUncheckedIndexedAccess`.

O arquivo também chama `average(undefined)`. Essa entrada está fora do contrato `readonly number[]`; ela causa `TypeError` em runtime. O typecheck estrito da tentativa apresentou `TS2345` nessa chamada. Não é necessário ampliar o contrato para aceitar `undefined` neste exercício.

## Avaliação e explicação em inglês

O raciocínio identificou o resultado inválido no caso vazio e acertou a complexidade. Faltou confrontar a correção com o retorno pedido e conferir todos os valores aceitos pelo contrato, inclusive zero.

Você escolheu casos úteis, especialmente a mistura de positivos, negativos e zero. As chamadas precisam ser acompanhadas dos resultados esperados; imprimir um resultado não confirma que ele está correto. A resposta citou três casos, e o arquivo contém três arrays mais uma chamada com `undefined`.

Na explicação em inglês, a expressão _no valid numbers_ precisa de precisão: zero é válido, e todos os elementos são números finitos por premissa. Use _empty array_ quando estiver explicando essa entrada e _arithmetic mean_ para identificar a operação. Escreva `NaN` com essa capitalização. Acrescente o resultado esperado ao comentar cada exemplo, sem reescrever sua resposta original.
