import React, { useEffect, useRef } from 'react'
import Router, { useRouter } from 'next/router'
import { AppButtonIcon, AppTitle, Page, Section } from '@/@core/presentation/shared'
import { SystemStore } from '@/store/hook'
import { ContextSSR } from '@/types/system'
import { FormSearch } from './components/FormSearch'
import { Table } from './components/Table'
import { PageSettingsFinanceTagStore } from '@/store/hook/PageSettingsFinanceTag'
import { http } from '@/@core/infra/http'
import { SettingsFinanceTagMethods } from './index.methods'
import { useTitlePage } from '@/hooks'
import { $memory } from '@/@core/infra/memory'
import { IPageSettingsFinanceTagFormSearch, IPageSettingsFinanceTagTable } from '@/types/pages/SettingsFinanceTag'
import { FinanceTypeId } from '@/types/enum'

interface PageProps {
  unauthenticated: boolean
  formSearch: IPageSettingsFinanceTagFormSearch
  table: IPageSettingsFinanceTagTable
}
export const SettingsFinanceTagPage = (props: PageProps) => {
  useTitlePage('Tags')

  const isMounted = useRef(false)
  const router = useRouter()
  const systemStore = SystemStore()
  const pageSettingsFinanceTagStore = PageSettingsFinanceTagStore()

  const { getItems, onChangeSearch, resetSearch } = SettingsFinanceTagMethods()

  useEffect(() => {
    if (isMounted.current) {
      getItems()
    } else {
      pageSettingsFinanceTagStore.setFormSearch(props.formSearch)

      pageSettingsFinanceTagStore.setTable({
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
            onClick={() => Router.push(`/settings/finance/tag/new`)}
            disabled={systemStore.state.loading}
          />
        }
      >
        Tags
      </AppTitle>

      <Section>
        <FormSearch />
        <Table />
      </Section>
    </Page>
  )
}

export const SettingsFinanceTagServerSideProps = async (ctx: ContextSSR) => {
  $memory.cookie.setContext(ctx)

  const searchCookie = $memory.cookie.get<IPageSettingsFinanceTagFormSearch>('financeTagFormSearch', { jsonParse: true })
  const tableCookie = $memory.cookie.get<IPageSettingsFinanceTagTable>('financeTagTable', { jsonParse: true })
  const token = $memory.cookie.get<string>('token')

  http.setToken(token)

  const { code, data } = await http.financeTag.page({
    /** searchCookie */
    _q: searchCookie.query,
    enable: searchCookie.enable,
    type_id: searchCookie.type_id as FinanceTypeId,
    wallet_id: searchCookie.wallet_id,
    /** tableCookie */
    _limit: tableCookie.limit,
    page: tableCookie.page,
  })

  $memory.cookie.set('financeTagTable', JSON.stringify({
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