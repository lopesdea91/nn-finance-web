import { convertObjectToString } from './convertObjectToString'
import { parseItemToOption } from './parseItemToOption'
import { parseQueryUrlForm } from './parseQueryUrlForm'

import { $env } from './env'
export * from './cookie'
import { $table } from './table'

// export const $ = {
//   queryString: convertObjectToString,
//   parseItemToOption,
// }

export const $utils = {
  queryString: convertObjectToString,
  parseItemToOption,
  parseQueryUrlForm
}

export {
  $env,
  $table
}