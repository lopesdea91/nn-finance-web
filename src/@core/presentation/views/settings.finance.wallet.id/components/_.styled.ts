import { Box } from "@mui/material";
import styled from "styled-components";

export const WrapperMonths = styled(Box)`
  border: 1px solid rgba(0, 0, 0, 0.12);

  @media (min-width:426px) {
    max-height: 10rem;
    overflow-y: scroll;
  }
`
export const Months = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`
