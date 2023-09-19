import React from 'react'
import { cssMerge } from '@/utils'

interface HeaderRootProps {
  children: React.ReactNode
  className?: string
}
export const HeaderRoot: React.FC<HeaderRootProps> = ({ children, className }) => {
  return (
    <div className={cssMerge(
      'app_duration app_shadow',
      'flex items-center gap-1',
      'p-2 h-12 md:h-16',
      'bg-white dark:bg-zinc-600',
      // 'border-b-2 border-neutral-300 dark:border-neutral-700',
      className
    )}>
      {children}
    </div>
  )
}
