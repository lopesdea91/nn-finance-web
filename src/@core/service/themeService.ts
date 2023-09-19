export const themeService = {
  toggleMode: () => {
    const { classList } = document.documentElement

    if (classList.contains('dark')) {
      classList.remove('dark')
      classList.add('light')
    } else {
      classList.remove('light')
      classList.add('dark')
    }
  },
  setModeLight: () => {
    const { classList } = document.documentElement

    classList.remove('dark')
    classList.add('light')
  },
  setModeDark: () => {
    const { classList } = document.documentElement

    classList.remove('light')
    classList.add('dark')
  },
  currentMode: (): 'light' | 'dark' => {
    const { classList } = document.documentElement

    return classList.contains('dark') ? 'dark' : 'light'
  }
}
