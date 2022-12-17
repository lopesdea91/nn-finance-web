
import { Button, ButtonProps } from 'react-bootstrap'
import React from 'react'

type Props = ButtonProps

export const AppButton = ({ children, ...rest }: Props) => {

  return (
    <Button size="sm" {...rest}>{children}</Button>
  )
}