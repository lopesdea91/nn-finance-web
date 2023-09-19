import { cssMerge } from '@/utils'
import { FC, ReactNode } from 'react'

interface WidgetRootProps {
  children: ReactNode
  className?: string
}
export const WidgetRoot: FC<WidgetRootProps> = ({ children, className }) => {
  return (
    <div className={cssMerge(
      'app_shadow app_bgCard',
      'rounded-md ',
      'p-3',
      // 'bg-zinc-200 dark:bg-zinc-800',
      // 'border-[1px] border-[#00000050]',
      className
    )}>
      {children}
    </div>
  )
}