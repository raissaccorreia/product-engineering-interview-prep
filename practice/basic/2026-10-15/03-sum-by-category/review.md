---
type: coding-practice
date: 2026-10-15
session_exercise: 3
level: basic
language: TypeScript
topic: Summing amounts by category
status: reviewed-needs-correction
attempt_kind: pseudocode
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

[`attempt.ts`](attempt.ts) preserva o pseudocódigo enviado pela the learner, inclusive os comentários e as operações que ainda não são TypeScript válido. [`reference.ts`](reference.ts) contém a solução em um arquivo separado.

Envie a implementação e explique em inglês o raciocínio, a complexidade de tempo e espaço e três casos de borda com os resultados esperados.

## Resposta da the learner

Resposta original no chat:

> I did more like a pseudo-code I didn't even try to compile is more a hope that the functions work like that!

A the learner apresentou a tentativa como pseudocódigo e relatou não ter compilado. A revisão separa a intenção do algoritmo das operações concretas disponíveis em TypeScript.

## Código da tentativa

Código de [`attempt.ts`](attempt.ts), com os comentários e a lógica preservados:

```ts
export type Entry = {
  category: string;
  amount: number;
};

/** Starter for the implementation exercise. Awaiting the student's attempt. */
export function sumByCategory(entries: readonly Entry[]): Map<string, number> {
  let setSum = new Set<Entry>(entries);
  // this should create a set version of entries, so categories don't repeat now, maybe is not that simple

  for (const category of entries) {
    entries.get(category).reduce((sum) => amount + sum, 0); //find all category in entries and sum the amount occurances with reduce
    setSum.get(category).set(amount, count); // set the correct amount in the set
  }

  return setSum;
}
```

## Referência e feedback

A intenção descrita é agrupar por categoria e somar seus valores. Isso corresponde ao objetivo, mas um `Set<Entry>` não realiza esse agrupamento.

## Set de objetos e identidade

`new Set<Entry>(entries)` guarda os objetos do array. Objetos distintos continuam distintos mesmo quando têm a mesma propriedade `category`:

```ts
const entries: Entry[] = [
  { category: "food", amount: 10 },
  { category: "food", amount: -3 },
];

new Set(entries).size; // 2
```

O `Set` compara os objetos por referência; não escolhe uma propriedade como chave. Se o mesmo objeto aparecer duas vezes no array, o `Set` o guarda uma vez, mas este contrato exige somar o valor nas duas ocorrências. Portanto, eliminar objetos repetidos também não atende ao requisito.

Um `Map<string, number>` representa diretamente o resultado pedido: categoria como chave e total como valor.

## Tipos e operações

| Valor                     | O que contém                     | Operações relevantes                |
| ------------------------- | -------------------------------- | ----------------------------------- |
| `entries`                 | Um array de objetos `Entry`      | Iteração, `filter`, `map`, `reduce` |
| `new Set<Entry>(entries)` | Objetos distintos por referência | `add`, `has`, `size`                |
| `Map<string, number>`     | Categoria associada a um total   | `get`, `set`, `has`, `size`         |

Em `for (const category of entries)`, a variável chamada `category` recebe um objeto `Entry`, não a string de categoria. O nome da variável não transforma o valor. Usar `entry` deixa os acessos mais claros: `entry.category` e `entry.amount`.

`entries.get(category)` não existe porque `entries` é um array. Um `Set` também não tem os métodos `get` e `set` usados no pseudocódigo. As variáveis `amount` e `count` não foram declaradas; a quantidade numérica de cada objeto está em `entry.amount`.

Uma chamada de `reduce` produz um resultado que precisa ser utilizado; não grava automaticamente um total em outra estrutura. Nesta referência, a soma é atualizada diretamente no mapa a cada item, sem uma segunda busca por todos os objetos da categoria.

Retornar um `Set<Entry>` também não cumpre o tipo de retorno `Map<string, number>`.

## Solução de referência

Código de [`reference.ts`](reference.ts), que declara o próprio tipo para poder ser verificado sem importar a tentativa incompleta:

```ts
export type Entry = {
  category: string;
  amount: number;
};

export function sumByCategory(entries: readonly Entry[]): Map<string, number> {
  const totals = new Map<string, number>();

  for (const entry of entries) {
    const previousTotal = totals.get(entry.category) ?? 0;
    totals.set(entry.category, previousTotal + entry.amount);
  }

  return totals;
}
```

Para cada objeto, a função lê o total já associado à categoria, usa zero se ela ainda não existir e grava esse total mais `entry.amount`. Na entrada do enunciado, `food` passa de `0` para `10`, `tools` passa de `0` para `5` e `food` passa de `10` para `7`.

O código só lê os objetos e constrói um mapa novo. Uma categoria cujo total seja zero permanece no mapa.

## Casos de borda e verificações

| Entrada                                                  | Entradas esperadas do Map               |
| -------------------------------------------------------- | --------------------------------------- |
| `[]`                                                     | Nenhuma                                 |
| Exemplo do enunciado                                     | `["food", 7]`, `["tools", 5]`           |
| `[{ category: "", amount: 0 }]`                          | `["", 0]`                               |
| Duas entradas `food` com `2` e `-2`                      | `["food", 0]`                           |
| Categorias `Food`, `food` e `food` com `2`, `3` e `4`    | Três chaves distintas com esses valores |
| O mesmo objeto `{ category: "x", amount: 4 }` duas vezes | `["x", 8]`                              |

O typecheck estrito da tentativa apontou chamadas `get` inexistentes em array e `Set`, parâmetro implícito `any` no callback, identificadores `amount` e `count` não declarados e retorno incompatível com `Map` (`TS2339`, `TS7006`, `TS2304` e `TS2739`). Esses erros foram mantidos no arquivo da tentativa.

A referência passou nos seis casos da tabela com o array e seus objetos congelados, preservando a entrada, e passou no typecheck estrito com `noUncheckedIndexedAccess`. Também foram confirmados os exemplos de identidade do `Set`: dois objetos distintos com a mesma categoria permanecem como duas entradas; a mesma referência repetida é guardada uma vez.

## Avaliação, complexidade e inglês

Como pseudocódigo, os comentários comunicam a intenção de agrupar e somar. A estrutura precisa representar a chave de agrupamento explicitamente, e as operações precisam corresponder ao tipo de cada valor. A proposta não chegou a uma implementação executável.

A referência faz uma passagem pelas `n` entradas. No modelo usual de operações de mapa e comparação de chaves de custo constante, o tempo esperado é `O(n)`. Se o custo sobre os caracteres das categorias for contado, o tempo esperado é `O(n + L)`, com `L` sendo o total de caracteres processados. O resultado usa `O(k)` entradas para `k` categorias distintas; o espaço auxiliar além dele é constante.

Não é possível atribuir uma complexidade exata ao pseudocódigo com métodos indefinidos. Uma implementação que voltasse a percorrer todo o array para cada categoria ou item poderia levar a tempo quadrático. O acumulador por categoria evita essa repetição de trabalho.

Os três casos com resultados esperados e a complexidade não foram apresentados na resposta. Para completar a prática, confira entrada vazia, total que termina em zero e preservação dos objetos de entrada.

Os comentários em inglês ajudam a entender a hipótese sobre o `Set` e a intenção da soma. Para melhorar a precisão, diferencie _entry object_, _category key_ e _running total_. Revise a grafia _occurrences_ no comentário e a construção _maybe it's not that simple_. As sugestões não substituem a resposta original por uma versão reescrita.
