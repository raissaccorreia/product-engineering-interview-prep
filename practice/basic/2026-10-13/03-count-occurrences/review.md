---
type: coding-practice
date: 2026-10-13
session_exercise: 3
level: basic
language: TypeScript
topic: Counting string occurrences
status: reviewed-needs-correction
review_date: 2026-10-14
---

# Implementar uma função: contar ocorrências

Reserve cerca de 15 minutos, incluindo o feedback.

## Contrato

Implemente:

```ts
function countOccurrences(values: readonly string[]): Map<string, number> {
  // Sua implementação
}
```

Retorne um `Map` em que cada chave seja uma string distinta da entrada e cada valor seja a quantidade total de ocorrências dessa string.

- Compare as strings exatamente como recebidas, sem normalizar espaços ou letras.
- Strings vazias são entradas válidas.
- Para um array vazio, retorne um `Map` vazio.
- Não altere o array recebido.

Exemplo:

```ts
countOccurrences(["red", "blue", "red"]);
// Map com as entradas: ["red", 2] e ["blue", 1]
```

[`attempt.ts`](attempt.ts) preserva a implementação enviada pela the learner em 14/10, inclusive os comentários e erros. [`reference.ts`](reference.ts) contém a solução em um arquivo separado.

Envie a implementação e explique em inglês o raciocínio, a complexidade de tempo e espaço e três casos de borda com os resultados esperados.

## Resposta da the learner

Resposta original no chat, em 14/10:

> Fiz o exercício 3 e dessa vez decidi fazer sem consultar, sem compilar e rodar, nem nada, só com o que eu lembrava de cabeça sobre map e comparação de strings em typescript, com comentários explicativos

A tentativa sem consulta, compilação ou execução foi relatada pela the learner. Os comentários em inglês no código são o registro do raciocínio; não foram apresentados casos com resultados esperados nem a complexidade.

## Código da tentativa

Código de [`attempt.ts`](attempt.ts), com a lógica e os comentários preservados:

```ts
/** Starter for the implementation exercise. Awaiting the student's attempt. */
export function countOccurrences(values: readonly string[]): Map<string, number> {
  let occurrences = new Map(); // create new map object
  for (const [index, value] of values) {
    if (occurrences.length === 0 || !occurrences[value]) {
      // not on the map push it with 1 ocurrences
      occurences.push([value, 1]);
    }
    if (ocurrences[value]) {
      occurences[value]++; // if its there increment the number value related to the string key
    }
  }
}
```

## Referência e feedback

A intenção descrita nos comentários é adequada: usar a string como chave, iniciar a primeira ocorrência em `1` e incrementar a contagem quando a chave já existe. A tentativa também cria uma estrutura nova e não escreve no array recebido.

A implementação ainda não compila. Os ajustes envolvem a API de `Map`, o valor entregue pelo loop, a consistência dos identificadores e o retorno da função.

## Loop e strings

`for (const item of values)` entrega cada elemento do array, que neste caso é uma string. Em `for (const [index, value] of values)`, o destructuring é aplicado à própria string.

Para `"red"`, `index` recebe `"r"` e `value` recebe `"e"`. Portanto, o código não está obtendo a posição do array nem a string completa. Para uma string vazia, ambos ficam `undefined`.

Quando índice e valor são necessários, `values.entries()` fornece esses pares. Para contar ocorrências, o índice não é necessário: use `for (const value of values)`.

Strings podem ser usadas diretamente como chaves de um `Map`. O mapa distingue `"a"`, `"A"`, `" a "` e `""` conforme o contrato, sem uma função especial de comparação.

## API de Map

| Operação             | API de `Map`                    |
| -------------------- | ------------------------------- |
| Quantidade de chaves | `occurrences.size`              |
| Verificar uma chave  | `occurrences.has(value)`        |
| Ler uma contagem     | `occurrences.get(value)`        |
| Inserir ou atualizar | `occurrences.set(value, count)` |

`Map` não oferece `.length` nem `.push` para essas operações. O acesso `occurrences[value]` também não consulta as entradas do mapa.

Na tentativa aparecem três grafias de uma variável: `occurrences`, `occurences` e `ocurrences`. Apenas a primeira foi declarada. Falta também `return occurrences` no fim da função; para uma entrada vazia, o loop seria ignorado e não haveria retorno do mapa.

Há ainda um cuidado no fluxo: se a API fosse corrigida mantendo dois `if` independentes, inserir a primeira ocorrência com `1` e depois verificar novamente sua existência faria a contagem ir a `2` na mesma iteração. Cada elemento deve acrescentar exatamente uma ocorrência.

## Solução de referência

Código de [`reference.ts`](reference.ts):

```ts
export function countOccurrences(values: readonly string[]): Map<string, number> {
  const occurrences = new Map<string, number>();

  for (const value of values) {
    const previousCount = occurrences.get(value) ?? 0;
    occurrences.set(value, previousCount + 1);
  }

  return occurrences;
}
```

`get(value)` retorna `undefined` quando a chave não existe. `?? 0` usa zero nesse caso. A chamada `set` grava a contagem anterior mais um, uma única vez por elemento. No fim, a função retorna o mapa, que estará vazio se a entrada estiver vazia.

Os parâmetros explícitos de `new Map<string, number>()` permitem ao TypeScript conferir os tipos de chave e valor. A variável pode ser `const` porque não é reatribuída; atualizar as entradas com `set` continua permitido.

## Casos de borda e verificações

O typecheck estrito da tentativa apontou falta de retorno (`TS2355`), propriedade `length` inexistente (`TS2339`), indexação com possível `undefined` (`TS2538`) e identificadores não declarados (`TS2552`). A tentativa foi preservada com esses erros para comparação.

| Entrada                  | Entradas esperadas do Map            |
| ------------------------ | ------------------------------------ |
| `[]`                     | Nenhuma                              |
| `["red"]`                | `["red", 1]`                         |
| `["red", "blue", "red"]` | `["red", 2]`, `["blue", 1]`          |
| `["", "", "a", ""]`      | `["", 3]`, `["a", 1]`                |
| `["a", "A", " a ", "a"]` | `["a", 2]`, `["A", 1]`, `[" a ", 1]` |
| `["x", "x", "x"]`        | `["x", 3]`                           |

A referência passou nos seis casos da tabela, preservou a entrada e passou no typecheck estrito com `noUncheckedIndexedAccess`. Esses resultados pertencem à referência; a tentativa continua preservada com os erros de compilação descritos.

## Complexidade e inglês

Com `n` elementos e `k` strings distintas, a referência tem tempo esperado `O(n)` no modelo usual em que as operações de `Map` e as chaves são tratadas com custo constante. Se contabilizarmos o trabalho sobre os caracteres das chaves, o tempo esperado é `O(n + L)`, sendo `L` o total de caracteres processados. O resultado contém `O(k)` entradas; além dele, o espaço auxiliar é constante.

Os comentários em inglês comunicam a intenção, embora as operações do código não a implementem. Revise a grafia _occurrences_ e diferencie _array element_, _map key_ e _count_. O termo _push_ corresponde à operação de array que foi usada por engano; para explicar a referência, descreva a leitura e a atualização da contagem associada à chave. Não é necessário reescrever a resposta da the learner.
