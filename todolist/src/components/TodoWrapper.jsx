import React ,{useState} from 'react'
import TodoForm from './TodoForm'

const TodoWrapper = () => {

const[todos,setTodos]= useState([])

const  addTodo =


  return (
    <div className='Todowrapper'>
        <TodoForm  addTodo = {addTodo}/>
      
    </div>
  )
}

export default TodoWrapper
