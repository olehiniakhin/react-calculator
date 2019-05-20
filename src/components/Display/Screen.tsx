import React from 'react'
import { Text, TextProps } from 'rebass'

const style = {
  'white-space': 'nowrap',
}

export interface ScreenProps extends TextProps {
  size?: number
}

function Screen(props: ScreenProps) {
  const { children, size } = props

  const numDigitsToDisplay = size || Infinity
  const display = `${children}`.slice(0, numDigitsToDisplay)

  return (
    <Text
      fontFamily="Iosevka Web"
      fontWeight={400}
      fontSize={1}
      textAlign="right"
      bg="#f6f6ff"
      color="DimGrey"
      css={style}
      {...props}
    >
      {display}
    </Text>
  )
}

export default Screen
