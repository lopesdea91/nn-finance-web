import { IFinanceConsolidationMonthComposition } from '@/@core/domain/entities/finance-wallet-consolidation';
import { Table, Widget } from '@/@core/presentation/shared/components'
import React, { FC } from 'react'
import { useHomePageContext } from '../../HomePage.context';

interface FinanceCompositionProps {
  monthComposition: IFinanceConsolidationMonthComposition[];
}
export const FinanceComposition: FC<FinanceCompositionProps> = () => {
  const { finance: { monthComposition } } = useHomePageContext()

  return (
    <Widget.Root className='px-1'>
      <Widget.Title className='px-2'>Meta</Widget.Title>
      <Table.Root className='grow'>
        <Table.Head>
          <Table.HeadRow>
            <Table.HeadCell>Label</Table.HeadCell>
            <Table.HeadCell>Valor mês</Table.HeadCell>
            <Table.HeadCell>Valor meta</Table.HeadCell>
          </Table.HeadRow>
        </Table.Head>
        <Table.Body>
          {monthComposition.length > 0
            ? monthComposition.map(item => (
              <Table.BodyRow key={item.id}>
                <Table.BodyCell>{item.tagDescription}</Table.BodyCell>
                <Table.BodyCell>{item.percentageCurrent}</Table.BodyCell>
                <Table.BodyCell>{item.percentageLimit}</Table.BodyCell>
              </Table.BodyRow>
            ))
            : (
              <Table.BodyRow>
                <Table.BodyCell colSpan={3}>Lista vazia</Table.BodyCell>
              </Table.BodyRow>
            )
          }

          {/* <Table.BodyRow>
            <Table.BodyCell>Alimentação</Table.BodyCell>
            <Table.BodyCell>50.00</Table.BodyCell>
            <Table.BodyCell>25.00</Table.BodyCell>
          </Table.BodyRow>
          <Table.BodyRow>
            <Table.BodyCell>Alimentação</Table.BodyCell>
            <Table.BodyCell>50.00</Table.BodyCell>
            <Table.BodyCell>25.00</Table.BodyCell>
          </Table.BodyRow>
          <Table.BodyRow>
            <Table.BodyCell>Alimentação</Table.BodyCell>
            <Table.BodyCell>50.00</Table.BodyCell>
            <Table.BodyCell>25.00</Table.BodyCell>
          </Table.BodyRow>
          <Table.BodyRow>
            <Table.BodyCell>Alimentação</Table.BodyCell>
            <Table.BodyCell>50.00</Table.BodyCell>
            <Table.BodyCell>25.00</Table.BodyCell>
          </Table.BodyRow>
          <Table.BodyRow>
            <Table.BodyCell>Alimentação</Table.BodyCell>
            <Table.BodyCell>50.00</Table.BodyCell>
            <Table.BodyCell>25.00</Table.BodyCell>
          </Table.BodyRow> */}
        </Table.Body>
      </Table.Root>
    </Widget.Root>
  )
}
