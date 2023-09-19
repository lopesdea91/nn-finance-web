import { cssMerge } from '@/utils'
import React from 'react'

interface MainRootProps {
  children: React.ReactNode
  className?: string
}
export const MainRoot: React.FC<MainRootProps> = ({
  children,
  className
}) => {
  return (
    <div
      data-testid="partial-main"
      className={cssMerge(
        'duration-200 relative',
        'p-3 md:px-8 md:py-6',
        className
      )}>
      {children}
    </div>
  )
}
