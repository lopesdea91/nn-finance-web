import React, { useMemo } from 'react'
import { AppColumn, AppColumns, AppText } from '@/components'
import { PagePanelFinanceStore } from '@/store/hook'
import styled from '@emotion/styled'
import { containerResponsivePadding } from '@/layouts/LayoutPrivate/components/_styled'

export const SectionBalance = () => {
  const pagePanelFinance = PagePanelFinanceStore()

  pagePanelFinance.state.dataPage

  return (
    <AppColumns>
      <AppColumn xs={12} md={6} lg={5}>
        <BalanceCard />
      </AppColumn>

      <AppColumn xs={12} md={6} lg={7}>GRAFICO</AppColumn>
    </AppColumns>

  )
}

const BalanceCard = () => {
  const pagePanelFinance = PagePanelFinanceStore()

  const data = useMemo(() => {
    return [
      { title: 'Receita', value: pagePanelFinance.state.dataPage.balance.revenue, type_id: 1 },
      { title: 'Despesa', value: `-${pagePanelFinance.state.dataPage.balance.expense}`, type_id: 2 },
      { title: 'Disponivel', value: pagePanelFinance.state.dataPage.balance.available },
      { title: 'Estimado', value: pagePanelFinance.state.dataPage.balance.estimate, status_id: 3 }
    ]
  }, [pagePanelFinance.state])

  return (
    <ContainerStyled>
      {data.map(el => (
        <CardStyled key={el.title}>
          <AppText variant='body2' className='title'>{el.title}</AppText>
          <AppText variant='h4' sx={{ textAlign: 'right' }}>{el.value}</AppText>
        </CardStyled>
      ))}
    </ContainerStyled>
  )
}

const ContainerStyled = styled.div`
  max-height: 20rem;
  overflow-y: auto;
  margin-bottom: 1rem;
  padding: 0.5rem 0.25rem;
  display: grid;
  gap: 0.5rem;

  grid-template-columns: repeat( auto-fill, minmax(140px, 1fr));

  @media (min-width: 426px){
    grid-template-columns: repeat( auto-fill, minmax(175px, 1fr));
  }
`
const CardStyled = styled.div`
  background: white;
  border-radius: 0.25rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  ${containerResponsivePadding}

  
  .title {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 0.25rem;
  }
`