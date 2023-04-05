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
  const { loadingPageStart, loadingPageEnd } = useStoreSystem()
  const dispatch = useAppDispatch()
  const { pageState, systemState } = useAppSelector(e => ({
    pageState: e.pageFinanceExtract,
    systemState: e.system
  }))

  const onChangeSearch = (values: Partial<FinanceExtractFormSearchFields>) => {
    dispatch(pageFinanceExtractSetSearch(values))

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
    dispatch(pageFinanceExtractSetSearch(searchDefault))
  }
  const getItems = async (args: { search?: Partial<FinanceExtractFormSearchFields> } = {}) => {
    loadingPageStart()

    const { data } = await api.financeItem().page({
      search: {
        ...pageState.search,
        ...args.search
      }
    })

    loadingPageEnd()

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
  }, [systemState.period, systemState.walletPanelId])

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
        getItems={getItems}
        search={pageState.search}
        onChangeSearch={onChangeSearch}
        resetSearch={resetSearch}
      />

      <FinanceExtractTable
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