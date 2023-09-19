import { cssMerge } from '@/utils'
import React, { FC, ReactNode } from 'react'

interface TableBodyRowProps {
  children: ReactNode
}
export const TableBodyRow: FC<TableBodyRowProps> = ({ children }) => {
  return (
    <tr className={cssMerge(
      'app_textBody',
      'border-t-[1px] border-zinc-300 dark:border-zinc-700',
      // 'border-[#00000020] dark:border-[#00000050]',
      // 'dark:bg-gray-800'
    )}>
      {children}
    </tr>
  )
}