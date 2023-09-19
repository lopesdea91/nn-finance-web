import React from 'react'
import { observerKey } from '@/@core/domain/observerKey';
import { TitleSection } from '@/@core/presentation/shared/pages';
import { PageProps } from './FinanceWalletListPage.type'
import { SearchWallet, TableWallet } from './components';

export const FinanceWalletListPage = (props: PageProps) => {

  React.useEffect(() => {
    observerKey.publish('tableWallet', props.items)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <TitleSection>Carteiras</TitleSection>
      <SearchWallet />
      <TableWallet />
    </>
  )
}

FinanceWalletListPage.layout = 'settings'