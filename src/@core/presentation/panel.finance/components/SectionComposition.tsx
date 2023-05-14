import React from 'react'
import { AppButtonGroup, AppButtonIcon, AppColumn, AppColumns, AppTitle, Table2 } from '@/components';
import { Section } from '@/layouts/LayoutPrivate/components';
import { PagePanelFinanceStore } from '@/store/hook'

export const SectionComposition = () => {
  const pagePanelFinance = PagePanelFinanceStore()

  function openCompositionMonth() {
    console.log('... openCompositionMonth')
  }
  function openCompositionWallet() {
    console.log('... openCompositionWallet')
  }

  return (
    <Section>
      <AppTitle
        variant="h6"
        contentEnd={
          <AppButtonGroup>
            <AppButtonIcon
              variant="file"
              onClick={openCompositionMonth}
              title="Editar composição mês"
            />
            <AppButtonIcon
              variant="fileLines"
              onClick={openCompositionWallet}
              title="Editar composição carteira"
            />
          </AppButtonGroup>
        }
      >
        Composição
      </AppTitle>

      <AppColumns>
        <AppColumn xs={12} md={6}>
          GRAFICO aspect-ratio
        </AppColumn>

        <AppColumn xs={12} md={6}>
          <Table2.Container

            contentHeader={
              <>
                <Table2.Cell>Tag</Table2.Cell>
                <Table2.Cell sx={{ textAlign: "center" }}>% Meta</Table2.Cell>
                <Table2.Cell sx={{ textAlign: "center" }}>% Mês</Table2.Cell>
                <Table2.Cell sx={{ textAlign: "center" }}>R$</Table2.Cell>
              </>
            }
            contentBody={
              pagePanelFinance.state.dataPage.composition.map(el => (
                <Table2.Row key={el.tag_id}>
                  <Table2.Cell>{el.tag_description}</Table2.Cell>
                  <Table2.Cell sx={{ textAlign: "center" }}>{el.percentage}%</Table2.Cell>
                  <Table2.Cell sx={{ textAlign: "center" }}>{el.percentage_current}%</Table2.Cell>
                  <Table2.Cell sx={{ textAlign: "center" }}>{el.value}</Table2.Cell>
                </Table2.Row>
              ))
            }
          />
        </AppColumn>
      </AppColumns>
    </Section>
  )
}
