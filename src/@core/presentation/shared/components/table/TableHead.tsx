import React, { FC, ReactNode } from 'react'

interface TableHeadProps {
  children: ReactNode
}
export const TableHead: FC<TableHeadProps> = ({ children }) => {
  return (
    <thead>
      {children}
    </thead>
  )
}