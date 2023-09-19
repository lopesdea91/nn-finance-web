import { cssMerge } from '@/utils'
import React, { FC, ReactNode } from 'react'

interface ModalHeaderProps {
  children: ReactNode
  className?: string
}
export const ModalHeader: FC<ModalHeaderProps> = ({ children, className }) => {
  return (
    <div className={cssMerge("flex items-center px-2 h-8 md:h-10 shadow-sm border-b-[1px]", className)}>
      {children}
    </div>
  )
}