import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { AppButtonGroup, AppButtonIcon, AppTitle } from '@/components/base'
import { ContextSSR } from '@/types/system'
import { FinanceWalletConsolidateMonth } from '@/types/entities/finance-wallet'
import { FinanceStore, PagePanelFinanceStore, useAppSelector } from '@/store/hook'
import { http } from '@/@core/infra/http'
import { useTitlePage } from '@/hooks'
import { SectionBalance, SectionComposition } from './components'
import { PanelFinanceMethods } from './index.methods'
import { $memory } from '@/@core/infra/memory'
import { Page } from '@/layouts/LayoutPrivate/components'

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
  const { getItems, processConsolidateMonth } = PanelFinanceMethods()

  const { pageState, systemState } = useAppSelector(e => ({
    pageState: e.pagePanelFinance,
    systemState: e.system
  }))
  const financeStore = FinanceStore()

  useEffect(() => {
    if (isMounted.current) {
      getItems()
    } else {

      props.data.composition.map(el => {
        const find = financeStore.state.tag.find(e => e.id === Number(el.tag_id))
        el.tag_description = find?.description as string
        return el
      })

      pagePanelFinance.setData({
        balance: props.data.balance,
        composition: props.data.composition,
        originTransactional: props.data.originTransactional,
        invoice: props.data.invoice,
        tag: props.data.tag,
        status: props.data.status,
      })
    }

    return () => {
      isMounted.current = true
    }
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
    <Page>
      <AppTitle
        variant="h5"
        contentEnd={
          <AppButtonGroup>
            <AppButtonIcon
              variant="reload"
              onClick={() => getItems()}
              title="Recarregar dados"
            />
            <AppButtonIcon
              variant="sync"
              onClick={() => processConsolidateMonth()}
              title="Reprocessar dados"
            />
          </AppButtonGroup>
        }
      >
        Painel
      </AppTitle>

      <SectionBalance />

      <SectionComposition />

      {/*
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
      </BalanceCard> */}
    </Page>
  )
}

export const PanelFinanceGetServerSideProps = async (ctx: ContextSSR) => {
  $memory.cookie.setContext(ctx)

  const token = $memory.cookie.get<string>('token')
  const period = $memory.cookie.get<string>('period')
  const walletPanelId = $memory.cookie.get('walletPanelId')

  http.setToken(token)

  const { code, data } = await http.financeWallet.consolidateMonth({
    period,
    wallet_id: Number(walletPanelId)
  })

  return {
    props: {
      unauthenticated: code === 401,
      data
    }
  }
}

// export const PanelFinanceCore = () => {
//   const router = useRouter()
//   const { systemState } = useAppSelector(e => ({
//     systemState: e.system
//   }))

//   const system = SystemStore()
//   const pagePanelFinance = PagePanelFinanceStore()
//   const pageFinanceExtractStore = PageFinanceExtractStore()

//   async function getItems() {
//     system.loadingPageStart()

//     const { data } = await http.financeWallet
//       .consolidateMonth({
//         period: systemState.period,
//         wallet_id: Number(systemState.walletPanelId)
//       })

//     system.loadingPageEnd()

//     pagePanelFinance.setData(data)
//   }

//   async function handleClick(values: Partial<FinanceExtractFormSearchFields>) {
//     const newSearch: FinanceExtractFormSearchFields = {
//       ...pageFinanceExtractStore.state.search,
//       ...values,
//       page: 1,
//       enable: 1,
//       _q: '',
//       _limit: 30,
//       type_preveiw: 'extract'
//     }

//     pageFinanceExtractStore.setSearch(newSearch)

//     router.push('/finance/extract')
//   }

//   return {
//     getItems,
//     handleClick
//   }
// }