import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { AppButtonGroup, AppButtonIcon, AppDivider, AppTitle } from '@/components/base'
import { useForm, } from '@/hooks/useForm'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import { api } from '@/services/api'
import { FinanceOriginFormFields } from '@/types/form/settingsFinanceOrigin'
import { ContextSSR } from '@/types/system'
import { actionsFinanceSlice } from '@/store/features/finance'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { FinanceOrigin } from '@/types/entities/finance-origin'
import { Form } from './components/Form'

const sortDataGet = (a: FinanceOrigin, b: FinanceOrigin) => {
  return a.description < b.description ? -1 : a.description > b.description ? 1 : 0
}

const defaultFields: FinanceOriginFormFields = {
  id: null,
  description: '',
  enable: 1,
  typeId: null,
  // type?: FinanceType
  walletId: null,
  // wallet?: FinanceWalletShort
  parentId: null,
  // parent?: FinanceOriginShort
}

type PageProps = {
  unauthenticated: boolean
  data: FinanceOriginFormFields
}
export const SettingsFinanceOriginIdPage = (props: PageProps) => {
  const { systemState } = useAppSelector(e => ({
    systemState: e.system
  }))

  const { loadingStart, loadingEnd } = useStoreSystem()
  const { fields, errors, onChangeField, onResetFields, onClearFields, setFields } = useForm(
    props.data,
    {}
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

    const { data } = await api.financeOrigin().get({
      search: {
        enable: 1
      }
    })

    if (data)
      dispatch(actionsFinanceSlice.setOrigin(data.sort(sortDataGet)))

    // toast.addToast({
    //   message: `Carteira ${id ? 'atualizada' : 'criada'} com sucesso!`,
    //   type: 'success'
    // })

    router.push('/settings/finance/origin')
  }
  const handleCreate = async () => {
    return await api.financeOrigin().post({
      form: {
        // id: +fields.id,
        description: fields.description,
        enable: fields.enable,
        type_id: fields.typeId,
        parent_id: fields.parentId,
        wallet_id: fields.walletId,
      }
    })
  }
  const handleUpdate = async () => {
    return await api.financeOrigin().put({
      id: Number(fields.id),
      form: {
        description: fields.description,
        enable: fields.enable,
        type_id: fields.typeId,
        parent_id: fields.parentId,
        wallet_id: fields.walletId,
      }
    })
  }
  const handleDelete = async () => {
    const confirm = window.confirm('ao confirmar será excluido permanente! deseja continuar?')

    if (confirm) {
      try {
        await api.financeOrigin().remove({
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
            Origem: <u>{fields.description}</u>
          </>
        ) : (
          <>
            Nova origem
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
    </>
  )
}

export const SettingsFinanceOriginIdServerSideProps = async (ctx: ContextSSR) => {
  let data: FinanceOriginFormFields = defaultFields

  const isNew = ctx.query.id === 'new'

  if (isNew) {
    return {
      props: {
        unauthenticated: false,
        data
      }
    }
  }

  const result = await api.financeOrigin({ ctx }).id({ id: Number(ctx.query.id) })

  if (!result.data)
    return {
      props: {
        unauthenticated: false,
        data
      }
    }

  data = {
    id: result.data.id,
    description: result.data.description,
    enable: result.data.enable,
    typeId: result.data.type?.id || null,
    parentId: result.data.parent?.id || null,
    walletId: result.data.wallet?.id || null
  }

  return {
    props: {
      unauthenticated: result.code === 401,
      data
    }
  }
}
