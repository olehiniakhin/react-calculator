import { CLEAR, DIGIT, EXECUTE, OPERATOR, USE_EQUATION } from './constants'
import { is } from '../helpers'

export interface Action {
  type: string
  [index: string]: number | string
}

export const clear = (): Action => ({
  type: CLEAR,
})

export const digit = (digit: string): Action => ({
  type: DIGIT,
  digit,
})

export const execute = (): Action => ({
  type: EXECUTE,
})

export const operator = (operator: string): Action => ({
  type: OPERATOR,
  operator,
})

export const useEquation = (id: number): Action => ({
  type: USE_EQUATION,
  id,
})

export const action = (key: string) => {
  if (is.clear(key)) return clear()
  if (is.execute(key)) return execute()
  if (is.digit(key)) return digit(key)
  if (is.operator(key)) return operator(key)
  return { type: null }
}
