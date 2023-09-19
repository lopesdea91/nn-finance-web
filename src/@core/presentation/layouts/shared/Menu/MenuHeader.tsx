import { cssMerge } from '@/utils'
import React from 'react'

export const MenuHeader: React.FC = () => {
  return (
    <div className='mb-2'>
      <h1
        className={cssMerge(
          'text-lg border-b-[1px] border-b-white/50 font-bold',
          'flex items-center justify-center h-12',
        )}
      >NN-CRM</h1>
    </div>
  )
}
