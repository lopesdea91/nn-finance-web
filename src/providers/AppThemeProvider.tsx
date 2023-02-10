import { useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import { ThemeModes } from '@/types/layout';

const getDesignMode = (mode: PaletteMode) => ({
  palette: {
    mode,
    // ...(mode === 'light'
    //   ? {
    //     // palette values for light mode
    //     primary: amber,
    //     divider: amber[200],
    //     text: {
    //       primary: grey[900],
    //       secondary: grey[800],
    //     },
    //   }
    //   : {
    //     // palette values for dark mode
    //     primary: deepOrange,
    //     divider: deepOrange[700],
    //     background: {
    //       default: deepOrange[900],
    //       paper: deepOrange[900],
    //     },
    //     text: {
    //       primary: '#fff',
    //       secondary: grey[500],
    //     },
    //   }),
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