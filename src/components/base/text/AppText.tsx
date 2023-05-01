import { Typography, TypographyProps } from '@mui/material'

type Props = {
  children: React.ReactNode
  variant: TypographyProps['variant']
  sx?: TypographyProps['sx']
  onClick?: TypographyProps['onClick']
}
export const AppText = ({ children, ...rest }: Props) => {
  return <Typography {...rest}>{children}</Typography>
}