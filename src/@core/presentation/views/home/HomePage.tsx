import React from 'react'
import { TitleSection } from '../../shared/pages'
import { Grid } from '../../shared/ui/Grid'
import { FinanceBalance, FinanceComposition, FinanceItemHistory, InvestmentBalance, InvestmentComposition, InvestmentMoviments } from './components'
import { PageProps } from './HomePage.types'
import { PageContextProvider } from './HomePage.context'

export const HomePage = (props: PageProps) => {
  return (
    <PageContextProvider initial={props}>
      <TitleSection>Finanças</TitleSection>

      <Grid.Root className="gap-2 grid-cols-1 sm:grid-cols-4 lg:grid-cols-6 mb-5">
        <Grid.Item className="col-span-1 sm:col-span-1 lg:col-span-1">
          <FinanceBalance />
        </Grid.Item>

        <Grid.Item className="col-span-1 sm:col-span-3 lg:col-span-2">
          <FinanceComposition monthComposition={props.finance.monthComposition} />
        </Grid.Item>

        <Grid.Item className="col-span-1 sm:col-span-4 lg:col-span-3">
          <FinanceItemHistory />
        </Grid.Item>
      </Grid.Root>

      <TitleSection>Investimento</TitleSection>

      <Grid.Root className="gap-2 grid-cols-1 sm:grid-cols-4 lg:grid-cols-6 mb-5">
        <Grid.Item className="col-span-1 sm:col-span-1 lg:col-span-1">
          <InvestmentBalance />
        </Grid.Item>

        <Grid.Item className="col-span-1 sm:col-span-3 lg:col-span-2">
          <InvestmentComposition />
        </Grid.Item>

        <Grid.Item className="col-span-1 sm:col-span-4 lg:col-span-3">
          <InvestmentMoviments />
        </Grid.Item>
      </Grid.Root>
    </PageContextProvider>
  )
}
HomePage.layout = 'dashboard'
