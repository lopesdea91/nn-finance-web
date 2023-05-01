import { useState } from 'react';
import { AppStoreProvider } from './AppStoreProvider'
import { AppThemeProvider } from './AppThemeProvider'
import { AppThemeModeProvider } from './AppThemeModeProvider'

type Props = {
  children: React.ReactNode
}
export const AppProvider = ({ children }: Props) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleThemeMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }

  return (
    <AppStoreProvider>
      <AppThemeModeProvider toggleThemeMode={toggleThemeMode}>
        <AppThemeProvider mode={mode}>
          {children}
        </AppThemeProvider>
      </AppThemeModeProvider>
    </AppStoreProvider>
  )
}