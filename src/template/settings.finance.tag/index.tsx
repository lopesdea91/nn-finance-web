import React, { useEffect, useRef } from 'react'
import Router, { useRouter } from 'next/router'
import { AppButtonIcon, AppDivider, AppTitle } from '@/components/base'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import { api, ApiPageResponse } from '@/services/api'
import { pageSettingsFinanceTagSetList, pageSettingsFinanceTagSetSearch } from '@/store/feturesPage/settings.financeTag'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { FinanceTag, FinanceTagSearch } from '@/types/entities/finance-tag'
import { FinanceTagFormSearchFields } from '@/types/form/settingsFinanceTag'
import { ContextSSR } from '@/types/system'
import { $cookie } from '@/utils'
import { FormSearch } from './components/FormSearch'
import { Table } from './components/Table'

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
  searchKey: string
  search: Partial<FinanceTagFormSearchFields>
}
export const SettingsFinanceTagPage = (props: PageProps) => {

  const router = useRouter()

  if (props.unauthenticated) {
    router.push('/auth/sign-in')
    return null
  }

  const isMounted = useRef(false)
  const { loadingStart, loadingEnd } = useStoreSystem()
  const dispatch = useAppDispatch()
  const { pageState, systemState } = useAppSelector(e => ({
    pageState: e.pageSettingsFinanceTag,
    systemState: e.system
  }))

  const onChangeSearch = (values: Partial<FinanceTagSearch>) => {
    dispatch(pageSettingsFinanceTagSetSearch(values))

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
    dispatch(pageSettingsFinanceTagSetSearch(searchDefault))
  }
  const getItems = async (args: { search?: Partial<FinanceTagSearch> } = {}) => {
    loadingStart()

    const { data } = await api.financeTag().page({
      search: {
        ...pageState.search,
        ...args.search,
      }
    })

    loadingEnd()

    dispatch(pageSettingsFinanceTagSetList(data))
  }

  useEffect(() => {
    if (isMounted.current) {
      getItems()
    } else {
      dispatch(pageSettingsFinanceTagSetSearch(props.search))

      dispatch(pageSettingsFinanceTagSetList({
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
            onClick={() => Router.push(`/settings/finance/tag/new`)}
            disabled={systemState.loading}
          />
        }
      >
        Tags
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

export const SettingsFinanceTagServerSideProps = async (ctx: ContextSSR) => {
  const user = $cookie.getUser({ ctx })

  const searchKey = `tagSearch.${user?.id}`

  const searchCookie = $cookie.getSearchPage<Partial<FinanceTagFormSearchFields>>({ ctx, searchKey })

  const search: FinanceTagFormSearchFields = {
    ...searchDefault,
    ...searchCookie
  }

  const { code, data } = await api.financeTag({ ctx }).page({ search })

  return {
    props: {
      unauthenticated: code === 401,
      data,
      searchKey,
      search
    }
  }
}