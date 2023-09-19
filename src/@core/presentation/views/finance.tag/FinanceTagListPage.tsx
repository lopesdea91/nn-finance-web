import React from 'react'
import { observerKey } from '@/@core/domain/observerKey';
import { TitleSection } from '@/@core/presentation/shared/pages';;
import { PageProps } from './FinanceTagListPage.type'
import { SearchTag, TableTag } from './components'

export const FinanceTagListPage = (props: PageProps) => {

  React.useEffect(() => {
    observerKey.publish('tableTag', props.items)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <TitleSection>Tags</TitleSection>
      <SearchTag />
      <TableTag />
    </>
  )
}

FinanceTagListPage.layout = 'settings'