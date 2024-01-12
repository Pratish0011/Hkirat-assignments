import { ChangeEvent, useState } from "react"
import Navbar from "./components/Navbar"
import { useTodosContext } from "./context/todosContext"
import TodoList from "./components/TodoList"

const App = () => {
  const [input, setInput] = useState<string>("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const {addTodos} = useTodosContext()

  const handleAddClick = ()=>{
      addTodos(input)
      setInput("")
  }

  return (
    <>
      <h1>Todo</h1>

      <Navbar/>
      
      <input type="text" value={input} onChange={handleChange} />
      <button onClick={handleAddClick}>Add</button>

      <TodoList/>
    </>
  )
}

export default App
