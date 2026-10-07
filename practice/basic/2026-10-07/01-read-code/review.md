---
type: coding-practice
date: 2026-10-07
exercise: 1
level: basic
language: TypeScript
topic: Array.filter, Array.map, and object references
---

# Ler um trecho e explicar o que acontece

## Enunciado

Sem executar o código, diga o que cada `console.log` imprime e explique o resultado. Considere também o que aconteceria se `tasks` fosse um array vazio.

O trecho original está em [`solution.ts`](solution.ts).

## Minha resposta

Transcrição da resposta falada, com a formatação ajustada:

> The first console prints the whole task object based on which one has status `done`. It will be just the task with `id = b`, and it will print the `id = b`, `done = true` object.
>
> First console: `{ id: "b", done: true }`.
>
> The second console: because `pending` filters tasks that are not done, it will get tasks A and C and their IDs. It will print A and C as an array of two strings because `map` creates an array: `["a", "c"]`.
>
> The third one: let me check. `snapshot`: we'll put the task inside an object. We'll put all three in there, but just the done ones. We'll create an object with ID and done inside it: `{["true"]}`.
>
> If it was an empty array, I think it would finish normally because `map` runs through an empty array. It would just finish with an empty response, with no response.
>
> My only doubt is the test line: `if (tasks.done === true)`. This will not exist because there is an exclamation mark, but I think it validates whether it exists, so it can perform the line. I think it will work even if `tasks` is an empty array.

## Saída e explicação

```ts
[true, true, false][("a", "c")][(false, true, false)];
```

1. `tasks.map(task => task.done)` transforma cada tarefa em um booleano. `map` não filtra tarefas concluídas nem retorna os objetos inteiros.
2. `pending` é um novo array, mas mantém referências aos objetos originais. Alterar `pending[0]!.done` também muda a tarefa `"a"` em `tasks`. O filtro não é reexecutado depois dessa mudança, então `pending` continua contendo `"a"` e `"c"`.
3. `snapshot` é criado antes da alteração e contém cópias rasas dos objetos com `{ ...task }`. Por isso, o `done` da tarefa `"a"` continua `false` nessa cópia.

Se `tasks` estiver vazio, `pending[0]` será `undefined`. A linha `pending[0]!.done = true` causará `TypeError` em runtime, antes dos logs. O `!` é uma non-null assertion do TypeScript: ele não verifica o valor em runtime. Também não existe no trecho uma condição `if (tasks.done === true)`.

## Casos de borda e feedback

- **Correção:** a lista de IDs no segundo log estava correta; os outros resultados e o caso vazio não estavam.
- **Raciocínio:** a resposta identificou corretamente que `filter` seleciona tarefas pendentes, mas confundiu isso com o que os `map` seguintes retornam. A distinção entre referência compartilhada e cópia rasa explica por que os dois arrays se comportam de forma diferente após a mutação.
- **Clareza em inglês:** a transcrição ficou compreensível, mas a explicação melhora quando primeiro declara cada saída e depois diz o que `map` retorna. Termos úteis: _array of booleans_, _references to the same objects_, _copies of the objects_.
- **Aprendizado principal:** avalie todas as instruções na ordem, inclusive as que acontecem antes dos logs; um array vazio não torna segura a indexação posterior.
