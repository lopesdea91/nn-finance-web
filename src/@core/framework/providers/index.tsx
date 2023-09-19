import React, { FC, ReactNode } from 'react'
import TeleportProvider from './_TeleportProvider'

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <TeleportProvider>
      {children}
    </TeleportProvider>
  )
}
