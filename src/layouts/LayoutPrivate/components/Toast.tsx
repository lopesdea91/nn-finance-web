import { Alert, AlertTitle } from '@mui/material'
import React from 'react'
import { LayoutStore } from '@/store/hook'
import { ToastContainer } from './_styled'
import { motion } from "framer-motion"

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

