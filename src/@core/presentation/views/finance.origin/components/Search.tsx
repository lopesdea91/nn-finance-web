import React from 'react'
import { Widget } from '@/@core/presentation/shared/components'
import { Button, Icon, Input, Select } from '@/@core/presentation/shared/ui'
import { useForm } from '@/@core/framework/plugins/react-hook-form'
import { financeOriginCookie } from '@/@core/infra/memory'
import { _OrderApi, _SortApi, _limitApi } from '@/types/enum'
import { faMagnifyingGlass, faPlus, faRotateLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useAppStore, useFinanceOriginListStore, useFinanceOriginTypeListStore, useFinanceWalletListStore } from '@/@core/framework/store'
import { redirectObserver, observer } from '@/@core/domain/observer'
import { pageMethods } from '@/@core/presentation/views/finance.origin/FinanceOriginListPage.methods'

export const SearchOrigin = () => {
  const financeOriginTypeListStore = useFinanceOriginTypeListStore()
  const financeOriginListStore = useFinanceOriginListStore()
  const financeWalletListStore = useFinanceWalletListStore()
  const appStore = useAppStore()
  const cookie = financeOriginCookie.get()

  const { handleSubmit, formState: { errors }, register, getValues, reset: resetValues } = useForm({
    defaultValues: {
      query: cookie.query,
      typeId: cookie.typeId,
      parentId: cookie.parentId,
      walletId: cookie.walletId
    }
  })

  async function searchForm() {
    const values = getValues() as {}
    financeOriginCookie.set(values)
    await pageMethods.getItems(values)
  }
  async function searchReset() {
    const values = financeOriginCookie.reset()
    resetValues(values)
    await pageMethods.getItems(values)
  }
  async function searchTrashed() {
    const values = financeOriginCookie.reset(
      !!financeOriginCookie.get()?.deleted
        ? {}
        : { deleted: 1 }
    )
    await pageMethods.getItems(values)
  }
  function add() {
    observer.publish(redirectObserver('/finance/origin/new'))
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
          {...register('typeId')}
          disabled={appStore.data.loading}
          label="Tipo"
          placeholder='Selecione um tipo'
          error={errors.typeId?.message}
          data-testid="input-typeId"
        >
          <option value="">Selecione</option>
          {financeOriginTypeListStore.list.map(type => (
            <option key={type.id} value={type.id}>{type.description}</option>
          ))}
        </Select>

        <Select
          {...register('parentId')}
          disabled={appStore.data.loading}
          label="Parent"
          placeholder='Selecione um parent'
          error={errors.parentId?.message}
          data-testid="input-parentId"
        >
          <option value="">Selecione</option>
          {financeOriginListStore.list.map(origin => (
            <option key={origin.id} value={origin.id}>{origin.description}</option>
          ))}
        </Select>

        <Select
          {...register('walletId')}
          disabled={appStore.data.loading}
          label="Carteira"
          placeholder='Selecione um carteira'
          error={errors.walletId?.message}
          data-testid="input-walletId"
        >
          <option value="">Selecione</option>
          {financeWalletListStore.list.map(wallet => (
            <option key={wallet.id} value={wallet.id as number}>{wallet.description}</option>
          ))}
        </Select>

      </form>

      <div className='flex flex-wrap gap-2'>
        <Button type='button' onClick={searchForm} className='px-0' title='pesquisar' data-testid="button-search">
          <Icon icon={faMagnifyingGlass} className='w-8' />
        </Button>
        <Button type='button' onClick={searchReset} className='px-0' title='resetar pesquisa' data-testid="button-reset">
          <Icon icon={faRotateLeft} className='w-8' />
        </Button>
        <Button type='button' onClick={searchTrashed} className='px-0' title='pesquisar por excluídos' data-active={!!cookie.deleted} data-testid="button-trashed">
          <Icon icon={faTrashCan} className='w-8' />
        </Button>
        <Button type='button' onClick={add} className='px-0' title='pesquisar por excluídos' data-testid="button-add">
          <Icon icon={faPlus} className='w-8' />
        </Button>
      </div>
    </Widget.Root>
  )
}