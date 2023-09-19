import React, { FC, ReactNode } from 'react'

interface ModalBodyProps {
  children: ReactNode
}
export const ModalBody: FC<ModalBodyProps> = ({ children }) => {
  return (
    <div className="p-3 md:p-4">
      {children}
    </div>
  )
}