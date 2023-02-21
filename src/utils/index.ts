import { convertObjectToString } from './convertObjectToString'
import { nextBaseUrl, nextKeyToken } from './env'
import { getLocalStorageItem, setLocalStorageItem, getToken, setToken } from './localStorage'
import { parseItemToOption } from './parseItemToOption'

export const $ = {
  queryString: convertObjectToString,
  nextBaseUrl, nextKeyToken,
  getLocalStorageItem, setLocalStorageItem, getToken, setToken,
  parseItemToOption,
}