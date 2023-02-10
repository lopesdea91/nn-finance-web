import { createContext, useContext } from "react";

const ThemeModeContext = createContext({
  toggleThemeMode: () => { }
});

export const useThemeMode = () => {
  const { toggleThemeMode } = useContext(ThemeModeContext);

  return { toggleThemeMode }
}

export const ThemeModeProvider = ThemeModeContext.Provider