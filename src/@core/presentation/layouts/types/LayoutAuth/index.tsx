import React from 'react'

interface LayoutAuthProps {
  children: React.ReactNode
}
export const LayoutAuth: React.FC<LayoutAuthProps> = ({ children }) => {
  return (
    <div className={'h-screen w-screen flex flex-col items-center justify-center bg-neutral-200 dark:bg-neutral-900'}>
      {children}
    </div>
  )
}
