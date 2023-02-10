import styled from 'styled-components';
import { AppIcon, IconNames } from "../icon/AppIcon"
import { AppButton } from './AppButton';

type Props = {
  onClick: () => void,
  variant: IconNames
}

export const AppButtonStyled = styled(AppButton)`
  &.MuiButton-root {
    min-width: initial;
  }
`
const AppButtonIcon = ({ onClick, variant, ...rest }: Props) => {
  return (
    <AppButtonStyled onClick={onClick} {...rest}>
      <AppIcon variant={variant} />
    </AppButtonStyled>
  )
}

export { AppButtonIcon }