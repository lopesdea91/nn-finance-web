import { convertObjectToString } from './convertObjectToString'
import { nextBaseUrl, nextKeyToken } from './env'
import { getLocalStorageItem, setLocalStorageItem, getToken, setToken } from './localStorage'

export const $ = {
  queryString: convertObjectToString,
  nextBaseUrl, nextKeyToken,
  getLocalStorageItem, setLocalStorageItem, getToken, setToken
}