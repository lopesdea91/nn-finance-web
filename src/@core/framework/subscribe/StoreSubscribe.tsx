import React from 'react'
import { financeOriginObserver, financeOriginTypeObserver, financeStatusObserver, financeTagObserver, financeTypeObserver, financeWalletObserver, userObserver, observer } from '@/@core/domain/observer'
import { useFinanceOriginListStore, useFinanceOriginTypeListStore, useFinanceStatusListStore, useFinanceTagListStore, useFinanceTypeListStore, useFinanceWalletListStore, useUserStore } from '@/@core/framework/store'

export const StoreSubscribe = () => {
  const userStore = useUserStore()
  const financeWalletListStore = useFinanceWalletListStore()
  const financeOriginListStore = useFinanceOriginListStore()
  const financeTagListStore = useFinanceTagListStore()
  const financeOriginTypeListStore = useFinanceOriginTypeListStore()
  const financeTypeListStore = useFinanceTypeListStore()
  const financeStatusListStore = useFinanceStatusListStore()

  /** geralStore */
  const userStoreUp = () => {
    const unsubscribeUser = observer.subscribe(userObserver((payload) => {
      userStore.setData(payload)
    }))

    return () => {
      unsubscribeUser.then(down => down())
    }
  }

  /** financeStore */
  const financeStoreUp = () => {
    const unsubscribeWallet = observer.subscribe(financeWalletObserver((payload) => {
      financeWalletListStore.setData(payload)
    }))
    const unsubscribeOrigin = observer.subscribe(financeOriginObserver((payload) => {
      financeOriginListStore.setData(payload)
    }))
    const unsubscribeTag = observer.subscribe(financeTagObserver((payload) => {
      financeTagListStore.setData(payload)
    }))
    const unsubscribeType = observer.subscribe(financeTypeObserver((payload) => {
      financeTypeListStore.setData(payload)
    }))
    const unsubscribeStatus = observer.subscribe(financeStatusObserver((payload) => {
      financeStatusListStore.setData(payload)
    }))
    const unsubscribeOriginType = observer.subscribe(financeOriginTypeObserver((payload) => {
      financeOriginTypeListStore.setData(payload)
    }))

    return () => {
      unsubscribeWallet.then(down => down())
      unsubscribeOrigin.then(down => down())
      unsubscribeTag.then(down => down())
      unsubscribeType.then(down => down())
      unsubscribeStatus.then(down => down())
      unsubscribeOriginType.then(down => down())
    }
  }

  React.useEffect(() => {
    const userStoreDown = userStoreUp()
    const financeStoreDown = financeStoreUp()

    return () => {
      userStoreDown()
      financeStoreDown()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}