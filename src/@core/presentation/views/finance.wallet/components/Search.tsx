import React from 'react'
import { Widget } from '@/@core/presentation/shared/components'
import { Button, Icon, Input, Select } from '@/@core/presentation/shared/ui'
import { useForm } from '@/@core/framework/plugins/react-hook-form'
import { financeWalletCookie } from '@/@core/infra/memory'
import { _OrderApi, _SortApi, _limitApi } from '@/types/enum'
import { faMagnifyingGlass, faPlus, faRotateLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useAppStore } from '@/@core/framework/store'
import { redirectObserver, observer } from '@/@core/domain/observer'
import { pageMethods } from '@/@core/presentation/views/finance.wallet/FinanceWalletListPage.methods'

export const SearchWallet: React.FC = () => {
  const appStore = useAppStore()
  const cookie = financeWalletCookie.get()

  const { handleSubmit, formState: { errors }, register, getValues, reset: resetValues } = useForm({
    defaultValues: {
      query: cookie?.query,
      panel: cookie?.panel
    }
  })

  async function searchForm() {
    const values = getValues() as {}
    financeWalletCookie.set(values)
    await pageMethods.getItems()
  }
  async function searchReset() {
    const values = financeWalletCookie.reset()
    resetValues(values)
    await pageMethods.getItems(values)
  }
  async function searchTrashed() {
    const values = financeWalletCookie.reset(
      !!financeWalletCookie.get()?.deleted
        ? {}
        : { deleted: 1 }
    )
    await pageMethods.getItems(values)
  }
  function add() {
    observer.publish(redirectObserver('/finance/wallet/new'))
  }

  return (
    <Widget.Root className='rounded-b-none mb-1'>
      <form onSubmit={handleSubmit(searchForm)} className='mb-2 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-2'>
        <Input
          {...register('query')}
          disabled={appStore.data.loading}
          label="Pesquisar"
          placeholder='Digite uma descrição'
          type="text"
          error={errors.query?.message}
          data-testid="input-query"
        />

        <Select
          {...register('panel')}
          disabled={appStore.data.loading}
          label="Painel"
          placeholder='Selecione se deseja ver a carteira painel'
          error={errors.panel?.message}
          data-testid="input-panel"
        >
          <option value="">Selecione</option>
          <option value="1">Ativo</option>
          <option value="0">Inativo</option>
        </Select>
      </form>

      <div className='flex flex-wrap gap-1'>
        <Button type='button' onClick={searchForm} className='px-0' disabled={appStore.data.loading} title='pesquisar' data-testid="button-search">
          <Icon icon={faMagnifyingGlass} className='w-8' />
        </Button>
        <Button type='button' onClick={searchReset} className='px-0' disabled={appStore.data.loading} title='resetar pesquisa' data-testid="button-reset">
          <Icon icon={faRotateLeft} className='w-8' />
        </Button>
        <Button type='button' onClick={searchTrashed} className='px-0' disabled={appStore.data.loading} title='pesquisar por excluídos' data-testid="button-trashed" data-active={!!cookie?.deleted}>
          <Icon icon={faTrashCan} className='w-8' />
        </Button>
        <Button type='button' onClick={add} className='px-0' title='pesquisar por excluídos' data-testid="button-add">
          <Icon icon={faPlus} className='w-8' />
        </Button>
      </div>
    </Widget.Root>
  )
}