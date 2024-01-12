import { memo } from "react";
import { useTodosContext } from "../context/todosContext"


const TodoList = memo(() => {


    const {todos, markAsDone, deleteTodo} = useTodosContext()
    
  return (
    <main>
       {
        todos.map((todo) =>(
            <div id={todo.id}>
            <h1>{todo.title}</h1>
            <button onClick={()=> markAsDone(todo.id)}>
                {
                  todo.isCompleted? "Done" : "Completed"           
                }
                </button>
            <button onClick={()=> deleteTodo(todo.id)}>Delete</button>
        </div>
      
        ))
       }
    </main>
  )
})

export default TodoList
