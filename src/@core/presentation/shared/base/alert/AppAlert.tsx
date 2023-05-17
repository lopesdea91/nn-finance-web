import { Alert, AlertProps } from '@mui/material'

type Props = {
  children: React.ReactNode
  variant?: AlertProps['variant']
  color?: AlertProps['color']
  severity?: AlertProps['severity']
  sx?: AlertProps['sx']
}
export const AppAlert = ({ children, ...rest }: Props) => {
  return (
    <Alert {...rest}>
      {children}
    </Alert>
  )
}
