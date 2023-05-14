import React, { useEffect, useRef } from 'react'
import Router, { useRouter } from 'next/router'
import { AppButtonIcon, AppTitle } from '@/components/base'
import { SystemStore, PageSettingsFinanceWalletStore } from '@/store/hook'
import { ContextSSR } from '@/types/system'
import { Page, Section } from '@/layouts/LayoutPrivate/components'
import { http } from '@/@core/infra/http'
import { useTitlePage } from '@/hooks'
import { $memory } from '@/@core/infra/memory'
import { IPageSettingsFinanceWalletFormSearch, IPageSettingsFinanceWalletTable } from '@/types/pages/SettingsFinanceWallet'
import { FormSearch, Table } from './components'
import { SettingsFinanceWalletMethods } from './index.methods'

export interface PageProps {
  unauthenticated: boolean
  formSearch: IPageSettingsFinanceWalletFormSearch
  table: IPageSettingsFinanceWalletTable
}
export const SettingsFinanceWalletPage = (props: PageProps) => {
  useTitlePage('Finança carteira')

  const isMounted = useRef(false)
  const router = useRouter()
  const systemStore = SystemStore()
  const pageSettingsFinanceWalletStore = PageSettingsFinanceWalletStore()

  const { getItems } = SettingsFinanceWalletMethods()

  useEffect(() => {
    if (isMounted.current) {
      getItems()
    } else {
      pageSettingsFinanceWalletStore.setFormSearch(props.formSearch)

      pageSettingsFinanceWalletStore.setTable({
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
            onClick={() => Router.push(`/settings/finance/wallet/new`)}
            disabled={systemStore.state.loading}
          />
        }
      >
        Carteiras
      </AppTitle>

      <Section>
        <FormSearch />
        <Table />
      </Section>
    </Page>
  )
}

export const settingsFinanceWalletServerSideProps = async (ctx: ContextSSR) => {
  $memory.cookie.setContext(ctx)

  const searchCookie = $memory.cookie.get<IPageSettingsFinanceWalletFormSearch>('financeWalletFormSearch', { jsonParse: true })
  const tableCookie = $memory.cookie.get<IPageSettingsFinanceWalletTable>('financeWalletTable', { jsonParse: true })
  const token = $memory.cookie.get<string>('token')

  http.setToken(token)

  const { code, data } = await http.financeWallet.page({
    /** searchCookie */
    _q: searchCookie.query,
    enable: searchCookie.enable,
    panel: searchCookie.panel,
    /** tableCookie */
    _limit: tableCookie.limit,
    page: tableCookie.page,
  })

  $memory.cookie.set('financeWalletTable', JSON.stringify({
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
