import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

// Create
// Read
// Update
// Delete
// CRUD
export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  const todoListId_1 = v1()
  const todoListId_2 = v1()

  const [todoLists, setTodolists] = useState<Array<TodoListType>>([
    {id: todoListId_1, title: 'What to learn', filter: 'all'},
    {id: todoListId_2, title: 'What to buy', filter: 'all'}
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
    copyState[todoListId] = [...tasks[todoListId], newTask]
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
  <TodoList
    key={tl.id}
    id={tl.id}
    title={tl.title}
    tasks={tasksForRender}
    filter={tl.filter}
    addTask={addTask}
    removeTask={removeTask}
    changeFilter={changeFilter}
    changeTaskStatus={changeTaskStatus}
    removeTodoList={removeTodoList}
  />
)
})

  //UI:
  return (
    <div className="App">
      {todoListComponents}
    </div>
  );
}

export default App;
