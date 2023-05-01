import React, { useEffect, useRef } from 'react'
import Router, { useRouter } from 'next/router'
import { AppButtonIcon, AppTitle } from '@/components/base'
import { ApiPageResponse } from '@/services/api'
import { SystemStore } from '@/store/hook'
import { FinanceTag } from '@/types/entities/finance-tag'
import { FinanceTagFormSearchFields } from '@/types/form/settingsFinanceTag'
import { ContextSSR } from '@/types/system'
import { $cookie } from '@/utils'
import { FormSearch } from './components/FormSearch'
import { Table } from './components/Table'
import { PageSettingsFinanceTagStore } from '@/store/hook/PageSettingsFinanceTag'
import { Section } from '@/layouts/LayoutPrivate/components'
import { http } from '@/@core/infra/http'
import { SettingsFinanceTagMethods } from './index.methods'
import { cookiesName } from '@/constants'
import { useTitlePage } from '@/hooks'

const searchDefault: FinanceTagFormSearchFields = {
  _limit: 15,
  _q: '',
  page: 0,
  enable: 1,
  type_id: null,
  wallet_id: null,
}

interface PageProps {
  unauthenticated: boolean
  data: ApiPageResponse<FinanceTag>
  search: Partial<FinanceTagFormSearchFields>
}
export const SettingsFinanceTagPage = (props: PageProps) => {
  const isMounted = useRef(false)
  const router = useRouter()
  const systemStore = SystemStore()
  const pageSettingsFinanceTagStore = PageSettingsFinanceTagStore()

  const { getItems, onChangeSearch, resetSearch } = SettingsFinanceTagMethods()

  useEffect(() => {
    if (isMounted.current) {
      getItems()
    } else {
      pageSettingsFinanceTagStore.setSearch(props.search)

      pageSettingsFinanceTagStore.setList({
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

  useTitlePage('Tags')

  if (props.unauthenticated) {
    router.push('/auth/sign-in')
    return null
  }

  return (
    <div data-testid="page">
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

        <FormSearch
          getItems={getItems}
          search={pageSettingsFinanceTagStore.state.search}
          onChangeSearch={onChangeSearch}
          resetSearch={resetSearch}
        />

        <Table
          getItems={getItems}
          items={pageSettingsFinanceTagStore.state.items}
          onChangeSearch={onChangeSearch}
          search={{
            limit: Number(pageSettingsFinanceTagStore.state.search._limit),
            page: Number(pageSettingsFinanceTagStore.state.search.page),
            total: Number(pageSettingsFinanceTagStore.state.total),
          }}
        />
      </Section>
    </div>
  )
}

export const SettingsFinanceTagServerSideProps = async (ctx: ContextSSR) => {
  const searchCookie = $cookie.getSearchPage<Partial<FinanceTagFormSearchFields>>({ ctx, searchKey: cookiesName.financeTagSearch })

  const search: FinanceTagFormSearchFields = {
    ...searchDefault,
    ...searchCookie
  }

  const token = $cookie.getToken({ ctx })

  http.setToken(token)

  const { code, data } = await http.financeTag.page(search)

  return {
    props: {
      unauthenticated: code === 401,
      data,
      search
    }
  }
}