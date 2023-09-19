import { valueObserver } from './observer.type'

export class Observable {
  private observers: Map<string, Function>

  constructor() {
    this.observers = new Map()
  }
  async subscribe(payload: valueObserver) {
    const exist = this.observers.get(payload.name)

    if (!exist) {
      this.observers.set(payload.name, payload.value as Function)
    }

    return () => {
      this.observers.delete(payload.name)
    }
  }
  async publish(payload: valueObserver) {
    const events: Function[] = []

    Array.from(this.observers).forEach(([name, callback]) => {
      if (payload.name === name) {
        events.push(!!(payload?.value !== undefined) ? callback(payload?.value) : callback())
      }
    })

    await Promise.all(events)
  }
  reset() {
    this.observers = new Map()
  }
}

export const observer = new Observable()
