import React, { useEffect, useRef, useState } from 'react'
// import { useMediaQuery } from '@mui/material'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import MenuDesktop from './Menu-desktop'
import MenuMobile from './Menu-mobile'

export default function Menu() {
  const time = useRef<NodeJS.Timeout>()
  const [isDesktop, setValue] = useState(false)
  const { dispatchCloseMenu } = useStoreSystem()

  function handler() {
    const innerWidth = window.innerWidth

    setValue(innerWidth >= 426 ? true : false)

    dispatchCloseMenu()
  }

  useEffect(() => {
    function onResize() {
      clearTimeout(time.current)

      time.current = setTimeout(handler, 50)
    }
    onResize()

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isDesktop ? <MenuDesktop /> : <MenuMobile />
}
