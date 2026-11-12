---
type: coding-practice
date: 2026-10-13
session_exercise: 1
level: basic
language: TypeScript
topic: Reading array operations
status: reviewed-needs-correction
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

## Resposta da estudante

Resposta original no chat:

> scores prints the original array [0, 8, -2, 5]
> selected prints the array without the -2 because it was filtered
> adjusted prints [1,9,-1, 6] because map creates a new array sum 1 to each element
> and total print the sum of the whole array in adjusted so it prints 15. because score starts at zero and it increases by sum, that iterates every element at a time.
> If it was [] the consoles would be [], [], [] e 0 would finish normally

Esta foi uma resposta de leitura, sem implementação enviada. O código apresentado permanece em [`exercise.ts`](exercise.ts).

## Referência e feedback

As saídas corretas são:

```ts
[0, 8, -2, 5][(0, 8, 5)][(1, 9, 6)];
16;
```

Você acertou que `scores` permanece inalterado e que o filtro remove `-2`. O `map` é chamado sobre `selected`, não sobre `scores`. Portanto, o número negativo já não participa dessa transformação; o resultado tem três elementos.

O raciocínio de somar os elementos de `adjusted` estava correto. O resultado `15` é consistente com o array incorreto previsto na resposta, mas o array real é `[1, 9, 6]`, cuja soma é `16`.

No callback de `reduce`, `sum` é o acumulador e começa com o valor inicial `0`; `score` é o elemento atual de `adjusted`. As etapas são `0 + 1 = 1`, `1 + 9 = 10` e `10 + 6 = 16`.

## Referência em arquivo separado

Código de [`reference.ts`](reference.ts):

```ts
const scores: number[] = [0, 8, -2, 5];
const selected = scores.filter((score) => score >= 0);
const adjusted = selected.map((score) => score + 1);
const total = adjusted.reduce((sum, score) => sum + score, 0);

console.log(scores); // [0, 8, -2, 5]
console.log(selected); // [0, 8, 5]
console.log(adjusted); // [1, 9, 6]
console.log(total); // 16
```

## Caso vazio

A previsão estava correta. O código termina normalmente e imprime `[]`, `[]`, `[]` e `0`. O valor inicial explícito de `reduce` permite retornar `0` quando não há elementos.

## Avaliação e inglês

- As previsões de `scores`, `selected` e do caso vazio estavam corretas. O ajuste necessário é acompanhar qual array cada etapa recebe.
- A explicação identificou que `map` cria um array e que `reduce` soma os valores. Faltou distinguir o acumulador `sum` do elemento atual `score`.
- O caso de borda vazio foi tratado corretamente, inclusive o retorno numérico do último log.
- A resposta em inglês é compreensível. Para maior precisão, use _adds 1_ para a transformação e diferencie _accumulator_ de _current element_. Confira também a concordância em _total prints_. Não é necessário reescrever a resposta completa.

## Verificações

O código foi transpilado e executado em memória com a entrada original e com `[]`. Os quatro logs corresponderam às saídas documentadas nos dois casos. A referência também passou no typecheck estrito com `noUncheckedIndexedAccess`.
