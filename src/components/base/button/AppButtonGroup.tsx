import styled from 'styled-components';
import ButtonGroup from "@material-ui/core/Button";

type Props = {
  children: React.ReactNode
}

const StyledButtonGroup = styled(ButtonGroup)``

const AppButtonGroup = ({ children }: Props) => {
  return (
    <StyledButtonGroup>
      {children}
    </StyledButtonGroup>
  )
}

export { AppButtonGroup }