import React from 'react'
import { PageProps } from './FinanceOriginIdPage.type'
import { IFinanceOrigin } from '@/@core/domain/entities/finance-origin';
import { useForm, useWatch, zod, zodResolver } from '@/@core/framework/plugins/react-hook-form';
import { observerKey } from '@/@core/domain/observerKey';
import { redirectObserver, observer } from '@/@core/domain/observer';
import { Widget } from '../../shared/components';
import { TitleSection } from '../../shared/pages';
import { Alert, Button, Icon, Input, Select } from '../../shared/ui';
import { useAppStore, useFinanceOriginListStore, useFinanceOriginTypeListStore, useFinanceWalletListStore } from '@/@core/framework/store';
import { faBroom, faChevronLeft, faFloppyDisk, faRecycle, faRotateLeft, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { pageMethods } from './FinanceOriginIdPage.methods';

export const FinanceOriginIdPage = (props: PageProps) => {
  const appStore = useAppStore()
  const financeOriginTypeListStore = useFinanceOriginTypeListStore()
  const financeOriginListStore = useFinanceOriginListStore()
  const financeWalletListStore = useFinanceWalletListStore()
  const { handleSubmit, errors, register, cleanFields, resetFields, resetFeedback, feedback } = useFields(props.item)

  const isEdit = !!props.item.id
  const actions = isEdit ? 'Editar' : 'Criar'

  const onRemove = () => {
    const msg = 'Ao excluir poderá restaurar consultando a lixeira!, deseja continuar?'

    // const msg = props.item.trashed
    //   ? 'Ao excluir não poderá recuperar os dados depois!, deseja continuar?'
    //   : 'Ao excluir poderá restaurar consultando a lixeira!, deseja continuar?'

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
      <TitleSection>{actions} Origem:</TitleSection>

      <Widget.Root className='rounded-b-none mb-1 flex flex-wrap gap-2'>
        <Button type='button' onClick={() => observer.publish(redirectObserver('/finance/origin'))} className='px-0' title='voltar' disabled={appStore.data.loading} data-testid="button-back">
          <Icon icon={faChevronLeft} />
        </Button>
        <Button type='submit' form='formOrigin' className='px-0 ' title='salvar' disabled={appStore.data.loading} data-testid="button-submit">
          <Icon icon={faFloppyDisk} />
        </Button>
        <Button type='reset' onClick={cleanFields} className='px-0 ' title='limpar formulário' disabled={appStore.data.loading} data-testid="button-clean">
          <Icon icon={faBroom} />
        </Button>
        <Button type='button' onClick={resetFields} className='px-0 ' title='voltar formulário ao início' disabled={appStore.data.loading} data-testid="button-reset">
          <Icon icon={faRotateLeft} />
        </Button>
        {!props.item.trashed && (
          <Button type='button' onClick={onRemove} className='px-0 active' title='remover' disabled={appStore.data.loading} data-testid="button-delete">
            <Icon icon={faTrashCan} />
          </Button>
        )}
        {props.item.trashed && (
          <Button type='button' onClick={onRestore} className='px-0 ' title='restaurar' disabled={appStore.data.loading} data-testid="button-restore">
            <Icon icon={faRecycle} />
          </Button>
        )}
      </Widget.Root>

      <Widget.Root className='rounded-t-none'>
        {feedback?.message && (
          <Alert.Root type={feedback.type as 'success'} className='mb-3'>
            <Alert.Text>{feedback.message}</Alert.Text>
            <button onClick={resetFeedback} className='px-2 ml-auto' data-testid="feedback-reset">
              <Icon icon={faXmark} />
            </button>
          </Alert.Root>
        )}

        <form
          id="formOrigin"
          onSubmit={handleSubmit(p => pageMethods.onSubmit({
            id: p.id,
            description: p.description,
            typeId: p.typeId as number,
            parentId: p.parentId as number,
            walletId: p.walletId
          }))}
        >
          <div className="sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            <Input
              {...register('description')}
              disabled={appStore.data.loading}
              label="Pesquisar"
              placeholder='Digite uma descrição'
              type="text"
              error={errors.description?.message}
              data-testid="input-description"
            />

            <Select
              {...register('typeId', {
                setValueAs: (v) => Number(v)
              })}
              disabled={appStore.data.loading}
              label="Tipo"
              placeholder='Selecione um tipo'
              error={errors.typeId?.message}
              data-testid="input-typeId"
            >
              <option value={0}>Selecione</option>
              {financeOriginTypeListStore.list.map(type => (
                <option key={type.id} value={type.id}>{type.description}</option>
              ))}
            </Select>

            <Select
              {...register('parentId', {
                setValueAs: (v) => Number(v)
              })}
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
              {...register('walletId', {
                setValueAs: (v) => Number(v)
              })}
              disabled={appStore.data.loading || isEdit}
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
          </div>
        </form>
      </Widget.Root>
    </>
  )
}

FinanceOriginIdPage.layout = 'settings'

const useFields = (fieldsInitial: IFinanceOrigin) => {
  const formSchema = zod.object({
    id: zod.number(),
    description: zod.string().min(6, 'A descrição deve ter no mínimo deve ter 6 caracteres'),
    parentId: zod.union([zod.number(), zod.null()]).optional(),
    typeId: zod.number().min(1, 'Escolha um tipo'),
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
    description: fieldsInitial.description,
    parentId: fieldsInitial.parentId || null,
    typeId: fieldsInitial.typeId,
    walletId: fieldsInitial.walletId,
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
    control
  } = useForm<FormSchema>({ defaultValues, resolver: zodResolver(formSchema) });

  const feedback = useWatch({ control, name: 'feedback' })

  function cleanFields() {
    reset({
      id: fieldsInitial.id as number,
      description: '',
      parentId: null,
      typeId: 0
      // walletId: fieldsInitial.walletId,
      // trashed: fieldsInitial.trashed as number
    })
  }
  function resetFields() {
    reset({
      id: fieldsInitial.id as number,
      description: fieldsInitial.description,
      parentId: fieldsInitial.parentId,
      typeId: fieldsInitial.typeId,
      walletId: fieldsInitial.walletId,
      trashed: fieldsInitial.trashed as number
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
    cleanFields,
    resetFields,
    resetFeedback,
    feedback
  }
}
