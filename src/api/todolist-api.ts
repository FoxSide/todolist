import axios from 'axios';

type TodolistType = {
  id: string
  addedDate: string
  order: number
  title: string
}

type BaseResponseType<T = {}> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors: Array<string>
  data: T
}


export default {
  title: 'API'
}

const instanse = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': 'ba634933-a40a-488e-bf8b-9720d0155fba'
  }
})

export const todolistApi = {
  getTodos() {
    return instanse.get<Array<TodolistType>>('todo-lists')
  },
  createTodo() {
    return instanse.post<BaseResponseType<{ item: TodolistType }>>('todo-lists', {title: "newTodolist!"})
  },
  deleteTodo(todolistId: string) {
    return instanse.delete<BaseResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`)
  },
  updateTodoTitle(todolistId: string) {
    return instanse.put<BaseResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: 'REACT>>>>>>>>>'})
  },
}