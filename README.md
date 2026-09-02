# Product engineering interview prep

Laboratório público de prática técnica com JavaScript, TypeScript, algoritmos, React e engenharia de produto. Os exercícios são originais ou usam exemplos sintéticos.

## Como estudar

Trabalhe em incrementos pequenos. Cada etapa deve praticar um comportamento observável e caber em uma tentativa curta.

1. Leia um requisito e explique o que precisa acontecer, quais dados mudam e quais casos podem falhar.
2. Implemente só a etapa atual, sem consultar uma resposta pronta.
3. Execute ou inspecione o comportamento, encontre os erros e corrija a própria tentativa.
4. Revise os fundamentos envolvidos, a clareza do código e os casos de borda antes de avançar.
5. Preserve a tentativa original e registre a revisão separadamente. Escolha a próxima etapa com base no que a tentativa mostrou.

Em exercícios de React, conecte o comportamento à passagem de dados, estado, eventos, renderização e ciclo de vida. Mantenha componentes e funções simples; crie abstrações apenas quando o exercício precisar delas.

## Estrutura

- [`practice/basic/`](practice/basic/README.md): leitura de código, coleções e problemas de TypeScript em etapas curtas.
- [`practice/react/`](practice/react/README.md): exercícios incrementais de React e APIs do navegador.
- [`practice/algorithms/`](practice/algorithms/README.md): problemas de estruturas de dados e algoritmos. Inclui o material migrado de [`ForInterview`](practice/algorithms/forinterview/README.md).
- [`weeks/`](weeks/): desafios integrados de engenharia de produto.
- [`templates/`](templates/): formatos para revisões, evidências e registros.
- [`docs/learning-path.md`](docs/learning-path.md): mapa técnico resumido para orientar os próximos exercícios.

## Ambiente local

Requisitos: Node.js 24+ e pnpm 10+.

```bash
pnpm install
pnpm typecheck
pnpm test
pnpm format:check
```

Cada app de prática também tem seus próprios comandos no README local.

## Limites de publicação

Inclua apenas código e material de estudo que possa ser compartilhado. Use exemplos públicos ou inventados. Não adicione credenciais, dados de contato, detalhes de candidaturas, conteúdo confidencial de empregadores ou enunciados privados de avaliações.
