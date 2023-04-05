import React, { useEffect, useRef } from 'react'
import Router, { useRouter } from 'next/router'
import { AppButtonIcon, AppDivider, AppTitle } from '@/components/base'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import { api, ApiPageResponse } from '@/services/api'
import { pageSettingsFinanceOriginSetList, pageSettingsFinanceOriginSetSearch } from '@/store/feturesPage/settings.financeOrigin'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { FinanceOrigin, FinanceOriginSearch } from '@/types/entities/finance-origin'
import { FinanceOriginFormSearchFields } from '@/types/form/settingsFinanceOrigin'
import { ContextSSR } from '@/types/system'
import { $cookie } from '@/utils'
import { FormSearch } from './components/FormSearch'
import { Table } from './components/Table'

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
  searchKey: string,
  search: FinanceOriginFormSearchFields;
}

export const SettingsFinanceOriginPage = (props: PageProps) => {
  const router = useRouter()

  if (props.unauthenticated) {
    router.push('/auth/sign-in')
    return null
  }

  const isMounted = useRef(false)
  const { loadingStart, loadingEnd } = useStoreSystem()
  const dispatch = useAppDispatch()
  const { pageState, systemState } = useAppSelector(e => ({
    pageState: e.pageSettingsFinanceOrigin,
    systemState: e.system
  }))


  const onChangeSearch = (values: Partial<FinanceOriginSearch>) => {
    dispatch(pageSettingsFinanceOriginSetSearch(values))

    const searchCookie = { ...pageState.search, ...values }

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
    dispatch(pageSettingsFinanceOriginSetSearch(searchDefault))
  }
  const getItems = async (args: { search?: Partial<FinanceOriginSearch> } = {}) => {
    loadingStart()

    const { data } = await api.financeOrigin().page({
      search: {
        ...pageState.search,
        ...args.search,
      }
    })

    loadingEnd()

    dispatch(pageSettingsFinanceOriginSetList(data))
  }

  useEffect(() => {
    if (isMounted.current) {
      getItems()
    } else {
      dispatch(pageSettingsFinanceOriginSetSearch(props.search))

      dispatch(pageSettingsFinanceOriginSetList({
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
            onClick={() => Router.push(`/settings/finance/origin/new`)}
            disabled={systemState.loading}
          />
        }
      >
        Origems
      </AppTitle>

      <AppDivider />

      <FormSearch
        getItems={getItems}
        search={pageState.search}
        onChangeSearch={onChangeSearch}
        resetSearch={resetSearch}
      />

      <Table
        getItems={getItems}
        items={pageState.items}
        onChangeSearch={onChangeSearch}
        search={{
          limit: Number(pageState.search._limit),
          page: Number(pageState.search.page),
          total: Number(pageState.total),
        }}
      />
    </>
  )
}

export const settingsFinanceOriginServerSideProps = async (ctx: ContextSSR) => {
  const user = $cookie.getUser({ ctx })

  const searchKey = `originSearch.${user?.id}`

  const searchCookie = ($cookie.getSearchPage<Partial<FinanceOriginFormSearchFields>>({ ctx, searchKey }) || searchDefault)

  const search: FinanceOriginFormSearchFields = {
    ...searchDefault,
    ...searchCookie
  }

  const { code, data } = await api.financeOrigin({ ctx }).page({ search })

  return {
    props: {
      unauthenticated: code === 401,
      data,
      searchKey,
      search
    }
  }
}