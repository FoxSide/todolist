import React, {useCallback} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditebleSpan} from "./EditebleSpan";
import {Button, ButtonGroup, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./task";

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

export const Todolist = React.memo((props: PropsType) => {
  const setAllFilterValue = useCallback(() => props.changeFilter("all", props.id), [props.id, props.changeFilter])
  const setActiveFilterValue = useCallback(() => props.changeFilter("active", props.id), [props.id, props.changeFilter])
  const setCompletedFilterValue = useCallback(() => props.changeFilter("completed", props.id), [props.id, props.changeFilter])

  const getBtnClass = (filter: FilterValuesType) => props.filter === filter ? "secondary" : "primary";

  let tasksForTodolist = props.tasks
  if (props.filter === 'active') {
    tasksForTodolist = props.tasks.filter(t => !t.isDone)
  }
  if (props.filter === 'completed') {
    tasksForTodolist = props.tasks.filter(t => t.isDone)
  }

  const tasksJSX = tasksForTodolist.map(task => {
    return (
      <Task key={task.id}
            task={task}
            removeTask={props.removeTask}
            todolistId={props.id}
            changeTaskStatus={props.changeTaskStatus}
            changeTaskTitle={props.changeTaskTitle}/>
    )
  })

  const addTask = useCallback((title: string) => {
    props.addTask(title, props.id)
  }, [props.addTask, props.id])
  const removeTodoList = useCallback(() => {
    props.removeTodoList(props.id)
  }, [props.removeTodoList, props.id])
  const changeTodoListTitle = useCallback((newTitle: string) => {
    props.changeTodoListTitle(newTitle, props.id)
  }, [props.changeTodoListTitle, props.id])


  return (
    <div style={{
      width: '280px'
    }}>
      <h3 style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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
})
