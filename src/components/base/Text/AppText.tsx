
import React, { useMemo } from 'react'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  children: React.ReactNode
  size: 'sm' | 'md' | 'lg' | 'xl'
}

export const AppText = ({ children, size, ...rest }: Props) => {

  const sizeText = useMemo(() => {
    const sizes = {
      'sm': 'fs-6',
      'md': 'fs-5',
      'lg': 'fs-3',
      'xl': 'fs-1',
    }
    return sizes[size]
  }, [])

  return (
    <p className={sizeText} {...rest}>{children}</p>
  )
}