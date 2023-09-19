import React, { FC, ReactNode } from 'react'

const TitleText: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <h2 className='text-3xl mr-auto'>{children}</h2>
  )
}

export default TitleText
