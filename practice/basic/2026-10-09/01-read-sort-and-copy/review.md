---
type: coding-practice
date: 2026-10-09
session_exercise: 1
level: basic
language: TypeScript
topic: Array sorting and copying
status: awaiting-attempt
---

# Leitura de código

Reserve cerca de 10 minutos. Leia sem executar na primeira tentativa e explique seu raciocínio em inglês.

## Enunciado

```ts
const prices: number[] = [30, 5, 12];
const copy = [...prices];
const sorted = prices.sort((a, b) => a - b);
const doubled = sorted.map((price) => price * 2);

console.log(prices);
console.log(copy);
console.log(sorted === prices);
console.log(doubled);
```

O código está em [`exercise.ts`](exercise.ts).

Explique:

1. o que cada um dos quatro logs imprime;
2. como as operações produzem esses resultados;
3. o que aconteceria se o valor inicial de `prices` fosse `[]`.

## Resposta da the learner

Pendente.

## Referência e feedback

Serão registrados depois da resposta, preservando a tentativa original.
