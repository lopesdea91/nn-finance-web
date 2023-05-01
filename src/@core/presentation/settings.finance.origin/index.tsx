import React, { useEffect, useRef } from 'react'
import Router, { useRouter } from 'next/router'
import { http } from '@/@core/infra/http'
import { AppButtonIcon, AppTitle } from '@/components'
import { ApiPageResponse } from '@/services/api'
import { SystemStore, PageSettingsFinanceOriginStore } from '@/store/hook'
import { FinanceOrigin, FinanceOriginSearch } from '@/types/entities/finance-origin'
import { FinanceOriginFormSearchFields } from '@/types/form/settingsFinanceOrigin'
import { ContextSSR } from '@/types/system'
import { Section } from '@/layouts/LayoutPrivate/components'
import { $cookie } from '@/utils'
import { cookiesName } from '@/constants'
import { FormSearch, Table } from './components'
import { SettingsFinanceOriginMethods } from './index.methods'
import { useTitlePage } from '@/hooks'

const searchDefault: FinanceOriginFormSearchFields = {
  _limit: 15,
  _q: '',
  page: 1,
  enable: 1,
  type_id: null,
  wallet_id: null,
  parent_id: null
}

interface PageProps {
  unauthenticated: boolean
  data: ApiPageResponse<FinanceOrigin>
  search: Partial<FinanceOriginSearch>
}
export const SettingsFinanceOriginPage = (props: PageProps) => {
  const isMounted = useRef(false)
  const router = useRouter()
  const systemStore = SystemStore()
  const pageSettingsFinanceOriginStore = PageSettingsFinanceOriginStore()

  const { getItems, onChangeSearch, resetSearch } = SettingsFinanceOriginMethods()

  useEffect(() => {
    if (isMounted.current) {
      getItems()
    } else {
      pageSettingsFinanceOriginStore.setSearch(props.search)

      pageSettingsFinanceOriginStore.setList({
        items: props.data.items,
        total: props.data.total,
        lastPage: props.data.lastPage,
      })
    }

    return () => {
      isMounted.current = true
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useTitlePage('origens')

  if (props.unauthenticated) {
    router.push('/auth/sign-in')
    return null
  }

  return (
    <>
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
        <FormSearch
          getItems={getItems}
          search={pageSettingsFinanceOriginStore.state.search}
          onChangeSearch={onChangeSearch}
          resetSearch={resetSearch}
        />

        <Table
          getItems={getItems}
          items={pageSettingsFinanceOriginStore.state.items}
          onChangeSearch={onChangeSearch}
          search={{
            limit: Number(pageSettingsFinanceOriginStore.state.search._limit),
            page: Number(pageSettingsFinanceOriginStore.state.search.page),
            total: Number(pageSettingsFinanceOriginStore.state.total),
          }}
        />
      </Section>
    </>
  )
}

export const settingsFinanceOriginServerSideProps = async (ctx: ContextSSR) => {
  const searchCookie = $cookie.getSearchPage<Partial<FinanceOriginFormSearchFields>>({ ctx, searchKey: cookiesName.financeOriginSearch })

  const search: FinanceOriginFormSearchFields = {
    ...searchDefault,
    ...searchCookie
  }

  const token = $cookie.getToken({ ctx })

  http.setToken(token)

  const { code, data } = await http.financeOrigin.page(search)

  return {
    props: {
      unauthenticated: [code].includes(401),
      data: data,
      search
    }
  }
}