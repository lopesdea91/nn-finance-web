export interface valueObserver {
  value?: unknown
  name: string
}

export type valueInput<T> = T | ((p: T) => void)
