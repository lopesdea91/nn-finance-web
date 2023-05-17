import { useEffect, useRef } from 'react';
import Router, { useRouter } from 'next/router'
import { AppButtonIcon, AppTitle } from "@/@core/presentation/shared";
import { PageFinanceExtractStore, SystemStore } from '@/store/hook';
import { FinanceItem } from '@/types/entities/finance-item';
import { ContextSSR } from '@/types/system';
import { http } from '@/@core/infra/http';
import { Page, Section } from '@/@core/presentation/shared';
import { useTitlePage } from '@/hooks';
import { IPageFinanceExtractFormSearch, IPageFinanceExtractTable } from '@/types/pages/FinanceExtract';
import { FinanceTypeId } from '@/types/enum';
import { FinanceExtractFormSearch } from "./components/FinanceExtractFormSearch";
import { FinanceExtractTable } from './components/FinanceExtractTable';
import { FinanceExtractMethods } from './index.methods';
import { $memory } from '@/@core/infra/memory';

interface Pessoa { id: number }

type PageProps = {
  unauthenticated: boolean
  formSearch: IPageFinanceExtractFormSearch
  table: IPageFinanceExtractTable & {
    items: FinanceItem[],
    total: number
  }
}
export const FinanceExtractPage = (props: PageProps) => {
  useTitlePage('Finança extrato')

  const isMounted = useRef(false)
  const router = useRouter()
  const systemStore = SystemStore()
  const pageFinanceExtractStore = PageFinanceExtractStore()

  const { getItems } = FinanceExtractMethods()

  useEffect(() => {
    if (isMounted.current) {
      getItems({
        period: systemStore.state.period,
        wallet_id: systemStore.state.walletPanelId
      })
    } else {
      pageFinanceExtractStore.setFormSearch(props.formSearch)

      pageFinanceExtractStore.setTable({
        items: props.table.items,
        total: props.table.total,
        page: props.table.page,
        limit: props.table.limit,
      })
    }

    return () => {
      isMounted.current = true
    }
  }, [systemStore.state.period, systemStore.state.walletPanelId])

  if (props.unauthenticated) {
    router.push('/auth/sign-in')
    return null
  }

  return (
    <Page>
      <AppTitle
        variant="h5"
        contentEnd={
          <AppButtonIcon
            variant="new"
            onClick={() => Router.push(`/finance/item/new`)}
          />
        }
      >
        Extrato
      </AppTitle>

      <Section className='listing'>
        <FinanceExtractFormSearch />

        <FinanceExtractTable />
      </Section>
    </Page>
  )
}

export const FinanceExtractGetServerSideProps = async (ctx: ContextSSR) => {
  $memory.cookie.setContext(ctx)

  const period = $memory.cookie.get<string>('period')
  const walletPanelId = $memory.cookie.get<string>('walletPanelId')
  const searchCookie = $memory.cookie.get<IPageFinanceExtractFormSearch>('financeExtractFormSearch', { jsonParse: true })
  const tableCookie = $memory.cookie.get<IPageFinanceExtractTable>('financeExtractTable', { jsonParse: true })
  const token = $memory.cookie.get<string>('token')

  http.setToken(token)

  const { code, data } = await http.financeItem.page({
    /** searchCookie */
    _q: searchCookie.query,
    enable: searchCookie.enable,
    status_id: searchCookie.status_id,
    type_id: Number(searchCookie.type_id) as FinanceTypeId,
    origin_id: searchCookie.origin_id,
    tag_ids: searchCookie.tag_ids,
    type_preveiw: searchCookie.type_preveiw,
    /** tableCookie */
    _limit: tableCookie.limit,
    page: tableCookie.page,
    /** ... */
    period,
    wallet_id: Number(walletPanelId)
  })

  $memory.cookie.set('financeExtractTable', JSON.stringify({
    limit: data.limit,
    page: data.page,
  }))

  const teste: Pessoa = {
    id: 2
  }

  const props: PageProps = {
    unauthenticated: code === 401,
    formSearch: searchCookie,
    table: {
      items: data.items,
      total: data.total,
      page: data.page,
      limit: data.limit,
    }
  }

  return { props }
}