export const convertObjectToString = <T>(search: T): string => {
  let str = ''
  if (Object.keys(search || {}).length) {
    let i = 0
    let alias = ''

    Object.keys(search || {}).filter(key => !['_total', 'lastPage'].includes(key)).forEach((key) => {

      const value = (search as any)[key]

      const isArray = Array.isArray(value)

      const check = [value].filter(Boolean).length

      if (isArray) {
        alias = i === 0 ? '?' : '&'

        value.forEach((valueArr) => {
          str += `${alias}${key}[]=${valueArr}`

          i++
        })
      }
      else if (check) {
        alias = i === 0 ? '?' : '&'

        str += `${alias}${key}=${value}`

        i++
      }
    })
  }

  return str
}