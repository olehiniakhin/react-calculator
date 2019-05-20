import React, { useContext } from 'react'
import { Flex } from 'rebass'

import Screen from './Screen'

import { State, Action } from '../../state/constants'
import { useEquation } from '../../state/actions'
import { CalculatorDispatch } from '../context'

const style = {
  cursor: 'pointer',
  height: '26px',
  overflow: 'hidden',
  textOverflow: 'clip',
  transition: 'color 0.2s ease-in-out',
  '&:hover': {
    color: 'DimGray',
  },
}

function Row({ children, id }: { children: string; id: number }) {
  const dispatch: React.Dispatch<Action> = useContext(CalculatorDispatch)

  return (
    <Screen
      px={2}
      py={1}
      width={1}
      color="DarkGray"
      onClick={() => dispatch(useEquation(id))}
      css={style}
    >
      {children}
    </Screen>
  )
}

export interface HistoryScreenProps {
  history: State['history']
}

const HistoryScreen = (props: HistoryScreenProps) => (
  <Flex flexWrap="wrap">
    {props.history.map((equation, id) => (
      <Row key={id} id={id}>
        {equation.join(' ')}
      </Row>
    ))}
  </Flex>
)

export default HistoryScreen
