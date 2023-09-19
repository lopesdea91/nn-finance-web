import React, { FC, ReactNode } from 'react'

interface TableBodyProps {
  children: ReactNode
}
export const TableBody: FC<TableBodyProps> = ({ children }) => {
  return (
    <tbody>
      {children}
    </tbody>
  )
}