---
type: coding-practice
date: 2026-10-09
session_exercise: 2
level: basic
language: TypeScript
topic: Arithmetic mean
status: awaiting-attempt
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

[`attempt.ts`](attempt.ts) contém inicialmente o código do enunciado, para edição durante a tentativa. Ainda não representa uma solução enviada pela the learner.

## Resposta da the learner

Pendente.

## Referência e feedback

Serão documentados depois da resposta, mantendo tentativa e referência em arquivos separados.
