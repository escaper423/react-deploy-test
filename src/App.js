import React, { useState, useContext } from 'react';
import './App.css';
import TodoHeader from './TodoHeader.js';
import TodoBody from './TodoBody.js';
import CreateTask from './CreateTask.js';

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

export function GetTheme() {
  return useContext(ThemeContext);
}

export function GetUpdateTheme() {
  return useContext(ThemeUpdateContext);
}

export default function App() {
  const [inputText, setInputText] = useState("");
  const [todoList, setTodoList] = useState({
    "todo": {
        title: "Todo",
        items: []
    },
    "in-progress": {
        title: "In Progress",
        items: []
    },
    "completed": {
        title: "Completed",
        items: []
    }
});
  const [darkTheme, setDarkTheme] = useState(true);

  function ToggleTheme() {
    setDarkTheme(prevDarkTheme => !prevDarkTheme);
  }
  return (
    <>
      <div id="app">
        <ThemeContext.Provider value={darkTheme}>
          <ThemeUpdateContext.Provider value={ToggleTheme} >
            <CreateTask theme={GetTheme}/>
            <TodoHeader todoList = {todoList} setTodoList = {setTodoList} inputText = {inputText} setInputText = {setInputText} />
            <TodoBody todoList = {todoList} setTodoList = {setTodoList}/>
          </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
      </div>
    </>
  );
}