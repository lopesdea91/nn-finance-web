export interface ObserverSubscribe {
  name: string
  callback: Function
}
export interface ObserverPublish {
  name: string
  data?: unknown
}
