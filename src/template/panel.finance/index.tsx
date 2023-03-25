import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { BalanceCard, BalanceItem } from '@/components'
import { AppText, AppSkeleton } from '@/components/base'
import { $cookie } from '@/utils'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import { ContextSSR } from '@/types/system'
import { FinanceWalletConsolidateMonth } from '@/types/entities/finance-wallet'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { pagePanelFinanceSetData } from '@/store/feturesPage/panel.finance'
import { api } from '@/services/api'
let render = 0
type Props = {
  unauthenticated: boolean
  data: FinanceWalletConsolidateMonth
}
export const PanelFinancePage = (props: Props) => {
  const router = useRouter()

  if (props.unauthenticated) {
    router.push('/auth/sign-in')
    return null
  }

  const isMounted = useRef(false)
  render++
  const { loading, period, walletPanelId, loadingStart, loadingEnd } = useStoreSystem()
  const dispatch = useAppDispatch()

  const { dataPage } = useAppSelector(e => e.pagePanelFinance)

  const getItems = async () => {
    loadingStart()

    const { code, data } = await api.financeWallet()
      .consolidateMonth({
        period,
        wallet_id: Number(walletPanelId)
      })

    loadingEnd()

    dispatch(pagePanelFinanceSetData(data))
  }

  useEffect(() => {
    if (isMounted.current) {
      getItems()
    } else {
      dispatch(pagePanelFinanceSetData(props.data))
    }

    return () => {
      isMounted.current = true
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period, walletPanelId])

  const balances = loading
    ? [
      { title: 'Receita', value: <AppSkeleton width="50%" /> },
      { title: 'Despesa', value: <AppSkeleton width="50%" /> },
      { title: 'Disponivel', value: <AppSkeleton width="50%" /> },
      { title: 'Estimado', value: <AppSkeleton width="50%" /> }
    ]
    : [
      { title: 'Receita', value: dataPage.balance.revenue.value },
      { title: 'Despesa', value: dataPage.balance.expense.value },
      { title: 'Disponivel', value: dataPage.balance.available },
      { title: 'Estimado', value: dataPage.balance.estimate }
    ]

  const origins = loading
    ? [
      { id: `${render}1`, description: '', value: <AppSkeleton width="50%" />, },
      { id: `${render}2`, description: '', value: <AppSkeleton width="50%" />, },
    ]
    : dataPage.origin

  const tags = loading
    ? [
      { tag_key: `${render}3`, description: '', value: <AppSkeleton width="50%" />, },
      { tag_key: `${render}4`, description: '', value: <AppSkeleton width="50%" />, },
    ]
    : dataPage.tag


  return (
    <>
      <AppText variant='h5'>Balanço</AppText>
      <BalanceCard>
        {balances.map(({ title, value }) => (
          <BalanceItem
            key={title}
            title={title}
            value={value}
          />
        ))}
      </BalanceCard>

      <AppText variant='h5'>Origens</AppText>
      <BalanceCard>
        {origins.map(origin => (
          <BalanceItem
            key={origin.id}
            title={origin.description}
            value={origin.value}
            prefix="R$"
          />
        ))}
      </BalanceCard>

      <AppText variant='h5'>Tags</AppText>
      <BalanceCard>
        {tags.map(tag => (
          <BalanceItem
            key={tag.tag_key}
            title={tag.description}
            value={tag.value}
            prefix="R$"
          />
        ))}
      </BalanceCard>
    </ >
  )
}

export const PanelFinanceGetServerSideProps = async (ctx: ContextSSR) => {
  // const user = $cookie.getUser({ ctx })
  const period = $cookie.getPeriod({ ctx })
  const walletPanelId = $cookie.getWalletPanelId({ ctx })

  const { code, data } = await api.financeWallet({ ctx })
    .consolidateMonth({
      period,
      wallet_id: walletPanelId
    })

  return {
    props: {
      unauthenticated: code === 401,
      data
    }
  }
}