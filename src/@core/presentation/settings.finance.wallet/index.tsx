import React, { useEffect, useRef } from 'react'
import Router, { useRouter } from 'next/router'
import { AppButtonIcon, AppTitle } from '@/components/base'
import { ApiPageResponse } from '@/services/api'
import { SystemStore, PageSettingsFinanceWalletStore } from '@/store/hook'
import { FinanceWallet, FinanceWalletSearch } from '@/types/entities/finance-wallet'
import { FinanceWalletFormSearchFields } from '@/types/form/settingsFinanceWallet'
import { ContextSSR } from '@/types/system'
import { Section } from '@/layouts/LayoutPrivate/components'
import { $cookie } from '@/utils'
import { http } from '@/@core/infra/http'
import { SettingsFinanceWalletMethods } from './index.methods'
import { FormSearch, Table } from './components'
import { cookiesName } from '@/constants'
import { useTitlePage } from '@/hooks'

const searchDefault: FinanceWalletFormSearchFields = {
  _limit: 15,
  _q: '',
  page: 1,
  enable: 1,
  panel: 0,
}

export interface PageProps {
  unauthenticated: boolean
  data: ApiPageResponse<FinanceWallet>
  search: Partial<FinanceWalletSearch>
}
export const SettingsFinanceWalletPage = (props: PageProps) => {
  const isMounted = useRef(false)
  const router = useRouter()
  const systemStore = SystemStore()
  const pageSettingsFinanceWalletStore = PageSettingsFinanceWalletStore()

  const { getItems, onChangeSearch, resetSearch } = SettingsFinanceWalletMethods()

  useEffect(() => {
    if (isMounted.current) {
      getItems()
    } else {
      pageSettingsFinanceWalletStore.setSearch(props.search)

      pageSettingsFinanceWalletStore.setList({
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

  useTitlePage('Carteiras')

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
            onClick={() => Router.push(`/settings/finance/wallet/new`)}
            disabled={systemStore.state.loading}
          />
        }
      >
        Carteiras
      </AppTitle>

      <Section>
        <FormSearch
          getItems={getItems}
          search={pageSettingsFinanceWalletStore.state.search}
          onChangeSearch={onChangeSearch}
          resetSearch={resetSearch}
        />

        <Table
          getItems={getItems}
          items={pageSettingsFinanceWalletStore.state.items}
          onChangeSearch={onChangeSearch}
          search={{
            limit: Number(pageSettingsFinanceWalletStore.state.search._limit),
            page: Number(pageSettingsFinanceWalletStore.state.search.page),
            total: Number(pageSettingsFinanceWalletStore.state.total),
          }}
        />
      </Section>
    </div>
  )
}

export const settingsFinanceWalletServerSideProps = async (ctx: ContextSSR) => {
  const searchCookie = $cookie.getSearchPage<Partial<FinanceWalletFormSearchFields>>({ ctx, searchKey: cookiesName.financeWalletSearch })

  const search: FinanceWalletFormSearchFields = {
    ...searchDefault,
    ...searchCookie
  }

  const token = $cookie.getToken({ ctx })

  http.setToken(token)

  const { code, data } = await http.financeWallet.page(search)

  return {
    props: {
      unauthenticated: [code].includes(401),
      data: data,
      search
    }
  }
}
