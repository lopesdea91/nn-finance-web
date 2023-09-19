import React from 'react'
import { observerKey } from '@/@core/domain/observerKey';
import { TitleSection } from '@/@core/presentation/shared/pages';;
import { PageProps } from './FinanceOriginListPage.type'
import { SearchOrigin, TableOrigin } from './components'

export const FinanceOriginListPage = (props: PageProps) => {

  React.useEffect(() => {
    observerKey.publish('tableOrigin', props.items)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <TitleSection>Origens</TitleSection>
      <SearchOrigin />
      <TableOrigin />
    </>
  )
}

FinanceOriginListPage.layout = 'settings'