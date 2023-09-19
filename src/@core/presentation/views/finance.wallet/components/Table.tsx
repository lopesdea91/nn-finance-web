import React from 'react'
import { Table, Widget } from '@/@core/presentation/shared/components'
import { Icon } from '@/@core/presentation/shared/ui'
import { redirectObserver, observer } from '@/@core/domain/observer'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { IFinanceWallet } from '@/@core/domain/entities/finance-wallet'
import { observerKey } from '@/@core/domain/observerKey'

export const TableWallet: React.FC = () => {
  const [wallets, setWallet] = React.useState<IFinanceWallet[]>([])

  React.useEffect(() => {
    let tableWalletDown: Function

    observerKey.subscribe('tableWallet', setWallet).then(down => tableWalletDown = down)

    return () => {
      tableWalletDown()
    }
  }, [])

  return (
    <Widget.Root className='rounded-t-none min-h-[240px]'>
      <Table.Root>
        <Table.Head>
          <Table.HeadRow>
            <Table.HeadCell className='w-6 text-center'>-</Table.HeadCell>
            <Table.HeadCell>Descrição</Table.HeadCell>
          </Table.HeadRow>
        </Table.Head>
        <Table.Body>
          {wallets.map(wallet => (
            <Table.BodyRow key={wallet.id}>
              <Table.BodyCell>
                <button
                  className='flex justify-center'
                  onClick={() => observer.publish(redirectObserver(`/finance/wallet/${wallet.id}`))}
                  data-testid={`row-${wallet.id}`}
                >
                  <Icon icon={faPenToSquare} className='w-6' />
                </button>
              </Table.BodyCell>
              <Table.BodyCell className="truncate">{wallet.description}</Table.BodyCell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table.Root>
    </Widget.Root>
  )
}
