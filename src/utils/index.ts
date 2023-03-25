import { convertObjectToString } from './convertObjectToString'
import { getLocalStorageItem, setLocalStorageItem, } from './localStorage'
import { parseItemToOption } from './parseItemToOption'
import { parseQueryUrlForm } from './parseQueryUrlForm'

import { $env } from './env'
import { $cookie } from './cookie'
import { $table } from './table'

// export const $ = {
//   queryString: convertObjectToString,
//   getLocalStorageItem, setLocalStorageItem,
//   parseItemToOption,
// }

export const $utils = {
  queryString: convertObjectToString,
  getLocalStorageItem, setLocalStorageItem,
  parseItemToOption,
  parseQueryUrlForm
}

export {
  $env,
  $cookie,
  $table
}