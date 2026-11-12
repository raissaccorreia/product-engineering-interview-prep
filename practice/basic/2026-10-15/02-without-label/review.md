---
type: coding-practice
date: 2026-10-15
session_exercise: 2
level: basic
language: TypeScript
topic: Removing matching labels
status: reviewed-needs-correction
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

[`attempt.ts`](attempt.ts) preserva o arquivo enviado pela estudante. A função permaneceu igual à do enunciado; foram acrescentadas três chamadas. A proposta de correção foi descrita no chat, mas não implementada.

## Resposta da estudante

Resposta original no chat:

> For me, it was pretty obvious just by looking at line 3: it will detect the first occurrence of the target string. When you run the `splice`, it will correctly remove one occurrence of the target string if it exists. If there are two or more occurrences of that string, like in your example, it will not work because it will only remove the first one. The three examples that I would use to test, I already put on the exercise. The complexity is linear because it's changing in space, so it's altering the labels array. The space complexity is also O(n) because it's just the labels array. Because you asked me to create a new array on top of that, the space complexity would be two times that, so it's still linear, the same as the time complexity. This is because you have to check other positions in the array.
>
> I will be honest with you: I don't remember the conversation we had about functions. If I'm not mistaken, `splice` modifies the array in place, so it doesn't generate a new array, whereas `slice` generates a new array. The problem with `slice` is that it will go all the way from the beginning of the array to the index of the target if you do that.
>
> What we actually have to do is look through the array with a `for` loop. There may be a better way to do it, but I will run through the array with a `for` loop. When I `slice` from, for example, 0 to the first target, I put that into a new array. I then `slice` again from the target position onward, without including the target position, and continue that all the way to the end of the array.
>
> That's a little bit costly and ugly code, but I cannot think of anything else immediately, and I don't remember how to represent it in code exactly.

## Arquivo da tentativa

Código de [`attempt.ts`](attempt.ts), preservado com as chamadas propostas:

```ts
/** Original exercise implementation. Awaiting the student's correction. */
export function withoutLabel(labels: string[], target: string): string[] {
  const index = labels.indexOf(target);

  if (index >= 0) {
    labels.splice(index, 1);
  }

  return labels;
}

const labels = ["red", "blue", "red"];
const labels2 = [];
const labels3 = ["blue", "yellow", "green"];

console.log(withoutLabel(labels, "red"));
console.log(withoutLabel(labels2, "red"));
console.log(withoutLabel(labels3, "red"));
```

## Referência e feedback

O diagnóstico de que `indexOf` encontra somente a primeira ocorrência está correto. O `splice(index, 1)` remove apenas uma ocorrência. Também há duas violações adicionais: a entrada é modificada e o retorno é a mesma referência de `labels`, inclusive quando o alvo não existe.

`splice` modifica o array e retorna um novo array com os elementos removidos. Portanto, modificar o original e retornar outro array podem acontecer na mesma chamada. Nesta função, o retorno de `splice` é ignorado e, ao final, a função retorna `labels`.

`slice(start, end)` copia um intervalo sem modificar a entrada; não precisa começar no índice zero. Recortar os intervalos entre ocorrências pode funcionar, mas exige controlar os limites. Sem uma implementação concreta, não é possível determinar o custo exato da proposta. Copiar repetidamente um resultado crescente com `concat` ou spread pode levar a tempo quadrático; copiar cada elemento mantido uma única vez evita essa repetição de trabalho.

## Solução de referência com for

A escolha de percorrer com `for` é suficiente. Para cada elemento, acrescente ao resultado somente as strings diferentes do alvo. Não é necessário buscar posições ou recortar intervalos.

Código de [`reference.ts`](reference.ts):

```ts
export function withoutLabel(labels: string[], target: string): string[] {
  const result: string[] = [];

  for (const label of labels) {
    if (label !== target) {
      result.push(label);
    }
  }

  return result;
}
```

A função sempre cria um resultado novo. O array fica vazio quando nenhuma string deve permanecer, e a ordem original é preservada porque a leitura e as inserções seguem a ordem da entrada.

Uma alternativa equivalente usa a operação de seleção já praticada em outras questões:

```ts
return labels.filter((label) => label !== target);
```

## Complexidade

Tempo e espaço precisam de justificativas separadas. Alterar o array não determina a complexidade de tempo.

No código original, `indexOf` pode percorrer `n` elementos e `splice` pode deslocar os elementos restantes. O tempo é `O(n)` no pior caso. O armazenamento da entrada já existente não é contado como espaço auxiliar; a função não cria um resultado com `n` elementos e remove no máximo um item. No modelo usual de arrays, o espaço auxiliar é `O(1)`.

Na referência, cada elemento é visitado uma vez: tempo `O(n)`. Se `k` elementos forem mantidos, o resultado ocupa `O(k)` espaço, ou `O(n)` no pior caso. O espaço auxiliar além do array de saída é constante. Essa análise usa o modelo usual de custo constante por comparação de string; o custo dos caracteres pode ser considerado separadamente quando relevante.

Contar o array de entrada e o resultado juntos daria até `n + k` elementos, mas a análise de espaço adicional considera o que a função aloca além da entrada. A simplificação `O(2n) = O(n)` é válida; ela não substitui identificar quais estruturas são criadas.

## Casos e resultados observados

A revisão executou a função original isoladamente, transpilada em memória, com uma entrada nova por caso:

| Entrada e alvo                         | Retorno original              | Retorno esperado             | Entrada preservada? | Array novo? |
| -------------------------------------- | ----------------------------- | ---------------------------- | ------------------- | ----------- |
| `["red", "blue", "red"]`, `"red"`      | `["blue", "red"]`             | `["blue"]`                   | Não                 | Não         |
| `[]`, `"red"`                          | `[]`                          | `[]`                         | Sim                 | Não         |
| `["blue", "yellow", "green"]`, `"red"` | `["blue", "yellow", "green"]` | Igual ao conteúdo da entrada | Sim                 | Não         |

Os três casos são pertinentes, mas o arquivo só imprime o retorno. Para verificar todo o contrato, registre também o estado da entrada e confira que `result !== input`.

A referência passou nesses três casos e em outros três: todos os elementos iguais ao alvo, alvo como string vazia e distinção entre maiúsculas e espaços. Em todos, preservou a entrada e retornou um array novo. Também passou no typecheck estrito com `noUncheckedIndexedAccess`.

O typecheck estrito do arquivo apontou `TS7034` e `TS7005` na declaração e no uso de `labels2`, inicializado como `[]`. Uma anotação como `const labels2: string[] = []` resolve essa questão de tipagem. A tentativa foi preservada sem aplicar a correção.

## Raciocínio e inglês

A explicação localizou o problema das repetições e propôs percorrer todo o array. Faltou concretizar a implementação e distinguir os requisitos de conteúdo, preservação da entrada e nova identidade do retorno.

O inglês é compreensível e deixa explícita sua dúvida sobre a API. Para ganhar precisão, diferencie _time complexity_, _auxiliary space_ e _output space_. Explique o tempo pelo trabalho executado e o espaço pelas estruturas adicionais. A expressão _modifies the array in place_ estava correta; a conclusão de que isso impede retornar outro array precisava de ajuste. Não é necessário reescrever sua resposta.
