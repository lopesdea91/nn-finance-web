import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { BalanceCard, BalanceItem, BalanceItemDisplayNumber } from '@/components'
import { AppText } from '@/components/base'
import { $cookie } from '@/utils'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import { ContextSSR } from '@/types/system'
import { FinanceWalletConsolidateMonth } from '@/types/entities/finance-wallet'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { pagePanelFinanceSetData } from '@/store/feturesPage/panel.finance'
import { api } from '@/services/api'
import { pageFinanceExtractSetSearch } from '@/store/feturesPage/finance.extract'
import { FinanceExtractFormSearchFields } from '@/types/form/financeExtract'
import { FinanceStatusId, FinanceTypeId } from '@/types/enum'
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

  render++
  const isMounted = useRef(false)
  const { loadingPageStart, loadingPageEnd } = useStoreSystem()
  const dispatch = useAppDispatch()

  const { pageState, pageExtract, systemState } = useAppSelector(e => ({
    pageState: e.pagePanelFinance,
    pageExtract: e.pageFinanceExtract,
    systemState: e.system
  }))

  const user = $cookie.getUser()
  const searchKeyFinanceExtract = `financeExtract.${user.id}`

  const getItems = async () => {
    loadingPageStart()

    const { data } = await api.financeWallet()
      .consolidateMonth({
        period: systemState.period,
        wallet_id: Number(systemState.walletPanelId)
      })

    loadingPageEnd()

    dispatch(pagePanelFinanceSetData(data))
  }

  const handleClick = (values: Partial<FinanceExtractFormSearchFields>) => {
    const newSearch: FinanceExtractFormSearchFields = {
      ...pageExtract.search,
      ...values,
      page: 1,
      enable: 1,
      _q: '',
      _limit: 30,
      type_preveiw: 'extract'
    }

    $cookie.setSearchPage({
      searchKey: searchKeyFinanceExtract,
      value: JSON.stringify(newSearch)
    })

    dispatch(pageFinanceExtractSetSearch(newSearch))

    router.push('/finance/extract')
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
  }, [systemState.period, systemState.walletPanelId])

  const balances = [
    { title: 'Receita', value: pageState.dataPage.balance.revenue, type_id: 1 },
    { title: 'Despesa', value: `-${pageState.dataPage.balance.expense}`, type_id: 2 },
    { title: 'Disponivel', value: pageState.dataPage.balance.available },
    { title: 'Estimado', value: pageState.dataPage.balance.estimate, status_id: 3 }
  ]

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