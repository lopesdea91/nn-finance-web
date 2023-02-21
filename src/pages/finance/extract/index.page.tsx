import Router from 'next/router'
import { AppButtonIcon, AppDivider, AppTitle } from "@/components/base";
import { FinanceExtractFormSearch } from "@/components/form/FinanceExtractFormSearch";
import { usePageListing } from "@/hooks/usePageListing";
import { useStoreFinanceExtractSearch } from "@/hooks/useStoreFinance";
import { useStoreSystem } from "@/hooks/useStoreSystem";
import { api } from "@/services/api";
import { FinanceItem } from "@/types/entities/finance-item";
import { FinanceExtractFormSearchFields } from "@/types/form/financeExtract";
import { FinanceExtractTable } from '@/components/table/FinanceExtractTable';

export default function Page() {
  const { systemState } = useStoreSystem()
  const { extractSearch, onChangeSearch } = useStoreFinanceExtractSearch()

  const { loading, getItems, items } = usePageListing<FinanceItem, FinanceExtractFormSearchFields>({
    request: api.finance.item.page,
    search: { ...extractSearch, period: systemState.period, wallet_id: systemState.walletPanelId },
    updateSearch: onChangeSearch
  }, [systemState.period, systemState.walletPanelId])

  return (
    <>
      <AppTitle
        variant="h4" mb={2}
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
        loading={loading}
        getItems={getItems}
      />

      <FinanceExtractTable
        loading={loading}
        getItems={getItems}
        items={items}
      />
    </>
  )
}