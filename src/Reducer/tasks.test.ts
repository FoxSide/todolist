import {division, mult, salaryReducer, sub, sum} from "./tasks";

test('Sum', () => {
  // 1. Тестовые данные
  const a: number = 570
  const b: number = 330
  // 2. Выполнение тестируемого кода
  const result = sum(a, b)
  // 3. Проверка ожидаемого рез-та
  expect(result).toBe(900)
})

test('Sub', () => {
  // 1. Тестовые данные
  const a: number = 1000
  const b: number = 400
  // 2. Выполнение тестируемого кода
  const result = sub(a, b)
  // 3. Проверка ожидаемого рез-та
  expect(result).toBe(600)
})

test('Mult', () => {
  // 1. Тестовые данные
  const a: number = 10
  const b: number = 5
  // 2. Выполнение тестируемого кода
  const result = mult(a, b)
  // 3. Проверка ожидаемого рез-та
  expect(result).toBe(50)
})

test('Division', () => {
  // 1. Тестовые данные
  // 2. Выполнение тестируемого кода
  const result = division(200, 10)
  // 3. Проверка ожидаемого рез-та
  expect(result).toBe(20)
})

test('ReducerSum', () => {
  expect(salaryReducer(570, {type: 'sum', payload: 330})).toBe(900)
})
test('ReducerSum', () => {
  expect(salaryReducer(570, {type: 'sub', payload: 70})).toBe(500)
})
test('ReducerSum', () => {
  expect(salaryReducer(250, {type: 'mult', payload: 2})).toBe(500)
})
test('ReducerSum', () => {
  expect(salaryReducer(1200, {type: 'div', payload: 2})).toBe(600)
})