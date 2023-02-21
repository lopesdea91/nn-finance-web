import React from 'react'
import Router from 'next/router'
import { AppButtonIcon, AppDivider, AppTitle } from '@/components/base'
import { usePageListing } from '@/hooks/usePageListing'
import { api } from '@/services/api'
import { useStoreFinanceWalletSearch } from '@/hooks/useStoreFinance'
import { SettingsFinanceWalletFormSearch } from '@/components/form/SettingsFinanceWalletFormSearch'
import { SettingsFinanceWalletTable } from '@/components/table/SettingsFinanceWalletTable'
import { FinanceWallet } from '@/types/entities/finance-wallet'
import { FinanceWalletFormSearchFields } from '@/types/form/settingsFinanceWallet'

export default function Page() {
  const { walletSearch, onChangeSearch } = useStoreFinanceWalletSearch()

  const { loading, getItems, items } = usePageListing<FinanceWallet, FinanceWalletFormSearchFields>({
    request: api.finance.wallet.page,
    search: walletSearch,
    updateSearch: onChangeSearch
  })


  return (
    <>
      <AppTitle
        variant="h4" mb={2}
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

      <SettingsFinanceWalletFormSearch
        loading={loading}
        getItems={getItems}
      />

      <SettingsFinanceWalletTable
        loading={loading}
        getItems={getItems}
        items={items}
      />
    </>
  )
}
