import styled from "styled-components";
import { AppText } from "@/components/base";

const wrapper = `
  margin-bottom: 1rem;
  display: grid;
  gap: 0.5rem;

  grid-template-columns: repeat( auto-fit, minmax(140px, 1fr));

  @media (min-width: 426px){
    grid-template-columns: repeat( auto-fit, minmax(175px, 1fr));
  }
`

export const BalanceWrapper = styled.div`
  ${wrapper}
`
export const BalanceItem = styled.div`
  padding: 0.5rem 0.5rem 0;
  box-shadow: 2px 4px 6px -1px rgb(0 0 0 / 0.2);
  border: 1px solid rgb(0 0 0 / 0.2);
`
export const BalanceTitle = styled(p => <AppText variant="body1" {...p} />)`
  border-bottom: 1px solid rgb(0 0 0 / 0.2);
`
export const BalanceValue = styled(p => <AppText variant="body1" {...p} />)`
  text-align: right;
  &.MuiTypography-root{
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: 1.25rem;
    line-height: 3.5rem;

    &::before {
      content: 'R$';
      font-size: 0.85rem;
      margin-right: 0.15rem;
      font-family: monospace;
    }

    @media (min-width: 768px){
      font-size: 1.75rem;
    }
  }
`
export const OriginWrapper = styled.div`
  ${wrapper}
`
export const OriginItem = styled.div`
  padding: 0.5rem 0.5rem 0;
  box-shadow: 2px 4px 6px -1px rgb(0 0 0 / 0.2);
  border: 1px solid rgb(0 0 0 / 0.2);
`