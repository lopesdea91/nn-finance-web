import React from 'react'
import { TitleSection } from '../../shared/pages/TitleSection'
import { Widget } from '../../shared/components/widget'
import { Card } from '../../shared/pages/dashboard/Card'

interface DashboardFinancePageProps { }

export const DashboardFinancePage = () => {
  return (
    <div>
      <TitleSection>Balanço</TitleSection>
      <Card.List className='grid grid-cols-12 gap-2 mb-5'>
        <Card.Root className='app_bgCard app_shadow col-span-6 sm:col-span-3 xl:col-span-2 px-4 py-2'>
          <Card.Title>Receita</Card.Title>
          <Card.Value>11.922,95</Card.Value>
        </Card.Root>

        <Card.Root className='app_bgCard app_shadow col-span-6 sm:col-span-3 xl:col-span-2 px-4 py-2'>
          <Card.Title>Despesas</Card.Title>
          <Card.Value>122,95</Card.Value>
        </Card.Root>

        <Card.Root className='app_bgCard app_shadow col-span-6 sm:col-span-3 xl:col-span-2 px-4 py-2'>
          <Card.Title>Disponível</Card.Title>
          <Card.Value>922,95</Card.Value>
        </Card.Root>

        <Card.Root className='app_bgCard app_shadow col-span-6 sm:col-span-3 xl:col-span-2 px-4 py-2'>
          <Card.Title>Estimado</Card.Title>
          <Card.Value>922,95</Card.Value>
        </Card.Root>
      </Card.List>

      <TitleSection>Origens</TitleSection>
      <Card.List className='grid grid-cols-12 gap-2 mb-5'>
        <Card.Root className='app_bgCard app_shadow col-span-6 sm:col-span-3 xl:col-span-2 px-4 py-2'>
          <Card.Title>Inter Corrente</Card.Title>
          <Card.Value>1.622,95</Card.Value>
        </Card.Root>

        <Card.Root className='app_bgCard app_shadow col-span-6 sm:col-span-3 xl:col-span-2 px-4 py-2'>
          <Card.Title>Sodexo Aliment.</Card.Title>
          <Card.Value>834,95</Card.Value>
        </Card.Root>

        <Card.Root className='app_bgCard app_shadow col-span-6 sm:col-span-3 xl:col-span-2 px-4 py-2'>
          <Card.Title>Sodexo Refeição</Card.Title>
          <Card.Value>94,95</Card.Value>
        </Card.Root>

        <Card.Root className='app_bgCard app_shadow col-span-6 sm:col-span-3 xl:col-span-2 px-4 py-2'>
          <Card.Title>Itau Corrente</Card.Title>
          <Card.Value>973,95</Card.Value>
        </Card.Root>

        <Card.Root className='app_bgCard app_shadow col-span-6 sm:col-span-3 xl:col-span-2 px-4 py-2'>
          <Card.Title>Caixa Corrente</Card.Title>
          <Card.Value>6,95</Card.Value>
        </Card.Root>

        <Card.Root className='app_bgCard app_shadow col-span-6 sm:col-span-3 xl:col-span-2 px-4 py-2'>
          <Card.Title>Sodexo Aliment.</Card.Title>
          <Card.Value>834,95</Card.Value>
        </Card.Root>
      </Card.List>

      <TitleSection>Faturas</TitleSection>
      <Card.List className='grid grid-cols-12 gap-2 mb-5'>
        <Card.Root className='app_bgCard app_shadow col-span-6 sm:col-span-3 xl:col-span-2 px-4 py-2'>
          <Card.Title>Inter Crédito</Card.Title>
          <Card.Value>149.99</Card.Value>
        </Card.Root>
      </Card.List>

      <TitleSection>Faturas</TitleSection>
      <Widget.Container className='grid grid-cols-12 mb-5'>
        <Widget.Root className='col-span-6 sm:col-span-3 xl:col-span-2 px-4 py-2'>
          <Card.Title>Inter Crédito</Card.Title>
          <Card.Value>149.99</Card.Value>
        </Widget.Root>
      </Widget.Container>

      <TitleSection>Composição</TitleSection>
      <Widget.Container className='grid grid-cols-12 mb-5'>
        <Widget.Root className='col-span-12 sm:col-span-6 h-[240px]'>
          <Widget.Title>Mês</Widget.Title>
          tabela
        </Widget.Root>
        <Widget.Root className='col-span-12 sm:col-span-6 h-[240px]'>
          <Widget.Title>Meta</Widget.Title>
          tabela
        </Widget.Root>
      </Widget.Container>
    </div>
  )
}

DashboardFinancePage.layout = 'dashboard'

export const DashboardFinancePageSSR = async () => {
}