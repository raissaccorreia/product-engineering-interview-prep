# Revisão: work item tracker

## Resultado da tentativa

Tempo informado: 20 minutos. A tentativa está preservada em [attempt.tsx](attempt.tsx), copiada sem alterações de `app/src/App.tsx` no momento do envio. Depois da cópia, `app/src/App.tsx` voltou à tela inicial neutra para manter o ambiente executável para o próximo exercício. A tentativa não compila; o Vite apontou um erro de sintaxe na abertura do botão de submit.

## Código enviado

```tsx
import './App.css'

function App() {

 type listItem = {
    title: string;
    completed: boolean;
 } // list type

 const [newItem, setNewItem] = React.useState<string>(""); // form state
 const [toDoList, setToDoList] = React.useState([]); // to do list state

 function handleChange(e) {
   setNewItem(e.target.value);
 } // update the newItem string text
 
 function addItem(newItem) {
    setToDoList(toDoList.push({ title: newItem, completed: false }));
 } // add new item to the todo list array
 
 function toggleCompleteItem(listItem) {
    setTodoList(...toDoList, toDoList.find((item) => item.label === listItem.label).completed = true)
 } // find the item in the todo list, update the completed field while keeping the rest of the array normal with ... operator
 
 return (
    <main>
      <h1>To-Do List</h1>
      <form>
         <label>New Item:
            <input type="text" value={newItem} handleChange={handleChange}/>
            <button type="submit" onClick={addItem}<Add Item</button>
          </label>
      </form>
      {list.map((listItem) => 
        return { 
           <input type="checkbox" value={listItem.completed} handleChange={toggleCompleteItem}/> // state of checkbox toggle
           {listItem.completed ? <li>{listItem.label}</li> : <li>{listItem.label}</li>} // add style strike through
        }
      )}
    </main>
  )
}

export default App
```

## Revisão técnica

Você começou a declarar os dados e o estado necessários, mas ainda não chegou a uma versão executável. O conflito de porta foi causado pelo servidor Vite que eu havia deixado aberto em 5173. Sua segunda instância subiu em 5174; essa porta alternativa, por si só, não é um erro. Depois, o compilador parou no JSX incompleto do botão.

Há também erros de compilação e de comportamento além da linha indicada:

- `React.useState` usa `React`, mas React não foi importado. O template usa a transformação JSX automática, que não cria uma variável global `React`.
- `handleChange` não é uma propriedade reconhecida por `<input>`; o React espera `onChange`. O mesmo vale para o checkbox. Os eventos também precisam de tipos para TypeScript estrito.
- `toDoList.push(...)` altera o array atual e devolve um número. Esse retorno é passado para o setter no lugar do array, por isso a lista não é atualizada corretamente.
- `setTodoList` tem capitalização diferente de `setToDoList` e não foi declarado. O `find` consulta `label`, mas o tipo descrito usa `title`. A expressão de atualização mistura argumentos espalhados com uma mutação do objeto encontrado.
- `list` não foi declarado. O callback de `map` mistura a sintaxe de uma função com bloco e de uma expressão JSX, e cada item renderizado ainda precisa de uma `key` estável.
- O checkbox usa `value`, mas seu estado visual controlado depende de `checked`. A submissão do formulário precisa impedir o reload da página.
- A tentativa ainda não inicializa os três itens do enunciado, não filtra, não calcula contagens, não controla seleção nem exibe detalhes. Você observou corretamente que filtro e contagem ficaram pendentes.

## O que já aparece no seu raciocínio

Você separou o estado do campo do estado da lista, identificou a necessidade de atualizar a lista ao adicionar e marcar conclusão como interação própria. Também percebeu explicitamente que filtro e contagem estavam incompletos. Isso corresponde aos principais blocos do requisito, embora a sintaxe e o contrato das APIs ainda precisem virar código válido.

O próximo passo de maior impacto é transformar cada interação em uma atualização de estado válida e imutável e validar cedo com o compilador. A tentativa ficou sem execução funcional, então não há resultados observados dos exemplos de aceitação.

## Verificação e complexidade

O relatório do Vite mostra erro de parsing em `App.tsx`; o navegador não consegue executar este componente. Como não há implementação funcional, não é possível avaliar os resultados da lista nem atribuir uma complexidade útil ao código como solução. `push`, mesmo se estivesse dentro de uma atualização, seria uma mutação que viola o requisito de imutabilidade.

Você informou que consultou a pesquisa, mas não especificou as páginas ou referências utilizadas.

Para uma revisão manual da próxima tentativa, percorra os critérios do enunciado separadamente: estado inicial, campo e submit, filtro, totais, seleção e detalhes, preservação de filtro/seleção ao adicionar. Execute cada critério no navegador e anote o resultado observado.

## Explicação em inglês

Você explicou o progresso e as dúvidas em português nesta entrega. Os comentários no código mostram intenção, mas não recebemos uma explicação oral em inglês para avaliar. Ao explicar, use o nome exato da API e o efeito que espera observar; por exemplo, diferencie a função que recebe o evento do nome da propriedade React que registra o handler. O comentário sobre o operador spread e "the rest of array normal" não descreve com precisão a imutabilidade; explique qual novo array e qual novo objeto deveriam ser produzidos.

## Solução de referência

A implementação completa com estado inicial, formulário controlado, filtro, contagem global, seleção e atualização imutável está em [reference.tsx](app/src/reference.tsx). Ela foi mantida separada da tentativa. Não foi copiada para `App.tsx`.
