# Quiz rápido: escolha de estruturas e complexidade

Data: 22/10/2026  
Formato: respostas faladas em inglês, feedback em português.  
Objetivo: praticar decisões de estrutura de dados, operações e complexidade em cenários genéricos.

Este registro guarda os enunciados já respondidos, as respostas originais, o gabarito conceitual e o feedback. Questões ainda não respondidas serão documentadas depois da tentativa para não revelar a resposta esperada.

## Questão 1 — histórico de desfazer

### Enunciado

Um editor precisa guardar as ações feitas pelo usuário para permitir desfazer a ação mais recente. Qual estrutura escolher e quais operações e complexidades são adequadas?

### Resposta da estudante

> A estrutura de dados apropriada se chama pilha. Basicamente, push e pop em um array, por exemplo, já seriam suficientes para isso. A complexidade de tempo esperada é constante. Acho que nem linear, e sim constante.

### Resposta esperada

Uma pilha (LIFO) representa esse comportamento: a última ação adicionada é a primeira a ser removida ao desfazer. Um array com `push` e `pop` no fim é uma implementação simples. `pop` é O(1); `push` é O(1) amortizado, embora uma realocação eventual possa custar O(n).

### Feedback

Escolha e raciocínio corretos. A nuance é dizer que `push` tem custo amortizado constante; as operações não são ambas garantidamente O(1) em cada execução. A explicação relacionou corretamente a pilha às operações do array. Para precisão em inglês, usar “amortized O(1)” qualifica o custo de `push`.

## Questão 2 — status de jobs por ID

### Enunciado

Uma aplicação mantém em memória o status de muitos jobs. Ela precisa inserir, atualizar, consultar e remover itens frequentemente pelo ID. A ordem não precisa ser percorrida. Que estrutura escolher e qual é o custo esperado dessas operações?

### Resposta da estudante

> The best one is a map because it has the index (the ID of the status) and the status itself, whatever it is, or the object it is referring to.
>
> If it's a map and you get by index, it would probably take a constant amount of time. Removing is constant. Consulting, I think, is constant as well if the memory positions in a map are kept somewhere in memory. Inserting and updating are also constant because you always put them at the end of the map and index them. It's all constant.

### Resposta esperada

`Map<JobId, Status>` é uma boa escolha: o ID é a chave e o status, o valor. `get`, `set` e `delete` têm custo esperado O(1) em média. A posição ou ordem de inserção não é necessária para localizar uma chave. Essa é uma expectativa de custo, não uma garantia absoluta para todo cenário ou implementação.

### Feedback

Boa escolha e boa identificação da associação entre ID e status. A correção conceitual é chamar o ID de `key` (chave), não de índice. A consulta é feita pela chave; não é necessário acrescentar o item ao final do `Map`. A resposta em inglês foi compreensível e listou as operações. Para ser mais precisa, use “key” e qualifique o custo como “expected O(1)”.

## Questão 3 — verificar IDs processados

### Enunciado

Você precisa verificar com frequência se um ID já foi processado. Só importa saber se ele existe; não precisa guardar outros dados associados nem manter uma ordem. Que estrutura ou abordagem escolheria, e qual seria o custo esperado de adicionar e consultar um ID?

### Resposta da estudante

> For number 3, I would say it's a hash map, if I'm not mistaken, of course, because you only need to know if it exists and don't need any other association. You only need a fast read time. My intuition is that it is a hash map, and with a hash map, inserting has a constant cost, the same as reading.

### Resposta esperada

Um `Set<ID>` é a escolha mais direta porque representa uma coleção de valores únicos sem exigir um valor associado. `add(id)` e `has(id)` têm custo esperado O(1) em média. Um `Map<ID, boolean>` também poderia representar a informação, mas guardaria uma associação desnecessária. Uma hash table é a ideia subjacente a implementações comuns de `Set` e `Map`; a API de alto nível para este caso é `Set`.

### Feedback

O raciocínio sobre membership e consultas rápidas está correto. A estrutura mais específica é `Set`, porque só precisamos registrar cada ID e consultar `has`; um `Map` serve, mas sugere que existe um valor associado que o problema não pede. `add` também é esperado O(1), em média. Em inglês, sua explicação foi clara sobre a necessidade. Para ganhar precisão, diferencie o conceito de hash table da estrutura escolhida na API: `Set` para presença; `Map` para chave e valor.

## Questão 4 — busca em lista ordenada

### Enunciado

Você tem uma lista de números já ordenada e precisa encontrar um valor nela. Como faria a busca, qual seria a complexidade de tempo e qual condição sobre os dados permite usar essa estratégia?

### Resposta da estudante

> The best way to search for whether it's already ordered is to use binary search because you can reduce the time complexity to O(log n). The only problem is that insertion requires O(n) time instead of O(1), so that's the price to pay. That's pretty much it.

### Resposta esperada

Use busca binária: compare o valor procurado com o elemento do meio e descarte metade do intervalo a cada passo. O tempo é O(log n), e a condição fundamental é que os valores estejam ordenados segundo a mesma comparação usada na busca. Uma implementação iterativa usa O(1) de espaço auxiliar. O custo de inserção não faz parte do cenário, que já fornece a lista ordenada e pede apenas uma busca.

### Feedback

A escolha e a complexidade estão corretas, e você reconheceu a condição central: os dados precisam estar ordenados. A observação sobre inserção é válida quando se comparam estruturas mantidas ordenadas, mas não é necessária aqui; a lista já está ordenada e a pergunta trata somente de buscar. Sua explicação em inglês foi concisa e compreensível. Para ficar mais focada, mantenha a resposta nas condições e nos custos pedidos pelo cenário.

## Questão 5 — processar tarefas na ordem de chegada

### Enunciado

Uma aplicação recebe tarefas e precisa processá-las na mesma ordem em que chegaram. Ela adiciona tarefas novas e remove a próxima tarefa com frequência. Que estrutura escolheria, como implementaria essas operações com eficiência e qual seria a complexidade esperada?

### Resposta da estudante

> One can use an array with the `push` and `shift` methods instead of `pop`, because that requires a queue instead of a stack, like in the first question. That's how you implement the queue. The expected complexity is also constant.

### Resposta esperada

O comportamento é FIFO, então a estrutura abstrata é uma fila. `push` para adicionar ao fim de um array é O(1) amortizado, mas `shift` normalmente é O(n), pois os itens restantes precisam ser deslocados. Para obter operações O(1) amortizadas, pode-se manter um índice de início e avançá-lo ao remover, ou usar uma lista ligada com referências ao início e ao fim. A escolha concreta depende da necessidade de simplicidade, memória e gestão dos slots já consumidos.

### Feedback

Você identificou corretamente FIFO e distinguiu a fila da pilha da questão 1. O ponto a corrigir é a complexidade: usar `shift()` em um array não costuma ser O(1); ele precisa reorganizar os índices dos outros itens. Diga que a fila como abstração pode oferecer remoção O(1), desde que a implementação não use `shift()` dessa forma. Sua explicação em inglês foi clara. Para precisão, separe o nome da estrutura do custo da implementação específica.

## Questão 6 — itens com prioridade dinâmica

### Enunciado

Um sistema mantém itens com valores numéricos de prioridade. Itens novos podem chegar a qualquer momento, e o sistema precisa consultar e remover com frequência o item de maior prioridade. Que estrutura escolheria e qual seria o custo esperado de inserir um item, consultar o próximo e removê-lo?

### Resposta da estudante

> Soon, it's also a map, so the priority is the index, and you have the numerical value. If you use a map, removing and checking for a value are constant-time operations, just like removing. I would say a key-value structure like a map will do the job.

### Resposta esperada

Uma fila de prioridade, normalmente implementada com um max-heap binário. A raiz mantém o item de maior prioridade: consultar o máximo custa O(1), inserir custa O(log n) e remover o máximo custa O(log n). Um `Map` pode consultar um item por uma chave conhecida, mas não mantém o item de prioridade máxima; para encontrá-lo seria necessário percorrer as entradas, O(n). Se houver vários itens com a mesma prioridade, o contrato também pode precisar definir como desempatar.

### Feedback

`Map` não é a melhor escolha para a operação central deste cenário. Ele é rápido quando se conhece a chave, mas prioridade não é necessariamente uma chave única e o `Map` não acompanha automaticamente o maior valor. Para descobrir o maior sem estrutura auxiliar, seria preciso examinar os itens, O(n). A estrutura adequada é uma fila de prioridade com max-heap: ver o máximo O(1), inserir e remover o máximo O(log n). Em inglês, sua explicação é compreensível, mas chame a propriedade de item de `priority`, não de `index`; um índice é uma posição. Também vale explicar que a consulta por uma chave conhecida não resolve a seleção do maior.

## Questão 7 — menor caminho em rede sem pesos

### Enunciado

Você tem uma rede de lugares conectados por rotas; cada rota conta como um passo, sem pesos diferentes. Precisa encontrar o menor número de rotas entre um ponto de partida e os outros lugares alcançáveis. Como abordaria o problema e qual seria a complexidade em termos de lugares e rotas?

### Resposta da estudante

> Graph. That's the data structure, and you can solve this by using the traveling salesman problem. It is a pretty well-known non-polynomial-time problem, and I know you can have approximate solutions using dynamic programming.
>
> You can also go through the graph, which can be represented as a matrix or as a data structure showing which node is connected to each node. It's a set of lists or a set of arrays. Following the graph in that way, you can use a structure like a stack and check the length to see which one is bigger or not. That's one type of solution to the traveling salesman problem.

### Resposta esperada

O problema usa um grafo não ponderado e pede os caminhos com o menor número de arestas a partir de uma origem. Busca em largura (BFS), usando uma fila, visita os vértices por distância crescente e calcula a distância mínima para cada vértice alcançável. Com lista de adjacência, o custo é O(V + E), em que V é o número de vértices e E o número de arestas. Uma matriz de adjacência pode exigir O(V²) para percorrer os vizinhos. DFS com pilha pode visitar vértices, mas não garante o menor caminho em grafo não ponderado.

O problema do caixeiro-viajante é diferente: ele busca uma rota que visite um conjunto de cidades (geralmente todas) sob um objetivo de custo. Não é necessário visitar todas as cidades para encontrar as distâncias mínimas a partir de uma origem.

### Feedback

Você identificou corretamente o grafo e descreveu bem as listas de adjacência. A principal confusão foi trocar caminho mínimo a partir de uma origem por caixeiro-viajante. Para este enunciado, use BFS: ela explora primeiro todos os lugares a uma rota de distância 1, depois os de distância 2 e assim por diante. Em uma lista de adjacência, o tempo é O(V + E). A pilha/DFS percorre o grafo, mas não garante caminho mínimo. Sua explicação em inglês teve uma boa descrição da representação, mas misturou três ideias (TSP, percurso e comprimento do caminho). Em respostas futuras, nomeie primeiro o objetivo exato e só então associe algoritmo e complexidade.

## Questão 8 — dois valores que somam o alvo

### Enunciado

Você tem uma lista de números já ordenada e precisa descobrir se existem dois elementos distintos cuja soma seja igual a um valor-alvo. Como resolveria e qual seria a complexidade de tempo?

### Resposta da estudante

> If you do it naively, it would have quadratic complexity because you go through each number and check whether the sum can reach that value. You can optimize it a lot, though. Instead of a sliding window, you can just use two pointers. I think with the two-pointer method, it will be very close to linear, or about linear, so I'll go with that.

### Resposta esperada

Use dois ponteiros: um no início e outro no fim da lista. Se a soma for o alvo, encontrou o par. Se for menor, mova o ponteiro esquerdo para a direita para aumentar a soma; se for maior, mova o ponteiro direito para a esquerda para diminuí-la. Cada ponteiro percorre a lista no máximo uma vez: O(n) de tempo e O(1) de espaço auxiliar. A ordenação é essencial para justificar os movimentos. O método ingênuo que verifica todos os pares custa O(n²). Os índices precisam ser distintos; eles naturalmente são distintos enquanto os ponteiros ainda não se cruzaram.

### Feedback

Correto: dois ponteiros aproveitam a ordenação e reduzem o tempo de O(n²) para O(n). A complexidade é linear, não apenas “quase” linear. A janela deslizante costuma servir para intervalos contíguos; aqui o par pode estar em posições quaisquer, e a ordenação permite ajustar cada extremo conforme a soma. Sua explicação em inglês foi clara e comparou a solução ingênua à otimizada. Para mais precisão, dê a complexidade exata e indique que o avanço depende de a soma estar abaixo ou acima do alvo.

## Questão 9 — maior substring sem repetição

### Enunciado

Dada uma string, você precisa encontrar o comprimento da maior substring contígua sem caracteres repetidos. Que abordagem usaria, qual estrutura ajudaria a acompanhar os caracteres e qual seria a complexidade de tempo?

### Resposta da estudante

> There is an auxiliary structure to keep the longest string up until that point, and there's a method called the sliding window. I think it's quadratic. I don't remember the time complexity of using the sliding window method, but I think it's quadratic.

### Resposta esperada

Use janela deslizante para manter um intervalo contíguo sem caracteres repetidos. Um `Set` pode acompanhar os caracteres na janela: ao encontrar um repetido, avance o início removendo os caracteres até que a janela volte a ser válida. Cada caractere é adicionado e removido no máximo uma vez, então o tempo é O(n); o espaço auxiliar é O(min(n, tamanho do alfabeto)). Outra opção é um `Map` de caractere para último índice visto, que move o início da janela diretamente para depois da repetição. Guarde os limites ou o comprimento máximo; não é necessário manter cópias de todas as substrings.

### Feedback

Você lembrou corretamente o padrão de janela deslizante. A complexidade eficiente não é quadrática: cada caractere entra e sai da janela no máximo uma vez, então o tempo é O(n). Um `Set` ou um `Map` de último índice visto ajuda a detectar repetições. A pergunta pede o comprimento máximo, então basta guardar o melhor comprimento e os limites da janela, sem construir cada substring. Sua explicação em inglês identifica o padrão, mas “auxiliary structure to keep the longest string” não deixa claro o que a estrutura guarda; nomeie os caracteres da janela ou o último índice visto. Para complexidade, associe o custo ao número de vezes que cada caractere é processado.

## Questão 10 — ordem de tarefas com dependências

### Enunciado

Um sistema precisa executar tarefas respeitando dependências: algumas tarefas só podem começar depois de outras terminarem. Como determinaria uma ordem válida de execução, como identificaria se não existe uma ordem válida e qual seria a complexidade?

### Resposta da estudante

> There is a structure called a dependency graph. It would be the same problem as using DFS: searching from the beginning task, which is the root of the graph, all the way to the destination task, because then you know which ones are required. The complexity of DFS is O(V + E), where V is the number of vertices and E is the number of edges.

### Resposta esperada

Modele tarefas como vértices e dependências direcionadas como arestas. Faça uma ordenação topológica para obter uma sequência em que cada dependência aparece antes da tarefa que depende dela. Pode-se usar DFS com estados (não visitado, em processamento, concluído): uma aresta para um vértice em processamento indica ciclo; ao concluir vértices, forme a ordem topológica. Outra opção é o algoritmo de Kahn, que processa vértices com grau de entrada zero e detecta ciclo se não conseguir processar todos os vértices. Ambos levam O(V + E) com listas de adjacência.

### Feedback

Você identificou corretamente o grafo de dependências e a complexidade O(V + E) de uma travessia DFS. O objetivo, porém, não é buscar de uma tarefa inicial até um destino; é ordenar todas as tarefas respeitando as arestas e detectar ciclos. Uma ordenação topológica produz essa ordem, e a DFS precisa marcar estados para reconhecer um ciclo. Em inglês, a estrutura e a complexidade foram nomeadas com clareza. Para completar o raciocínio, conecte DFS ao resultado que ela precisa produzir: detectar ciclo e montar a ordem topológica.

## Resumo para revisão autônoma

- **Escolha da estrutura pelo tipo de operação:** pilha (LIFO), fila (FIFO), `Map` (chave → valor), `Set` (presença/valores únicos), heap (mínimo ou máximo), grafo (relações e dependências).
- **Complexidade das operações:** `push`/`pop` no fim de array O(1) amortizado; `shift` normalmente O(n); busca binária O(log n) em dados ordenados; heap O(1) para consultar a raiz e O(log n) para inserir/remover; hash `get`/`set`/`has` esperado O(1).
- **Padrões de algoritmo:** BFS para caminho mínimo em grafo sem pesos; dois ponteiros para pares em lista ordenada; janela deslizante para intervalos contíguos; ordenação topológica para dependências e ciclos.
- **Explicar em inglês:** diferencie estrutura abstrata e implementação; declare pré-condições; associe cada complexidade à operação; nomeie o objetivo exato antes do algoritmo.
