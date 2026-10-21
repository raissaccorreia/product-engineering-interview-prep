# Mini guia: escolher estruturas e operações em TypeScript

Comece pelo dado que você precisa guardar e pelo resultado que quer produzir. Uma solução pode usar mais de uma estrutura em etapas diferentes.

## Escolha rápida

| Preciso...                                             | Escolha inicial                                     | Exemplo                               |
| ------------------------------------------------------ | --------------------------------------------------- | ------------------------------------- |
| Guardar uma lista, manter posições, filtrar ou ordenar | `Array<T>`                                          | Tickets, nomes, valores               |
| Associar cada chave a um valor e atualizar por chave   | `Map<K, V>`                                         | Quantidade de tickets por equipe      |
| Guardar valores únicos ou consultar se já vi um valor  | `Set<T>`                                            | IDs já processados                    |
| Representar um registro com campos definidos           | Objeto com `type` ou `interface`                    | Um ticket com `id`, `team` e `status` |
| Representar um dicionário de propriedades              | Objeto, tipado com `Record` ou assinatura de índice | Configuração por nome                 |

`Array`, `Map` e `Set` são estruturas do JavaScript. `type`, `interface` e `Record` ajudam o TypeScript a verificar os dados; não criam uma estrutura nova durante a execução.

## 1. Array: lista e posições

Use quando quer percorrer itens, transformá-los, selecionar alguns ou estabelecer uma ordem. O índice começa em zero. Um array pode conter valores repetidos.

| Operação               | Quando usar                                     | Retorno                          | Altera o array?             |
| ---------------------- | ----------------------------------------------- | -------------------------------- | --------------------------- |
| `map(fn)`              | Transformar cada elemento                       | Novo array com os resultados     | Não                         |
| `filter(fn)`           | Selecionar todos que passam no critério         | Novo array, possivelmente vazio  | Não                         |
| `find(fn)`             | Obter a primeira correspondência                | Elemento ou `undefined`          | Não                         |
| `findIndex(fn)`        | Obter a posição da primeira correspondência     | Índice ou `-1`                   | Não                         |
| `some(fn)`             | Saber se pelo menos um passa no critério        | `boolean`                        | Não                         |
| `every(fn)`            | Saber se todos passam no critério               | `boolean`                        | Não                         |
| `includes(value)`      | Verificar presença de um valor                  | `boolean`                        | Não                         |
| `reduce(fn, initial)`  | Acumular um resultado                           | Valor acumulado                  | Não por si só               |
| `slice(start, end)`    | Copiar um trecho; `end` é exclusivo             | Novo array                       | Não                         |
| `splice(start, count)` | Remover itens a partir de uma posição           | Novo array com os removidos      | Sim                         |
| `sort(compare)`        | Ordenar a própria lista                         | O mesmo array, reordenado        | Sim                         |
| `toSorted(compare)`    | Obter uma lista ordenada preservando a original | Novo array                       | Não                         |
| `push(value)`          | Acrescentar ao fim                              | Novo comprimento                 | Sim                         |
| `pop()`                | Remover do fim                                  | Elemento removido ou `undefined` | Sim                         |
| `length`               | Consultar quantidade de posições                | Número                           | Apenas consultar não altera |

Os callbacks ainda podem alterar objetos recebidos. Um novo array não significa uma cópia profunda de seus elementos. `splice` também aceita itens para inserir ou substituir, além da remoção mostrada na tabela. Consulte a [referência de Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

```ts
const values = [3, 0, 8, 5];

const hasEven = values.some((value) => value % 2 === 0); // true
const firstEven = values.find((value) => value % 2 === 0); // 0
const allEven = values.filter((value) => value % 2 === 0); // [0, 8]
const doubled = values.map((value) => value * 2); // [6, 0, 16, 10]
const total = values.reduce((sum, value) => sum + value, 0); // 16
```

Repare no tipo de retorno: perguntar se existe algo pede `some`; obter um item pede `find`; obter todos pede `filter`. `find` pode devolver `0`, então não use truthiness para concluir que não encontrou. Veja a [documentação de find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find).

`map()` é um método de arrays. `Map` com maiúscula é outra estrutura. `map()` já retorna um array; `new Array(resultadoDoMap)` colocaria esse array dentro de outro.

## 2. Map: chave e valor

Use para contagens, somas por categoria ou consultas repetidas por ID. Cada chave tem um valor atual; `set` em uma chave existente substitui esse valor. Chaves podem ser strings, números ou outros valores, inclusive objetos.

| Operação                          | Uso e retorno                                                 |
| --------------------------------- | ------------------------------------------------------------- |
| `get(key)`                        | Lê o valor; retorna `undefined` se a chave não existe         |
| `set(key, value)`                 | Grava ou atualiza; retorna o próprio mapa                     |
| `has(key)`                        | Informa se a chave existe, mesmo se seu valor for `undefined` |
| `delete(key)`                     | Remove; retorna se havia uma entrada                          |
| `size`                            | Quantidade de chaves                                          |
| `entries()`                       | Iterador de pares `[chave, valor]`                            |
| `keys()` / `values()`             | Iteradores de chaves ou valores                               |
| `for (const [key, value] of map)` | Percorre os pares na ordem de inserção                        |

```ts
const teams = ["design", "api", "design"];
const counts = new Map<string, number>();

for (const team of teams) {
  const previousCount = counts.get(team) ?? 0;
  counts.set(team, previousCount + 1);
}
// Entradas: ["design", 2], ["api", 1]
```

Aqui, `?? 0` trata a primeira ocorrência. Atualizar uma chave existente não muda sua posição de inserção. Para consultar o mapa, use `get`, não `counts[team]`. A [referência de Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) detalha essas operações.

## 3. Se preciso ordenar, tenho que abandonar o Map?

Você pode acumular em um `Map` e ordenar suas entradas como um array:

```ts
const counts = new Map<string, number>([
  ["design", 2],
  ["api", 5],
]);

const ranking = [...counts].sort((a, b) => b[1] - a[1]);
// [["api", 5], ["design", 2]]
// O mapa continua com sua ordem original.

const numbers = [30, 5, 12];
const ordered = numbers.toSorted((a, b) => a - b); // [5, 12, 30]
// numbers continua [30, 5, 12].
```

`Map` não possui `sort`. No exemplo, `[...counts]` cria um array de pares e `sort` altera esse array. Para números, forneça o comparador: `a - b` ordena em ordem crescente; `b - a`, decrescente. Sem comparador, `sort` usa a representação textual dos elementos. Veja a [documentação de sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).

Se quer apenas o maior elemento, uma passagem com comparação costuma bastar. Ordenar uma lista inteira resolve uma tarefa maior: produzir um ranking.

## 4. Set: presença e valores únicos

Use quando a pergunta é "já vi este valor?" ou quando precisa eliminar repetições de valores. Para guardar uma quantidade por valor, use `Map`.

```ts
const seen = new Set<string>();
seen.add("api"); // Retorna o próprio Set.
seen.add("api");
const exists = seen.has("api"); // true
const count = seen.size; // 1
const uniqueNames = [...new Set(["api", "design", "api"])];
// ["api", "design"]
const removed = seen.delete("api"); // true
```

`Set` não tem `get`, `push` ou `length`. Use `has`, `add` e `size`. Objetos distintos com os mesmos campos continuam distintos em um `Set`; ele não agrupa por uma propriedade como `team`. Arrays também preservam referências de objetos: copiar a lista não duplica seus objetos. Veja o [guia de coleções por chave](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections).

## 5. Dicionário, objeto e Record

"Dicionário" descreve a associação entre chaves e valores. TypeScript não possui um tipo embutido chamado `Dictionary`. Você pode implementar esse conceito com `Map` ou com propriedades de um objeto.

Use um objeto para registros com campos conhecidos, como um ticket. `Record<Keys, Value>` descreve um objeto cujas propriedades têm valores de determinado tipo. Ele não cria um `Map`, não é um construtor e não adiciona métodos como `get` ou `set`.

```ts
type Priority = "low" | "high";
const labels: Record<Priority, string> = {
  low: "Baixa",
  high: "Alta",
};

const highLabel = labels.high; // "Alta"
const pairs = Object.entries(labels); // Array de pares chave/valor.
const keys = Object.keys(labels); // ["low", "high"]
const values = Object.values(labels); // ["Baixa", "Alta"]
const hasHigh = Object.hasOwn(labels, "high"); // true

// Chaves dinâmicas podem estar ausentes; o tipo deve representar isso.
const counts: Partial<Record<string, number>> = Object.create(null);
counts["api"] = (counts["api"] ?? 0) + 1;
```

Para chaves dinâmicas desconhecidas de antemão, `Map` costuma deixar as operações mais explícitas. Se usar um objeto como dicionário, um objeto sem protótipo (`Object.create(null)`) evita propriedades herdadas; `Object.hasOwn` verifica propriedades próprias. As chaves de objetos são strings ou símbolos; chaves numéricas viram strings. Já `Map` distingue, por exemplo, `1` de `"1"`.

Objetos comuns se encaixam diretamente em JSON. `JSON.stringify(map)` não serializa suas entradas por padrão; converta antes, por exemplo com `[...map]`, ou `Object.fromEntries(map)` quando as chaves forem strings apropriadas. Consulte [Record no TypeScript](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type) e a [comparação entre Object e Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps).

## Antes de escrever a função

1. Defina o resultado: um item, um booleano, um número, uma lista ou valores por chave?
2. Escolha a estrutura e confira o retorno da operação. `some` não retorna uma lista; `push` não retorna o array.
3. Confira o caso ausente: `find` e `Map.get` podem retornar `undefined`; `findIndex` retorna `-1`.
4. Confira mutação e ordem: `sort` e `splice` alteram o array; `Map` preserva inserção, não ordena por valor.
5. Combine etapas quando necessário: lista de tickets → contagem por equipe em um mapa → escolha de uma equipe ou ranking em um array.
