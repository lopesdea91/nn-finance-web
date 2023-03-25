import React, { useEffect, useRef } from 'react'
import Router, { useRouter } from 'next/router'
import { AppButtonIcon, AppDivider, AppTitle } from '@/components/base'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import { api, ApiPageResponse } from '@/services/api'
import { pageSettingsFinanceWalletSetSearch, pageSettingsFinanceWalletSetList } from '@/store/feturesPage/settings.financeWallet'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { FinanceWallet, FinanceWalletSearch } from '@/types/entities/finance-wallet'
import { FinanceWalletFormSearchFields } from '@/types/form/settingsFinanceWallet'
import { ContextSSR } from '@/types/system'
import { $cookie } from '@/utils'
import { FormSearch } from './components/FormSearch'
import { Table } from './components/Table'

const searchDefault: FinanceWalletFormSearchFields = {
  _limit: 15,
  _q: '',
  page: 1,
  enable: 1,
  panel: 0,
}

interface PageProps {
  unauthenticated: boolean
  data: ApiPageResponse<FinanceWallet>
  searchKey: string
  search: Partial<FinanceWalletSearch>
}
export const SettingsFinanceWalletPage = (props: PageProps) => {
  const router = useRouter()

  if (props.unauthenticated) {
    router.push('/auth/sign-in')
    return null
  }

  const isMounted = useRef(false)
  const { loading, loadingStart, loadingEnd } = useStoreSystem()
  const dispatch = useAppDispatch()
  const state = useAppSelector(e => e.pageSettingsFinanceWallet)

  const onChangeSearch = (values: Partial<FinanceWalletSearch>) => {
    dispatch(pageSettingsFinanceWalletSetSearch(values))

    const searchCookie = { ...state.search, ...values }

    $cookie.setSearchPage({
      searchKey: props.searchKey,
      value: JSON.stringify(searchCookie)
    })
  }
  const resetSearch = () => {
    $cookie.setSearchPage({
      searchKey: props.searchKey,
      value: JSON.stringify(searchDefault)
    })
    dispatch(pageSettingsFinanceWalletSetSearch(searchDefault))
  }
  const getItems = async (args: { search?: Partial<FinanceWalletSearch> } = {}) => {
    loadingStart()

    const { data } = await api.financeWallet().page({
      search: {
        ...state.search,
        ...args.search,
      }
    })

    loadingEnd()

    dispatch(pageSettingsFinanceWalletSetList(data))
  }

  useEffect(() => {
    if (isMounted.current) {
      getItems()
    } else {
      dispatch(pageSettingsFinanceWalletSetSearch(props.search))

      dispatch(pageSettingsFinanceWalletSetList({
        items: props.data.items,
        total: props.data.total,
        lastPage: props.data.lastPage,
      }))
    }

    return () => {
      isMounted.current = true
    }
  }, [])

  return (
    <>
      <AppTitle
        variant="h5" mb={2}
        contentEnd={
          <AppButtonIcon
            variant="new"
            onClick={() => Router.push(`/settings/finance/wallet/new`)}
          />
        }
      >
        Carteiras
      </AppTitle>

      <AppDivider />

      <FormSearch
        loading={loading}
        getItems={getItems}
        search={state.search}
        onChangeSearch={onChangeSearch}
        resetSearch={resetSearch}
      />

      <Table
        loading={loading}
        getItems={getItems}
        items={state.items}
        onChangeSearch={onChangeSearch}
        search={{
          limit: Number(state.search._limit),
          page: Number(state.search.page),
          total: Number(state.total),
        }}
      />
    </>
  )
}

export const settingsFinanceWalletServerSideProps = async (ctx: ContextSSR) => {
  const user = $cookie.getUser({ ctx })

  const searchKey = `walletSearch.${user?.id}`

  const searchCookie = ($cookie.getSearchPage<Partial<FinanceWalletFormSearchFields>>({ ctx, searchKey }) || searchDefault)

  const search: FinanceWalletFormSearchFields = {
    ...searchDefault,
    ...searchCookie
  }

  const { code, data } = await api.financeWallet({ ctx }).page({ search })

  return {
    props: {
      unauthenticated: code === 401,
      data,
      searchKey,
      search
    }
  }
}