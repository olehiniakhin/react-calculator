import { State } from '../constants'

const addEquation = (equation: State['equation']) => (
  state: State['equation'][]
) => [...state.slice(1, 5), equation]

const getEqFromHistory = (id: number) => (state: State['equation'][]) =>
  state[id]

/**
 * Functions for updating or resetting the 'history' state property.
 */

export const updateHistory = () => (state: State) => ({
  ...state,
  history: addEquation(state.equation)(state.history),
})

export const useEquation = (input: number) => (state: State) => ({
  ...state,
  equation: getEqFromHistory(input)(state.history),
})
