import { useEffect } from "react"

export const useTitlePage = (value: string) => {
  useEffect(() => {
    window.document.title = `NN: ${value}`
  }, [value])
}
