---
type: coding-practice
date: 2026-10-07
exercise: 2
level: basic
language: TypeScript
topic: Maximum value and accumulator initialization
---

# Encontrar e corrigir um bug

## Enunciado

A função deve retornar o maior número do array ou `undefined` quando o array estiver vazio. Considere que todos os elementos são números finitos. A implementação original e a corrigida estão em [`solution.ts`](solution.ts).

## Minha resposta

> It will only work if the values array is populated with positive numbers. That would definitely be the biggest issue. And if I can use a standard function like `.max`, it would probably be a way to fix it in a much shorter type of code.
>
> `return values ? values.max : undefined`
>
> I don't remember if there is an `array.max` function or not, but I assume this function works if it's just an array of number type, if I'm not mistaken.
>
> The best corner cases to check are an array with `undefined`, an array without all numbers, and a string in the middle to test whether it crashes. The other option would be to include negative numbers as well, and a normal execution. That would be my four tests.

## Correção e explicação

O diagnóstico encontrou que a inicialização do acumulador importa. Mais precisamente, a implementação original funciona quando o máximo é zero ou positivo; falha quando **todos** os números são negativos, pois `result` começa em `0` e nenhum valor o substitui.

A implementação corrigida começa em `-Infinity`. Como o array não está vazio e todos os elementos são finitos, o primeiro valor e cada valor maior podem atualizar o resultado. O retorno vazio continua protegido pela verificação inicial.

Não existe `values.max` em arrays JavaScript. Há `Math.max(...values)`, mas a expressão `values ? ... : ...` não detecta array vazio: arrays, inclusive `[]`, são truthy. Além disso, `Math.max(...[])` resulta em `-Infinity`, então a checagem de vazio ainda é necessária para cumprir o contrato.

## Casos de teste sugeridos

| Entrada        | Resultado esperado | O que cobre                        |
| -------------- | ------------------ | ---------------------------------- |
| `[]`           | `undefined`        | Array vazio                        |
| `[-8, -3, -5]` | `-3`               | Todos negativos                    |
| `[0, -3, 7]`   | `7`                | Mistura de valores, incluindo zero |
| `[0]`          | `0`                | Único elemento                     |

`undefined` e strings estão fora do contrato `readonly number[]` e da premissa de valores finitos. Só inclua esses casos se o contrato da função também passar a aceitar ou validar entradas inválidas.

## Feedback da sessão

- **Correção:** o bug não exige que todos os valores sejam positivos; o problema específico ocorre quando o maior valor é negativo.
- **Raciocínio:** você reconheceu a influência do valor inicial, mas propôs `values.max`, que não é uma API de array. Se não lembrar o nome ou o contrato de uma API, sinalize a incerteza e confira antes de adotá-la.
- **Casos de borda:** negativos são relevantes; para uma função com contrato numérico, priorize entradas aceitas pelo contrato e associe cada exemplo a uma saída esperada.
- **Clareza em inglês:** seja específica sobre a condição exata da falha e use termos como _initial value_ e _expected result_. _Edge cases_ é mais comum que _corner cases_.
- A complexidade da implementação corrigida é `O(n)` no pior caso e `O(1)` de espaço auxiliar.
