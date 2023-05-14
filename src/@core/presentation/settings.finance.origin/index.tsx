import React, { useEffect, useRef } from 'react'
import Router, { useRouter } from 'next/router'
import { http } from '@/@core/infra/http'
import { AppButtonIcon, AppTitle } from '@/components'
import { SystemStore, PageSettingsFinanceOriginStore } from '@/store/hook'
import { ContextSSR } from '@/types/system'
import { Page, Section } from '@/layouts/LayoutPrivate/components'
import { useTitlePage } from '@/hooks'
import { $memory } from '@/@core/infra/memory'
import { IPageSettingsFinanceOriginFormSearch, IPageSettingsFinanceOriginTable } from '@/types/pages/SettingsFinanceOrigin'
import { FormSearch, Table } from './components'
import { SettingsFinanceOriginMethods } from './index.methods'

export interface PageProps {
  unauthenticated: boolean
  formSearch: IPageSettingsFinanceOriginFormSearch
  table: IPageSettingsFinanceOriginTable
}
export const SettingsFinanceOriginPage = (props: PageProps) => {
  useTitlePage('Finança origem')

  const isMounted = useRef(false)
  const router = useRouter()
  const systemStore = SystemStore()
  const pageSettingsFinanceOriginStore = PageSettingsFinanceOriginStore()

  const { getItems } = SettingsFinanceOriginMethods()

  useEffect(() => {
    if (isMounted.current) {
      getItems()
    } else {
      pageSettingsFinanceOriginStore.setFormSearch(props.formSearch)

      pageSettingsFinanceOriginStore.setTable({
        items: props.table.items,
        total: props.table.total,
        page: props.table.page,
        limit: props.table.limit,
      })
    }

    return () => {
      isMounted.current = true
    }
  }, [])


  if (props.unauthenticated) {
    router.push('/auth/sign-in')
    return null
  }

  return (
    <Page>
      <AppTitle
        variant="h5" mb={2}
        contentEnd={
          <AppButtonIcon
            variant="new"
            onClick={() => Router.push(`/settings/finance/origin/new`)}
            disabled={systemStore.state.loading}
          />
        }
      >
        Origems
      </AppTitle>

      <Section>
        <FormSearch />
        <Table />
      </Section>
    </Page>
  )
}

export const settingsFinanceOriginServerSideProps = async (ctx: ContextSSR) => {
  $memory.cookie.setContext(ctx)

  const searchCookie = $memory.cookie.get<IPageSettingsFinanceOriginFormSearch>('financeOriginFormSearch', { jsonParse: true })
  const tableCookie = $memory.cookie.get<IPageSettingsFinanceOriginTable>('financeOriginTable', { jsonParse: true })
  const token = $memory.cookie.get<string>('token')

  http.setToken(token)

  const { code, data } = await http.financeOrigin.page({
    /** searchCookie */
    _q: searchCookie.query,
    enable: searchCookie.enable,
    parent_id: searchCookie.parent_id,
    type_id: searchCookie.type_id,
    wallet_id: searchCookie.wallet_id,
    /** tableCookie */
    _limit: tableCookie.limit,
    page: tableCookie.page,
  })

  $memory.cookie.set('financeOriginTable', JSON.stringify({
    limit: data.limit,
    page: data.page,
  }))

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