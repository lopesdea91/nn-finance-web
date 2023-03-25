import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { AppButtonGroup, AppButtonIcon, AppDivider, AppTitle } from '@/components/base'
import { useForm } from '@/hooks/useForm'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import { api } from '@/services/api'
import { setWallet } from '@/store/features/finance'
import { FinanceWalletFormFields } from '@/types/form/settingsFinanceWallet'
import { ContextSSR } from '@/types/system'
import { $utils } from '@/utils'
import { useAppDispatch } from '@/store/hook'
import { FinanceWallet } from '@/types/entities/finance-wallet'
import { Form } from './components/Form'

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
}
export const SettingsFinanceWalletIdPage = (props: Props) => {
  const { loading, loadingStart, loadingEnd } = useStoreSystem()
  const { fields, errors, onChangeField, onResetFields, onClearFields } = useForm<FinanceWalletFormFields>(
    props.data,
    {
      description: { required: true },
    }
  )

  const router = useRouter()
  const dispatch = useAppDispatch()

  const queryData = $utils.parseQueryUrlForm({ id: router.query.id, copy: router.query.copy })

  const handleSubmit = async () => {
    loadingStart()

    const id = !!fields.id

    const { status } = id ? await handleUpdate() : await handleCreate()

    loadingEnd()

    if (!status) {
      // toast.addToast({
      //   message: 'algo de ruim aconteceu, tente novamente depois!',
      //   type: 'error'
      // })
      return;
    }

    const { data } = await api.financeWallet().get({
      search: {
        enable: 1
      }
    })

    if (data)
      dispatch(setWallet(data.sort(sortDataGet)))

    // toast.addToast({
    //   message: `Carteira ${id ? 'atualizada' : 'criada'} com sucesso!`,
    //   type: 'success'
    // })

    if (!queryData.isNew) {
      router.push('/settings/finance/wallet')
    }
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

  useEffect(() => {

  }, [])

  return (
    <>
      {JSON.stringify(loading)}
      <AppTitle
        variant="h5" mb={2}
        contentEnd={
          <AppButtonGroup>
            <AppButtonIcon variant="save"
              onClick={() => handleSubmit()}
              disabled={loading}
            />
            <AppButtonIcon
              variant="clean"
              onClick={() => onClearFields()}
              disabled={loading}
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
              disabled={loading}
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
        isLoading={loading}
        fields={fields}
        errors={errors}
        onSubmit={handleSubmit}
        onChangeField={onChangeField}
      />
    </>
  )
}

export const SettingsFinanceWalletIdServerSideProps = async (ctx: ContextSSR) => {
  let data: FinanceWalletFormFields = defaultFields

  const isNew = ctx.query.id === 'new'
  if (isNew) {
    return {
      props: {
        unauthenticated: false,
        data
      }
    }
  }

  const result = await api.financeWallet({ ctx }).id({ id: Number(ctx.query.id) })

  if (!result.data)
    return {
      props: {
        unauthenticated: false,
        data
      }
    }

  data = {
    id: result.data?.id,
    description: result.data?.description,
    enable: result.data?.enable,
    panel: result.data?.panel,
    json: result.data?.json,
  }

  return {
    props: {
      unauthenticated: result.code === 401,
      data
    }
  }
}
