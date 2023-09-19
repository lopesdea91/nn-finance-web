import { IFinanceOrigin } from '../entities/finance-origin'
import { valueInput, valueObserver } from './observer.type'

type IData = IFinanceOrigin[]

export const financeOriginObserver = (value: valueInput<IData>): valueObserver => ({
  value,
  name: 'financeOrigin.data'
})

// export class FinanceOriginObserverSubscribe implements ObserverSubscribe {
//   readonly name = 'setup.financeOrigin'
//   constructor(readonly callback: (p: FinanceOriginObserverData) => void) {}
// }

// export class FinanceOriginObserverPublish implements ObserverPublish {
//   readonly name = 'setup.financeOrigin'
//   constructor(readonly data: FinanceOriginObserverData) {}
// }
