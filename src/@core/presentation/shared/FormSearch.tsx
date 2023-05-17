import React from "react";
import styled from "@emotion/styled";
import { AppButtonIcon } from "@/@core/presentation/shared";
import { useMediaQuerys } from "@/hooks";

const FormSearchResponsive = React.forwardRef(({ children }: { children: React.ReactNode }, ref) => {
  const [status, setStatus] = React.useState(false)

  const { minDesktop } = useMediaQuerys()

  React.useImperativeHandle(ref, () => ({
    close: () => {
      setStatus(false)
    }
  }));

  if (minDesktop)
    return <>{children}</>

  return (
    <FormSearchWrapper>
      <AppButtonIcon variant='filterList' onClick={() => setStatus(!status)} />

      <FormSearchContent className={status ? '--show' : ''}>
        {children}
      </FormSearchContent>
    </FormSearchWrapper>
  )
})
FormSearchResponsive.displayName = 'FormSearchResponsive'

const FormSearchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  padding-bottom: 0.35rem;
`
const FormSearchContent = styled.div`
  position: absolute;
  top: 2rem;
  left: 0;
  right: 0;
  height: 0;
  min-height: 0;
  transition: all 00.2s;
  overflow: hidden;
  background: white;
  z-index: 5;
  padding: 0 0.5rem;
  
  &.--show {
    height: unset;
    min-height: 85px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.25);
    padding: 0.5rem;
  }
`

export {
  FormSearchResponsive
}