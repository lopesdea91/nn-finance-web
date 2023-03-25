import React from 'react'
import { AppButtonGroup, AppButtonIcon, AppDivider, AppTitle } from '@/components/base'
import { useForm } from '@/hooks/useForm'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import { api } from '@/services/api'
import { FinanceTag } from '@/types/entities/finance-tag'
import { FinanceTypeId } from '@/types/enum'
import { FinanceTagFormFields } from '@/types/form/settingsFinanceTag'
import { useRouter } from 'next/router'
import { ContextSSR } from '@/types/system'
import { $utils } from '@/utils'
import { useAppDispatch } from '@/store/hook'
import { setTag } from '@/store/features/finance'
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
  const { loading, loadingStart, loadingEnd } = useStoreSystem()
  const { fields, errors, onChangeField, onResetFields, onClearFields, setFields } = useForm(
    props.data,
    {}
  )

  const route = useRouter()
  const dispatch = useAppDispatch()

  const queryData = $utils.parseQueryUrlForm({ id: route.query.id, copy: route.query.copy })

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

    const { data } = await api.financeTag().get({
      search: {
        enable: 1
      }
    })

    if (data)
      dispatch(setTag(data.sort(sortDataGet)))

    // toast.addToast({
    //   message: `Carteira ${id ? 'atualizada' : 'criada'} com sucesso!`,
    //   type: 'success'
    // })

    if (!queryData.isNew) {
      route.push('/settings/finance/tag')
    }
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

  return (
    <>
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
        isLoading={loading}
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
