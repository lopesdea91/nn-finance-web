import React, { FC } from 'react'
import { financeOriginObserver, financeOriginTypeObserver, financeStatusObserver, financeTagObserver, financeTypeObserver, financeWalletObserver, loadingObserver, observer, redirectObserver, systemFinanceConsolidationIdObserver, systemFinanceWalletIdObserver, systemPeriodObserver, userObserver } from '../domain/observer'
import { useAppStore, useFinanceOriginListStore, useFinanceOriginTypeListStore, useFinanceStatusListStore, useFinanceTagListStore, useFinanceTypeListStore, useFinanceWalletListStore, useSystemStore, useUserStore } from '../framework/store'
import { useRouter } from 'next/router'
import { themeService } from '../service/themeService'
import { themeLocalStorage } from '../infra/memory/localstorage'
import { authCookie, systemCookie } from '../infra/memory'
import { IAppInitialData } from './app.types'
import { http } from '../infra/http'

export const SetupKeyDown: FC = () => {
  const handleDarkMode = React.useCallback((ev: KeyboardEvent) => {
    if (ev.altKey && ev.code === 'KeyT') {
      let mode: 'light' | 'dark' = 'light'

      if (themeService.currentMode() === 'dark') {
        themeService.setModeLight()
        mode = 'light'
      } else {
        themeService.setModeDark()
        mode = 'dark'
      }

      themeLocalStorage.set(mode)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const keyDowm = React.useCallback((ev: KeyboardEvent) => {
    handleDarkMode(ev)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const themeInit = React.useCallback(() => {
    const mode = themeLocalStorage.get()

    document.documentElement.classList.add(mode)
  }, [])

  React.useEffect(() => {
    themeInit()

    document.body.addEventListener('keydown', keyDowm)

    return () => {
      document.body.removeEventListener('keydown', keyDowm)
    }
  }, [])

  return null
}

export const SetupAppObserver: FC = () => {
  const router = useRouter()
  const appStore = useAppStore()
  // const teleportHook = useTeleportHook()

  React.useEffect(() => {
    let routerDown: Function
    let loadingDown: Function
    // let teleportDown: Function

    observer.subscribe(redirectObserver(router.push)).then((d) => (routerDown = d))
    observer.subscribe(loadingObserver(appStore.setLoading)).then((d) => (loadingDown = d))

    return () => {
      routerDown()
      loadingDown()
    }
  }, [])

  return null
}

export const SetupSystemObserver: FC = () => {
  const systemStore = useSystemStore()
  const userStore = useUserStore()

  React.useEffect(() => {
    http.setToken(authCookie.get()?.token)
    
    let userDown: Function
    let periodDown: Function
    let financeWalletIdDown: Function
    let financeConsolidationIdDown: Function

    observer.subscribe(userObserver(userStore.setData))
      .then((d) => (userDown = d))

    observer.subscribe(systemPeriodObserver((period) => {
      systemCookie.set({ period })
      systemStore.setPeriod(period)

    })).then((d) => (periodDown = d))
    
    observer.subscribe(systemFinanceWalletIdObserver((financeWalletId) => {
      systemCookie.set({ financeWalletId })
      systemStore.setFinanceWallet(financeWalletId)

    })).then((d) => (financeWalletIdDown = d))
    
    observer.subscribe(systemFinanceConsolidationIdObserver((financeConsolidationId) => {
      systemCookie.set({ financeConsolidationId })
      systemStore.setFinanceConsolidation(financeConsolidationId)

    })).then((d) => (financeConsolidationIdDown = d))

    return () => {
      userDown()
      periodDown()
      financeWalletIdDown()
      financeConsolidationIdDown()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

export const SetupStoreFinanceObserver:FC = () => {
  const financeWalletListStore = useFinanceWalletListStore()
  const financeOriginListStore = useFinanceOriginListStore()
  const financeTagListStore = useFinanceTagListStore()
  const financeOriginTypeListStore = useFinanceOriginTypeListStore()
  const financeTypeListStore = useFinanceTypeListStore()
  const financeStatusListStore = useFinanceStatusListStore()

  React.useEffect(() => {
    let WalletDown:Function
    let OriginDown:Function
    let TagDown:Function
    let TypeDown:Function
    let StatusDown:Function
    let OriginTypeDown:Function
    
    observer.subscribe(financeWalletObserver((payload) => {
      financeWalletListStore.setData(payload)
  
    })).then(d => WalletDown = d)

    observer.subscribe(financeOriginObserver((payload) => {
      financeOriginListStore.setData(payload)
  
    })).then(d => OriginDown = d)

    observer.subscribe(financeTagObserver((payload) => {
      financeTagListStore.setData(payload)
  
    })).then(d => TagDown = d)

    observer.subscribe(financeTypeObserver((payload) => {
      financeTypeListStore.setData(payload)
  
    })).then(d => TypeDown = d)

    observer.subscribe(financeStatusObserver((payload) => {
      financeStatusListStore.setData(payload)
  
    })).then(d => StatusDown = d)

    observer.subscribe(financeOriginTypeObserver((payload) => {
      financeOriginTypeListStore.setData(payload)
  
    })).then(d => OriginTypeDown = d)
  
    return () => {
      WalletDown()
      OriginDown()
      TagDown()
      TypeDown()
      StatusDown()
      OriginTypeDown()
    }
  } ,[])

  return null
}

export const SetupData: FC<{initialData: IAppInitialData}> = ({initialData}) => {
  React.useEffect(() => {
    const period = systemCookie.get()?.period || initialData.period
    
    observer.publish(systemPeriodObserver(period))

    if(initialData.user)
      observer.publish(userObserver(initialData.user))

    if(initialData.finance.wallet)
      observer.publish(financeWalletObserver(initialData.finance.wallet))

    if(initialData.finance.origin)
      observer.publish(financeOriginObserver(initialData.finance.origin))

    if(initialData.finance.tag)
      observer.publish(financeTagObserver(initialData.finance.tag))

    if(initialData.finance.type)
      observer.publish(financeTypeObserver(initialData.finance.type))

    if(initialData.finance.status)
      observer.publish(financeStatusObserver(initialData.finance.status))

    if(initialData.finance.originType)
      observer.publish(financeOriginTypeObserver(initialData.finance.originType))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
