import { useEffect, useRef } from 'react';
import Router, { useRouter } from 'next/router'
import { AppButtonIcon, AppTitle } from "@/components/base";
import { PageFinanceExtractStore, SystemStore } from '@/store/hook';
import { FinanceItem } from '@/types/entities/finance-item';
import { FinanceExtractFormSearchFields } from "@/types/form/financeExtract";
import { ContextSSR } from '@/types/system';
import { $cookie } from '@/utils';
import { FinanceExtractFormSearch } from "./components/FinanceExtractFormSearch";
import { FinanceExtractTable } from './components/FinanceExtractTable';
import { ApiPageResponse } from '@/services/api';
import { FinanceExtractMethods } from './index.methods';
import { http } from '@/@core/infra/http';
import { Section } from '@/layouts/LayoutPrivate/components';
import { cookiesName } from '@/constants';
import { useTitlePage } from '@/hooks';

const searchDefault: FinanceExtractFormSearchFields = {
  _limit: 15,
  _q: '',
  page: 1,
  enable: 1,
  status_id: null,
  type_id: null,
  origin_id: null,
  wallet_id: null,
  tag_ids: [],
  period: '',
  type_preveiw: 'extract'
}

type Props = {
  unauthenticated: boolean
  data: ApiPageResponse<FinanceItem>
  search: Partial<FinanceExtractFormSearchFields>
}
export const FinanceExtractPage = (props: Props) => {
  useTitlePage('Finança extrato')

  const isMounted = useRef(false)
  const router = useRouter()
  const systemStore = SystemStore()
  const pageFinanceExtractStore = PageFinanceExtractStore()

  const { getItems, onChangeSearch, resetSearch } = FinanceExtractMethods()

  useEffect(() => {
    if (isMounted.current) {
      getItems()
    } else {
      pageFinanceExtractStore.setSearch(props.search)

      pageFinanceExtractStore.setList({
        items: props.data.items,
        total: props.data.total,
        lastPage: props.data.lastPage,
      })
    }
    return () => {
      isMounted.current = true
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemStore.state.period, systemStore.state.walletPanelId])

  if (props.unauthenticated) {
    router.push('/auth/sign-in')
    return null
  }

  return (
    <>
      <AppTitle
        variant="h5"
        contentEnd={
          <AppButtonIcon
            variant="new"
            onClick={() => Router.push(`/finance/item/new`)}
          />
        }
      >
        Extrato
      </AppTitle>

      <Section className='listing'>
        <FinanceExtractFormSearch
          getItems={getItems}
          search={pageFinanceExtractStore.state.search}
          onChangeSearch={onChangeSearch}
          resetSearch={resetSearch}
        />

        <FinanceExtractTable
          getItems={getItems}
          items={pageFinanceExtractStore.state.items}
          onChangeSearch={onChangeSearch}
          search={{
            limit: Number(pageFinanceExtractStore.state.search._limit),
            page: Number(pageFinanceExtractStore.state.search.page),
            total: Number(pageFinanceExtractStore.state.total),
          }}
        />
      </Section>
    </>
  )
}

export const FinanceExtractGetServerSideProps = async (ctx: ContextSSR) => {
  const period = $cookie.getPeriod({ ctx })
  const walletPanelId = $cookie.getWalletPanelId({ ctx })

  const searchCookie = $cookie.getSearchPage<FinanceExtractFormSearchFields>({ ctx, searchKey: cookiesName.financeExtractSearch })

  const search: Partial<FinanceExtractFormSearchFields> = {
    ...searchDefault,
    ...searchCookie,
    period,
    wallet_id: walletPanelId
  }

  const token = $cookie.getToken({ ctx })

  http.setToken(token)

  const { code, data } = await http.financeItem.page(search)

  return {
    props: {
      unauthenticated: code === 401,
      data,
      search
    }
  }
}