import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type ActionType =
  AddTodolistActionType
  | RemoveTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
type AddTodolistActionType = {
  type: 'ADD-TODOLIST'
  title: string
}
type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST'
  id: string
}
type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  id: string
  title: string
}
type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER'
  id: string
  filter: FilterValuesType
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
  return {type: "ADD-TODOLIST", title: title}
}
export const ChangeTodolistTitleAC = (title: string, todolistID: string): ChangeTodolistTitleActionType => {
  return {type: "CHANGE-TODOLIST-TITLE", title: title, id: todolistID}
}
export const ChangeTodolistFilterAC = (filter: FilterValuesType, todolistID: string): ChangeTodolistFilterActionType => {
  return {type: "CHANGE-TODOLIST-FILTER", filter: filter, id: todolistID}
}

export const todolistsReducer = (todolists: Array<TodoListType>, action: ActionType) => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return todolists.filter(tl => tl.id !== action.id)

    case 'ADD-TODOLIST':
      const todolist: TodoListType = {
        id: v1(),
        title: action.title,
        filter: 'all'
      }
      return [...todolists, todolist]

    case 'CHANGE-TODOLIST-TITLE':
    return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)


    case 'CHANGE-TODOLIST-FILTER':
      return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
    default:
      return todolists
  }
}