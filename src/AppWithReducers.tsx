import React, {useReducer} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithReducers() {
  const todoListId_1 = v1()
  const todoListId_2 = v1()

  const [todoLists, dispatchToTodoList] = useReducer(todolistsReducer, [
    {id: todoListId_1, title: 'What to Learn', filter: 'all'},
    {id: todoListId_2, title: 'What to Buy', filter: 'all'}
  ])
  const [tasks, dispatchToTask] = useReducer(tasksReducer, {
    [todoListId_1]: [
      {id: v1(), title: "HTML", isDone: true},
      {id: v1(), title: "CSS", isDone: true},
      {id: v1(), title: "REACT", isDone: false}
    ],
    [todoListId_2]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "Bear", isDone: true},
      {id: v1(), title: "Bread", isDone: false}
    ]
  })
  //BLL:
  const addTask = (newTaskTitle: string, todoListId: string) => {
    let action = addTaskAC(newTaskTitle, todoListId)
    dispatchToTask(action)
  }
  const removeTask = (taskID: string, todoListId: string) => {
    let action = removeTaskAC(taskID, todoListId)
    dispatchToTask(action)
  }
  const changeTaskStatus = (taskID: string, isDone: boolean, todoListId: string) => {
    let action = changeTaskStatusAC(taskID, isDone, todoListId)
    dispatchToTask(action)
  }
  const changeTaskTitle = (taskID: string, newTitle: string, todoListId: string) => {
    let action = changeTaskTitleAC(taskID, newTitle, todoListId)
    dispatchToTask(action)
  }

  const removeTodoList = (todoListId: string) => {
    let action = removeTodolistAC(todoListId)
    dispatchToTodoList(action)
    dispatchToTask(action)
  }
  const addTodoList = (title: string) => {
    let action = addTodolistAC(title)
    dispatchToTodoList(action)
    dispatchToTask(action)
  }
  const changeFilter = (filter: FilterValuesType, todoListId: string) => {
    let action = changeTodolistFilterAC(filter, todoListId)
    dispatchToTodoList(action)
  }
  const changeTodoListTitle = (newTitle: string, id: string) => {
    let action = changeTodolistTitleAC(newTitle, id)
    dispatchToTodoList(action)
  }

  const getTasksForRender = (todoList: TodoListType) => {
    switch (todoList.filter) {
      case "active":
        return tasks[todoList.id].filter(t => !t.isDone)
      case "completed":
        return tasks[todoList.id].filter(t => t.isDone)
      default:
        return tasks[todoList.id]
    }
  }

  const todoListComponents = todoLists.map(tl => {
    let tasksForRender = getTasksForRender(tl)
    return (
      <Grid key={tl.id} item>
        <Paper elevation={8} style={{padding: '20px'}}>
          <Todolist
            id={tl.id}
            title={tl.title}
            tasks={tasksForRender}
            filter={tl.filter}
            addTask={addTask}
            removeTask={removeTask}
            changeFilter={changeFilter}
            changeTaskStatus={changeTaskStatus}
            removeTodoList={removeTodoList}
            changeTaskTitle={changeTaskTitle}
            changeTodoListTitle={changeTodoListTitle}
          />
        </Paper>
      </Grid>
    )
  })

  return (
    <div className="App">
      <div>
        <AppBar position="static">
          <Toolbar style={{justifyContent: "space-between"}}>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu/>
            </IconButton>
            <Typography variant="h6">
              Todolists
            </Typography>
            <Button color="inherit" variant={"outlined"}>Login</Button>
          </Toolbar>
        </AppBar>
      </div>
      <Container fixed>
        <Grid container style={{
          padding: '20px 0'
        }}>
          <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={5}>
          {todoListComponents}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducers;
