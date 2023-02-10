import { $ } from "@/utils"

/** LocalStorage */
export const getLocalStorageItem = (key: string): string => {
  return window.localStorage.getItem(key) || ''
}
export const setLocalStorageItem = (key: string, value: any) => {
  return window.localStorage.setItem(key, JSON.stringify(value))
}

/** Token */
export const getToken = () => {
  const KEY_TOKEN = $.nextKeyToken()

  return getLocalStorageItem(KEY_TOKEN as string)
}
export const setToken = (token: string) => {
  const KEY_TOKEN = $.nextKeyToken()

  return setLocalStorageItem(KEY_TOKEN as string, token)
}