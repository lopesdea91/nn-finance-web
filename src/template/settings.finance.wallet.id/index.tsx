import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { AppButtonGroup, AppButtonIcon, AppDivider, AppTitle } from '@/components/base'
import { useForm } from '@/hooks/useForm'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import { api } from '@/services/api'
import { actionsFinanceSlice } from '@/store/features/finance'
import { FinanceWalletFormFields } from '@/types/form/settingsFinanceWallet'
import { ContextSSR } from '@/types/system'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { FinanceWallet, FinanceWalletPeriodsData } from '@/types/entities/finance-wallet'
import { Form } from './components/Form'
import { ConsolidateLabels } from './components/ConsolidateLabels'
import { ConsolidateLabel } from './components/ConsolidateLabel'

const sortDataGet = (a: FinanceWallet, b: FinanceWallet) => {
  return a.description < b.description ? -1 : a.description > b.description ? 1 : 0
}

const defaultFields: FinanceWalletFormFields = {
  id: null,
  description: '',
  enable: 1,
  panel: 0,
  json: {},
}

type Props = {
  unauthenticated: boolean
  data: FinanceWalletFormFields
  periodsData: FinanceWalletPeriodsData[]
}
export const SettingsFinanceWalletIdPage = (props: Props) => {
  const { systemState } = useAppSelector(e => ({
    systemState: e.system
  }))
  const { loadingStart, loadingEnd } = useStoreSystem()
  const { fields, errors, onChangeField, onResetFields, onClearFields } = useForm<FinanceWalletFormFields>(
    props.data,
    {
      description: { required: true },
    }
  )

  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleSubmit = async () => {
    loadingStart()

    const id = !!fields.id

    const { status } = id ? await handleUpdate() : await handleCreate()


    if (!status) {
      // toast.addToast({
      //   message: 'algo de ruim aconteceu, tente novamente depois!',
      //   type: 'error'
      // })
      loadingEnd()
      return;
    }

    const { data } = await api.financeWallet().get({
      search: {
        enable: 1
      }
    })

    if (data)
      dispatch(actionsFinanceSlice.setWallet(data.sort(sortDataGet)))

    // toast.addToast({
    //   message: `Carteira ${id ? 'atualizada' : 'criada'} com sucesso!`,
    //   type: 'success'
    // })

    router.push('/settings/finance/wallet')
  }
  const handleCreate = async () => {
    return await api.financeWallet().post({
      form: {
        // id: +fields.id,
        description: fields.description,
        // enable: fields.enable,
        // panel: fields.panel,
      }
    })
  }
  const handleUpdate = async () => {
    return await api.financeWallet().put({
      id: Number(fields.id),
      form: {
        description: fields.description,
        enable: fields.enable,
        panel: fields.panel,
        json: JSON.stringify(fields.json),
      }
    })
  }
  const handleDelete = async () => {
    const confirm = window.confirm('ao confirmar será excluido permanente! deseja continuar?')

    if (confirm) {
      try {
        await api.financeWallet().remove({
          id: Number(fields.id)
        })

        // toast.addToast({
        //   message: `Carteira excluida com sucesso!`,
        //   type: 'success'
        // })
      } catch (error) {
        // toast.addToast({
        //   message: 'algo de ruim aconteceu, tente novamente depois!',
        //   type: 'error'
        // })
      }
    }
  }
  // const teste = () => {
  // const resultPeriodData = await api.financeWallet().periodsData({ wallet_id: Number(ctx.query.id), format: 'group-periods' })
  // }

  useEffect(() => {
    return () => {
      loadingEnd()
    }
  }, [])

  return (
    <>
      <AppTitle
        variant="h5" mb={2}
        contentEnd={
          <AppButtonGroup>
            <AppButtonIcon variant="save"
              onClick={() => handleSubmit()}
              disabled={systemState.loading}
            />
            <AppButtonIcon
              variant="clean"
              onClick={() => onClearFields()}
              disabled={systemState.loading}
            />
            <AppButtonIcon
              color="error"
              variant="remove"
              onClick={() => handleDelete()}
              disabled
            />
            <AppButtonIcon
              variant="reset"
              onClick={() => onResetFields()}
              disabled={systemState.loading}
            />
          </AppButtonGroup>
        }
      >
        {fields.id ? (
          <>
            Carteira: <u>{fields.description}</u>
          </>
        ) : (
          <>
            Nova carteira
          </>
        )}
      </AppTitle>

      <AppDivider />

      <Form
        fields={fields}
        errors={errors}
        onSubmit={handleSubmit}
        onChangeField={onChangeField}
      />

      <AppTitle
        variant="h5" mb={2}
      // contentEnd={
      //   <AppButtonGroup>
      //     <AppButtonIcon variant="save"
      //       onClick={() => teste()}
      //       disabled={systemState.loading}
      //     />
      //   </AppButtonGroup>
      // }
      >
        Consolidar Dados
      </AppTitle>

      <ConsolidateLabels>
        {props.periodsData.map((el, i) => (
          <ConsolidateLabel key={`consolidate-month-${i}`} {...el} />
        ))}
      </ConsolidateLabels>
    </>
  )
}

export const SettingsFinanceWalletIdServerSideProps = async (ctx: ContextSSR) => {
  const isNew = ctx.query.id === 'new'
  if (isNew) {
    return {
      props: {
        unauthenticated: false,
        data: defaultFields,
        periodsData: []
      }
    }
  }

  const resultId = await api.financeWallet({ ctx }).id({ id: Number(ctx.query.id) })

  const resultPeriodData = await api.financeWallet({ ctx }).periodsData({ wallet_id: Number(ctx.query.id), format: 'group-periods' })

  if (!resultId.status || !resultPeriodData.status)
    return {
      props: {
        unauthenticated: false,
        data: defaultFields,
        periodsData: []
      }
    }

  return {
    props: {
      unauthenticated: [resultId.code, resultPeriodData.code].includes(401),
      data: resultId.data,
      periodsData: resultPeriodData.data
    }
  }
}
