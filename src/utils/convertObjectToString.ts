export const convertObjectToString = <T>(search: T): string => {
  var str = ''
  if (Object.keys(search || {}).length) {
    var i = 0

    Object.keys(search || {}).filter(key => !['_total', 'lastPage'].includes(key)).forEach((key) => {

      const value = (search as any)[key]

      const check = [value].filter(Boolean).length

      if (check) {
        const alias = i === 0 ? '?' : '&'

        str += `${alias}${key}=${value}`

        i++
      }
    })
  }

  return str
}