import { updateHistory, useEquation } from './history'
import { updateDigits, resetDigits } from './digits'
import { updateEquation, resetEquation } from './equation'
import { calculateEquation } from '../../helpers'
import { State } from '../constants'

/**
 * Functions for updating or resetting the 'didExecute' and 'last'
 * state property.
 */

export const didJustExecute = () => (state: State) => ({
  ...state,
  didExecute: true,
})

export const didNotJustExecute = () => (state: State) => ({
  ...state,
  didExecute: false,
})

export const updateLast = (type: string) => (state: State) => ({
  ...state,
  last: type,
})

/**
 * How the calculator handles state changes for different inputs.
 */

const pipe = (...fns: ((i: State) => State)[]) => (x: State) =>
  fns.reduce((a, f) => f(a), x)

// Instructions for digit, decimal or backspace calculator inputs.
// ↤, ., 0, 1, 2, 3, 4, 5, 6, 7, 8, 9

export const inputDigit = (digit: string) => (state: State) =>
  pipe(updateDigits(digit))(state)

export const inputDigitPostExec = (digit: string) => (state: State) =>
  pipe(
    resetEquation(),
    updateDigits(digit)
  )(state)

// Instructions for operator calculator inputs.
// ÷, ×, -, +

export const inputOperator = (operator: string) => (state: State) =>
  pipe(
    updateEquation(+state.digits),
    updateEquation(operator),
    resetDigits()
  )(state)

export const inputOperatorPostExec = (operator: string) => (state: State) =>
  pipe(
    resetEquation(),
    updateEquation(calculateEquation(state.equation)),
    updateEquation(operator)
  )(state)

// Instructions for equal calculator input.
// =

export const inputExecute = () => (state: State) =>
  pipe(
    updateEquation(+state.digits),
    updateHistory(),
    resetDigits(),
    didJustExecute()
  )(state)

export const inputExecutePostExec = () => (state: State) =>
  pipe(didJustExecute())(state)

// Instructions when an equation is clicked in the history pane.

export const clickEquation = (id: number) => (state: State) =>
  pipe(
    resetDigits(),
    useEquation(id)
  )(state)

// partial state changes before all

export const midStateChange = (last: string) => (state: State) =>
  pipe(
    didNotJustExecute(),
    updateLast(last)
  )(state)
