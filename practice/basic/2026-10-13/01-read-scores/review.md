---
type: coding-practice
date: 2026-10-13
session_exercise: 1
level: basic
language: TypeScript
topic: Reading array operations
status: awaiting-attempt
---

# Ler código: processar pontuações

Reserve cerca de 8 minutos, incluindo o feedback. Faça a primeira leitura sem executar.

## Enunciado

```ts
const scores: number[] = [0, 8, -2, 5];
const selected = scores.filter((score) => score >= 0);
const adjusted = selected.map((score) => score + 1);
const total = adjusted.reduce((sum, score) => sum + score, 0);

console.log(scores);
console.log(selected);
console.log(adjusted);
console.log(total);
```

Código em [`exercise.ts`](exercise.ts).

Explique em inglês:

1. O que cada um dos quatro logs imprime?
2. Como cada operação contribui para o resultado?
3. Se `scores` começasse como `[]`, o código terminaria normalmente? Quais seriam as quatro saídas?

## Resposta da the learner

Pendente.

## Referência e feedback

Serão acrescentados depois da resposta. A referência ficará em arquivo separado e será reproduzida nesta documentação, junto com os comentários e verificações.
