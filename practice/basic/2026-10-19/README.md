# Prática de TypeScript — 2026-10-19

Sessão de 90 minutos. O foco é conhecer melhor as APIs de arrays e estruturas de dados e praticar a escolha de uma estratégia antes de escrever código.

| Etapa                 | Tempo previsto | Foco                                                                       |
| --------------------- | -------------: | -------------------------------------------------------------------------- |
| Leitura de código     |         15 min | Rastrear valores e identificar o efeito das operações usadas               |
| Correção de bug       |         25 min | Encontrar o contrato quebrado, escolher a operação adequada e corrigir     |
| Implementação         |         35 min | Descrever um plano simples, implementá-lo e considerar casos de borda      |
| Revisão do repertório |         15 min | Comparar as APIs envolvidas e registrar padrões que podem ser reutilizados |

Uma questão por vez. Aguardar a tentativa antes de dar feedback ou mostrar uma referência. Responder em TypeScript e explicar o raciocínio em inglês. O feedback será em português e incluirá comentários breves sobre correção, estratégia, casos de borda e clareza da explicação em inglês.

Para os exercícios de correção e implementação, registrar primeiro a estratégia em palavras: que informação precisa acompanhar, como cada elemento afeta o resultado e o que a função devolve. Depois da resposta, preservar a tentativa e a mensagem original, guardar a referência em outro arquivo e documentar a revisão em `review.md`, conforme o formato da coleção.

## Exercícios

1. Leitura de código: [pipeline de array](01-read-array-pipeline/exercise.ts) · [revisão](01-read-array-pipeline/review.md)
2. Correção de bug: [primeiro número par](02-first-even/exercise.ts)
3. Implementação: a apresentar depois da segunda revisão.

## Resumo da sessão

Na leitura de código, a filtragem e o caso vazio foram compreendidos corretamente. Revise a saída do primeiro `console.log` e lembre que o índice de `map` começa em zero no array sobre o qual o método está sendo chamado. Os exercícios de correção de bug e implementação continuam pendentes.
