import { createContext, useContext } from "react";

export const TodoContext = createContext({
    taskList: [
        {
            id: 1,
            description: "Todo",
            completed: false,
        }
    ],
    addTodo: (description)=>{},
    deleteTodo: (id)=>{},
    toggleComplete: (id)=>{},
    updateTodo: (id, description)=>{}
})


export const useTodoContext = () => {
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider