import React, { FC } from 'react'
import { moment } from '@/@core/framework/plugins/momentJS'
import { Table, Widget } from '@/@core/presentation/shared/components'
import { useHomePageContext } from '../../HomePage.context';
import { convertNumberToCurrency } from '@/@core/utils/convertNumberToCurrence';

interface FinanceItemHistoryProps { }

export const FinanceItemHistory: FC<FinanceItemHistoryProps> = () => {
  const { finance: { itemHistory } } = useHomePageContext()

  return (
    <Widget.Root className='px-1'>
      <Widget.Title className='px-2'>Ultimas alterações</Widget.Title>
      <Table.Root className='grow'>
        <Table.Head>
          <Table.HeadRow>
            <Table.HeadCell>Tipo</Table.HeadCell>
            <Table.HeadCell>Valor</Table.HeadCell>
            <Table.HeadCell>Data</Table.HeadCell>
            <Table.HeadCell>Origem</Table.HeadCell>
          </Table.HeadRow>
        </Table.Head>
        <Table.Body>
          {itemHistory.map(item => (
            <Table.BodyRow key={item.id}>
              <Table.BodyCell className="truncate">{item.type.description}</Table.BodyCell>
              <Table.BodyCell className="truncate">{convertNumberToCurrency(item.value)}</Table.BodyCell>
              <Table.BodyCell className="truncate">{moment(item.date).format('DD/MM/YYYY')}</Table.BodyCell>
              <Table.BodyCell className="truncate">{item.origin.description}</Table.BodyCell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table.Root>
    </Widget.Root>
  )
}
