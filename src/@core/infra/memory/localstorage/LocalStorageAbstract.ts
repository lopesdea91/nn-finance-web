export default class LocalStorageAbstract {
  protected key: string

  constructor(key: string) {
    this.key = key
  }

  protected setLocalStorage(value: string) {
    window.localStorage.setItem(this.key, value)
  }

  protected getLocalStorage<T>() {
    const dataStorage = window.localStorage.getItem(this.key)

    if (!dataStorage) {
      return null as T
    }

    const data = JSON.parse(dataStorage)

    return data as T
  }

  protected removeLocalStorage(key: string) {
    window.localStorage.removeItem(key)
  }

  protected mergeWithOldValueBeforeUpdating<T>(data: T) {
    const oldData = this.getLocalStorage() // get old data
    const newData = Object.assign({}, oldData, data) // merge all data
    const dataString = JSON.stringify(newData) // convert string
    this.setLocalStorage(dataString)
  }
}
