import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditebleSpan} from "./EditebleSpan";
import {Button, ButtonGroup, Checkbox, IconButton, ListItem} from "@material-ui/core";
import {Delete, HighlightOff} from "@material-ui/icons";

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

function Todolist(props: PropsType) {

  const setAllFilterValue = () => props.changeFilter("all", props.id)
  const setActiveFilterValue = () => props.changeFilter("active", props.id)
  const setCompletedFilterValue = () => props.changeFilter("completed", props.id)
  const getBtnClass = (filter: FilterValuesType) => props.filter === filter ? "secondary" : "primary";

  const tasksJSX = props.tasks.map(task => {
    const getClasses = () => task.isDone ? "is-done" : "";
    const changeStatus = (e: ChangeEvent<HTMLInputElement>) =>
      props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
    const removeTask = () => props.removeTask(task.id, props.id)

    const changeStatusHandler = (newValue: string) =>
      props.changeTaskTitle(task.id, newValue, props.id)

    return (
      <ListItem
        key={task.id}
        className={getClasses()}
        style={{
          display: 'flex',
          justifyContent:'space-between'
        }}
      >
        <Checkbox checked={task.isDone} onChange={changeStatus} color={'primary'} size={'small'}/>
        <EditebleSpan title={task.title} onChange={changeStatusHandler}/>
        <IconButton onClick={removeTask} size={'small'}>
          <HighlightOff/>
        </IconButton>
      </ListItem>
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
    <div style={{
      width: '280px'
    }}>
      <h3 style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center'
      }}>
        <EditebleSpan title={props.title} onChange={changeTodoListTitle}/>
        <IconButton onClick={removeTodoList} size={'small'}>
          <Delete/>
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask}/>
        {tasksJSX}
      <div>
        <ButtonGroup
          size={"small"}
          variant={"contained"}
          color={"primary"}
          disableElevation
          fullWidth
        >
          <Button
            color={getBtnClass("all")}
            onClick={setAllFilterValue}>All
          </Button>
          <Button
            color={getBtnClass("active")}
            onClick={setActiveFilterValue}>Active
          </Button>
          <Button
            color={getBtnClass("completed")}
            onClick={setCompletedFilterValue}>Completed
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

export default Todolist;