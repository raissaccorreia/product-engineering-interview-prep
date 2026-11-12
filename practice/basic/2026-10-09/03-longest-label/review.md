---
type: coding-practice
date: 2026-10-09
session_exercise: 3
level: basic
language: TypeScript
topic: Selecting a string with stable tie handling
status: reviewed-needs-correction
---

# Implementar uma função pequena

Reserve cerca de 20 minutos, incluindo o feedback.

## Contrato

Implemente `longestLabel(labels: readonly string[]): string | undefined`.

- Retorne a string com o maior comprimento, medido por sua propriedade `length`.
- Em caso de empate, retorne a primeira dessas strings na entrada.
- Para um array vazio, retorne `undefined`.
- Strings vazias são entradas válidas.
- Preserve as strings exatamente como recebidas e não altere o array.

Exemplo:

```ts
longestLabel(["cat", "horse", "zebra"]);
// "horse"
```

Envie o código e explique em inglês seu raciocínio, a complexidade de tempo e espaço e três casos de borda com os resultados esperados.

[`attempt.ts`](attempt.ts) preserva o código enviado pela estudante, inclusive o comentário sobre a dúvida. [`reference.ts`](reference.ts) contém a correção em um arquivo separado.

## Resposta da estudante

Resposta original no chat:

> done without research on attempt.ts, with a comment from something I couldn't remember

O relato de ter realizado a tentativa sem pesquisa foi informado pela estudante. A resposta no chat não incluiu a explicação em inglês, os três casos de borda ou a complexidade solicitados.

## Código da tentativa

```ts
/** Starter for the implementation exercise. Awaiting the student's attempt. */
export function longestLabel(labels: readonly string[]): string | undefined {
  if (labels.length === 0) {
    return undefined;
  }

  let longestLength = 0;
  let longestPosition = 0;

  for (const label of labels) {
    if (label.length > longestLength) {
      longestPosition = i; // forgot how to get the iterator position from a for structure like this
      longestLength = label.length;
    }
  }

  return labels[longestPosition];
}
```

## O que estava correto

O algoritmo percorre as strings, mantém o maior comprimento e guarda a posição do resultado. A condição `>` só substitui a escolha quando encontra uma string estritamente maior; isso preserva a primeira ocorrência nos empates.

A verificação do array vazio retorna `undefined` conforme o contrato. Iniciar a posição em `0` também permite devolver a primeira string quando todas estão vazias. A função não altera a entrada.

## Referência e feedback

O typecheck estrito apresentou `TS2304: Cannot find name 'i'`. `i` não está declarado no código.

Em `for (const label of labels)`, `label` recebe cada valor do array. Esse loop não fornece um índice automaticamente. Para obter ambos, use `labels.entries()`, que produz pares `[índice, valor]`:

```ts
for (const [index, label] of labels.entries()) {
  // index é a posição; label é a string nessa posição.
}
```

A expressão `[index, label]` usa destructuring para extrair os dois elementos do par. Essa estrutura corrige a dúvida registrada no comentário e permite manter a estratégia escolhida.

## Solução de referência

Código de [`reference.ts`](reference.ts):

```ts
export function longestLabel(labels: readonly string[]): string | undefined {
  if (labels.length === 0) {
    return undefined;
  }

  let longestLength = 0;
  let longestPosition = 0;

  for (const [index, label] of labels.entries()) {
    if (label.length > longestLength) {
      longestPosition = index;
      longestLength = label.length;
    }
  }

  return labels[longestPosition];
}
```

O tempo é `O(n)`, pois há uma passagem pelas `n` strings e `length` já é uma propriedade da string. O espaço auxiliar é `O(1)`: a função mantém o comprimento e a posição, sem construir uma coleção proporcional à entrada.

## Casos de borda e resultados esperados

| Entrada                     | Resultado esperado | O que cobre                              |
| --------------------------- | ------------------ | ---------------------------------------- |
| `[]`                        | `undefined`        | Array vazio                              |
| `[""]`                      | `""`               | String vazia válida                      |
| `["", ""]`                  | `""`               | Empate entre strings vazias              |
| `["cat", "horse", "zebra"]` | `"horse"`          | Empate entre as maiores strings          |
| `["a", "aa", "bbb"]`        | `"bbb"`            | Maior string na última posição           |
| `[" cat ", "horse"]`        | `" cat "`          | Preservação de espaços e primeiro empate |

## Verificações executadas

A referência passou nos seis casos da tabela, preservou a entrada e passou no typecheck estrito com `noUncheckedIndexedAccess`.

A tentativa foi transpilada em memória para observar o comportamento apesar do erro de compilação. Retornou corretamente `undefined` para `[]` e `""` para `[""]`. No exemplo `["cat", "horse", "zebra"]`, lançou `ReferenceError: i is not defined` quando tentou atualizar a posição.

## Avaliação e inglês

A estratégia atende aos requisitos, mas a tentativa ainda precisa declarar e obter o índice para compilar. O erro é localizado e não exige trocar o algoritmo.

Os cuidados com o array vazio e o empate aparecem no código. Ainda faltou apresentar os casos com resultados esperados e explicar a complexidade.

O comentário em inglês comunica claramente a dúvida. Para explicar o raciocínio, descreva o significado de `longestLength` e `longestPosition` e por que a condição `>` mantém a primeira ocorrência. Termos úteis são _current index_, _longest length seen so far_ e _first occurrence in a tie_. Não há uma explicação completa no chat para avaliar sua clareza além desse comentário.
