import { cssMerge } from '@/utils'
import { FC, ReactNode } from 'react'

interface CardTitleProps {
  children: ReactNode
  className?: string
}
export const CardTitle: FC<CardTitleProps> = ({ children, className }) => {
  return (
    <span className={cssMerge('app_textBody block text-xs font-thin font-mono leading-none', className)}>
      {children}
    </span>
  )
}