# Prática de TypeScript — 2026-10-13

Sessão planejada de 40 minutos. Apresentar um exercício por vez no chat e aguardar a resposta antes de fornecer feedback ou referência. O tempo de cada etapa inclui o feedback.

| Etapa             | Tempo previsto | Material                                                                                             |
| ----------------- | -------------- | ---------------------------------------------------------------------------------------------------- |
| Leitura de código | 8 min          | [Processar pontuações](01-read-scores/review.md) · [código](01-read-scores/exercise.ts)              |
| Correção de bug   | 12 min         | [Selecionar os primeiros elementos](02-take-first/review.md) · [tentativa](02-take-first/attempt.ts) |
| Implementação     | 15 min         | [Contar ocorrências](03-count-occurrences/review.md) · [tentativa](03-count-occurrences/attempt.ts)  |
| Revisão final     | 5 min          | Resumo ao final desta nota                                                                           |

Responder com código TypeScript e raciocínio em inglês. O feedback será em português, com sugestões pontuais para a clareza do inglês, sem reescrever a resposta da the learner.

Depois de cada resposta, preservar a tentativa e a mensagem original, acrescentar a referência em arquivo separado e documentar tudo em Markdown conforme o padrão da coleção. Os exercícios ainda não respondidos contêm somente enunciados e código inicial.

## Resumo da sessão

As três tentativas foram respondidas e revisadas. A terceira foi entregue em 14/10; a data planejada da sessão continua sendo 13/10.

Na leitura, a resposta identificou o array original, o efeito do filtro e todas as saídas do caso vazio. Revise como seguir o array de entrada de cada operação e a diferença entre acumulador e elemento atual no `reduce`.

Na correção, a tentativa nomeou o retorno de `splice`, mas manteve a alteração da entrada. Revise os argumentos de `slice` e `splice` e confira tanto o retorno quanto o estado do array original.

Na contagem, os comentários expressaram a intenção de armazenar uma frequência por string. A implementação misturou APIs de array e `Map`, desestruturou cada string como se fosse um par de índice e valor, variou o nome da variável e não retornou o resultado. Revise `Map.get`, `Map.set`, `Map.has`, `Map.size`, `for...of` e `entries()`.

Para praticar a explicação em inglês, descreva o que cada variável guarda, a atualização feita a cada elemento e três casos concretos com resultados esperados. A complexidade e os casos ainda precisam fazer parte da resposta, além do código.
