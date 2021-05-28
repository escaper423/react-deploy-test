import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './CreateTask.css';
import { BsX } from "react-icons/bs";
import {v4} from 'uuid';

export default function CreateTask({ 
    theme, opened, setOpened, 
    inputText, setInputText,
    todoList, setTodoList
}) {
    const modalPortal = document.getElementById("modal-portal");
    const modalStyle = {
        backgroundColor: theme ? '#555' : '#aaa',
        color: theme ? '#ccc' : '#333',
        borderRadius: '8px',
        position: 'absolute',
        margin: 'auto',
        top: '20%',
        left: '50%',
        padding: '2rem',
        width: '30vw',
        display: 'block',
        transform: 'translateX(-50%)',
        zIndex: 1000
    };

    function CreateTodoList() {
        let warning = document.getElementsByClassName('create-task-container-cannot-text')[0];

        if(inputText){
            warning.innerHTML = "";
            const newVal = {
                ...todoList,
                "todo": {
                    title: "Todo",
                    items: [
                        ...todoList.todo.items,
                        {
                            id: v4(),
                            name: inputText
                        }
                    ]
                }
            }
            setInputText("");
            return setTodoList(newVal);
        }
        
        
        warning.innerHTML = "Content text is required.";
        return null;
    }

    if (opened) {
        return (
            ReactDOM.createPortal(
                <>
                    <div id="create-task-modal" onClick={() => setOpened(false)}></div>
                    <div className="create-task-container" style={modalStyle}>
                        <BsX className='create-task-container-close' onClick = {()=>setOpened(false)} size='2rem'></BsX>
                        <h2>Create Task</h2><br></br>
                        <hr></hr>
                        <h3>Content:</h3>
                        <input type="text" value={inputText} placeholder="type here" className="create-task-container-title" onChange={(e) => setInputText(e.target.value)}></input>
                        <p className="create-task-container-cannot-text"></p>
                        <button className='create-task-container-confirm' onClick={CreateTodoList}>Create</button>
                    </div>
                </>

                , modalPortal)
        );
    }
    return null;
};