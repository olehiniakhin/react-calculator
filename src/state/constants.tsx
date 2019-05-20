export const DIGIT: string = 'DIGIT'
export const OPERATOR: string = 'OPERATOR'
export const CLEAR: string = 'CLEAR'
export const EXECUTE: string = 'EXECUTE'
export const USE_EQUATION: string = 'USE_EQUATION'

export interface State {
  digits: string
  didExecute: boolean
  equation: (string | number)[]
  history: State['equation'][]
  last: null | string
}

export interface Action {
  type: string
  [index: string]: number | string
}

export const initialState: State = {
  digits: '0',
  didExecute: false,
  equation: [],
  history: Array(5).fill([]),
  last: null,
}
