import React, { useState } from 'react';
import './TodoHeader.css';
import { IconContext } from 'react-icons';
import { GoEye } from "react-icons/go";
import CreateTask from './CreateTask';

import { GetTheme, GetUpdateTheme } from './App';

export default function TodoHeader({ todoList, setTodoList, inputText, setInputText }) {
    const [opened, setOpened] = useState(false);
    const theme = GetTheme();
    const themeUpdate = GetUpdateTheme();
    const daynight = theme ? 'Day' : 'Night';
    const headerStyle = {
        display: 'inline-block',
        backgroundColor: theme ? '#333' : '#eee',
        color: theme ? '#ccc' : '#333',
        width: '100vw',
        height: '30vh',
        textAlign: 'center',
        padding: '20px',
    }

    return (
        <>
            <CreateTask
                opened={opened} theme={theme} setOpened={setOpened}
                inputText={inputText} setInputText={setInputText}
                todoList={todoList} setTodoList={setTodoList}
            />
            <div className="todo-header" style={headerStyle}>
                <IconContext.Provider value={{ size: "2rem" }}>
                    <nav className="todo-header-navbar">
                        <GoEye onClick={themeUpdate}></GoEye><p>{daynight} Mode</p>
                    </nav>
                </IconContext.Provider>
                <div className="todo-header-container">
                    <h1>Todo List Tutorial</h1>
                    <p className="textxt">Press 'Create Task' to add a todo task</p>
                    <button className="todo-header-btn" onClick={() => setOpened(true)}>Create Task</button>
                </div>
            </div>
        </>
    )
}