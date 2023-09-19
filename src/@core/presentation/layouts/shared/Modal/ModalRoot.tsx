import React, { FC, ReactNode } from 'react'

interface ModalRootProps {
  children: ReactNode
}
export const ModalRoot: FC<ModalRootProps> = ({ children }) => {
  return (
    <div className='moda-root bg-white shadow-lg border-[1px] border-gray-300 min-w-[300px] z-10'>
      {children}
    </div>
  )
}