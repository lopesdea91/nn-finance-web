import { cssMerge } from '@/utils'
import React, { ReactNode } from 'react'

interface MenuItemGroupProps {
  children: ReactNode
  name?: string
  className?: string
}
export const MenuItemGroup: React.FC<MenuItemGroupProps> = ({ children, name, className }) => {
  return (
    <div className='mx-2 mb-3 flex flex-col gap-1 group-hover'>
      {name && (
        <h3
          className={cssMerge(
            'text-xs font-semibold uppercase leading-6 p-1 border-b-[1px] border-b-white/20 text-neutral-800 dark:text-neutral-200  bg-white/10',
            className
          )}
        >
          {name}
        </h3>
      )}
      {children}
    </div>
  )
}

