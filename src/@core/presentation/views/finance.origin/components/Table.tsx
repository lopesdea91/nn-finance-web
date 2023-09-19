import React from 'react'
import { Table, Widget } from '@/@core/presentation/shared/components'
import { Icon } from '@/@core/presentation/shared/ui'
import { redirectObserver, observer } from '@/@core/domain/observer'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { IFinanceOrigin } from '@/@core/domain/entities/finance-origin'
import { observerKey } from '@/@core/domain/observerKey'

export const TableOrigin: React.FC = () => {
  const [origins, setOrigin] = React.useState<IFinanceOrigin[]>([])

  React.useEffect(() => {
    let tableOriginDown: Function

    observerKey.subscribe('tableOrigin', setOrigin).then(down => tableOriginDown = down)

    return () => {
      tableOriginDown()
    }
  }, [])

  return (
    <Widget.Root className='min-h-[240px] rounded-t-none'>
      <Table.Root>
        <Table.Head>
          <Table.HeadRow>
            <Table.HeadCell className='w-6 text-center'>-</Table.HeadCell>
            <Table.HeadCell>Descrição</Table.HeadCell>
            <Table.HeadCell>Tipo</Table.HeadCell>
          </Table.HeadRow>
        </Table.Head>
        <Table.Body>
          {origins.map(origin => (
            <Table.BodyRow key={origin.id}>
              <Table.BodyCell>
                <button
                  className='flex justify-center'
                  onClick={() => observer.publish(redirectObserver(`/finance/origin/${origin.id}`))}
                  data-testid={`row-${origin.id}`}
                >
                  <Icon icon={faPenToSquare} className='w-6' />
                </button>
              </Table.BodyCell>
              <Table.BodyCell className="truncate">{origin.description}</Table.BodyCell>
              <Table.BodyCell className="truncate">{origin?.type?.description}</Table.BodyCell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table.Root>
    </Widget.Root>
  )
}
