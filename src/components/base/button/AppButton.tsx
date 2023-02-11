import React from 'react'
import styled from 'styled-components';
import { Button } from '@mui/material';

// type Props = ButtonProps & {}

/* export const AppButtonStyled = styled(p => <Button {...p} />)` */

// export const AppButtonStyled = styled(Button)`
//   &.MuiButton-root {
//     min-height: 30px;
//   }
//   &.MuiButtonBase-root{
//   }
// `

// export const AppButton = ({ children, ...rest }: Props) => {
//   return (
//     <AppButtonStyled
//       size="small" variant="outlined"
//       {...rest}
//     >
//       {children}
//     </AppButtonStyled>
//   )
// }

export const AppButton = styled(p => <Button size="small" variant="outlined" {...p} />)`
  &.MuiButton-root {
    min-height: 30px;
  }
  &.MuiButtonBase-root{
  }
`