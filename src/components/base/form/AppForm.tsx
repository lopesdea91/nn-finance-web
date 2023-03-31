import { Theme } from "@mui/material"
import { Box, SxProps } from "@mui/system"
import React from "react"

type Props = {
  children: React.ReactNode
  onSubmit: () => void
  containersx?: SxProps<{}>
}

export const AppForm = ({ children, onSubmit, containersx }: Props) => {

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit()
  }

  return (
    <Box sx={{ mb: 3, ...containersx }}>
      <form onSubmit={handleSubmit}>
        {children}
      </form>
    </Box>
  )
}

export default AppForm