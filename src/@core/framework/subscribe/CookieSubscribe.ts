import { observer } from '@/@core/domain/observer'
import {
  systemFinanceConsolidationIdObserver,
  systemFinanceWalletIdObserver,
  systemPeriodObserver
} from '@/@core/domain/observer/SystemObserver'
import { systemCookie } from '@/@core/infra/memory/cookie/SystemCookie'
import React from 'react'
import { useSystemStore } from '../store'

export const CookieSubscribe = () => {
  const systemStore = useSystemStore()

  const systemPeriodUp = () => {
    const unsubscribePeriod = observer.subscribe(systemPeriodObserver((period) => {
      systemCookie.set({ period })
      systemStore.setPeriod(period)
    }))

    const unsubscribeFinanceWalletId = observer.subscribe(systemFinanceWalletIdObserver((financeWalletId) => {
      systemCookie.set({ financeWalletId })
      systemStore.setFinanceWallet(financeWalletId)
    }))

    const unsubscribefinanceConsolidationId = observer.subscribe(systemFinanceConsolidationIdObserver((financeConsolidationId) => {
      systemCookie.set({ financeConsolidationId })
      systemStore.setFinanceConsolidation(financeConsolidationId)
    }))

    return () => {
      unsubscribePeriod.then((down) => down())
      unsubscribeFinanceWalletId.then((down) => down())
      unsubscribefinanceConsolidationId.then((down) => down())
    }
  }

  React.useEffect(() => {
    const systemPeriodDown = systemPeriodUp()

    return () => {
      systemPeriodDown()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
