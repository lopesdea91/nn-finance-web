import { IFinanceTag } from '../entities/finance-tag'
import { valueInput, valueObserver } from './observer.type'

type IData = IFinanceTag[]

export const financeTagObserver = (value: valueInput<IData>): valueObserver => ({
  value,
  name: 'financeTag.data'
})


// type FinanceTagObserverData = IFinanceTag[]

// export class FinanceTagObserverSubscribe implements ObserverSubscribe {
//   readonly name = 'setup.financeTag'
//   constructor(readonly callback: (p: FinanceTagObserverData) => void) {}
// }

// export class FinanceTagObserverPublish implements ObserverPublish {
//   readonly name = 'setup.financeTag'
//   constructor(readonly data: FinanceTagObserverData) {}
// }
