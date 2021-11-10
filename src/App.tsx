import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    const task1 = [
        {id: 1, title: "Hello world111", isDone: true},
        {id: 2, title: "I am Happy111", isDone: false},
        {id: 3, title: "Yo111", isDone: false}
    ]
    const task2 = [
        {id: 1, title: "Hello world222", isDone: true},
        {id: 2, title: "I am Happy222", isDone: false},
        {id: 3, title: "Yo222", isDone: false}
    ]
    const task3 = [
        {id: 1, title: "Hello world3333", isDone: true},
        {id: 2, title: "I am Happy3333", isDone: false},
        {id: 3, title: "Yo3333", isDone: false}
    ]


    return (
        <div className="App">
            <Todolist title={'What to learn11111'} tasks={task1}/>
            <Todolist title={'What to learn22222'} tasks={task2}/>
            <Todolist title={'What to learn33333'} tasks={task3}/>
        </div>
    );
}

export default App;
