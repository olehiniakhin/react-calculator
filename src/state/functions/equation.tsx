import { is } from '../../helpers'
import { State } from '../constants'

const initialState = []

const append = (x: string | number) => (arr: any) => [...arr, x]

const appendOperand = (operand: number) => (
  state: (number | string)[]
): (number | string)[] =>
  state.length % 2 === 0 ? append(operand)(state) : state

const appendOperator = (operator: string) => (
  state: (number | string)[]
): (number | string)[] =>
  state.length % 2 !== 0 ? append(operator)(state) : state

const updateEquationIfCan = (input: number | string) =>
  is.operator(input)
    ? appendOperator(input as string)
    : appendOperand(input as number)

/**
 * Functions for updating or resetting the 'equation' state property.
 */

export const updateEquation = (input: number | string) => (state: State) => ({
  ...state,
  equation: updateEquationIfCan(input)(state.equation),
})

export const resetEquation = (init = initialState) => (state: State) => ({
  ...state,
  equation: init,
})
