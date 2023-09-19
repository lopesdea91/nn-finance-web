import { IFinanceType } from '../entities/finance-type'
import { valueInput, valueObserver } from './observer.type'

type IData = IFinanceType[]

export const financeTypeObserver = (value: valueInput<IData>): valueObserver => ({
  value,
  name: 'financeType.data'
})


// type FinanceTypeObserverData = IFinanceType[]

// export class FinanceTypeObserverSubscribe implements ObserverSubscribe {
//   readonly name = 'setup.financeType'
//   constructor(readonly callback: (p: FinanceTypeObserverData) => void) {}
// }

// export class FinanceTypeObserverPublish implements ObserverPublish {
//   readonly name = 'setup.financeType'
//   constructor(readonly data: FinanceTypeObserverData) {}
// }
