import React from 'react'

interface Props {
  children: React.ReactNode
}
export const Page = ({ children }: Props) => {
  return (
    <div className='page' data-testid="page">
      {children}
    </div>
  )
}