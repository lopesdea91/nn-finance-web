import { IFinanceStatus } from '../entities/finance-status'
import { valueInput, valueObserver } from './observer.type'

type IData = IFinanceStatus[]

export const financeStatusObserver = (value: valueInput<IData>): valueObserver => ({
  value,
  name: 'financeStatus.data'
})

// type FinanceStatusObserverData = IFinanceStatus[]

// export class FinanceStatusObserverSubscribe implements ObserverSubscribe {
//   readonly name = 'setup.financeStatus'
//   constructor(readonly callback: (p: FinanceStatusObserverData) => void) {}
// }

// export class FinanceStatusObserverPublish implements ObserverPublish {
//   readonly name = 'setup.financeStatus'
//   constructor(readonly data: FinanceStatusObserverData) {}
// }
