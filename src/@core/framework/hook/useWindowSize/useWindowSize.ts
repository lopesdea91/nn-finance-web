import React from 'react'
import { useDebounce } from '../useDebounce/useDebounce'

export const useWindowSizeHook = () => {
  const [size, setSize] = React.useState({
    width: 0,
    height: 0
  })

  const debounce = useDebounce()

  const onResize = () => {
    debounce.handler(() => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    })
  }

  React.useEffect(() => {
    onResize()

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      debounce.clean()
    }
  }, [])

  return size
}
