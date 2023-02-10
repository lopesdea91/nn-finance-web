import { ThemeModeProvider } from "@/hooks/useThemeMode"

type Props = {
  children: React.ReactNode
  toggleThemeMode: () => void
}
export const AppThemeModeProvider = ({ children, toggleThemeMode }: Props) => {
  return (
    <ThemeModeProvider value={{ toggleThemeMode }}>
      {children}
    </ThemeModeProvider>
  )
}