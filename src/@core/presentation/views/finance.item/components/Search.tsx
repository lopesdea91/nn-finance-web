import React from 'react'
import { Widget } from '@/@core/presentation/shared/components'
import { Button, Icon, Input, Select, SelectMultiAsync } from '@/@core/presentation/shared/ui'
import { useForm, FieldControlled } from '@/@core/framework/plugins/react-hook-form'
import { moment } from '@/@core/framework/plugins/momentJS'
import { financeItemCookie, systemCookie } from '@/@core/infra/memory'
import { _OrderApi, _SortApi, _limitApi } from '@/types/enum'
import { faMagnifyingGlass, faPlus, faRotateLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useAppStore, useFinanceOriginListStore, useFinanceStatusListStore, useFinanceTagListStore, useFinanceTypeListStore, useFinanceWalletListStore, useSystemStore } from '@/@core/framework/store'
import { redirectObserver, observer } from '@/@core/domain/observer'
import { pageMethods } from '@/@core/presentation/views/finance.item/FinanceItemListPage.methods'
import { financeTagGatewayV1 } from '@/@core/infra/geteway'
import { http } from '@/@core/infra/http'

export const SearchItem = () => {
  const financeTypeListStore = useFinanceTypeListStore()
  const financeOriginListStore = useFinanceOriginListStore()
  const financeWalletListStore = useFinanceWalletListStore()
  const financeStatusListStore = useFinanceStatusListStore()
  const financeTagListStore = useFinanceTagListStore()
  const appStore = useAppStore()
  const systemStore = useSystemStore()
  const cookie = financeItemCookie.get()
  const isMounted = React.useRef<boolean>(false)

  const { handleSubmit, formState: { errors }, register, getValues, reset: resetValues, setValue, control } = useForm({
    defaultValues: {
      query: cookie.query,
      typeId: cookie.typeId,
      statusId: cookie.statusId,
      originId: cookie.originId,
      tagIds: cookie.tagIds,
      walletId: cookie.walletId || systemCookie.getByKey('financeWalletId'),
      minDate: cookie.minDate || moment(systemCookie.getByKey('period')).startOf('month').format('YYYY-MM-DD'),
      maxDate: cookie.maxDate || moment(systemCookie.getByKey('period')).endOf('month').format('YYYY-MM-DD'),
      order: cookie.order
    }
  })

  async function searchForm() {
    const values = getValues() as {}
    financeItemCookie.set(values)
    await pageMethods.getItems(values)
  }
  async function searchReset() {
    const values = financeItemCookie.reset({
      walletId: systemCookie.getByKey('financeWalletId') as number,
      minDate: moment(systemCookie.getByKey('period')).startOf('month').format('YYYY-MM-DD'),
      maxDate: moment(systemCookie.getByKey('period')).endOf('month').format('YYYY-MM-DD'),
      order: 'date'
    })
    resetValues(values)
    await pageMethods.getItems(values)
  }
  async function searchTrashed() {
    const values = financeItemCookie.reset(
      !!financeItemCookie.get()?.deleted
        ? {}
        : { deleted: 1 }
    )
    await pageMethods.getItems(values)
  }
  function add() {
    observer.publish(redirectObserver('/finance/item/new'))
  }

  function changePeriod() {
    systemCookie.set({
      period: systemStore.data.period
    })

    const minDateValue = moment(systemCookie.getByKey('period')).startOf('month').format('YYYY-MM-DD')
    const maxDateValue = moment(systemCookie.getByKey('period')).endOf('month').format('YYYY-MM-DD')

    financeItemCookie.set({ minDate: minDateValue, maxDate: maxDateValue })

    const values = financeItemCookie.get()

    setValue('minDate', minDateValue)
    setValue('maxDate', maxDateValue)

    pageMethods.getItems(values)

  }

  React.useEffect(() => {
    if (isMounted.current) {
      changePeriod()
    }

    return () => {
      isMounted.current = true
    }
  }, [systemStore.data.period])

  return (
    <Widget.Root className='rounded-b-none mb-1'>
      <form onSubmit={handleSubmit(searchForm)}>
        <div className='mb-2 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2'>
          <Select
            {...register('order')}
            disabled={appStore.data.loading}
            label="Ordenar por"
            placeholder='Selecione a ordenação'
            error={errors.order?.message}
            data-testid="input-order"
          >
            {/* 'id' | 'value' | 'date' | 'created' | 'updated' */}
            <option value="">Selecione</option>
            <option value="value">Valor</option>
            <option value="date">Data</option>
            <option value="created">Cadastrados</option>
            <option value="updated">Atualizados</option>
          </Select>

          <Input
            {...register('minDate')}
            disabled={appStore.data.loading}
            label="Data de"
            type="date"
            error={errors.minDate?.message}
            data-testid="input-minDate"
          />

          <Input
            {...register('maxDate')}
            disabled={appStore.data.loading}
            label="Data até"
            type="date"
            error={errors.maxDate?.message}
            data-testid="input-maxDate"
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
            {financeTypeListStore.list.map(type => (
              <option key={type.id} value={type.id}>{type.description}</option>
            ))}
          </Select>

          <Select
            {...register('statusId')}
            disabled={appStore.data.loading}
            label="Status"
            placeholder='Selecione um status'
            error={errors.statusId?.message}
            data-testid="input-statusId"
          >
            <option value="">Selecione</option>
            {financeStatusListStore.list.map(status => (
              <option key={status.id} value={status.id}>{status.description}</option>
            ))}
          </Select>

          <Select
            {...register('originId')}
            disabled={appStore.data.loading}
            label="Origem"
            placeholder='Selecione um origem'
            error={errors.originId?.message}
            data-testid="input-originId"
          >
            <option value="">Selecione</option>
            {financeOriginListStore.list.map(origen => (
              <option key={origen.id} value={origen.id}>{origen.description}</option>
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
              <option key={wallet.id} value={wallet.id}>{wallet.description}</option>
            ))}
          </Select>

          <FieldControlled
            control={control}
            defaultValue={cookie.tagIds || []}
            name="tagIds"
            render={({ field }) =>
              <SelectMultiAsync
                value={field.value}
                onChange={p => field.onChange(p)}
                disabled={appStore.data.loading}
                label="Tag"
                placeholder='Selecione um tag'
                error={errors.tagIds?.message}
                data-testid="input-tagIds"
                apiGateway={financeTagGatewayV1(http).get}
                wrapper={{
                  className: 'col-start-1 sm:col-span-2 md:col-span-3 lg:col-span-4'
                }}
              />
            }
          />

        </div>
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