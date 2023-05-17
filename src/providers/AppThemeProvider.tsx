import { useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeModes } from '@/types/layout';

type Props = {
  children: React.ReactNode
  mode: ThemeModes
}
export const AppThemeProvider = ({ children, mode }: Props) => {
  const theme = useMemo(() => createTheme({
    palette: {
      mode
    }
  }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}