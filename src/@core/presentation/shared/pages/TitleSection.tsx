import React, { FC, ReactNode } from 'react'

interface TitleSectionProps {
  children: ReactNode
}
export const TitleSection: FC<TitleSectionProps> = ({ children }) => {
  return (
    <h2 className='font-sans font-bold uppercase text-2xl mb-2'>{children}</h2>
  )
}