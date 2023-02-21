import styled from 'styled-components';
import { ButtonGroup } from '@mui/material';

type Props = {
  children: React.ReactNode
}

const StyledButtonGroup = styled(p => <ButtonGroup {...p} />)``

export const AppButtonGroup = ({ children }: Props) => {
  return (
    <StyledButtonGroup>
      {children}
    </StyledButtonGroup>
  )
}

export default AppButtonGroup