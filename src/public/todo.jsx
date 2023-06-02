import React, { useEffect, useState } from "react";
import "./todo.css"
import { Trash } from 'phosphor-react'

export default function Todo() {
    const [ todos , setTodos ] = useState([]);
    const [ content , setContent ] = useState('');

    function addTodo(todo) {
        const newTodo = {
            id: Math.random(),
            cont: todo,
        }
        if ( content !== "" ) {
            setTodos([ ...todos , newTodo ]);
            setContent("");
        } else {
            alert('add new todo.')
        }
    }
    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem('todos')) || [] ;
        console.log('get todo local storage')
        setTodos(todos);
    } , [] );
    useEffect(() => {
        localStorage.setItem('todos' , JSON.stringify(todos));
        console.log('set todo local storage')
    } , [todos]);
    const deleteTodo = (id) => {
        setTodos(todos.filter(todos => todos.id !== id))
    }
    console.log(todos)
    return (
        <div className="main">
            <nav className="nav">
                <h2>Todo App</h2>
            </nav>
            <div className="listContainer">
            
                {
                    todos.length === 0 ? 
                    <h3 >No todos yet</h3> :
                    <ul>
                        {
                            todos.map((todo) => {
                                return (
                                    <li key={todo.id} className="listItem">
                                        {todo.cont}
                                        <Trash onClick={() => deleteTodo(todo.id)} className="trash"/>
                                    </li>
                                )
                            })
                        }
                    </ul>
                }
            </div>

            <form className="todoForm">
                <input className="todoFormInput" placeholder="input your todo here..." type="text" value={content} onChange={(e) => setContent(e.target.value)}/>

                <button className="todoFormButton" onClick={(e) => {e.preventDefault() ; addTodo(content) }}>add todo</button>
            </form>
        </div>
    )
}