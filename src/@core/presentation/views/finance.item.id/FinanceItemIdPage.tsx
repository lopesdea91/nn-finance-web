import React from 'react'
import { PageProps } from './FinanceItemIdPage.types'
import { IFinanceItem } from '@/@core/domain/entities/finance-item';
import { FieldControlled, useForm, useWatch, zod, zodResolver } from '@/@core/framework/plugins/react-hook-form';
import { observerKey } from '@/@core/domain/observerKey';
import { redirectObserver, observer } from '@/@core/domain/observer';
import { Widget } from '../../shared/components';
import { TitleSection } from '../../shared/pages';
import { Alert, Button, Icon, Input, Select, SelectMulti, Textarea } from '../../shared/ui';
import { useAppStore, useFinanceOriginListStore, useFinanceStatusListStore, useFinanceTagListStore, useFinanceTypeListStore, useFinanceWalletListStore } from '@/@core/framework/store';
import { faChevronLeft, faFloppyDisk, faRecycle, faRotateLeft, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { pageMethods } from './FinanceItemIdPage.methods';

export const FinanceItemIdPage = (props: PageProps) => {
  const appStore = useAppStore()
  const financeStatusListStore = useFinanceStatusListStore()
  const financeOriginListStore = useFinanceOriginListStore()
  const financeWalletListStore = useFinanceWalletListStore()
  const financeTypeListStore = useFinanceTypeListStore()
  const financeTagListStore = useFinanceTagListStore()
  const {
    handleSubmit,
    errors,
    register,
    clearFields,
    resetFields,
    resetFeedback,
    control,
    feedback,
    fields
  } = useFields(props.item)

  const isEdit = !!props.item.id
  const actions = isEdit ? 'Editar' : 'Criar'


  const onRemove = () => {
    const msg = props.item.trashed
      ? 'Ao excluir não poderá recuperar os dados depois!, deseja continuar?'
      : 'Ao excluir poderá restaurar consultando a lixeira!, deseja continuar?'

    const ok = window.confirm(msg)

    if (ok) {
      pageMethods.onDelete(props.item.id as number)
    }
  }
  const onRestore = () => {
    pageMethods.onRestore(props.item.id as number)
  }

  return (
    <>
      <TitleSection>{actions} Item:</TitleSection>

      <Widget.Root className='rounded-b-none mb-1 flex flex-wrap gap-2'>
        <Button type='button' onClick={() => observer.publish(redirectObserver('/finance/item'))} className='px-0' title='voltar' disabled={appStore.data.loading}>
          <Icon icon={faChevronLeft} />
        </Button>
        <Button type='submit' form='formItem' className='px-0 ' title='salvar' disabled={appStore.data.loading}>
          <Icon icon={faFloppyDisk} />
        </Button>
        {/* 
        <Button type='reset' onClick={clearFields} className='px-0 ' title='limpar formulário' disabled={appStore.data.loading}>
          <Icon icon={faBroom} />
        </Button>
        <Button type='button' onClick={resetFields} className='px-0 ' title='voltar formulário ao início' disabled={appStore.data.loading}>
          <Icon icon={faRotateLeft} />
        </Button>
        {!props.item.trashed && (
          <Button type='button' onClick={onRemove} className='px-0 active' title='remover' disabled={appStore.data.loading}>
            <Icon icon={faTrashCan} />
          </Button>
        )}
        {props.item.trashed && (
          <Button type='button' onClick={onRestore} className='px-0 ' title='restaurar' disabled={appStore.data.loading}>
            <Icon icon={faRecycle} />
          </Button>
        )} 
        */}
      </Widget.Root>

      <Widget.Root className='rounded-t-none'>
        {feedback?.message && (
          <Alert.Root type={feedback.type as 'success'} className='mb-3'>
            <Alert.Text>{feedback.message}</Alert.Text>
            <button onClick={resetFeedback} className='px-2 ml-auto'>
              <Icon icon={faXmark} />
            </button>
          </Alert.Root>
        )}

        <form
          id="formItem"
          onSubmit={handleSubmit(p => pageMethods.onSubmit(p))}
        >
          <div className="mb-2 sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            <Select // walletId
              {...register('walletId', {
                setValueAs: (v) => v ? Number(v) : 0
              })}
              disabled={appStore.data.loading || isEdit}
              label="Carteira"
              placeholder='Selecione um carteira'
              error={errors.walletId?.message}
            >
              <option value="">Selecione</option>
              {financeWalletListStore.list.map(wallet => (
                <option key={wallet.id} value={wallet.id as number}>{wallet.description}</option>
              ))}
            </Select>

            <Select // typeId
              {...register('typeId', {
                setValueAs: (v) => v ? Number(v) : 0
              })}
              disabled={appStore.data.loading}
              label="Tipo"
              placeholder='Selecione um tipo'
              error={errors.typeId?.message}
            >
              <option value={0}>Selecione</option>
              {financeTypeListStore.list.map(type => (
                <option key={type.id} value={type.id}>{type.description}</option>
              ))}
            </Select>
          </div>

          <div className="mb-2 sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            <Input // value
              {...register('value', {
                setValueAs: (v) => v ? Number(v) : 0
              })}
              disabled={appStore.data.loading}
              label="Valor"
              placeholder='Digite um valor'
              type="number"
              error={errors.value?.message}
            />

            <Input // date
              {...register('date')}
              disabled={appStore.data.loading}
              label="Data"
              // placeholder='Digite um da'
              type="date"
              error={errors.date?.message}
            />

            <Select // statusId
              {...register('statusId', {
                setValueAs: (v) => v ? Number(v) : 0
              })}
              disabled={appStore.data.loading}
              label="Status"
              placeholder='Selecione um status'
              error={errors.statusId?.message}
            >
              <option value="">Selecione</option>
              {financeStatusListStore.list.map(status => (
                <option key={status.id} value={status.id}>{status.description}</option>
              ))}
            </Select>


            <Select // originId
              {...register('originId', {
                setValueAs: (v) => v ? Number(v) : 0
              })}
              disabled={appStore.data.loading}
              label="Origem"
              placeholder='Selecione um origem'
              error={errors.originId?.message}
            >
              <option value="">Selecione</option>
              {financeOriginListStore.list.map(origin => (
                <option key={origin.id} value={origin.id}>{origin.description}</option>
              ))}
            </Select>
          </div>

          <div className="mb-2 sm:grid grid-cols-2 gap-2">
            <div>
              <FieldControlled
                control={control}
                name="tagIds"
                render={({ field }) =>
                  <SelectMulti
                    value={field.value}
                    onChange={p => {
                      field.onChange(p)
                    }}
                    disabled={appStore.data.loading || !fields.typeId}
                    label="Tags"
                    placeholder='Selecione um tag'
                    error={errors.tagIds?.message}
                    data-testid="input-tagIds"
                    options={financeTagListStore.list.filter(e => e.typeId === fields.typeId).map(e => ({
                      id: e.id,
                      label: e.description
                    }))}
                  />
                }
              />
            </div>

            <Textarea
              {...register('obs')}
              disabled={appStore.data.loading}
              label="Observação"
              placeholder='Digite uma descrição'
              error={errors.obs?.message}
              rows={4}
            />
          </div>

          {/* 
          */}
        </form>
      </Widget.Root>
    </>
  )
}

FinanceItemIdPage.layout = 'settings'

const useFields = (fieldsInitial: IFinanceItem) => {
  const formSchema = zod.object({
    id: zod.number(),
    value: zod.number(),
    date: zod.string(),
    sort: zod.number(),
    obs: zod.string().optional(),
    originId: zod.number().min(1, 'Escolha um origem'),
    statusId: zod.number().min(1, 'Escolha um status'),
    typeId: zod.number().min(1, 'Escolha um tipo'),
    tagIds: zod.array(zod.object({
      id: zod.number(),
      label: zod.string()
    })),
    walletId: zod.number().min(1, 'Escolha uma carteira'),
    trashed: zod.number().optional(),

    feedback: zod.object({
      type: zod.string(),
      message: zod.string()
    }).optional()


  })

  type FormSchema = zod.infer<typeof formSchema>;

  const defaultValues: FormSchema = {
    id: fieldsInitial.id as number,
    value: fieldsInitial.value,
    date: fieldsInitial.date,
    sort: fieldsInitial.sort,
    obs: fieldsInitial.obs,
    originId: fieldsInitial.originId as number,
    statusId: fieldsInitial.statusId as number,
    typeId: fieldsInitial.typeId as number,
    tagIds: fieldsInitial.tagIds.map(e => ({ id: e.id, label: e.description, typeId: e.type_id })),
    walletId: fieldsInitial.walletId as number,
    trashed: !!fieldsInitial.trashed ? 1 : 0,
    feedback: {
      message: '',
      type: 'success'
    }
  }

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    register,
    reset,
    control,
    getValues
  } = useForm<FormSchema>({ defaultValues, resolver: zodResolver(formSchema) });

  const feedback = useWatch({ control, name: 'feedback' })
  const fields = useWatch({ control })

  function clearFields() {
    reset({
      id: fieldsInitial.id as number,
      value: 0,
      date: '',
      sort: fieldsInitial.sort,
      obs: fieldsInitial.obs,
      originId: 0,
      statusId: 0,
      typeId: 0,
      tagIds: [],
      walletId: fieldsInitial.walletId as number,
      trashed: !!fieldsInitial.trashed ? 1 : 0
    })
  }
  function resetFields() {
    reset({
      id: fieldsInitial.id as number,
      value: fieldsInitial.value,
      date: fieldsInitial.date,
      sort: fieldsInitial.sort,
      obs: fieldsInitial.obs,
      originId: fieldsInitial.originId as number,
      statusId: fieldsInitial.statusId as number,
      typeId: fieldsInitial.typeId as number,
      tagIds: fieldsInitial.tagIds.map(e => ({ id: e.id, label: e.description, typeId: e.type_id })),
      walletId: fieldsInitial.walletId as number,
      trashed: !!fieldsInitial.trashed ? 1 : 0
    })
  }
  function resetFeedback() {
    setValue('feedback', {
      message: '',
      type: ''
    })
  }

  React.useEffect(() => {
    let feedbackFormDown: () => void

    observerKey.subscribe('feedbackForm', (payload: { message: string, type: 'success' | 'error' }) => {
      setValue('feedback', payload)

    }).then(down => feedbackFormDown = down)

    return () => {
      feedbackFormDown()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    handleSubmit,
    errors,
    register,
    clearFields,
    resetFields,
    resetFeedback,
    control,
    feedback,
    fields
  }
}
