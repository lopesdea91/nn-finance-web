import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { AppButtonGroup, AppButtonIcon, AppDivider, AppTitle } from '@/components/base'
import { SettingsFinanceOriginForm } from '@/components/form/SettingsFinanceOriginForm'
import { useSettingsFinanceOriginForm } from '@/hooks/useForm'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import { api } from '@/services/api'
import { FinanceOrigin } from '@/types/entities/finance-origin'
import { FinanceOriginFormFieldsPost, FinanceOriginFormFieldsPut } from '@/types/form/settingsFinanceOrigin'

export default function Page() {
  const isMounted = useRef<boolean>(false)
  const router = useRouter()
  const { systemState, dispatchLoadingStart, dispatchLoadingEnd } = useStoreSystem()
  const { fields, errors, onChangeField, onResetFields, onClearFields, setFields } = useSettingsFinanceOriginForm()

  const handleSubmit = async () => {
    try {
      dispatchLoadingStart()
      const id = !!fields.id

      id ? await handleUpdate() : await handleCreate()

      // toast.addToast({
      //   message: `Carteira ${id ? 'atualizada' : 'criada'} com sucesso!`,
      //   type: 'success'
      // })

    } catch (error) {
      console.log('error', error);

      // toast.addToast({
      //   message: 'algo de ruim aconteceu, tente novamente depois!',
      //   type: 'error'
      // })
    } finally {
      dispatchLoadingEnd()
    }
  }
  const handleCreate = async () => {
    return await api.finance.origin.post<FinanceOrigin, FinanceOriginFormFieldsPost>({
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
    return await api.finance.origin.put<FinanceOrigin, FinanceOriginFormFieldsPut>({
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
        await api.finance.origin.remove({
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
    const isNew = router.query.id === 'new'

    if (isMounted.current || isNew) {
      onChangeField({
        walletId: systemState.walletPanelId
      })

      return () => {
        isMounted.current = true
      }
    }

    async function getData() {
      try {
        const { data } = await api.finance.origin.id<FinanceOrigin>({ id: Number(router.query.id) })

        setFields({
          id: data.id,
          description: data.description,
          enable: data.enable,
          typeId: data.type?.id || null,
          parentId: data.parent?.id || null,
          walletId: data.wallet?.id || null
        })
      } catch (error) {
        console.log('getData - error', error)
      }
    }
    getData()
  }, [])

  return (
    <>
      <AppTitle
        variant="h4" mb={2}
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

      <SettingsFinanceOriginForm
        isLoading={systemState.loading}
        fields={fields}
        errors={errors}
        onSubmit={handleSubmit}
        onChangeField={onChangeField}
      />
    </>
  )
}