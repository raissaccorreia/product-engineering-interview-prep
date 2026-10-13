---
type: coding-practice
date: 2026-10-13
session_exercise: 2
level: basic
language: TypeScript
topic: Selecting array elements
status: awaiting-attempt
---

# Corrigir um bug: selecionar os primeiros elementos

Reserve cerca de 12 minutos, incluindo o feedback.

## Contrato

`takeFirst` deve retornar um novo array com os primeiros `count` elementos, na ordem original. Se `count` for maior que o tamanho da entrada, retorne todos os elementos. O array recebido deve permanecer inalterado.

Considere que `count` é sempre um inteiro maior ou igual a zero e que todos os elementos são strings.

```ts
function takeFirst(values: string[], count: number): string[] {
  return values.splice(0, count);
}
```

Exemplo de comportamento esperado:

```ts
const input = ["a", "b", "c"];
const result = takeFirst(input, 2);
// result: ["a", "b"]
// input: ["a", "b", "c"]
```

Encontre e corrija o bug. [`attempt.ts`](attempt.ts) contém inicialmente o código do enunciado, para edição durante a tentativa; ainda não representa uma solução enviada pela the learner.

Explique em inglês o problema, por que sua correção funciona e a complexidade de tempo e espaço. Apresente três casos com o retorno esperado e o estado esperado da entrada depois da chamada.

## Resposta da the learner

Pendente.

## Referência e feedback

Serão acrescentados depois da resposta, mantendo a tentativa e a referência em arquivos separados e reproduzindo ambas em Markdown.
