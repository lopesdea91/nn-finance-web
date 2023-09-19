import React, { FC, ReactNode } from 'react'

interface SubTitleSectionProps {
  children: ReactNode
}
export const SubTitleSection: FC<SubTitleSectionProps> = ({ children }) => {
  return (
    <h2 className='font-sans font-semibold text-2xl mb-1'>{children}</h2>
  )
}