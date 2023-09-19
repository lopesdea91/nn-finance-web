import React, { FC, ReactNode } from 'react'

const TitleRoot: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className='flex items-center'>
      {children}
    </div>
  )
}

export default TitleRoot
