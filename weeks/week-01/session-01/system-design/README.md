# System design diagnostic — measurable marketplace discovery

## Cenário

Uma empresa de marketplace quer lançar uma funcionalidade de **coleções de campanha**. Cada campanha leva usuários para uma página de descoberta com itens de várias marcas; a pessoa pode visualizar um item, salvá-lo e seguir para o site do parceiro. O time quer entender quais campanhas geram descoberta e leads qualificados antes de decidir investimentos futuros.

O produto precisa de uma primeira versão em seis semanas. Não haverá checkout próprio nesta fase. Durante uma campanha, o tráfego pode ficar 20 vezes acima do normal. A equipe quer minimizar dados pessoais e precisa distinguir claramente evento de intenção de compra de venda confirmada pelo parceiro.

## Sua tarefa

Em 20 minutos, produza `answer.md` com um desenho proporcional a um MVP. Comece pelas perguntas de clarificação; não assuma que todos os requisitos já foram fornecidos.

## O que sua resposta deve conter

- perguntas funcionais e não funcionais;
- escopo do MVP e o que fica explicitamente fora;
- fluxo principal e componentes;
- contrato de pelo menos dois endpoints ou eventos;
- modelo de dados mínimo;
- identidade anônima/autenticada, consentimento e privacidade;
- idempotência, deduplicação e consistência;
- comportamento durante pico, timeout, duplicação e indisponibilidade do parceiro;
- métrica primária, métricas de guarda e o que não pode ser chamado de venda;
- observabilidade, rollout, rollback e custo proporcional ao estágio do produto.

## Critérios de diagnóstico

- Você transforma ambiguidade em decisões explícitas.
- O desenho separa intenção, conversão e liquidação financeira.
- Há uma fronteira clara entre dados necessários e dados sensíveis desnecessários.
- Falhas e reprocessamento não criam contagens duplicadas.
- A solução não introduz filas, microsserviços ou infraestrutura sem justificar o custo.
- Você consegue explicar o desenho em inglês em cinco minutos.

## Entrega

Crie `answer.md` depois da primeira tentativa. Inclua no final três riscos, uma alternativa descartada e a decisão que você validaria primeiro com Produto.
