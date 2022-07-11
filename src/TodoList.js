// Za osnovno strukturo komponente uporabimo kratico "rfc"
import React from 'react'
import Todo from './Todo'

// 
export default function TodoList({ todos, toggleTodo }) {
  return (
        //Če hočemo uporabljati JavaScript znotraj HTML kode v React-u moramo kodo pisati znotraj zvitih oklepajev, primer odspodaj

        //<div>{todos}</div>

        // V "todos" shranimo vse "todo", dodamo unikaten key parameter child item-u da ob spremembi ponovno rendera samo posodobljene elemente
        todos.map(todo =>{
            return <Todo key={todo.id} todo={todo}  toggleTodo={toggleTodo} />
        })
  )
}
import React from 'react'
