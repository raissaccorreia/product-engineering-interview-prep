# Prática de TypeScript — 2026-10-15

Sessão de 60 minutos de treino guiado, dentro de uma disponibilidade total de 90 minutos. Apresentar uma questão por vez e aguardar a resposta antes de dar feedback ou referência. Os tempos incluem o feedback.

| Etapa             | Tempo previsto | Material                                                                                                     |
| ----------------- | -------------- | ------------------------------------------------------------------------------------------------------------ |
| Leitura de código | 15 min         | [Consultar e atualizar quantidades](01-read-quantities/review.md) · [código](01-read-quantities/exercise.ts) |
| Correção de bug   | 20 min         | [Remover um rótulo](02-without-label/review.md) · [tentativa](02-without-label/attempt.ts)                   |
| Implementação     | 20 min         | [Somar por categoria](03-sum-by-category/review.md) · [tentativa](03-sum-by-category/attempt.ts)             |
| Revisão final     | 5 min          | Resumo ao final desta nota                                                                                   |

Responder em TypeScript e explicar o raciocínio em inglês. O feedback será em português, com sugestões pontuais para a clareza do inglês, sem reescrever a resposta da the learner.

Preservar cada tentativa e a mensagem original. Depois da resposta, acrescentar a referência em arquivo separado e reunir os códigos, a explicação, as verificações e o feedback em Markdown conforme o padrão da coleção.

## Uso opcional dos 30 minutos restantes

- 10 minutos para refazer uma tentativa sem consultar a referência.
- 10 minutos para conferir os resultados esperados e as APIs que geraram dúvida.
- 10 minutos para explicar em inglês uma função e seus casos de borda, usando o próprio raciocínio.

## Resumo da sessão

As três questões foram respondidas e revisadas. As tentativas e mensagens originais foram preservadas; as referências e o feedback estão em arquivos separados e reproduzidos nas notas Markdown.

Na leitura, todas as saídas e a justificativa estavam corretas, incluindo o caso do mapa vazio. A resposta aplicou `??` ao zero e à ausência de chave e acompanhou a atualização com `set` e o tamanho do mapa.

Na remoção, o diagnóstico identificou a limitação de remover só a primeira ocorrência. A implementação ficou inalterada, com três chamadas de exemplo. Revise os requisitos independentes de conteúdo, preservação da entrada e identidade do resultado, além de tempo, espaço auxiliar e espaço de saída.

Na soma por categoria, o pseudocódigo expressou a intenção de agrupar e somar, mas tratou um `Set<Entry>` como agrupamento por propriedade e misturou operações de array, `Set` e `Map`. Revise o tipo do elemento entregue pelo loop e os acessos `entry.category` e `entry.amount`.

Para a revisão autônoma, priorize distinguir as três estruturas, refazer uma função de acumulação por chave e conferir os resultados esperados antes de executar. Ao explicar em inglês, diga qual valor cada variável contém e qual operação atualiza o resultado.
