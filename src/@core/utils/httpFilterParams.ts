export default function httpFilterParams(obj: Object) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => {
      if (Array.isArray(v)) {
        return !!v.length
      }
      return v !== null && v !== '' && v !== undefined
    })
  )
}
