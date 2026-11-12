# Implementação: contar palavras longas

## Enunciado e contrato

Implementar `countLongWords(words, minLength)` para contar quantas palavras têm comprimento estritamente maior que `minLength`. A função retorna um número e recebe uma lista somente para leitura.

## Tentativa original da estudante

Código original, incluindo os comentários explicativos e chamadas de exemplo:

```ts
export function countLongWords(words: readonly string[], minLength: number): number {
  return words.filter((word) => word.length > minLength).length ?? 0;
}
//The reasoning behind the code is pretty simple: I will filter the words by the length of each component in the array. That's why I chose that filter. Inside that filter, I check whether the word length is greater than the minimum length.
//After that, I check the length of the whole array and add `? 0` to make sure you always return at least 0. Let me check if this is exactly what you asked. Yes, correct. This single line solves the function.
//I decided to test these four cases:
//- an empty array
//- 0
//- -1
//- 4 as the minimum length of the string
console.log(countLongWords(["abelha", "oie", "beterraba"], 4));
console.log(countLongWords([], 4));
console.log(countLongWords(["abelha", "oie", "beterraba"], 0));
console.log(countLongWords(["abelha", "oie", "beterraba"], -1));
```

Arquivo separado: [attempt.ts](attempt.ts).

## Revisão

A implementação está correta. `filter` cria uma lista com as palavras que passam no predicado, e `length` conta quantas foram selecionadas. A comparação `>` também implementa corretamente “maior que”: uma palavra com exatamente `minLength` caracteres não entra na contagem.

O `?? 0` é redundante. A propriedade `length` de um array sempre retorna um número, inclusive quando o array está vazio; ela não pode ser `null` ou `undefined`. Portanto, `length ?? 0` sempre resulta no próprio `length`.

Os quatro exemplos existentes produzem, na ordem, `2`, `0`, `3` e `3`. O caso do array vazio está coberto. Os limites `0` e `-1` também funcionam para as palavras usadas, mas não verificam a igualdade com `minLength`: faltou incluir uma palavra cujo tamanho seja exatamente o limite. Por exemplo, com `words = ["four", "abcde"]` e `minLength = 4`, o resultado deve ser `1`.

## Código de referência

```ts
export function countLongWords(words: readonly string[], minLength: number): number {
  return words.filter((word) => word.length > minLength).length;
}
```

Arquivo separado: [reference.ts](reference.ts).

## APIs e complexidade

`filter` retorna um novo array contendo os elementos que satisfazem o predicado. Como a função só precisa da contagem, não é necessário guardar esse array em uma variável; usar diretamente `.length` deixa o fluxo curto e legível. Isso leva O(n) de tempo e até O(n) de espaço para o array filtrado.

Uma alternativa com um contador e um `for...of` também leva O(n) de tempo, usando O(1) de espaço auxiliar. Essa alternativa evita criar uma lista temporária, mas a solução com `filter` está correta e é uma forma simples de expressar “filtrar e contar”.

## Verificação

O typecheck estrito passa na tentativa e na referência. A referência foi executada com os quatro exemplos originais e com o caso de limite `["four", "abcde"]`, `minLength = 4`; os resultados foram `2`, `0`, `3`, `3` e `1`.

## Feedback sobre a explicação em inglês

A explicação acompanha a implementação e deixa claro por que foi escolhido `filter`. Para precisão, “each component” é vago nesse contexto; refira-se a cada palavra. Ao explicar `?? 0`, descreva o valor que está sendo verificado: `.length` sempre é numérico, então o fallback não é usado. Inclua também que `>` exclui palavras com comprimento exatamente igual a `minLength`.
