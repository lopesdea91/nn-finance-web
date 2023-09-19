import React, { ReactNode } from 'react'

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className={'h-screen w-screen flex justify-center items-center bg-neutral-200 dark:bg-neutral-900'}>
      {children}
    </div>
  )
}
