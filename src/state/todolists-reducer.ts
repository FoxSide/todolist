import {FilterValuesType, TodoListType} from "../AppWithReducers";
import {v1} from "uuid";

type ActionType =
  AddTodolistActionType
  | RemoveTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST'
  title: string
  id: string
}
export type RemoveTodolistActionType = {
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

let initialState: Array<TodoListType> = []

export const todolistsReducer = (state = initialState , action: ActionType): Array<TodoListType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.id)

    case 'ADD-TODOLIST':
      return [...state, {id: action.id, title: action.title, filter: 'all'}]

    case 'CHANGE-TODOLIST-TITLE':
    return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)


    case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
    default:
      return state
  }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
  return {type: "ADD-TODOLIST", title: title, id: v1()}
}
export const changeTodolistTitleAC = (title: string, todolistID: string): ChangeTodolistTitleActionType => {
  return {type: "CHANGE-TODOLIST-TITLE", title: title, id: todolistID}
}
export const changeTodolistFilterAC = (filter: FilterValuesType, todolistID: string): ChangeTodolistFilterActionType => {
  return {type: "CHANGE-TODOLIST-FILTER", filter: filter, id: todolistID}
}
