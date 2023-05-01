import { useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import { ThemeModes } from '@/types/layout';

const getDesignMode = (mode: PaletteMode) => ({
  palette: {
    mode
  },
});

type Props = {
  children: React.ReactNode
  mode: ThemeModes
}
export const AppThemeProvider = ({ children, mode }: Props) => {
  const theme = useMemo(() => createTheme(getDesignMode(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}