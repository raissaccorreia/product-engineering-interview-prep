---
type: coding-practice
date: 2026-10-15
session_exercise: 3
level: basic
language: TypeScript
topic: Summing amounts by category
status: awaiting-attempt
---

# Implementar uma função: somar por categoria

Reserve cerca de 20 minutos, incluindo o feedback.

## Contrato

Implemente:

```ts
type Entry = {
  category: string;
  amount: number;
};

function sumByCategory(entries: readonly Entry[]): Map<string, number> {
  // Sua implementação
}
```

Retorne um `Map` em que cada chave seja uma categoria da entrada e cada valor seja a soma de todos os seus `amount`.

- Os valores de `amount` são números finitos; zero e negativos são válidos.
- Compare as categorias exatamente como recebidas, sem normalizar espaços ou letras. A string vazia também é uma categoria válida.
- Para um array vazio, retorne um `Map` vazio.
- Não altere o array de entrada nem seus objetos.

Exemplo:

```ts
sumByCategory([
  { category: "food", amount: 10 },
  { category: "tools", amount: 5 },
  { category: "food", amount: -3 },
]);
// Map com as entradas: ["food", 7] e ["tools", 5]
```

[`attempt.ts`](attempt.ts) contém somente os tipos, a assinatura inicial e um placeholder.

Envie a implementação e explique em inglês o raciocínio, a complexidade de tempo e espaço e três casos de borda com os resultados esperados.

## Resposta da the learner

Pendente.

## Referência e feedback

Serão acrescentados depois da tentativa, preservando o código e a resposta original. A referência terá um arquivo separado e também constará da documentação Markdown.
