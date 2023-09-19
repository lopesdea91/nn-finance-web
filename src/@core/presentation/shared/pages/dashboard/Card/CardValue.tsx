import { cssMerge } from '@/utils'
import { FC, ReactNode } from 'react'

interface CardValueProps {
  children: ReactNode
  prefix?: string
  className?: string
}
export const CardValue: FC<CardValueProps> = ({ children, className }) => {
  return (
    <span className={cssMerge(
      'app_text',
      'block text-2xl leading-9',
      className
    )}>
      {children}
    </span>
  )
}