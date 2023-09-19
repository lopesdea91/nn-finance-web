import React, { FC, ReactNode, createContext, useContext, useRef, useState } from 'react'
import { useSystemStore } from '@/@core/framework/store'
import { financeConsolidationGatewayV1, financeItemGatewayV1 } from '@/@core/infra/geteway'
import { handlerCatchError, http } from '@/@core/infra/http'
import { systemCookie } from '@/@core/infra/memory/cookie'
import { loadingObserver, observer } from '@/@core/domain/observer'
import { systemFinanceConsolidationIdObserver } from '@/@core/domain/observer/SystemObserver'
import { PageData } from './HomePage.types'
import { StorePageProps } from '@/types/system'

const Context = createContext({} as PageData)

export const PageContextProvider: FC<StorePageProps<PageData>> = ({ children, initial }) => {
  const isMountedPeriod = useRef(false)
  const isMountedFinance = useRef(false)
  const [data, setData] = useState(initial)
  const systemStore = useSystemStore()

  React.useEffect(() => {
    if (isMountedPeriod.current) {
      changePeriod()
    }

    return () => {
      isMountedPeriod.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemStore.data.period])

  React.useEffect(() => {
    if (isMountedFinance.current) {
      changeFinanceWalletId()
    }

    return () => {
      isMountedFinance.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemStore.data.financeWalletId])

  const changePeriod = async () => {
    try {
      await observer.publish(loadingObserver(true))
      await getFinanceConsolidationId()
      await getFinanceBalance()
      await getFinanceComposition()

    } catch (err) {
      handlerCatchError(err)
    } finally {
      await observer.publish(loadingObserver(false))
    }
  }
  const changeFinanceWalletId = async () => {
    try {
      await observer.publish(loadingObserver(true))
      await getFinanceConsolidationId()
      await getFinanceBalance()
      await getFinanceComposition()
      await getFinanceItemHistory()

    } catch (err) {
      handlerCatchError(err)
    } finally {
      await observer.publish(loadingObserver(false))
    }
  }

  const getFinanceConsolidationId = async () => {
    const { period, financeWalletId } = systemCookie.get()

    const resultFinanceConsolidation = await financeConsolidationGatewayV1(http).monthConsolidation({
      period: period,
      walletId: financeWalletId
    })

    await observer.publish(systemFinanceConsolidationIdObserver(resultFinanceConsolidation.data.consolidationId))
  }

  const getFinanceBalance = async () => {
    const { financeWalletId, financeConsolidationId } = systemCookie.get()

    const resultMonthBalance = await financeConsolidationGatewayV1(http).monthBalance({
      consolidationId: financeConsolidationId,
      walletId: financeWalletId
    })

    setData(oldData => {
      const newData = JSON.parse(JSON.stringify(oldData)) as PageData

      newData.finance.monthBalance = resultMonthBalance.data
      return newData
    })
  }

  const getFinanceComposition = async () => {
    const { financeWalletId, financeConsolidationId } = systemCookie.get()

    const resultFinanceComposition = await financeConsolidationGatewayV1(http).monthComposition({
      consolidationId: financeConsolidationId,
      walletId: financeWalletId
    })

    setData(oldData => {
      const newData = JSON.parse(JSON.stringify(oldData)) as PageData

      newData.finance.monthComposition = resultFinanceComposition.data
      return newData
    })
  }

  const getFinanceItemHistory = async () => {
    const { financeWalletId } = systemCookie.get()

    const resultItemsHitosry = await financeItemGatewayV1(http).page({
      walletId: financeWalletId,
      page: 1,
      limit: 15,
      order: 'updated',
      sort: 'desc'
    })

    setData(oldData => {
      const newData = JSON.parse(JSON.stringify(oldData)) as PageData

      newData.finance.itemHistory = resultItemsHitosry.data.items
      return newData
    })
  }

  return <Context.Provider value={data}>{children}</Context.Provider>
}

export const useHomePageContext = () => useContext(Context)