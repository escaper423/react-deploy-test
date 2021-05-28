import React, { useState } from 'react';
import { GetTheme } from './App';
import './TodoBody.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from "lodash";
import { BsEye, BsX } from "react-icons/bs";

function TodoList({todoList, setTodoList}) {

    //couldnt change parameters' name ('destination, source')
    const hDragEnd = ({destination,source}) => {
        console.log(destination);
        console.log(source);
        if (!destination){
            return;
        }
        
        if (destination.index === source.index && destination.droppableId === source.droppableId){
            return;
        }

        const tmp = {...todoList[source.droppableId].items[source.index]};
        setTodoList(prev =>{
            prev = {...prev}
            prev[source.droppableId].items.splice(source.index, 1);
            prev[destination.droppableId].items.splice(destination.index,0,tmp);
            return prev;
        })
    }

    const DeleteList = (key,id) => {
        console.log("clicked");
        setTodoList(prev => {
            prev = {...prev}
            prev[key].items = prev[key].items.filter(item => item.id != id);
            return prev;
        })
    }

    const theme = GetTheme();
    const listStyle = {
        width: '20%',
        height: '30%',
        backgroundColor: theme ? '#555' : '#ccc',
        color: theme ? '#ccc' : '#555',
        borderRadius: '6px',
        padding: '1rem'
    }

    return (
        <div className="todo-list-container">
            <DragDropContext onDragEnd={hDragEnd}>
                {_.map(todoList, (data, key) => {
                    return (
                        <div key={key} className={"todo-list"} style={listStyle}>
                            <h3>{data.title}</h3>
                            <hr></hr>
                            <Droppable droppableId={key}>
                                {(provided, snapshot) => {
                                    return (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className={"todo-list-column"}
                                        >
                                            {data.items.map((el, index) => {
                                                console.log(el.id);
                                                return (
                                                    <Draggable key={el.id} index={index} draggableId={el.id}>
                                                        {(provided, snapshot) => {
                                                            console.log(snapshot);
                                                            return (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    className={`todo-list-item ${snapshot.isDragging && "dragging"}`}
                                                        
                                                                >
                                                                    <span {...provided.dragHandleProps} style={{margin:'auto', width:'80%', textOverflow:'ellipsis'}}>{el.name}</span>
                                                                    <BsX className="todo-list-item-delete" onClick={() => DeleteList(key,el.id)} ></BsX>

                                                                </div>
                                                            )
                                                        }}
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }}
                            </Droppable>
                        </div>
                    )
                })}
            </DragDropContext>
        </div>
    );
}
export default TodoList;
