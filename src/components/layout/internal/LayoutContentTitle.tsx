import React from 'react'

type Props = {
  text: string
  endContent?: React.ReactNode
}

export const LayoutContentTitle = ({ text, endContent }: Props) => {

  return (
    <div
      className='p-1 mb-2 border-bottom d-flex align-items-center'
      style={{ minHeight: '40px' }}
    >
      <h2 className='mb-0 fs-4'>{text}</h2>

      {endContent && (
        <div className='ms-auto'>
          {endContent}
        </div>
      )}
    </div>
  )
}
