export function sum (state: number, num: number) {
  return state + num
}

export const sub = (state: number, num: number) => {
  return state - num
}
export const mult = (state: number, num: number) => {
  return state * num
}

export const division = (state: number, num: number) => {
  return state / num
}

export type ActionType = {
  type: 'sum' | 'sub' | 'mult' | 'div'
  payload: number
}

export const salaryReducer = (state: number, action: ActionType): number => {
  switch (action.type) {
    case 'sum':
      return state + action.payload
    case 'sub':
      return state - action.payload
    case 'mult':
      return state * action.payload
    case 'div':
      return state / action.payload
    default:
      return state
  }
}