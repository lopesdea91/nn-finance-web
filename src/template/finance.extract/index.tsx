import { useEffect, useRef } from 'react';
import Router, { useRouter } from 'next/router'
import { AppButtonIcon, AppDivider, AppTitle } from "@/components/base";
import { useStoreSystem } from '@/hooks/useStoreSystem';
import { api, ApiPageResponse } from '@/services/api';
import { pageFinanceExtractSetSearch, pageFinanceExtractSetList } from '@/store/feturesPage/finance.extract';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { FinanceItem } from '@/types/entities/finance-item';
import { FinanceExtractFormSearchFields } from "@/types/form/financeExtract";
import { ContextSSR } from '@/types/system';
import { $cookie } from '@/utils';
import { FinanceExtractFormSearch } from "./components/FinanceExtractFormSearch";
import { FinanceExtractTable } from './components/FinanceExtractTable';

const searchDefault: FinanceExtractFormSearchFields = {
  _q: '',
  _limit: 15,
  page: 1,
  enable: 1,
  status_id: 2,
  type_id: null,
  origin_id: null,
  wallet_id: null,
  tag_ids: null,
  type_preveiw: 'extract',
  period: '',
}

type Props = {
  unauthenticated: boolean
  data: ApiPageResponse<FinanceItem>
  searchKey: string
  search: Partial<FinanceExtractFormSearchFields>
}
export const FinanceExtractPage = (props: Props) => {
  const router = useRouter()

  if (props.unauthenticated) {
    router.push('/auth/sign-in')
    return null
  }

  const isMounted = useRef(false)
  const { period, walletPanelId, loadingStart, loadingEnd } = useStoreSystem()
  const dispatch = useAppDispatch()
  const state = useAppSelector(e => e.pageFinanceExtract)

  const onChangeSearch = (values: Partial<FinanceExtractFormSearchFields>) => {
    dispatch(pageFinanceExtractSetSearch(values))

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
    dispatch(pageFinanceExtractSetSearch(searchDefault))
  }
  const getItems = async (args: { search?: Partial<FinanceExtractFormSearchFields> } = {}) => {
    loadingStart()

    const { data } = await api.financeItem().page({
      search: {
        ...state.search,
        ...args.search
      }
    })

    loadingEnd()

    dispatch(pageFinanceExtractSetList(data))
  }

  useEffect(() => {
    if (isMounted.current) {
      getItems()
    } else {
      dispatch(pageFinanceExtractSetSearch(props.search))

      dispatch(pageFinanceExtractSetList({
        items: props.data.items,
        total: props.data.total,
        lastPage: props.data.lastPage,
      }))
    }
    return () => {
      isMounted.current = true
    }
  }, [period, walletPanelId])

  return (
    <>
      <AppTitle
        variant="h5" mb={2}
        contentEnd={
          <AppButtonIcon
            variant="new"
            onClick={() => Router.push(`/finance/item/new`)}
          />
        }
      >
        Extrato
      </AppTitle>

      <AppDivider />

      <FinanceExtractFormSearch
        loading={state.loading}
        getItems={getItems}
        search={state.search}
        onChangeSearch={onChangeSearch}
        resetSearch={resetSearch}
      />

      <FinanceExtractTable
        loading={state.loading}
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

export const FinanceExtractGetServerSideProps = async (ctx: ContextSSR) => {
  const user = $cookie.getUser({ ctx })
  const period = $cookie.getPeriod({ ctx })
  const walletPanelId = $cookie.getWalletPanelId({ ctx })

  const searchKey = `financeExtract.${user.id}`

  const searchCookie = $cookie.getSearchPage<FinanceExtractFormSearchFields>({ ctx, searchKey }) ?? searchDefault

  const search: FinanceExtractFormSearchFields = {
    ...searchDefault,
    ...searchCookie,
    period,
    wallet_id: walletPanelId
  }

  const { code, data } = await api.financeItem({ ctx }).page({ search })

  return {
    props: {
      unauthenticated: code === 401,
      data,
      searchKey,
      search
    }
  }
}