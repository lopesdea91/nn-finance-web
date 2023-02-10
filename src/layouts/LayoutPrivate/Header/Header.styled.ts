import { AppButtonIcon, AppInput, AppSelect } from "@/components/base"
import { containerGeral, containerResponsive } from "@/styles/layout/private.styled"
import styled from "styled-components"

export const Container = styled.div`
  background: white;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);

  min-height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 0.5rem;

  ${containerResponsive}
  ${containerGeral}
  
  .MuiButton-outlined {
    border-color: rgb(0 0 0 / 10%);
  }
`
export const InputsWrapper = styled.div`
  display: none;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 426px) {
  display: flex;
  }
  @media (min-width: 768px) {
    width: 400px;
  }
`
export const HeaderBtn = styled(AppButtonIcon)`
  @media (min-width: 426px){
    &.MuiButton-root {
      display: none;
    }
  }
`
export const SelectWallet = styled(AppSelect)``
export const InputPeriod = styled(AppInput)``