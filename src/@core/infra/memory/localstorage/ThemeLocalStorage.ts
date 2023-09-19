import LocalStorageAbstract from './LocalStorageAbstract'

interface ThemeLocalStorageData {
  mode: 'dark' | 'light'
}

export class ThemeLocalStorage extends LocalStorageAbstract {
  constructor() {
    super('theme')
  }

  get() {
    return this.getLocalStorage<ThemeLocalStorageData>()?.mode
  }

  set(mode: 'dark' | 'light') {
    return this.setLocalStorage(JSON.stringify({ mode }))
  }
}

export const themeLocalStorage = new ThemeLocalStorage()
