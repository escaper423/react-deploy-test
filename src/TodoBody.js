import React from 'react';
import './TodoBody.css';
import TodoList from './TodoList';
import { GetTheme } from './App';

export default function TodoBody({todoList, setTodoList}) {
    const theme = GetTheme();

    const bodyStyle = {
        backgroundColor: theme ? '#333' : '#eee',
        color: theme ? '#eee' : '333',
        width: '100vw',
        height: '70vh',
        textAlign: 'center'
    }

    return (
        <>
            <div id='todo-body' style={bodyStyle}>
                <TodoList todoList = {todoList} setTodoList = {setTodoList}/>
            </div>
        </>
    )
}
