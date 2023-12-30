import { useEffect, useState } from 'react'
import { TodoProvider } from './context/TodoContext'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {

   const [taskList, setTaskList] = useState([])


   const addTodo = (description) => {
    setTaskList((prev) => [{id: Date.now(), ...description }, ...prev] )
   }

   const updateTodo = (id, description) => {
    setTaskList((prev)=> prev.map( (eachTodo)=> (eachTodo.id === id? description : eachTodo)))
   }

   const deleteTodo = (id) => {
    setTaskList((prev) => prev.filter((eachTodo) => eachTodo.id !== id))
   }

   const toggleComplete = (id) => {
    setTaskList((prev) => prev.map( (eachTodo) => eachTodo.id ===id ? {...eachTodo, completed: !eachTodo.completed} : eachTodo ))
   }



   useEffect(()=>{
    const taskList = JSON.parse(localStorage.getItem("todo"))
    
    if(taskList && taskList.length>0) setTaskList(taskList)

   },[])

   useEffect(()=>{
    localStorage.setItem("todo", JSON.stringify(taskList))
   },[taskList])



  return (
    <TodoProvider value={{taskList, addTodo, deleteTodo, updateTodo, toggleComplete}}>
    <div className="bg-[#1c1c1c] min-h-screen  py-8">
      <div className="bg-[#373737] w-[90%] max-w-2xl mx-auto shadow-lg  rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
        <div className="mb-4">
          <TodoForm />
        </div>
        <div className="flex flex-wrap gap-y-3">
          {
            taskList.map((eachTask) => (
              <div key={eachTask.id}
              className='w-full'
              >
                
                <TodoItem todo={eachTask} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
    </TodoProvider>
  )
}

export default App
