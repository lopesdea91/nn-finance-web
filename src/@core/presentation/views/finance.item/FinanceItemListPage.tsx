import React from 'react'
import { observerKey } from '@/@core/domain/observerKey';
import { TitleSection } from '@/@core/presentation/shared/pages';;
import { PageProps } from './FinanceItemListPage.type'
import { SearchItem, TableItem } from './components'

export const FinanceItemListPage = (props: PageProps) => {

  React.useEffect(() => {
    observerKey.publish('tableItem', props.items)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <TitleSection>Extrato</TitleSection>
      <SearchItem />
      <TableItem />
    </>
  )
}

FinanceItemListPage.layout = 'dashboard'
