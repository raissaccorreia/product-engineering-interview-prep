# Semana 1 · Sessão 1 — Diagnóstico avançado

Status: starter, sem solução pronta.

## Objetivo observável

Estabelecer uma linha de base para coding, system design, discussão de projeto e comunicação técnica em inglês. O diagnóstico deve revelar lacunas para ajustar as semanas seguintes, não funcionar como prova de perfeição.

## Sessão de 90 minutos

1. **5 min — objetivo e hipóteses:** escreva o que você quer conseguir demonstrar ao final e quais partes do seu conhecimento ainda são incertas.
2. **10 min — recuperação ativa:** sem consultar documentação, responda no papel ou em `NOTES.md`: por que `Promise.all` pode ser inadequado para uma lista grande; como limitar concorrência; como preservar erros desconhecidos em TypeScript; e como cancelamento afeta tarefas já iniciadas.
3. **10 min — inventário de evidências:** escolha duas ou três experiências de produto ou engenharia que possam ser explicadas com segurança. Para cada uma, use [`templates/project-evidence.md`](../../../templates/project-evidence.md).
4. **35 min — coding:** implemente a tentativa do desafio em [`coding/README.md`](coding/README.md), com testes determinísticos e uma nota de complexidade. Não consulte uma solução antes da primeira versão.
5. **20 min — system design:** responda ao caso em [`system-design/README.md`](system-design/README.md), explicitando requisitos, hipóteses, API, dados, falhas, segurança e trade-offs.
6. **10 min — inglês técnico:** responda ao prompt em [`english/README.md`](english/README.md) sem ler suas fichas durante a primeira tentativa; depois registre a transcrição e a autoavaliação.

## Critérios de avaliação

- Faz perguntas antes de codificar ou desenhar.
- Declara hipóteses e separa fatos de suposições.
- Explica correção, casos-limite e complexidade.
- Considera falhas, concorrência, segurança, observabilidade e custo proporcional.
- Conecta decisões técnicas ao usuário e ao produto.
- Comunica o raciocínio em inglês com clareza, sem esconder incerteza atrás de jargão.

## Entrega esperada

- `coding/` com implementação, testes e breve nota de complexidade.
- `system-design/` com o desenho e as decisões principais.
- `english/` com transcrição ou roteiro da explicação.
- Uma ficha para cada projeto escolhido em `evidence/`.
- Registro final usando [`templates/session-log.md`](../../../templates/session-log.md), além da síntese curta no Obsidian.

O desafio está descrito nos arquivos desta sessão; a solução e as decisões finais só devem ser adicionadas depois da sua primeira tentativa. A revisão do coach vem depois, com perguntas de follow-up e uma extensão pequena.
