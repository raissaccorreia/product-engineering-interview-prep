---
type: coding-practice
date: 2026-10-09
session_exercise: 1
level: basic
language: TypeScript
topic: Array sorting and copying
status: reviewed-needs-correction
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

## Resposta da estudante

Resposta original no chat:

> 1 and 2)
> prices [30, 5, 12], just the original array
> copy [30, 5, 12], and its copy
> false, compares sorted array with prices, sorted is done correctly [5, 12, 30] a completely different array that's why false
> doubled [10, 24, 60] sorted array multiplied by 2 element by element in a new array called doubled
>
> 3. I think so
>    prices = []
>    copy = []
>    sorted = []
>    double = []
>    These after the = sign would be the console out, I might be wrong but I think that's it

Foi uma resposta de leitura; não houve implementação enviada. O trecho de referência do enunciado permanece em `exercise.ts`.

## Referência e feedback

A saída correta é:

```ts
[5, 12, 30][(30, 5, 12)];
true[(10, 24, 60)];
```

`sort` altera o array recebido e retorna esse mesmo array. Portanto, `prices` fica ordenado e `sorted === prices` é `true`. O operador `===` compara a identidade dos arrays. O fato de o conteúdo ter mudado não cria outro array.

`copy` foi criado com `[...prices]` antes da ordenação e é um array diferente. Como os elementos são números, mantém os valores e a ordem originais. `map` cria outro array com o dobro de cada valor de `sorted`, por isso a previsão de `doubled` estava correta.

Com `prices = []`, a execução termina normalmente e os quatro logs imprimem:

```ts
[]
[]
true
[]
```

O terceiro log continua sendo uma comparação booleana, não a impressão de `sorted`. Mesmo vazio, `sort` retorna o próprio array `prices`.

## Referência em arquivo separado

[`reference.ts`](reference.ts) contém o trecho com as saídas anotadas:

```ts
const prices: number[] = [30, 5, 12];
const copy = [...prices];
const sorted = prices.sort((a, b) => a - b);
const doubled = sorted.map((price) => price * 2);

console.log(prices); // [5, 12, 30]
console.log(copy); // [30, 5, 12]
console.log(sorted === prices); // true
console.log(doubled); // [10, 24, 60]
```

## Avaliação e inglês

- A cópia e `doubled` foram previstos corretamente. O comportamento de `sort` e a comparação de identidade precisam de revisão.
- O raciocínio sobre `map` criar um array novo estava correto. A mesma hipótese foi aplicada a `sort`, mas cada método tem seu próprio contrato.
- O caso vazio não lança erro. Faltou seguir a expressão exata do terceiro log, que continua imprimindo um booleano.
- A explicação em inglês é compreensível. Diferencie _same array reference_ de _a new array_ e use _sorts in place_ para indicar a mutação. Mantenha o identificador `doubled` também ao explicar o caso vazio. Não é necessário reescrever sua resposta.

O ponto para revisar é a diferença entre métodos que alteram o array e métodos que retornam outro array, além da comparação de referências com `===`.

## Verificação da referência

O trecho foi executado em memória com a entrada original e com o array vazio. Os quatro logs corresponderam às saídas documentadas nos dois casos. O arquivo de referência também passou no typecheck estrito.
