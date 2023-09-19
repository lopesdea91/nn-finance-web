import { valueInput, valueObserver } from './observer.type'

export const systemPeriodObserver = (value: valueInput<string>): valueObserver => ({
  value,
  name: 'period.system'
})

// export class SystemPeriodObserverSubscribe implements ObserverSubscribe {
//   readonly name = 'system.period'
//   constructor(readonly callback: (p: string) => void) {}
// }
// export class SystemPeriodObserverPublish implements ObserverPublish {
//   readonly name = 'system.period'
//   constructor(readonly data: string) {}
// }

export const systemFinanceWalletIdObserver = (value: valueInput<number>): valueObserver => ({
  value,
  name: 'financeWalletId.system'
})

// export class SystemFinanceWalletIdObserverSubscribe implements ObserverSubscribe {
//   readonly name = 'system.financeWalletId'
//   constructor(readonly callback: (p: number) => void) {}
// }
// export class SystemFinanceWalletIdObserverPublish implements ObserverPublish {
//   readonly name = 'system.financeWalletId'
//   constructor(readonly data: number) {}
// }


export const systemFinanceConsolidationIdObserver = (value: valueInput<number>): valueObserver => ({
  value,
  name: 'financeConsolidationId.system'
})

// export class SystemFinanceConsolidationIdObserverSubscribe implements ObserverSubscribe {
//   readonly name = 'system.financeConsolidationId'
//   constructor(readonly callback: (p: number) => void) {}
// }
// export class SystemFinanceConsolidationIdObserverPublish implements ObserverPublish {
//   readonly name = 'system.financeConsolidationId'
//   constructor(readonly data: number) {}
// }
