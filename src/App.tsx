import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

// Create
// Read
// Update
// Delete
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

function App() {
  const todoListId_1 = v1()
  const todoListId_2 = v1()

  const [todoLists, setTodolists] = useState<Array<TodoListType>>([
    {id: todoListId_1, title: 'What to Learn', filter: 'all'},
    {id: todoListId_2, title: 'What to Buy', filter: 'all'}
  ])
  const [tasks, setTasks] = useState<TasksStateType>({
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

  const changeFilter = (filter: FilterValuesType, todoListId: string) => {
    const updatedTodoList = todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl)
    setTodolists(updatedTodoList)
  }
  const removeTask = (taskID: string, todoListId: string) => {
    tasks[todoListId] = tasks[todoListId].filter(t => t.id !== taskID)
    setTasks({...tasks})
  }
  const addTask = (newTaskTitle: string, todoListId: string) => {
    const newTask: TaskType = {
      id: v1(),
      title: newTaskTitle,
      isDone: false
    }
    const copyState = {...tasks}
    copyState[todoListId] = [newTask, ...tasks[todoListId]]
    setTasks(copyState)
  }
  const changeTaskStatus = (taskID: string, isDone: boolean, todoListId: string) => {
    const copyState = {...tasks}
    copyState[todoListId] = tasks[todoListId].map(t => t.id === taskID ? {...t, isDone: isDone} : t)
    setTasks(copyState)
  }
  const removeTodoList = (todoListId: string) => {
    setTodolists(todoLists.filter(tl => tl.id !== todoListId))
  }
  const changeTodoListTitle = (newTitle: string, id: string) => {
    const todolist = todoLists.find(tl => tl.id === id)
    if (todolist) {
      todolist.title = newTitle
      setTodolists([...todoLists])
    }
  }
  const addTodoList = (title: string) => {
    const todolist: TodoListType = {
      id: v1(),
      title: title,
      filter: 'all'
    }
    setTodolists([todolist, ...todoLists])
    setTasks({
      ...tasks,
      [todolist.id]: []
    })
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

  const changeTaskTitle = (taskID: string, newTitle: string, todoListId: string) => {
    const copyState = {...tasks}
    copyState[todoListId] = tasks[todoListId].map(t => t.id === taskID ? {...t, title: newTitle} : t)
    setTasks(copyState)
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

export default App;
