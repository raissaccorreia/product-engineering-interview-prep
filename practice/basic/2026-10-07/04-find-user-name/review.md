---
type: coding-practice
date: 2026-10-07
exercise: 4
level: basic
language: TypeScript
topic: Array.findIndex and truthiness
---

# Find a user's name by ID

## Exercício

Receba um array de usuários e um ID. Retorne o nome do usuário correspondente ou `undefined` quando não houver correspondência. Considere que os IDs são únicos e não altere o array de entrada.

```ts
type User = {
  id: string;
  name: string;
};

function findUserName(users: readonly User[], targetId: string): string | undefined {
  const index = users.findIndex((user) => user.id === targetId);

  if (!index) {
    return undefined;
  }

  return users[index]!.name;
}
```

## Minha resposta

> To be honest, I cannot find the bug because `findIndex` will return the index of the first element in the array that satisfies the condition: `user.id = target.id`. It will assign that index to `index`. If there is no such index, `index` will continue to be `undefined`, and it will return `undefined`. Since there is a valid index, use `index.name`. What could be the problem? I don't know, and I can't find it. Just to point out, I didn't put it in an IDE, and I didn't run the code. I'm just trying to look at it and keep my knowledge sharp about how it's supposed to work or not. Well, the time complexity of your solution and any change that I would make would be linear anyway.

> empty array returns undefined
>
> a targetId that doesn't exist on the users array returns undefined
>
> a normal case

## Correção e explicação

`findIndex` retorna o índice do primeiro elemento que satisfaz a condição. Se nenhum elemento corresponder, retorna `-1`, não `undefined`.

A condição `if (!index)` confunde dois valores:

- `0` é falsy, embora seja um índice válido. Assim, um usuário na primeira posição seria tratado como ausente.
- `-1` é truthy. Portanto, quando não há correspondência, o código continua e tenta ler `name` de `users[-1]`, que resulta em `undefined`; isso causa um `TypeError` em runtime.

A verificação correta é `index === -1`. Depois dessa verificação, o índice aponta para um usuário encontrado. O `!` em `users[index]!` apenas informa essa certeza ao compilador TypeScript; ele não é uma checagem em runtime. A proteção em runtime vem da condição `index === -1`.

O índice é um número; o nome pertence ao elemento `users[index]`. A condição do enunciado é `user.id === targetId`: `===` compara valores sem coerção, enquanto `=` faria uma atribuição.

## Implementação corrigida

A implementação de referência está em [`solution.ts`](solution.ts).

```ts
if (index === -1) {
  return undefined;
}

return users[index]!.name;
```

## Rastreamento de casos

Com estes dados:

```ts
const users: User[] = [
  { id: "a", name: "Ada" },
  { id: "b", name: "Grace" },
];
```

| Entrada                          | Resultado esperado                    |
| -------------------------------- | ------------------------------------- |
| `findUserName([], "a")`          | `undefined`                           |
| `findUserName(users, "missing")` | `undefined`                           |
| `findUserName(users, "a")`       | `"Ada"` — corresponde ao índice `0`   |
| `findUserName(users, "b")`       | `"Grace"` — corresponde ao índice `1` |

Complexidade de tempo: `O(n)` no pior caso, porque `findIndex` pode percorrer o array inteiro. Espaço auxiliar: `O(1)`.

## Feedback da sessão

- O método e o raciocínio sobre percorrer o array foram identificados corretamente; a resposta incorreta foi presumir que a ausência retorna `undefined`.
- Os casos vazio e ID inexistente são úteis, mas o comportamento desejado não era o comportamento do código original. O caso de correspondência no índice `0` expõe o outro bug.
- Para uma explicação técnica em inglês mais precisa, diferencie _index_ de _element_ e indique entradas e resultados esperados concretos. _Edge cases_ é uma expressão mais comum que _corner cases_; “a normal case” fica mais claro com um ID e o nome esperado.
- A análise foi feita visualmente; não houve execução em IDE, conforme relatado.

## Lembrete

Não use truthiness para validar índices: `0` é falsy e válido, enquanto `-1` é truthy e representa ausência em `findIndex`. Confirme o valor sentinela definido pela API e compare com ele explicitamente.
