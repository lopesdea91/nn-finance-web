import { cssMerge } from '@/utils'
import { FC, ReactNode } from 'react'

interface CardListProps {
  children: ReactNode
  className?: string
}

export const CardList: FC<CardListProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}