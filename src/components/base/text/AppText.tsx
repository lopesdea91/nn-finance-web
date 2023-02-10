import { Typography, TypographyProps } from '@mui/material'

type Props = TypographyProps & {
  children: React.ReactNode
}

export const AppText = ({ children, ...rest }: Props) => {
  return <Typography {...rest}>{children}</Typography>
}