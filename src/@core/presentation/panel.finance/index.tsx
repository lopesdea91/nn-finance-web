import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { BalanceCard, BalanceItem, BalanceItemDisplayNumber } from '@/components'
import { AppText } from '@/components/base'
import { $cookie } from '@/utils'
import { ContextSSR } from '@/types/system'
import { FinanceWalletConsolidateMonth } from '@/types/entities/finance-wallet'
import { PageFinanceExtractStore, PagePanelFinanceStore, SystemStore, useAppSelector } from '@/store/hook'
import { FinanceExtractFormSearchFields } from '@/types/form/financeExtract'
import { FinanceStatusId, FinanceTypeId } from '@/types/enum'
import { http } from '@/@core/infra/http'
import { useTitlePage } from '@/hooks'

let render = 0

type Props = {
  unauthenticated: boolean
  data: FinanceWalletConsolidateMonth
}

export const PanelFinancePage = (props: Props) => {
  useTitlePage('Painel')

  const isMounted = useRef(false)
  const router = useRouter()
  const pagePanelFinance = PagePanelFinanceStore()
  const { getItems, handleClick } = PanelFinanceCore()

  const { pageState, systemState } = useAppSelector(e => ({
    pageState: e.pagePanelFinance,
    systemState: e.system
  }))

  useEffect(() => {
    if (isMounted.current) {
      getItems()
    } else {
      pagePanelFinance.setData(props.data)
    }

    return () => {
      isMounted.current = true
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemState.period, systemState.walletPanelId])

  const balances = [
    { title: 'Receita', value: pageState.dataPage.balance.revenue, type_id: 1 },
    { title: 'Despesa', value: `-${pageState.dataPage.balance.expense}`, type_id: 2 },
    { title: 'Disponivel', value: pageState.dataPage.balance.available },
    { title: 'Estimado', value: pageState.dataPage.balance.estimate, status_id: 3 }
  ]

  render++

  if (props.unauthenticated) {
    router.push('/auth/sign-in')
    return null
  }

  return (
    <>
      <BalanceCard>
        {pageState.dataPage.status.map((item, i) => (
          <BalanceItemDisplayNumber
            key={`${render}-${i}-status`}
            desc={item.description}
            num={item.count}
            onClick={() => handleClick({
              tag_ids: [],
              status_id: item.status_id,
              type_id: item.type_id,
            })}
          />
        ))}
      </BalanceCard>

      <AppText variant='h5'>Resumo</AppText>
      <BalanceCard>
        {balances.map((item, i) => (
          <BalanceItem
            key={`${render}-${i}-balances`}
            title={item.title}
            value={item.value}
            onClick={() => handleClick({
              origin_id: null,
              tag_ids: [],
              status_id: item.status_id as FinanceStatusId || null,
              type_id: item?.type_id as FinanceTypeId || null,
            })}
          />
        ))}
      </BalanceCard>

      <AppText variant='h5'>Origens</AppText>
      <BalanceCard>
        {pageState.dataPage.originTransactional.map((item, i) => (
          <BalanceItem
            key={`${render}-${i}-origins`}
            title={item.description}
            value={item.sum}
            prefix="R$"
            onClick={() => handleClick({
              origin_id: item.id,
              tag_ids: [],
              status_id: null,
              type_id: null,
            })}
          />
        ))}
      </BalanceCard>

      <AppText variant='h5'>Tags</AppText>
      <BalanceCard>
        {pageState.dataPage.tag.map((item, i) => (
          <BalanceItem
            key={`${render}-${i}-tags`}
            title={item.tag_description}
            value={item.sum}
            prefix="R$"
            onClick={() => handleClick({
              origin_id: null,
              tag_ids: item.tag_ids,
              status_id: null,
              type_id: null,
            })}
          />
        ))}
      </BalanceCard>
    </>
  )
}

export const PanelFinanceGetServerSideProps = async (ctx: ContextSSR) => {
  // const user = $cookie.getUser({ ctx })
  const token = $cookie.getToken({ ctx })
  const period = $cookie.getPeriod({ ctx })
  const walletPanelId = $cookie.getWalletPanelId({ ctx })

  http.setToken(token)

  const { code, data } = await http.financeWallet.consolidateMonth({
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

export const PanelFinanceCore = () => {
  const router = useRouter()
  const { systemState } = useAppSelector(e => ({
    systemState: e.system
  }))

  const system = SystemStore()
  const pagePanelFinance = PagePanelFinanceStore()
  const pageFinanceExtractStore = PageFinanceExtractStore()

  async function getItems() {
    system.loadingPageStart()

    const { data } = await http.financeWallet
      .consolidateMonth({
        period: systemState.period,
        wallet_id: Number(systemState.walletPanelId)
      })

    system.loadingPageEnd()

    pagePanelFinance.setData(data)
  }

  async function handleClick(values: Partial<FinanceExtractFormSearchFields>) {
    const newSearch: FinanceExtractFormSearchFields = {
      ...pageFinanceExtractStore.state.search,
      ...values,
      page: 1,
      enable: 1,
      _q: '',
      _limit: 30,
      type_preveiw: 'extract'
    }

    pageFinanceExtractStore.setSearch(newSearch)

    router.push('/finance/extract')
  }

  return {
    getItems,
    handleClick
  }
}