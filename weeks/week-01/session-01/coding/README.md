# Coding diagnostic — bounded asynchronous work

## Contexto

Uma aplicação de produto precisa consultar um serviço externo para cada item de uma lista. A implementação ingênua com `Promise.all` pode abrir requisições demais, falhar como um lote inteiro quando um item dá erro e perder a ordem original quando os resultados chegam fora de sequência.

Implemente um executor de trabalho assíncrono com concorrência limitada e falha por item.

## Contrato inicial

Crie `index.ts` e `index.test.ts` neste diretório. A API mínima é:

```ts
export type BatchResult<TResult> =
  | { status: "fulfilled"; value: TResult }
  | { status: "rejected"; error: unknown }
  | { status: "cancelled"; reason: "aborted" };

export type MapOptions = {
  concurrency: number;
  signal?: AbortSignal;
};

export function mapWithConcurrency<TItem, TResult>(
  items: readonly TItem[],
  worker: (item: TItem, index: number, signal: AbortSignal) => Promise<TResult>,
  options: MapOptions,
): Promise<BatchResult<TResult>[]>;
```

## Requisitos

- `concurrency` deve ser um inteiro maior que zero; configuração inválida pode rejeitar antes de iniciar qualquer trabalho.
- O retorno deve ter o mesmo tamanho e a mesma ordem de `items`.
- Nunca rejeite o lote por causa de uma falha de um item; capture também erros que não sejam instâncias de `Error`.
- Nunca mantenha mais de `concurrency` workers ativos ao mesmo tempo.
- Se o `AbortSignal` já estiver abortado, não inicie workers e devolva itens cancelados.
- Depois que o sinal for abortado, não inicie novos workers; workers já iniciados podem terminar e devem preservar o resultado que produzirem.
- Não mute o array de entrada e não deixe rejeições sem tratamento.
- O worker deve receber um índice estável e o mesmo sinal de abort recebido pelo executor.

## Casos mínimos de teste

Escreva os testes antes ou junto da implementação. Cubra pelo menos:

1. lista vazia;
2. concorrência igual a `1`;
3. concorrência maior que o número de itens;
4. resultados que terminam fora de ordem, mas retornam na ordem de entrada;
5. uma falha isolada sem rejeitar o lote;
6. limite máximo de workers ativos;
7. sinal já abortado;
8. abort durante a execução, garantindo que itens pendentes não comecem.

Use promises controladas ou barreiras determinísticas. Não use `setTimeout` arbitrário para tentar tornar o teste confiável.

## Restrições de entrevista

- Primeira tentativa em até 25 minutos, sem pesquisar uma solução.
- Antes de codificar, escreva a estratégia e a complexidade esperada.
- Depois dos testes, faça uma revisão curta: invariantes, falhas assíncronas, memória, fairness e comportamento sob uma lista muito grande.
- Não adicione retry, timeout, deduplicação ou fila persistente antes de a versão mínima estar correta.

## Extensão opcional

Escolha apenas uma extensão se a base estiver sólida: retry seletivo com classificação explícita de erro, timeout por item, deduplicação por identificador estável ou limite de memória para uma fonte iterável. Documente a nova hipótese e o trade-off.

## Entrega

- `index.ts`
- `index.test.ts`
- `NOTES.md` com hipóteses, complexidade, alternativa descartada e lacunas encontradas
