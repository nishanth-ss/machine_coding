import { useState } from 'react';
import "../style/todo.css";

interface TodoList {
    id: string;
    todoMessage: string;
    completed: boolean;
}

const TodoList = () => {
    const [todo,setTodo] = useState<string>("");
    const [todoList,setTodoList] = useState<TodoList[]>([]);

    const handleAddTodo = ()=>{
        setTodoList(
            [
                ...todoList,
                {id: String(todoList.length + 1),todoMessage: todo, completed: false}
            ]
        );
        setTodo("");
    }

    const handleChange = (id: string)=>{
        setTodoList(
            todoList?.map((val)=>{
                if(val.id === id){
                  return  {...val, completed: !val.completed}
                }
                return val;
            })
        )
    }

    const handleDelete = (id: string)=>{
        setTodoList(
            todoList?.filter((val)=>  val.completed ? val.id !== id : val)
        )
    }

  return (
    <div>
        <h1>TodoList</h1>
        <input type="text" value={todo} onChange={(e)=>setTodo(e.target.value)} />
        <button onClick={handleAddTodo}>Add Todo</button>

        {
            todoList?.length > 0 &&  todoList?.map((val: TodoList, index: number)=>{
                return (
                    <div key={index} className='todoContainer'>
                    <input type="checkbox" checked={val.completed} onChange={()=>handleChange(val.id)} />
                    <h1>{val.todoMessage}</h1>
                    <button className='delete' onClick={()=>handleDelete(val.id)}>Delete</button>
                </div>
                )
            })
        }
    </div>
  )
}

export default TodoList