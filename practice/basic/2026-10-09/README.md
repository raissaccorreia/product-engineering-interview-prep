# Prática de TypeScript — 2026-10-09

Sessão de 50 minutos. Os exercícios são apresentados um por vez, com raciocínio em inglês e feedback em português depois de cada tentativa.

Distribuição prevista: 10 minutos de leitura, 15 de correção de bug, 20 de implementação e 5 para revisão final, incluindo o tempo de feedback.

1. [Ler código: ordenação e cópia de arrays](01-read-sort-and-copy/review.md) · [código](01-read-sort-and-copy/exercise.ts)
2. [Corrigir bug: média de uma lista](02-fix-average/review.md) · [código inicial](02-fix-average/attempt.ts)
3. [Implementar: selecionar o maior rótulo](03-longest-label/review.md) · [tentativa](03-longest-label/attempt.ts)

As três questões foram respondidas e revisadas. As tentativas originais e as referências estão preservadas separadamente; as notas reúnem as respostas do chat, o código e os comentários.

## Revisão final da sessão

Na leitura, a cópia e o resultado de `map` foram previstos corretamente. Revise a mutação de `sort` e a comparação de identidade com `===`.

Na média, a tentativa identificou a divisão `0 / 0` e a complexidade linear. Revise o retorno exato exigido pelo contrato e a inclusão de zeros na contagem. Para cada chamada, escreva o resultado esperado antes de executar.

Na seleção da maior string, a estratégia tratou o array vazio e preservou o primeiro empate com `>`. A implementação usou `i` sem declaração. Revise `for...of`, `entries()` e destructuring para obter índice e valor.

Para as próximas explicações em inglês, descreva o estado mantido pela função, justifique a condição de atualização e apresente casos concretos com resultados esperados. A última resposta relatou uma tentativa sem pesquisa, mas não incluiu a explicação, os casos ou a complexidade pedidos.
