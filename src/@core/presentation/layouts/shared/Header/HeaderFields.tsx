import React from 'react'
import { Input, Icon, Select } from '@/@core/presentation/shared/ui'
import { faCalendarAlt, faChevronLeft, faChevronRight, faClose, faWallet } from '@fortawesome/free-solid-svg-icons'
import { useAppStore, useFinanceWalletListStore, useSystemStore } from '@/@core/framework/store'
import { moment } from '@/@core/framework/plugins/momentJS'
import { observer } from '@/@core/domain/observer'
import { systemFinanceWalletIdObserver, systemPeriodObserver } from '@/@core/domain/observer/SystemObserver'
import { useTeleportHook } from '@/@core/framework/hook'
import { Modal } from '../Modal'

export const HeaderFields: React.FC = () => {
  const teleportHook = useTeleportHook()
  const systemStore = useSystemStore()
  const FinanceWalletListStore = useFinanceWalletListStore()
  const appStore = useAppStore()

  function closeModal() {
    teleportHook.removeTeleport({ type: 'modal' })
  }

  /** methods PERIOD */
  function changeMonth(value: string) {
    observer.publish(systemPeriodObserver(value))
  }
  function openInputMonth() {
    teleportHook.addTeleport({
      type: 'modal',
      el: (
        <Modal.Root>
          <Modal.Header>
            <button
              className='ml-auto flex text-xs text-gray-800 dark:text-zinc-200 p-2 rounded'
              onClick={closeModal}
            >
              <Icon icon={faClose} className='text-xs m-auto' />
            </button>
          </Modal.Header>

          <Modal.Body>
            <Input
              label='Periodo'
              type='month'
              className='p-1 rounded-none bg-transparent text-sm text-gray-800 dark:text-zinc-200'
              value={systemStore.data.period}
              onChange={e => {
                changeMonth(e.target.value)
                closeModal()
              }}
            />
          </Modal.Body>
        </Modal.Root>

      )
    })
  }
  function PreviewMonth() {
    observer.publish(systemPeriodObserver(moment(`${systemStore.data.period}-15`).subtract(1, 'month').format('YYYY-MM')))
  }
  function NextMonth() {
    observer.publish(systemPeriodObserver(moment(`${systemStore.data.period}-15`).add(1, 'month').format('YYYY-MM')))
  }

  /** methods financeWalletId */
  function changeFinanceWalletId(value: string) {
    observer.publish(systemFinanceWalletIdObserver(Number(value)))
  }
  function openInputFinanceWalletId() {
    teleportHook.addTeleport({
      type: 'modal',
      el: (
        <Modal.Root>
          <Modal.Header>
            <button
              className='ml-auto flex text-xs text-gray-800 dark:text-zinc-200 p-2 rounded'
              onClick={closeModal}
            >
              <Icon icon={faClose} className='text-xs m-auto' />
            </button>
          </Modal.Header>

          <Modal.Body>
            <Select
              label='Carteira de finanças'
              className='p-1 rounded-none bg-transparent text-sm text-gray-800 dark:text-zinc-200'
              value={String(systemStore.data.financeWalletId)}
              onChange={e => {
                changeFinanceWalletId(e.target.value)
                closeModal()
              }}
            >
              {FinanceWalletListStore.list.map(wallet => (
                <option key={wallet.id} value={wallet.id as number}>{wallet.description}</option>
              ))}
            </Select>
          </Modal.Body>
        </Modal.Root>
      )
    })
  }

  return (
    <div className='flex items-center gap-2 mr-auto'>
      {/* input-period */}
      <div className='flex items-center gap-1 md:gap-0 md:items-end md:bg-transparent md:rounded-none'>
        <button
          className='flex text-xs text-gray-800 dark:text-zinc-200 py-2 w-6 rounded-l md:h-8 md:border-[1px] border-gray-300 dark:border-zinc-400 -mr-[1px]'
          onClick={PreviewMonth}
          disabled={appStore.data.loading}
        >
          <Icon icon={faChevronLeft} className='text-xs m-auto md:mb-0' />
        </button>

        <button
          className='flex items-center justify-center md:hidden'
          onClick={openInputMonth}
          disabled={appStore.data.loading}
        >
          <Icon icon={faCalendarAlt} />
        </button>

        <Input
          wrapper={{
            className: 'hidden md:block'
          }}
          label='Periodo'
          type='month'
          className='px-1 py-1 border-transparent rounded-none md:border-gray-300 dark:border-zinc-400 bg-transparent text-sm text-gray-800 dark:text-zinc-200 hidden md:block'
          value={systemStore.data.period}
          disabled={appStore.data.loading}
          onChange={e => changeMonth(e.target.value)}
        />

        <button
          className='flex text-xs text-gray-800 dark:text-zinc-200 py-2 w-6 rounded-r md:h-8 md:border-[1px] border-gray-300 dark:border-zinc-400 -ml-[1px]'
          onClick={NextMonth}
          disabled={appStore.data.loading}
        >
          <Icon icon={faChevronRight} className='text-xs m-auto md:mb-0' />
        </button>
      </div>

      {/* input-financeWalletId */}
      <button
        className='flex items-center justify-center md:hidden px-3 py-2'
        onClick={openInputFinanceWalletId}
        disabled={appStore.data.loading}
      >
        <Icon icon={faWallet} />
      </button>

      <Select
        wrapper={{
          className: 'hidden md:block'
        }}
        label='Carteira de finanças'
        className='px-1 py-1 border-transparent rounded md:border-gray-300 dark:border-zinc-400 bg-transparent text-sm text-gray-800 dark:text-zinc-200'
        value={String(systemStore.data.financeWalletId)}
        onChange={e => {
          changeFinanceWalletId(e.target.value)
          closeModal()
        }}
      >
        {FinanceWalletListStore.list.map(wallet => (
          <option key={wallet.id} value={wallet.id as number}>{wallet.description}</option>
        ))}
      </Select>
    </div>
  )
}