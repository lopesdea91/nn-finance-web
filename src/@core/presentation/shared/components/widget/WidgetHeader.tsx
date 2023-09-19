import { cssMerge } from '@/utils'
import { FC, ReactNode } from 'react'

interface WidgetHeaderProps {
  children: ReactNode
  className?: string
}
export const WidgetHeader: FC<WidgetHeaderProps> = ({ children, className }) => {
  return (
    <div className={cssMerge('flex items-center justify-between mb-1', className)}>
      {children}
    </div>
  )
}