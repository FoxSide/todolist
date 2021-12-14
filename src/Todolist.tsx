import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditebleSpan} from "./EditebleSpan";

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskID: string, todoListId: string) => void
  changeFilter: (filter: FilterValuesType, todoListId: string) => void
  addTask: (title: string, todoListId: string) => void
  filter: FilterValuesType
  changeTaskStatus: (taskID: string, isDone: boolean, todoListId: string) => void
  changeTaskTitle: (taskID: string, newtitle: string, todoListId: string) => void
  id: string
  removeTodoList: (todolistId: string) => void
  changeTodoListTitle: (todolistId: string, newTitle: string) => void
}

function TodoList(props: PropsType) {

  const setAllFilterValue = () => props.changeFilter("all", props.id)
  const setActiveFilterValue = () => props.changeFilter("active", props.id)
  const setCompletedFilterValue = () => props.changeFilter("completed", props.id)
  const getBtnClass = (filter: FilterValuesType) => props.filter === filter ? "active" : "";

  const tasksJSX = props.tasks.map(task => {
    const getClasses = () => task.isDone ? "is-done" : "";
    const changeStatus = (e: ChangeEvent<HTMLInputElement>) =>
      props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
    const removeTask = () => props.removeTask(task.id, props.id)

    const changeStatusHandler = (newValue: string) =>
      props.changeTaskTitle(task.id, newValue, props.id)

    return (
      <li key={task.id} className={getClasses()}>
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={changeStatus}
        />
        <EditebleSpan title={task.title} onChange={changeStatusHandler}/>
        <button onClick={removeTask}>x</button>
      </li>
    )
  })

  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }
  const removeTodoList = () => {
    props.removeTodoList(props.id)
  }
  const changeTodoListTitle = (newTitle: string) => {
    props.changeTodoListTitle(newTitle, props.id)
  }

  return (
    <div>
      <h3>
        <EditebleSpan title={props.title} onChange={changeTodoListTitle}/>
        <button onClick={removeTodoList}>x</button>
      </h3>
      <AddItemForm addItem={addTask}/>
      <ul>
        {tasksJSX}
      </ul>
      <div>
        <button
          className={getBtnClass("all")}
          onClick={setAllFilterValue}>All
        </button>
        <button
          className={getBtnClass("active")}
          onClick={setActiveFilterValue}>Active
        </button>
        <button
          className={getBtnClass("completed")}
          onClick={setCompletedFilterValue}>Completed
        </button>
      </div>
    </div>
  )
}

export default TodoList;