import React, { FC, ReactNode } from 'react'

const AlertText: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <p className="text-sm">{children}</p>
  )
}

export default AlertText
