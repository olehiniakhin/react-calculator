import React from 'react'

import { State } from '../../state/constants'
import Screen from './Screen'

const style = {
  overflow: 'hidden',
  textOverflow: 'clip',
}

export interface InputScreenProps {
  children: State['digits'] | number
}

const InputScreen = ({ children }: InputScreenProps) => (
  <Screen px={2} pb={1} fontWeight={600} fontSize={5} size={15} css={style}>
    {children}
  </Screen>
)

export default InputScreen
