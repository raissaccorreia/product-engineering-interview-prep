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
 } // find the item in the todo list array, update the completed field while keeping the rest of the array normal with ... operator
 
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
