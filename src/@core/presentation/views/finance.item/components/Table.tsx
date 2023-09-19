import React from 'react'
import { moment } from '@/@core/framework/plugins/momentJS'
import { Table, Widget } from '@/@core/presentation/shared/components'
import { Icon } from '@/@core/presentation/shared/ui'
import { redirectObserver, observer } from '@/@core/domain/observer'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { IFinanceItem } from '@/@core/domain/entities/finance-item'
import { observerKey } from '@/@core/domain/observerKey'
import { convertNumberToCurrency } from '@/@core/utils/convertNumberToCurrence'

export const TableItem = () => {
  const [items, setitem] = React.useState<IFinanceItem[]>([])

  React.useEffect(() => {
    let tableItemDown: Function

    observerKey.subscribe('tableItem', setitem).then(down => tableItemDown = down)

    return () => {
      tableItemDown()
    }
  }, [])

  return (
    <Widget.Root className='min-h-[240px] rounded-t-none'>
      <Table.Root>
        <Table.Head>
          <Table.HeadRow>
            <Table.HeadCell className='w-6 text-center'>-</Table.HeadCell>
            <Table.HeadCell>Tipo</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Valor</Table.HeadCell>
            <Table.HeadCell>Data</Table.HeadCell>
            <Table.HeadCell>Origem</Table.HeadCell>
          </Table.HeadRow>
        </Table.Head>
        <Table.Body>
          {items.map(item => (
            <Table.BodyRow key={item.id}>
              <Table.BodyCell>
                <button
                  className='flex justify-center'
                  onClick={() => observer.publish(redirectObserver(`/finance/item/${item.id}`))}
                  data-testid={`row-${item.id}`}
                >
                  <Icon icon={faPenToSquare} className='w-6' />
                </button>
              </Table.BodyCell>
              <Table.BodyCell className="truncate">{item.type?.description}</Table.BodyCell>
              <Table.BodyCell className="truncate">{item.status?.description}</Table.BodyCell>
              <Table.BodyCell className="truncate">{convertNumberToCurrency(item.value)}</Table.BodyCell>
              <Table.BodyCell className="truncate">{moment(item.date).format('DD/MM/YYYY')}</Table.BodyCell>
              <Table.BodyCell className="truncate">{item.origin?.description}</Table.BodyCell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table.Root>
    </Widget.Root>
  )
}
