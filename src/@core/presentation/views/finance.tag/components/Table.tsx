import React from 'react'
import { Table, Widget } from '@/@core/presentation/shared/components'
import { Icon } from '@/@core/presentation/shared/ui'
import { redirectObserver, observer } from '@/@core/domain/observer'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { IFinanceTag } from '@/@core/domain/entities/finance-tag'
import { observerKey } from '@/@core/domain/observerKey'

export const TableTag: React.FC = () => {
  const [tags, setTags] = React.useState<IFinanceTag[]>([])

  React.useEffect(() => {
    let tableTagDown: Function

    observerKey.subscribe('tableTag', setTags).then(down => tableTagDown = down)

    return () => {
      tableTagDown()
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
          {tags.map(tag => (
            <Table.BodyRow key={tag.id}>
              <Table.BodyCell>
                <button
                  className='flex justify-center'
                  onClick={() => observer.publish(redirectObserver(`/finance/tag/${tag.id}`))}
                  data-testid={`row-${tag.id}`}
                >
                  <Icon icon={faPenToSquare} className='w-6' />
                </button>
              </Table.BodyCell>
              <Table.BodyCell className="truncate">{tag.description}</Table.BodyCell>
              <Table.BodyCell className="truncate">{tag?.type?.description}</Table.BodyCell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table.Root>
    </Widget.Root>
  )
}
