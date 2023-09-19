import { Table, Widget } from '@/@core/presentation/shared/components'
import React, { FC } from 'react'
import { useHomePageContext } from '../../HomePage.context'

interface InvestmentCompositionProps { }
export const InvestmentComposition: FC<InvestmentCompositionProps> = ({ }) => {
  const { finance: { monthComposition } } = useHomePageContext()

  return (
    <Widget.Root className='px-1'>
      <Widget.Title className='px-2'>Diversificação</Widget.Title>

      <Table.Root className='grow'>
        <Table.Head>
          <Table.HeadRow>
            <Table.HeadCell>Label</Table.HeadCell>
            <Table.HeadCell>Valor mês</Table.HeadCell>
            <Table.HeadCell>Valor meta</Table.HeadCell>
          </Table.HeadRow>
        </Table.Head>
        <Table.Body>
          <Table.BodyRow>
            <Table.BodyCell>Alimentação</Table.BodyCell>
            <Table.BodyCell>50.00</Table.BodyCell>
            <Table.BodyCell>25.00</Table.BodyCell>
          </Table.BodyRow>
        </Table.Body>
      </Table.Root>
    </Widget.Root>
  )
}
