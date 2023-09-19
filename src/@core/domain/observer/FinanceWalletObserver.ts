import { IFinanceWallet } from '../entities/finance-wallet'
import { valueInput, valueObserver } from './observer.type'

type IData = IFinanceWallet[]

export const financeWalletObserver = (value: valueInput<IData>): valueObserver => ({
  value,
  name: 'financeWallet.data'
})


// type FinanceWalletObserverData = IFinanceWallet[]

// export class FinanceWalletObserverSubscribe implements ObserverSubscribe {
//   readonly name = 'setup.financeWallet'
//   constructor(readonly callback: (p: FinanceWalletObserverData) => void) {}
// }

// export class FinanceWalletObserverPublish implements ObserverPublish {
//   readonly name = 'setup.financeWallet'
//   constructor(readonly data: FinanceWalletObserverData) {}
// }
