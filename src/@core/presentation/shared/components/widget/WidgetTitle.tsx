import { cssMerge } from '@/utils'
import { FC, ReactNode } from 'react'

interface WidgetTitleProps {
  children: ReactNode
  className?: string
}
export const WidgetTitle: FC<WidgetTitleProps> = ({ children, className }) => {
  return (
    <h3 className={cssMerge('app_text', 'text-xs font-normal capitalize opacity-80', className)}>
      {children}
    </h3>
  )
}