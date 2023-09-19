import { cssMerge } from '@/utils'
import React, { FC, ReactNode } from 'react'

interface TableHeadRowProps {
  children: ReactNode
}
export const TableHeadRow: FC<TableHeadRowProps> = ({ children }) => {
  return (
    <tr className={cssMerge(
      'app_text',
      // 'border-[1px] border-black/20 dark:border-black/50',
      // 'text-gray-700 dark:text-gray-400',
      // 'bg-gray-50 dark:bg-gray-700'
    )}>
      {children}
    </tr>
  )
}