---
type: coding-practice
date: 2026-10-15
session_exercise: 1
level: basic
language: TypeScript
topic: Reading Map operations
status: awaiting-attempt
---

# Ler código: consultar e atualizar quantidades

Reserve cerca de 15 minutos, incluindo o feedback. Faça a primeira tentativa sem executar o trecho.

## Enunciado

```ts
const quantities = new Map<string, number>([
  ["pen", 0],
  ["book", 2],
]);

const penCount = quantities.get("pen") ?? 5;
const missingCount = quantities.get("bag") ?? 5;

quantities.set("book", (quantities.get("book") ?? 0) + 1);

console.log(penCount);
console.log(missingCount);
console.log([...quantities.entries()]);
console.log(quantities.size);
```

Código em [`exercise.ts`](exercise.ts).

Explique em inglês:

1. O que cada um dos quatro logs imprime?
2. Como você chegou a esses resultados?
3. Se `quantities` fosse inicialmente um `Map<string, number>` vazio, o trecho terminaria normalmente? Quais seriam as quatro saídas?

## Resposta da the learner

Pendente.

## Referência e feedback

Serão acrescentados depois da resposta, mantendo a mensagem original e o código de referência em arquivo separado, com a documentação completa em Markdown.
