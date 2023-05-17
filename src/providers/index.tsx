import { useState } from 'react';
import { AppStoreProvider } from './AppStoreProvider'
import { AppThemeProvider } from './AppThemeProvider'
import { AppThemeModeProvider } from './AppThemeModeProvider'
import { AppPortalProvider } from './AppPortalProvider';

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
          <AppPortalProvider>
            {children}
          </AppPortalProvider>
        </AppThemeProvider>
      </AppThemeModeProvider>
    </AppStoreProvider>
  )
}