import React, {useState} from 'react';
import {FilterValuesType} from './App';
import {ChangeEvent, KeyboardEvent} from "react";
import {Button} from "./components/Button";
import {Input} from "./components/Input";

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
  const addTaskHandler = () => {
    props.addTask(title)
    setTitle('')
  }
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }
  const removeTaskHandler = (tId: string) => {
    props.removeTask(tId)
  }
  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTaskHandler()
    }
  }
  const changeFilterHandler = (value: FilterValuesType) => {
    props.changeFilter(value)
  }

  return <div>
    <h3>{props.title}</h3>
    <div>
      {/*<input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>*/}
      <Input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
      {/*<button onClick={addTaskHandler}>+</button>*/}
      <Button name={'+'} callBack={addTaskHandler}/>
    </div>
    <ul>
      {
        props.tasks.map(t => <li key={t.id}>
          <input type="checkbox" checked={t.isDone}/>
          <span>{t.title}</span>
          {/*<button onClick={() => {removeTaskHandler(t.id)}}>x</button>*/}
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
