import { $ } from "@/utils"

/** LocalStorage */
export const getLocalStorageItem = (key: string): string => {
  const content = window.localStorage.getItem(key) || ''

  return content ? JSON.parse(content) : content
}
export const setLocalStorageItem = (key: string, value: any) => {
  return window.localStorage.setItem(key, JSON.stringify(value))
}

/** Token */
export const getToken = () => {
  const KEY_TOKEN = $.nextKeyToken() || ''

  return window.localStorage.getItem(KEY_TOKEN) || ''
}
export const setToken = (token: string) => {
  const KEY_TOKEN: string = $.nextKeyToken() || ''

  return window.localStorage.setItem(KEY_TOKEN, token)
}