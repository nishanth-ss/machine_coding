import React, { useRef, useState } from 'react';
import "../style/todo.css";

interface TodoList {
    id: string;
    todoMessage: string;
    completed: boolean;
}

const TodoList = () => {
    const [todo, setTodo] = useState<string>("");
    const [todoList, setTodoList] = useState<TodoList[]>([]);
    const [selectedID, setSelectedID] = useState<null | string>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedID) {
            const updateTodo = todoList.map((selectTodo) => {
                if (selectedID === selectTodo.id) {
                    return { ...selectTodo, todoMessage: todo }
                }
                return selectTodo
            })
            setTodoList(updateTodo);
            setSelectedID(null)
        } else {
            setTodoList(
                [
                    ...todoList,
                    { id: String(todoList.length + 1), todoMessage: todo, completed: false }
                ]
            );
        }
        setTodo("");
    }

    const handleChange = (id: string) => {
        setTodoList(
            todoList?.map((val) => {
                if (val.id === id) {
                    return { ...val, completed: !val.completed }
                }
                return val;
            })
        )
    }

    const handleDelete = (id: string) => {
        console.log(id)
        setTodoList(
            todoList?.filter((val) => val.completed ? val.id !== id : val)
        )
    }

    const handleDeleteAllTodo = () => {
        setTodoList([])
    }

    const handleEdit = (value: TodoList) => {
        if (inputRef.current) inputRef.current.focus();
        setTodo(value.todoMessage);
        setSelectedID(value.id);
    }

    return (
        <div>
            <h1>TodoList</h1>
            <form action="" onSubmit={handleAddTodo}>
                <input className='input-style' ref={inputRef} type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
                <button type='submit'>Add Todo</button>
                <button onClick={handleDeleteAllTodo} type='button'>Delete Todo</button>
            </form>
            {
                todoList?.length > 0 && todoList?.map((val: TodoList, index: number) => {
                    return (
                        <div key={index} className='todoContainer'>
                            <input type="checkbox" checked={val.completed} onChange={() => handleChange(val.id)} />
                            <h1>{val.todoMessage}</h1>
                            <button className='edit' onClick={() => handleEdit(val)}>Edit</button>
                            <button className='delete' onClick={() => handleDelete(val.id)}>Delete</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TodoList