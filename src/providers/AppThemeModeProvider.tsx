import { themeModeContext } from '@/context'

type Props = {
  children: React.ReactNode
  toggleThemeMode: () => void
}
export const AppThemeModeProvider = ({ children, toggleThemeMode }: Props) => {
  return (
    <themeModeContext.Provider value={{ toggleThemeMode }}>
      {children}
    </themeModeContext.Provider>
  )
}