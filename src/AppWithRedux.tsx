import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

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

function AppWithRedux() {

  const todolists = useSelector<AppRootStateType, Array<TodoListType>>((state) => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks)
  const dispatch = useDispatch()


  //BLL:
  const addTask = useCallback((newTaskTitle: string, todoListId: string) => {
    dispatch(addTaskAC(newTaskTitle, todoListId))
  }, [dispatch])
  const removeTask = useCallback((taskID: string, todoListId: string) => {
    dispatch(removeTaskAC(taskID, todoListId))
  }, [dispatch])
  const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListId: string) => {
    dispatch(changeTaskStatusAC(taskID, isDone, todoListId))
  }, [dispatch])
  const changeTaskTitle = useCallback((taskID: string, newTitle: string, todoListId: string) => {
    dispatch(changeTaskTitleAC(taskID, newTitle, todoListId))
  }, [dispatch])

  const removeTodoList = useCallback((todoListId: string) => {
    dispatch(removeTodolistAC(todoListId))
  }, [dispatch])
  const addTodoList = useCallback((title: string) => {
    dispatch(addTodolistAC(title))
  }, [dispatch])
  const changeFilter = useCallback((filter: FilterValuesType, todoListId: string) => {
    dispatch(changeTodolistFilterAC(filter, todoListId))
  }, [dispatch])
  const changeTodoListTitle = useCallback((newTitle: string, id: string) => {
    dispatch(changeTodolistTitleAC(newTitle, id))
  }, [dispatch])

  const todoListComponents = todolists.map(tl => {
    return (
      <Grid key={tl.id} item>
        <Paper elevation={8} style={{padding: '20px'}}>
          <Todolist
            id={tl.id}
            title={tl.title}
            tasks={tasks[tl.id]}
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

export default AppWithRedux;
