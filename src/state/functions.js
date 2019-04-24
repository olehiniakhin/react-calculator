import { didJustExecute, didNotJustExecute, updateLast } from '../functions'
import { updateDigits, resetDigits } from '../functions/digits'
import { updateEquation, resetEquation } from '../functions/equation'
import { updateHistory } from '../functions/history'
import {
  updateAcc,
  updateNextFn,
  resetAcc,
  resetNextFn,
} from '../functions/ops'

const pipe = (...fns) => x => fns.reduce((a, f) => f(a), x)

export const inputDigit = digit => state => pipe(updateDigits(digit))(state)

export const inputDigitPostExec = digit => state =>
  pipe(
    resetAcc(),
    resetNextFn(),
    updateDigits(digit)
  )(state)

export const inputOperator = operator => state =>
  pipe(
    updateAcc(+state.digits),
    updateNextFn(operator),
    updateEquation(state.digits),
    updateEquation(`${operator}`),
    resetDigits()
  )(state)

export const inputOperatorPostExec = operator => state =>
  pipe(
    updateNextFn(operator),
    updateEquation(`${state.acc}`),
    updateEquation(`${operator}`)
  )(state)

export const inputExecute = () => state =>
  pipe(
    updateAcc(+state.digits),
    updateEquation(state.digits),
    updateHistory(),
    resetDigits(),
    resetEquation(),
    didJustExecute()
  )(state)

export const inputExecutePostExec = () => state => pipe(didJustExecute())(state)

export const midStateChange = last => state =>
  pipe(
    didNotJustExecute(),
    updateLast(last)
  )(state)