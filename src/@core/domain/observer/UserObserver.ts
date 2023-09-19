import { IUser } from '../entities/user'
import { valueInput, valueObserver } from './observer.type'

type IData = IUser

export const userObserver = (value: valueInput<IData>): valueObserver => ({
  value,
  name: 'user.data'
})

// type UserObserverData = IUser

// export class UserObserverSubscribe implements ObserverSubscribe {
//   readonly name = 'setup.user'
//   constructor(readonly callback: (p: UserObserverData) => void) {}
// }

// export class UserObserverPublish implements ObserverPublish {
//   readonly name = 'setup.user'
//   constructor(readonly data: UserObserverData) {}
// }
