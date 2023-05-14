import CookieMemory from "./cookieMemory"
import LocalStorageMemory from "./localStorageMemory"

export interface MemoryImplements<K, O> {
  init: () => void
  reset: () => void
  get: (keys: K, options: O) => string
  set: (keys: K, value: string) => void
}

class Memory {
  public localStorage = new LocalStorageMemory()

  public cookie = new CookieMemory()

  public init() {
    this.localStorage.init()
    this.cookie.init()
  }

  public reset() {
    this.localStorage.reset()
    this.cookie.reset()
  }
}

export const $memory = new Memory()