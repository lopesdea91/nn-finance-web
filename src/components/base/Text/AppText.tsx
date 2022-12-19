
import React, { useMemo } from 'react'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  children: React.ReactNode
  size: 'sm' | 'md' | 'lg' | 'xl'
}

const AppText = React.forwardRef<any, Props>(({ children, size, ...rest }: Props, ref) => {

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
    <p className={sizeText} ref={ref} {...rest}>{children}</p>
  )
})

AppText.displayName = 'AppText'

export { AppText }