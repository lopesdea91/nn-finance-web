export class ObserverKey {
  private observers: Map<string, Function>

  constructor() {
    this.observers = new Map()
  }
  async subscribe(eventName: string, callback: Function) {
    const exist = this.observers.get(eventName)

    if (!exist) {
      this.observers.set(eventName, callback)
    }

    return () => {
      this.observers.delete(eventName)
    }
  }
  async publish(eventName: string, data?: unknown) {
    const events: Function[] = []

    Array.from(this.observers).forEach(([name, callback]) => {
      if (eventName === name) {
        events.push(!!(data !== undefined) ? callback(data) : callback())
      }
    })

    await Promise.all(events)
  }
  reset() {
    this.observers = new Map()
  }
}

export const observerKey = new ObserverKey()
