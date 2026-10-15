---
type: coding-practice
date: 2026-10-15
session_exercise: 2
level: basic
language: TypeScript
topic: Removing matching labels
status: awaiting-attempt
---

# Corrigir um bug: remover um rótulo

Reserve cerca de 20 minutos, incluindo o feedback.

## Contrato

`withoutLabel` deve retornar um novo array com todas as strings que sejam diferentes de `target`, preservando sua ordem original.

- Todas as ocorrências iguais a `target` devem ser excluídas do resultado.
- Compare as strings exatamente como recebidas, inclusive maiúsculas e espaços.
- O array de entrada deve permanecer inalterado.
- O retorno deve ser um array novo, mesmo quando nenhuma string corresponder ao alvo.

```ts
function withoutLabel(labels: string[], target: string): string[] {
  const index = labels.indexOf(target);

  if (index >= 0) {
    labels.splice(index, 1);
  }

  return labels;
}
```

Exemplo de comportamento esperado:

```ts
const labels = ["red", "blue", "red"];
const result = withoutLabel(labels, "red");
// result: ["blue"]
// labels: ["red", "blue", "red"]
```

Corrija o código em [`attempt.ts`](attempt.ts) e explique em inglês:

1. O que descumpre o contrato e por que sua correção funciona?
2. Quais três casos você usaria, com resultados esperados e estado esperado da entrada?
3. Qual é a complexidade de tempo e espaço?

O arquivo atual contém somente o código do enunciado; ainda não representa uma solução enviada pela the learner.

## Resposta da the learner

Pendente.

## Referência e feedback

Serão acrescentados depois da tentativa, preservando o código enviado, a resposta original e a referência separada, com tudo documentado em Markdown.
