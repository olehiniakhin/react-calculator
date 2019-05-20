import { is } from '../../helpers'
import { State } from '../constants'

const initialState: string = '0'
const maxLength: number = 15

const backspace = (str: string) => str.slice(0, -1)
const append = (ch: string) => (str: string) => `${str}${ch}`

const backspaceState = () => (state: string) =>
  state.length > 1 ? backspace(state) : '0'

const appendAny = (char: string) => (state: string) =>
  state.length < maxLength ? append(char)(state) : state

const appendNumber = (number: string) => (state: string) =>
  state !== '0' ? appendAny(number)(state) : number

const appendZero = () => (state: string) =>
  state !== '0' ? appendAny('0')(state) : state

const appendDecimal = () => (state: string) =>
  !state.includes('.') ? appendAny('.')(state) : state

const updateDigitsIfCan = (input: string) => {
  if (is.backspace(input)) return backspaceState()
  if (is.zero(input)) return appendZero()
  if (is.decimal(input)) return appendDecimal()
  return appendNumber(input)
}

/**
 * Functions for updating or resetting the 'digits' state property.
 */

export const updateDigits = (input: string) => (state: State) => ({
  ...state,
  digits: updateDigitsIfCan(input)(state.digits),
})

export const resetDigits = (init = initialState) => (state: State) => ({
  ...state,
  digits: init,
})
