---
type: coding-practice
date: 2026-10-07
exercise: 3
level: basic
language: TypeScript
topic: Consecutive duplicates and array traversal
---

# Implementar uma função pequena

## Enunciado

Implemente `collapseConsecutive(values: readonly string[]): string[]`. Reduza cada sequência de strings consecutivas iguais a uma ocorrência, preserve a ordem, compare strings exatamente e não altere a entrada.

Exemplo:

```ts
collapseConsecutive(["red", "red", "blue", "red", "red"]);
// ["red", "blue", "red"]
```

A implementação de referência está em [`solution.ts`](solution.ts).

## Minha resposta

> The best way to implement this is to use a hash map. You create a data structure with a string and the position where it occurs in the array.
>
> When it reaches the first string, `"red"`, it puts `"red"` into the hash map at position 0. When it reaches the second `"red"`, it will already know there is a `"red"` at position 0 and will exclude it, for example, by using `slice`. I think `slice` works to remove it, or, if I'm not mistaken, to pop a specific position.
>
> As it moves forward, it will reach `"blue"` and add `"blue"` at position 1 because it's a new position. It will then move to `"red"` and check that there is a `"red"` at position 0, and it will do it again. That's the best way because it does it in linear time.
>
> The three edge cases I would check are an empty array, an array where all the words are the same, and an array of all different strings.

## Correção e explicação

A resposta propôs uma abordagem linear, mas o hash map descrito guardaria valores já vistos no array inteiro. Isso removeria também o último `"red"` do exemplo, mesmo que ele apareça depois de `"blue"`. O requisito só elimina repetições **consecutivas**.

Em cada passo, basta comparar o valor atual com o último valor guardado no resultado. Se forem diferentes, o valor começa uma nova sequência e é acrescentado. Assim, a repetição depois de `"blue"` permanece. A função cria um resultado novo e não modifica `values`.

`slice` cria uma cópia de parte do array; não remove um item do array original. `pop` remove apenas o último item. Nenhum deles é necessário nesta solução.

## Casos de borda com resultados

| Entrada             | Resultado esperado |
| ------------------- | ------------------ |
| `[]`                | `[]`               |
| `["a", "a", "a"]`   | `["a"]`            |
| `["a", "b", "c"]`   | `["a", "b", "c"]`  |
| `["a", "b", "a"]`   | `["a", "b", "a"]`  |
| `["", "", "a", ""]` | `["", "a", ""]`    |

A última entrada mostra que a string vazia também deve ser comparada como qualquer outra string, sem depender de truthiness.

## Feedback da sessão

- **Correção:** os três casos propostos são úteis, mas não distinguem deduplicação global de deduplicação consecutiva. `[`a`, `b`, `a`]` revela essa diferença.
- **Raciocínio:** complexidade linear é adequada. A estrutura de dados deve reter só o estado necessário para decidir se o valor atual continua a sequência anterior.
- **Implementação:** a resposta descreveu uma abordagem, mas não incluiu código. `slice` não remove elementos e `pop` remove o último.
- **Complexidade:** `O(n)` de tempo, `O(k)` para o array de saída (k grupos) e `O(1)` de espaço auxiliar adicional.
- **Clareza em inglês:** use _consecutive duplicates_ para as repetições adjacentes e diferencie de _previously seen values_. Declare a complexidade depois de confirmar que a regra da estrutura de dados corresponde ao requisito.
