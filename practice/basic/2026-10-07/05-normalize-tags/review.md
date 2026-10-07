---
type: coding-practice
date: 2026-10-07
session_exercise: 2
collection_order: 5
level: basic
language: TypeScript
topic: String normalization and duplicate handling
status: reviewed-needs-correction
---

# Implementar uma função pequena: normalizar tags

## Contrato

Implemente `normalizeTags(tags: readonly string[]): string[]` com este comportamento:

- remova espaços no começo e no fim de cada tag;
- converta cada tag para letras minúsculas;
- descarte as tags que ficarem vazias;
- mantenha uma única ocorrência de cada tag normalizada, preservando a ordem da primeira ocorrência;
- não altere o array recebido.

Exemplo:

```ts
normalizeTags([" TypeScript ", "", "typescript", "Node.js", " node.js "]);
// ["typescript", "node.js"]
```

[`solution.ts`](solution.ts) preserva a implementação enviada na sessão. [`reference.ts`](reference.ts) contém a solução de referência após a revisão.

## Sua tentativa

Resposta em inglês, preservada como enviada:

> I added a solution based on my thought process:
>
> 1. For removing spaces, I remember that `trim` is the solution for removing them from a string. I don't remember if it removes the leading space, but it certainly removes the trailing spaces.
> 2. Discard the ones that are altered, and then a simple tag length check would be enough.
> 3. Keep the occurrence of the tag normalized by order. It is just like the third exercise we did today, so I adapted it by pushing into the new array because it said you should not change the original array.
>
> That's my thought process. Although I ran the compiler, `tsc solution.ts`, for some reason, property `toLowerCase` does not exist, maybe because it has different casing. Let me do a quick fix here.
>
> I just ran, and it seemed fine, so I think I solved it. It required a couple of Google searches, but yeah, kind of coded for the first time in almost a year, I guess.

A tentativa normaliza cada string com `toLowerCase().trim()`, descarta as vazias e adiciona valores diferentes do último elemento do resultado. Também inclui um `console.log` com o exemplo do enunciado.

## Revisão

`trim()` remove whitespace das duas extremidades da string. `toLowerCase()` está escrito corretamente na implementação atual. Não foi possível determinar a causa do erro anterior porque a mensagem original e a versão anterior do código não foram fornecidas.

A normalização, a remoção de strings vazias e a preservação da entrada estão corretas nos exemplos verificados. O problema é a deduplicação: comparar somente com o último elemento remove repetições consecutivas, enquanto este contrato exige uma ocorrência de cada tag normalizada em todo o resultado.

```ts
normalizeTags([" A ", "b", "a"]);
// Tentativa: ["a", "b", "a"]
// Esperado: ["a", "b"]
```

O exemplo original passa porque as tags repetidas são consecutivas depois de descartar a string vazia. Esse caso sozinho não distingue os dois comportamentos.

Na referência, um `Set<string>` guarda as tags normalizadas já incluídas. A função acrescenta uma tag quando ela não está vazia e ainda não pertence ao conjunto. Como percorre a entrada na ordem original, preserva a primeira ocorrência.

## Verificações

Foram executados quatro casos sobre a implementação enviada, transpilada em memória a partir do TypeScript atual:

| Entrada              | Resultado da tentativa      | Esperado                    | Resultado |
| -------------------- | --------------------------- | --------------------------- | --------- |
| `[]`                 | `[]`                        | `[]`                        | Passou    |
| `[" ", "\t"]`        | `[]`                        | `[]`                        | Passou    |
| Exemplo do enunciado | `["typescript", "node.js"]` | `["typescript", "node.js"]` | Passou    |
| `[" A ", "b", "a"]`  | `["a", "b", "a"]`           | `["a", "b"]`                | Falhou    |

A entrada permaneceu inalterada nos quatro casos.

A implementação em `reference.ts` passou nos mesmos quatro casos, preservou a entrada e passou no typecheck estrito com `noUncheckedIndexedAccess`.

O typecheck estrito da tentativa apresentou `TS7034` e `TS7005`, pois `resultTags` foi declarado como `[]` sem um tipo explícito e é lido antes de uma inferência suficiente. Declare `const resultTags: string[] = []` para tornar o tipo explícito. Use `const` também para variáveis que não são reatribuídas; isso permite continuar usando `push` no array.

`tsc solution.ts` compila o arquivo com opções padrão e ignora o `tsconfig.json` do projeto. Também pode gerar `solution.js`. Compilação bem-sucedida não confirma o contrato funcional. O `tsconfig.json` atual inclui `src`, `weeks` e `vitest.config.ts`, portanto o typecheck destes exercícios precisa incluir explicitamente os arquivos em `practice`.

## Raciocínio, casos de borda e inglês

Você escolheu as operações de string adequadas e usou um array novo para preservar a entrada. Ao adaptar outro exercício, confira se a regra de repetição é a mesma: o exercício anterior tratava repetições consecutivas, e este trata todas as ocorrências de uma tag normalizada.

A resposta não incluiu os três casos de borda com resultados esperados nem a complexidade solicitada. Para complementar, considere entradas vazias, tags só com whitespace e repetições separadas por outra tag.

Na explicação em inglês, esclareça a expressão _discard the ones that are altered_: normalizar altera o texto, mas só as tags que ficam vazias devem ser descartadas. Diferencie _consecutive duplicates_ de _all previously seen tags_ e descreva qual informação a função precisa guardar. Não é necessário reescrever toda a explicação.

Na referência, considerando `n` tags e `L` caracteres totais, o tempo esperado nas implementações usuais de `Set` é `O(n + L)`, contando a normalização e a busca por strings. O conjunto armazena `O(k)` entradas, sendo `k` o número de tags únicas. O array de saída também contém `k` strings; o armazenamento de seus caracteres depende do tamanho dessas strings.
