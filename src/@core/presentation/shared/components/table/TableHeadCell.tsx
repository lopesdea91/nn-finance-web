import React, { FC, ReactNode } from 'react'
import { cssMerge } from '@/utils'

interface TableHeadCellProps {
  children: ReactNode
  className?: string
}
export const TableHeadCell: FC<TableHeadCellProps> = ({ children, className }) => {
  return (
    <th className={cssMerge(
      'text-xs px-2 py-2 text-left truncate uppercase leading-none',
      className
    )}>
      {children}
    </th>
  )
}