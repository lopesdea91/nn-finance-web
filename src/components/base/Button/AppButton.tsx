
import { Button, ButtonProps } from 'react-bootstrap'
import React from 'react'

type Props = ButtonProps

const AppButton = React.forwardRef<any, Props>(({ children, ...rest }: Props) => {

  return (
    <Button size="sm" {...rest}>{children}</Button>
  )
})

AppButton.displayName = 'AppButton';

export { AppButton }