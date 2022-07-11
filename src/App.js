// Aplikacija v React
// Za naložiti React moramo v konzoli zagnati komando "npx create-react-app .", kjer je znak "." trenuten direktorij, ki je lahko nadomeščen z poljubno lokacijo
// Nameščen ES7 extension za hitrejše delo
// Testne datoteke, stile in logotip lahko zbrišemo ali modificiramo po želji

import React, { useState , useRef, useEffect } from 'react'; // uporabimo useState hook (), useRef hook (omogoča nam reference na HTML elemente) in useEffect
import TodoList from './TodoList'; // uporabimo ustvarjen razred
import uuidv4 from 'uuid/v4'; // naložimo package uuid in importamo, uporabljen za naključno dodeliti id-je (paziti moramo, da je treba pod exporte modula dodati določeno verzijo)

// Definiramo spremenljivko v katero shranjujemo lokalno vnešene podatke
const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
const [todos, setTodos] = useState([]); // Definiramo tabelo
const todoNameRef = useRef(); // Definiramo spremenljivko da lahko dostopamo do vrednosti input-a

// Shranjevanje todo-jev
useEffect(() => {
  const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  if(storedTodos) setTodos(storedTodos);
}, [])

// Dobivanje todo-jev
useEffect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
}, [todos]);

function toggleTodo(id){
  const newTodos = [...todos]; // Ustvarimo kopijo že obstoječe liste, v React-u raje ne direktno modificiramo tabel ampak ustvarimo kopijo in nato spremenimo vrednosti
  const todo = newTodos.find(todo => todo.id === id);
  todo.complete = !todo.complete; // Spremenimo stanje iz končanega na nekončano in obratno
  setTodos(newTodos);
}

// Funkcija handleAddTodo doda vsebino input-a v tabelo
function handleAddTodo(e){
  const name = todoNameRef.current.value;
  if ( name === '') return;
  setTodos(prevTodos => {
    return [...prevTodos, { id: uuidv4(), name: name, complete:false}]
  });
  todoNameRef.current.value = null; // zbriši input polje ob vnosu podatkov v tabelo
}

// Funckija handleClearTodos odstrani todo-je, ki so bili že odpravljeni
function handleClearTodos(){
  const newTodos = todos.filter(todos => !todos.complete);
  setTodos(newTodos);
}

  // return lahko vrne samo 1 stvar
  /*
  return (
    <TodoList />
    <input type="text" />
  )
  */
  
  // če hočemo return z več elementi moramo uporabiti fragmente "<>"
  return(
    <>
      {/* Ustvarimo tip TodoList in TodoList.js, importamo v glavno aplikacijo zgoraj 
          Uporabimo zgoraj definiran todos
      */}
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Completed Todos</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
