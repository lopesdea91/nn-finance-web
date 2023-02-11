import styled from 'styled-components';
import { ButtonGroup } from '@mui/material';

type Props = {
  children: React.ReactNode
}

const StyledButtonGroup = styled(p => <ButtonGroup {...p} />)``

const AppButtonGroup = ({ children }: Props) => {
  return (
    <StyledButtonGroup>
      {children}
    </StyledButtonGroup>
  )
}

export { AppButtonGroup }