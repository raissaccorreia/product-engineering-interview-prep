---
type: coding-practice
date: 2026-10-15
session_exercise: 1
level: basic
language: TypeScript
topic: Reading Map operations
status: reviewed-correct
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

Resposta original no chat:

> Because `pen` has its own quantity, `penCount` is going to be 0 because it's a valid number. It exists, so it's not `null` or `undefined`, and we will not get `resolved` to 5.
>
> For the first `console.log`, we return 0. For the second one, `missingCount`, because there is no `bag` in the map, it will return 5.
>
> For `quantity.entries`, that's interesting. Let me think: `quantity.book` is 2 + 1 = 3, so you will set `book` to 3. It's `pen: 0` and `book: 3` in `quantity.entries`, and `quantities.size` would be 2.
>
> if it was empty map. penCount = 5, missingCount = 5, quantities would be set to ["book", 1], and size would be 1 it would execute normally I think.

Foi uma resposta de leitura, sem implementação enviada. O código original permanece em [`exercise.ts`](exercise.ts).

## Referência e feedback

As quatro previsões estão corretas:

```ts
0;
(5)[(["pen", 0], ["book", 3])];
2;
```

`get("pen")` retorna `0`, e `??` preserva esse valor porque ele não é `null` nem `undefined`. Para `"bag"`, `get` retorna `undefined`, então a expressão usa `5`.

A atualização de `"book"` lê a contagem `2`, acrescenta `1` e grava `3` na mesma chave. Isso não aumenta o tamanho do mapa. `[...quantities.entries()]` converte os pares de entradas em um array, mantendo a ordem das chaves existentes.

Consultar uma chave ausente com `get` não a insere. O fallback também não modifica o mapa: ele apenas determina o valor atribuído à variável.

## Caso do mapa vazio

A previsão também está correta. A execução termina normalmente e imprime:

```ts
5;
(5)[["book", 1]];
1;
```

As duas consultas usam o fallback `5`. A chamada de `set` insere somente `"book"`, com o valor `1`, então o mapa termina com uma entrada.

## Referência em arquivo separado

Código de [`reference.ts`](reference.ts):

```ts
const quantities = new Map<string, number>([
  ["pen", 0],
  ["book", 2],
]);

const penCount = quantities.get("pen") ?? 5;
const missingCount = quantities.get("bag") ?? 5;

quantities.set("book", (quantities.get("book") ?? 0) + 1);

console.log(penCount); // 0
console.log(missingCount); // 5
console.log([...quantities.entries()]); // [["pen", 0], ["book", 3]]
console.log(quantities.size); // 2
```

## Avaliação e inglês

As saídas e o raciocínio estão corretos. A resposta distinguiu zero de ausência, acompanhou a atualização de uma chave existente e previu corretamente o caso vazio, inclusive o tamanho final.

Para deixar a explicação em inglês mais precisa, use _falls back to_ em vez de _get resolved to_. `console.log` imprime ou registra o valor; ao descrevê-lo, prefira _prints_ ou _logs_ a _returns_. Mantenha o identificador `quantities` e evite apresentar `quantity.book` como acesso a uma entrada do `Map`: descreva o valor associado à chave `"book"` ou use `quantities.get("book")`.

Os pares descritos na resposta estão corretos; a representação exata do terceiro log é um array de pares por causa do spread sobre `entries()`. Não é necessário reescrever a resposta completa.

## Verificações

O trecho foi transpilado e executado em memória com o mapa original e com um mapa inicialmente vazio. Os quatro logs corresponderam às previsões nos dois cenários. A referência também passou no typecheck estrito com `noUncheckedIndexedAccess`.
