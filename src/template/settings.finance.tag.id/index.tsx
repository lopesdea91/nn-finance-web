import React, { useEffect } from 'react'
import { AppButtonGroup, AppButtonIcon, AppDivider, AppTitle } from '@/components/base'
import { useForm } from '@/hooks/useForm'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import { api } from '@/services/api'
import { FinanceTag } from '@/types/entities/finance-tag'
import { FinanceTypeId } from '@/types/enum'
import { FinanceTagFormFields } from '@/types/form/settingsFinanceTag'
import { useRouter } from 'next/router'
import { ContextSSR } from '@/types/system'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { actionsFinanceSlice } from '@/store/features/finance'
import { Form } from './components/Form'

const sortDataGet = (a: FinanceTag, b: FinanceTag) => {
  return a.description < b.description ? -1 : a.description > b.description ? 1 : 0
}
const defaultFields: FinanceTagFormFields = {
  id: null,
  description: '',
  enable: 1,
  typeId: null,
  // type: FinanceType
  walletId: null,
  // wallet: FinanceWalletShort
  // createdAt: string
  // updatedAt: string
}

type PageProps = {
  unauthenticated: boolean
  data: FinanceTagFormFields
}
export const SettingsFinanceTagIdPage = (props: PageProps) => {
  const { systemState } = useAppSelector(e => ({
    systemState: e.system
  }))

  const { loadingStart, loadingEnd } = useStoreSystem()
  const { fields, errors, onChangeField, onResetFields, onClearFields } = useForm(
    props.data,
    {}
  )

  const route = useRouter()
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

    const { data } = await api.financeTag().get({
      search: {
        enable: 1
      }
    })

    if (data)
      dispatch(actionsFinanceSlice.setTag(data.sort(sortDataGet)))

    // toast.addToast({
    //   message: `Carteira ${id ? 'atualizada' : 'criada'} com sucesso!`,
    //   type: 'success'
    // })

    route.push('/settings/finance/tag')
  }
  const handleCreate = async () => {
    return await api.financeTag().post({
      form: {
        // id: +fields.id,
        description: fields.description,
        enable: fields.enable,
        type_id: Number(fields.typeId) as FinanceTypeId,
        wallet_id: fields.walletId,
      }
    })
  }
  const handleUpdate = async () => {
    return await api.financeTag().put({
      id: Number(fields.id),
      form: {
        description: fields.description,
        enable: fields.enable,
        type_id: Number(fields.typeId) as FinanceTypeId,
        wallet_id: fields.walletId,
      }
    })
  }
  const handleDelete = async () => {
    const confirm = window.confirm('ao confirmar será excluido permanente! deseja continuar?')

    if (confirm) {
      try {
        await api.financeTag().remove({
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
            Tag: <u>{fields.description}</u>
          </>
        ) : (
          <>
            Nova tag
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

export const SettingsFinanceTagIdServerSideProps = async (ctx: ContextSSR) => {
  let data: FinanceTagFormFields = defaultFields

  const isNew = ctx.query.id === 'new'
  if (isNew) {
    return {
      props: {
        unauthenticated: false,
        data
      }
    }
  }

  const result = await api.financeTag({ ctx }).id({ id: Number(ctx.query.id) })

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
    typeId: result.data.type?.id as FinanceTypeId || null,
    walletId: result.data.wallet?.id || null
  }

  return {
    props: {
      unauthenticated: result.code === 401,
      data
    }
  }
}
