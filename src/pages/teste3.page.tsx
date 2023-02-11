import { useThemeMode } from '@/hooks/useThemeMode'
import { Button } from '@mui/material'
import React from 'react'

export default function Page() {
  const { toggleThemeMode } = useThemeMode()
  return (
    <div>
      <button onClick={() => toggleThemeMode()}>toggleThemeMode</button>
      <Button>Teste</Button>
      index
    </div>
  )
}
