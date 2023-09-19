import React from 'react'
import { PageProps } from './FinanceWalletIdPage.type'
import { useForm, useWatch, zod, zodResolver } from '@/@core/framework/plugins/react-hook-form';
import { IFinanceWallet } from '@/@core/domain/entities/finance-wallet';
import { observerKey } from '@/@core/domain/observerKey';
import { redirectObserver, observer } from '@/@core/domain/observer';
import { Widget } from '../../shared/components';
import { TitleSection } from '../../shared/pages';
import { Alert, Button, Icon, Input, Select } from '../../shared/ui';
import { useAppStore } from '@/@core/framework/store';
import { faBroom, faChevronLeft, faFloppyDisk, faRecycle, faRotateLeft, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { pageMethods } from './FinanceWalletIdPage.methods'
import { Loading } from '../../shared/components/loading';

export const FinanceWalletIdPage = (props: PageProps) => {
  const appStore = useAppStore()
  const { handleSubmit, errors, register, cleanFields, resetFields, resetFeedback, feedback } = useFields(props.item)

  const isEdit = !!props.item.id
  const actions = isEdit ? 'Editar' : 'Criar'

  const onDelete = () => {
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
  const consolidationMonth = (period: string) => {
    pageMethods.consolidationPeriod(period, props.item.id)
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <TitleSection>{[actions, 'carteira'].join(' ')}:</TitleSection>
        <Loading />
      </div>

      <Widget.Root className='rounded-b-none mb-1 flex flex-wrap gap-2'>
        <Button type='button' onClick={() => observer.publish(redirectObserver('/finance/wallet'))} className='px-0' title='voltar' disabled={appStore.data.loading} data-testid="button-back">
          <Icon icon={faChevronLeft} />
        </Button>
        <Button type='submit' form='formWallet' className='px-0 ' title='salvar' disabled={appStore.data.loading} data-testid="button-submit">
          <Icon icon={faFloppyDisk} />
        </Button>
        <Button type='reset' onClick={cleanFields} className='px-0 ' title='limpar formulário' disabled={appStore.data.loading} data-testid="button-clean">
          <Icon icon={faBroom} />
        </Button>
        <Button type='button' onClick={() => resetFields()} className='px-0 ' title='voltar formulário ao início' disabled={appStore.data.loading} data-testid="button-reset">
          <Icon icon={faRotateLeft} />
        </Button>
        {!props.item.trashed && (
          <Button type='button' onClick={onDelete} className='px-0 active' title='remover' disabled={appStore.data.loading} data-testid="button-delete">
            <Icon icon={faTrashCan} />
          </Button>
        )}
        {props.item.trashed && (
          <Button type='button' onClick={onRestore} className='px-0 ' title='restaurar' disabled={appStore.data.loading} data-testid="button-restore">
            <Icon icon={faRecycle} />
          </Button>
        )}
      </Widget.Root>

      <Widget.Root className='rounded-t-none mb-3 mdÇmb-5'>
        {feedback?.message && (
          <Alert.Root type={feedback.type as 'success'} className='mb-3'>
            <Alert.Text>{feedback.message}</Alert.Text>
            <button onClick={resetFeedback} className='px-2 ml-auto' data-testid="feedback-reset">
              <Icon icon={faXmark} />
            </button>
          </Alert.Root>
        )}

        <form
          id="formWallet"
          onSubmit={handleSubmit(p => pageMethods.onSubmit({
            id: p.id,
            description: p.description,
            panel: p.panel as (1 | 0)
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
              {...register('panel', {
                setValueAs: (v) => Number(v)
              })}
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
          </div>

        </form>
      </Widget.Root>

      {!isEdit ? null : (
        <>
          <TitleSection>Consolidados:</TitleSection>

          <Widget.Root>
            {props.periods.map(period => (
              <section key={period.year}>
                <Widget.Title className='mb-3'>Ano: {period.year}</Widget.Title>

                <Widget.Container className='grid-cols-6'>
                  {period.months.map(month => (
                    <Button
                      key={month.period}
                      onClick={() => consolidationMonth(month.period)}
                      title={`Mês: ${month.label}`}
                      disabled={appStore.data.loading} data-testid="button-consolidation"
                    >
                      {month.label}
                    </Button>
                  ))}
                </Widget.Container>
              </section>
            ))}
          </Widget.Root>
        </>
      )}
    </>
  )
}

FinanceWalletIdPage.layout = 'settings'


const useFields = (fieldsInitial: IFinanceWallet) => {
  const formSchema = zod.object({
    id: zod.number(),
    description: zod.string().min(6, 'A descrição deve ter no mínimo deve ter 6 caracteres'),
    panel: zod.number(),
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
    panel: fieldsInitial.panel,
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
      description: ''
    })
  }
  function resetFields() {
    reset({
      id: fieldsInitial.id as number,
      description: fieldsInitial.description,
      panel: fieldsInitial.panel,
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
