import styled from '@emotion/styled'
import { Alert, AlertTitle } from '@mui/material'
import { motion } from "framer-motion"
import React from 'react'
import { LayoutStore } from '@/store/hook'

export const Toast = () => {
  const layoutStore = LayoutStore()

  const toastList = layoutStore.state.toast

  const showContainer = toastList.length > 0

  return (
    <ToastContainer className={showContainer ? '--show' : ''}>
      {toastList.map(item => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2
          }}
        >
          <Alert
            severity="error"
            onClose={() => layoutStore.removeTost(item.id)}
          >
            <AlertTitle>{item.type}</AlertTitle>
            {item.msg}
          </Alert>
        </motion.div>
      ))}
    </ToastContainer>
  )
}

export const ToastContainer = styled.div`
  z-index: 4;
  transition-delay: 0.33s ;

  position: fixed;
  top: 1rem;
  right: 1rem;
  max-height: calc(100vh - 2rem);
  overflow-y: auto;

  .--center {
    right: unset;
    left: 50%;
    transform: translateX(-50%);
  }

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  
  @media(min-width: 428px) {
    width: 400px;
  }

  /* overflow: hidden; */
  /* height: 0; */
  /* padding: 0 0.5rem; */
  /* opacity: 0; */

  /* &.--show {
    height: unset;
    padding: 0.5rem 0.5rem;
    opacity: 1;
  } */
` 