export default function httpParseParams(data: Object) {
  const paramsEntries = Object.entries(data)
  const paramsLength = paramsEntries.length

  if (!paramsLength) {
    return ''
  }

  return paramsEntries.reduce((acc, item, i) => {
    const [key, value] = item
    const paramIndex = i + 1

    const isArray = Array.isArray(value)

    if (isArray) {
      const valueLength = value.length

      value.forEach((v: string, i: number) => {
        const strConcat = valueLength !== i + 1 ? '&' : ''

        acc += `${key}[]=${v}${strConcat}`
      })
    }

    if (!isArray) {
      acc += `${key}=${value}`
    }

    if (paramsLength !== paramIndex) {
      acc += '&'
    }

    return acc
  }, '')
}
