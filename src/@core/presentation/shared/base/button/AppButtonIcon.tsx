import { ButtonProps } from '@mui/material';
import styled from 'styled-components';
import { AppIcon, IconNames } from "../icon/AppIcon"
import { AppButton } from './AppButton';

type Props = {
  variant: IconNames
  onClick?: () => void
  text?: string
  disabled?: ButtonProps['disabled']
  color?: ButtonProps['color']
  form?: ButtonProps['form']
  type?: ButtonProps['type']
  title?: ButtonProps['title']
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
