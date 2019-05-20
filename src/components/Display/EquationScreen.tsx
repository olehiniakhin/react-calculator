import React from 'react'

import { State } from '../../state/constants'
import Screen from './Screen'

const style = {
  height: '22px',
  overflow: 'hidden',
  textOverflow: 'clip',
}

export interface EquationScreenProps {
  children: State['equation']
}

const EquationScreen = ({ children }: EquationScreenProps) => (
  <Screen px={2} pt={1} color="Silver" css={style}>
    {children.join(' ')}
  </Screen>
)

export default EquationScreen
