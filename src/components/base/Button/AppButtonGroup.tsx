
import { ButtonGroup, ButtonGroupProps } from 'react-bootstrap'
import React from 'react'

type Props = ButtonGroupProps

const AppButtonGroup = ({ children, ...rest }: Props) => {

  return (
    <ButtonGroup aria-label="group-button" {...rest}>
      {children}
    </ButtonGroup>
  )
}

AppButtonGroup.displayName = 'AppButtonGroup';

export { AppButtonGroup }