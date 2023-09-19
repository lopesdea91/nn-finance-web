import { cssMerge } from '@/utils'
import React, { FC, HTMLAttributes } from 'react'

interface TableBodyCellProps extends HTMLAttributes<HTMLTableCellElement> { }

export const TableBodyCell: FC<TableBodyCellProps> = ({ children, className, ...rest }) => {
  return (
    <td
      className={cssMerge(
        'text-sm px-2 py-1 text-left truncate',
        className
      )}
      {...rest}
    >
      {children}
    </td>
  )
}