import React from 'react'
import Router from 'next/router'
import { AppButtonIcon, AppDivider, AppTitle } from '@/components/base'
import { usePageListing } from '@/hooks/usePageListing'
import { api } from '@/services/api'
import { useStoreFinanceTagSearch } from '@/hooks/useStoreFinance'
import { SettingsFinanceTagFormSearch } from '@/components/form/SettingsFinanceTagFormSearch'
import { FinanceTagFormSearchFields } from '@/types/form/settingsFinanceTag'
import { SettingsFinanceTagTable } from '@/components/table/SettingsFinanceTagTable'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import { FinanceTag } from '@/types/entities/finance-tag'

export default function Page() {
  const { systemState } = useStoreSystem()
  const { tagSearch, onChangeSearch } = useStoreFinanceTagSearch()

  const { loading, getItems, items } = usePageListing<FinanceTag, FinanceTagFormSearchFields>({
    request: api.finance.tag.page,
    search: { ...tagSearch, wallet_id: tagSearch.wallet_id || systemState.walletPanelId },
    updateSearch: onChangeSearch
  })

  return (
    <div>
      <AppTitle
        variant="h4" mb={2}
        contentEnd={
          <AppButtonIcon
            variant="new"
            onClick={() => Router.push(`/settings/finance/tag/new`)}
          />
        }
      >
        Tags
      </AppTitle>

      <AppDivider />

      <SettingsFinanceTagFormSearch
        loading={loading}
        getItems={getItems}
      />

      <SettingsFinanceTagTable
        loading={loading}
        getItems={getItems}
        items={items}
      />
    </div>
  )
}
