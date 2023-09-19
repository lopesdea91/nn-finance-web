import React from 'react'

interface LayoutPrivateProps {
  children: React.ReactNode
}
export const LayoutPrivate: React.FC<LayoutPrivateProps> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}
