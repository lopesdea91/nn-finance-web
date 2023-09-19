import React from "react"

export const useDebounce = () => {
  const time = React.useRef<NodeJS.Timeout>()

  const clean = () => {
    clearInterval(time.current)
  }

  function handler(callback: () => void) {
    clean()

    time.current = setTimeout(() => {
      callback()
    }, 150)
  }

  return { clean, handler }
}
