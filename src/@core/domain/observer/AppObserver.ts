import { valueInput, valueObserver } from './observer.type'

/** redirect */
type redirectData = string
export const redirectObserver = (value: valueInput<redirectData>): valueObserver => ({
  value,
  name: 'redirect.app'
})

// export class AppRedirectObserverSubscribe implements ObserverSubscribe {
//   readonly name = 'app.redirect'
//   constructor(readonly callback: (p: string) => void) {}
// }
// export class AppRedirectObserverPublish implements ObserverPublish {
//   readonly name = 'app.redirect'
//   constructor(readonly data: string) {}
// }

/** menu */
type ToggleMenuData = 'open' | 'close' | 'toggle'
export const toggleMenuObserver = (value: valueInput<ToggleMenuData>): valueObserver => ({
  value,
  name: 'menu.app'
})
// export class AppToggleMenuObserverSubscribe implements ObserverSubscribe {
//   readonly name = 'app.menu'
//   constructor(readonly callback: (p: 'open' | 'close' | 'toggle') => void) {}
// }
// export class AppToggleMenuObserverPublish implements ObserverPublish {
//   readonly name = 'app.menu'
//   constructor(readonly data: 'open' | 'close' | 'toggle') {}
// }

/** menu */
type loadingObserverData = boolean
export const loadingObserver = (value: valueInput<loadingObserverData>): valueObserver => ({
  value,
  name: 'loading.app'
})
// export class AppLoadingObserverSubscribe implements ObserverSubscribe {
//   readonly name = 'app.loading'
//   constructor(readonly callback: (p: boolean) => void) {}
// }
// export class AppLoadingObserverPublish implements ObserverPublish {
//   readonly name = 'app.loading'
//   constructor(readonly data: boolean) {}
// }
