import React, { ReactNode } from 'react'

export const MenuBody: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className='my-2 overflow-y-auto'>
      {children}
    </div>
  )
}