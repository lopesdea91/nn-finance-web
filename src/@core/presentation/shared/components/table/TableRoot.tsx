import { cssMerge } from '@/utils'
import React, { FC, ReactNode } from 'react'

interface TableRootProps {
  children: ReactNode
  className?: string
}
export const TableRoot: FC<TableRootProps> = ({ children, className }) => {
  return (
    <table className={cssMerge(
      'w-full',
      // 'bg-[#00000010] dark:bg-[#ffffff10]',
      // 'text-gray-700 dark:text-gray-400',
      className
    )}>
      {children}
    </table>
  )
}