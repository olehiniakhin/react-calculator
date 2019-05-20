/* prettier-ignore */
export const keys = [
  'C', '↤', '÷',
  '7', '8', '9', '×',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  '0', '.', '=',
]

export const is = {
  key: (k: number | string) => keys.includes(`${k}`),
  digit: (k: number | string) => /^[0-9↤.]$/.test(`${k}`),
  zero: (k: string) => k === '0',
  backspace: (k: string) => k === '↤',
  decimal: (k: string) => k === '.',
  clear: (k: string) => k === 'C',
  operator: (k: number | string) => /^[÷×+-]$/.test(`${k}`),
  execute: (k: string) => k === '=',
}

export const substituteKey = (key: string) => {
  const alt = ['/', '*', 'Escape', 'Backspace', 'Enter']
  const sub = ['÷', '×', 'C', '↤', '=']
  return alt.includes(key) ? sub[alt.indexOf(key)] : key
}

interface Ops {
  [index: string]: (x: number) => (y: number) => number
}

const operations: Ops = {
  '÷': (x: number) => (y: number) => x / y,
  '×': (x: number) => (y: number) => x * y,
  '+': (x: number) => (y: number) => x + y,
  '-': (x: number) => (y: number) => x - y,
}

const operatorFunction = (operator: string) => operations[operator]

const doOperation = ([acc, operator, operand]: [number, string, number]) =>
  operatorFunction(operator)(acc)(operand)

export const calculateEquation = ([acc, ...equation]: (
  | number
  | string)[]): number =>
  equation.reduce(
    (a: (number | string)[], c: number | string) =>
      a.length < 2 ? [...a, c] : [(doOperation as any)([...a, c])],
    [acc]
  )[0]
