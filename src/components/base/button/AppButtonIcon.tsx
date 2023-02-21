import styled from 'styled-components';
import { AppIcon, IconNames } from "../icon/AppIcon"
import { AppButton } from './AppButton';

type Props = {
  variant: IconNames
  onClick?: () => void
  disabled?: boolean
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  text?: string
}

export const AppButtonStyled = styled(AppButton)`
  &.MuiButton-root {
    min-width: initial;
    gap: 0.5rem;
  }
`
export const AppButtonIcon = ({ text, variant, ...rest }: Props) => {
  return (
    <AppButtonStyled {...rest}>
      <AppIcon variant={variant} />
      {text}
    </AppButtonStyled>
  )
}

export default AppButtonIcon
