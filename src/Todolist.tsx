import React, {useState} from 'react';
import {FilterValuesType} from './App';
import {ChangeEvent, KeyboardEvent} from "react";

type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

  let [filter, setFilter] = useState<FilterValuesType>("all");

  let tasksForTodolist = props.tasks;

  if (filter === "active") {
    tasksForTodolist = props.tasks.filter(t => !t.isDone);
  }
  if (filter === "completed") {
    tasksForTodolist = props.tasks.filter(t => t.isDone);
  }
debugger;
  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  const [title, setTitle] = useState('')
  const addTaskHandler = () => {
    props.addTask(title)
    setTitle('')
  }
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }
  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTaskHandler()
    }
  }

  const changeFilterHandler = (value: FilterValuesType) => {
     changeFilter(value)
  }
  const removeTaskHandler = (tId: string) => {
    props.removeTask(tId)
  }
  return <div>
    <h3>{props.title}</h3>
    <div>
      <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
      <button onClick={addTaskHandler}>+</button>
    </div>
    <ul>
      {
        tasksForTodolist.map(t => <li key={t.id}>
          <input type="checkbox" checked={t.isDone}/>
          <span>{t.title}</span>
          <button onClick={() => {removeTaskHandler(t.id)}}>x</button></li>)}
    </ul>
    <div>
      <button onClick={() => changeFilterHandler('all')}>All</button>
      <button onClick={() => changeFilterHandler('active')}>Active</button>
      <button onClick={() => changeFilterHandler('completed')}>Completed</button>
    </div>
  </div>
}
