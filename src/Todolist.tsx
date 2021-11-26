import React, {useState} from 'react';
import {FilterValuesType} from './App';
import {ChangeEvent, KeyboardEvent} from "react";
import {Button} from "./components/Button";
import {Input} from "./components/Input";
import NewButton from "./components/NewButton";

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
  changeFilter: (value: FilterValuesType) => void
}

export function Todolist(props: PropsType) {

  const [title, setTitle] = useState('')
  const removeTaskHandler = (tId: string) => {
    props.removeTask(tId)
  }
  const changeFilterHandler = (value: FilterValuesType) => {
    props.changeFilter(value)
  }
  const callBackHandlerNewButton= () => {
    props.addTask(title)
    setTitle('')
  }

  return <div>
    <h3>{props.title}</h3>
    <div>
      <Input title={title} setTitle={setTitle} addTask={props.addTask}/>
      <NewButton name={'+'} callBack={callBackHandlerNewButton}/>
    </div>
    <ul>
      {
        props.tasks.map(t => <li key={t.id}>
          <input type="checkbox" checked={t.isDone}/>
          <span>{t.title}</span>
          <Button name={'x'} callBack={() => {removeTaskHandler(t.id)}}/>
        </li>)}
    </ul>
    <div>
      <Button name={'all'} callBack={() => changeFilterHandler('all')}/>
      <Button name={'active'} callBack={() => changeFilterHandler('active')} />
      <Button name={'completed'} callBack={() => changeFilterHandler('completed')} />
    </div>
  </div>
}
