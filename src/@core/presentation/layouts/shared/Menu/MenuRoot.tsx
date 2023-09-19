import React from 'react'
import { cssMerge } from '@/utils'

interface MenuRootProps {
  children: React.ReactNode
  status: boolean
}
export const MenuRoot: React.FC<MenuRootProps> = ({
  children,
  status
}) => {
  return (
    <div
      className={cssMerge(
        'fixed top-0 left-0 bottom-0',
        'flex flex-col overflow-hidden shadow-sm bg-gray-400 dark:bg-neutral-800 z-20',
        'transition-all duration-200 lg:w-52 xl:px-2',
        status ? 'w-52' : 'w-0'
      )}
    >
      {children}
    </div>
  )
}


