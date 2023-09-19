import { cssMerge } from '@/utils'
import { FC, ReactNode } from 'react'

interface WidgetContainerProps {
  children: ReactNode
  className?: string
}
export const WidgetContainer: FC<WidgetContainerProps> = ({ children, className }) => {
  return (
    <div className={cssMerge("grid gap-2 lg:gap-4", className)}>
      {children}
    </div>
  )
}