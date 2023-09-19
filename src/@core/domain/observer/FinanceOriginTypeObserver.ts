import { IFinanceOriginType } from '../entities/finance-originType'
import { valueInput, valueObserver } from './observer.type'

type IData = IFinanceOriginType[]
export const financeOriginTypeObserver = (value: valueInput<IData>): valueObserver => ({
  value,
  name: 'financeOriginType.data'
})

// export class FinanceOriginTypeObserverSubscribe implements ObserverSubscribe {
//   readonly name = 'setup.financeOriginType'
//   constructor(readonly callback: (p: FinanceOriginTypeObserverData) => void) {}
// }

// export class FinanceOriginTypeObserverPublish implements ObserverPublish {
//   readonly name = 'setup.financeOriginType'
//   constructor(readonly data: FinanceOriginTypeObserverData) {}
// }
