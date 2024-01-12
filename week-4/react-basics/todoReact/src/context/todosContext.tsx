import { ReactNode, createContext, useContext, useState } from "react";

export interface TodosProviderProps {
    children: ReactNode;
   
}


export interface TodosType {
    id: string;
    title: string;
    isCompleted: boolean
}


export interface TodosContextType{
    todos: TodosType[]
    addTodos: (title: string)=> void
    markAsDone: (id: string) => void
    deleteTodo: (id: string) => void
}

const todosContext = createContext<TodosContextType|null>(null)



export const TodosProvider = ({children}:TodosProviderProps)=>{


    const [todos, setTodos] = useState<TodosType[]>(()=>{
        try {
            const newTodos = localStorage.getItem("todos") || "[]"
            return JSON.parse(newTodos) 
        } catch (error) {
            return []
        }
      })


    const addTodos = (title: string)=>{
       setTodos([...todos, {
        id: Math.random().toString(),
        title: title,
        isCompleted: false
       }])

       localStorage.setItem("todos", JSON.stringify(todos))
    }

    const markAsDone = (id: string) =>{
        
        const completed = todos.map((todo)=>{
            if(todo.id === id){
               return {...todo, isCompleted: true}
            }

            return todo
        })

        setTodos(completed as TodosType[])
        localStorage.setItem("todos", JSON.stringify(todos))
    }

    const deleteTodo = (id: string)=>{
        const notDeletedTodos = todos.filter((todo)=>{
            return todo.id !== id
        })

        setTodos(notDeletedTodos as TodosType[])
        localStorage.setItem("todos", JSON.stringify(todos))
    }


    return <todosContext.Provider value={{todos, addTodos, markAsDone, deleteTodo}}>
        {children}
    </todosContext.Provider>
}


export const useTodosContext = ()=>{

    const todosConsumer = useContext(todosContext)

    if(!todosConsumer){
        throw new Error ("Some error occur in Provider")
    }

    return todosConsumer

}