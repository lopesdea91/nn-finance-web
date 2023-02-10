import { AppThemeProvider } from './AppThemeProvider'
import { AppStoreProvider } from './AppStoreProvider'
import { AppThemeModeProvider } from './AppThemeModeProvider'
import { useState } from 'react';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleThemeMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }

  return (
    <AppThemeModeProvider toggleThemeMode={toggleThemeMode}>
      <AppThemeProvider mode={mode}>
        <AppStoreProvider>
          {children}
        </AppStoreProvider>
      </AppThemeProvider>
    </AppThemeModeProvider>
  )
}