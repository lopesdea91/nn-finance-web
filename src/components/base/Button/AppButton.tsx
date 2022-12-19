
import { Button, ButtonProps } from 'react-bootstrap'
import React from 'react'

type Props = ButtonProps

const AppButton = React.forwardRef<any, Props>(({ children, ...rest }: Props, ref) => {

  return (
    <Button size="sm" variant='outline-primary' ref={ref} {...rest}>{children}</Button>
  )
})

AppButton.displayName = 'AppButton';

export { AppButton }