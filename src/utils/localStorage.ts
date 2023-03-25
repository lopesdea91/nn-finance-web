/** LocalStorage */
export const getLocalStorageItem = (key: string): string => {
  const content = window.localStorage.getItem(key) || ''

  return content ? JSON.parse(content) : content
}
export const setLocalStorageItem = (key: string, value: any) => {
  return window.localStorage.setItem(key, JSON.stringify(value))
}