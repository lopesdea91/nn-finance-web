import React from 'react'
import Router from 'next/router'
import { AppButtonIcon, AppDivider, AppTitle } from '@/components/base'
import { usePageListing } from '@/hooks/usePageListing'
import { api } from '@/services/api'
import { useStoreFinanceOriginSearch } from '@/hooks/useStoreFinance'
import { SettingsFinanceOriginTable } from '@/components/table/SettingsFinanceOriginTable'
import { FinanceOrigin } from '@/types/entities/finance-origin'
import { SettingsFinanceOriginFormSearch } from '@/components/form/SettingsFinanceOriginFormSearch'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import { FinanceOriginFormSearchFields } from '@/types/form/settingsFinanceOrigin'

export default function Page() {
  const { systemState } = useStoreSystem()
  const { originSearch, onChangeSearch } = useStoreFinanceOriginSearch()

  const { loading, getItems, items } = usePageListing<FinanceOrigin, FinanceOriginFormSearchFields>({
    request: api.finance.origin.page,
    search: { ...originSearch, wallet_id: originSearch.wallet_id || systemState.walletPanelId },
    updateSearch: onChangeSearch
  })

  return (
    <>
      <AppTitle
        variant="h4" mb={2}
        contentEnd={
          <AppButtonIcon
            variant="new"
            onClick={() => Router.push(`/settings/finance/origin/new`)}
          />
        }
      >
        Origems
      </AppTitle>

      <AppDivider />

      <SettingsFinanceOriginFormSearch
        loading={loading}
        getItems={getItems}
      />

      <SettingsFinanceOriginTable
        loading={loading}
        getItems={getItems}
        items={items}
      />
    </>
  )
}
