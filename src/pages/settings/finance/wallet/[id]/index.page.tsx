import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { AppButtonGroup, AppButtonIcon, AppDivider, AppTitle } from '@/components/base'
import { SettingsFinanceWalletForm } from '@/components/form/SettingsFinanceWalletForm'
import { useSettingsFinanceWalletForm } from '@/hooks/useForm'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import { api } from '@/services/api'
import { FinanceWallet } from '@/types/entities/finance-wallet'
import { FinanceWalletFormFieldsPost, FinanceWalletFormFieldsPut } from '@/types/form/settingsFinanceWallet'

export default function Page() {
  const isMounted = useRef<boolean>(false)
  const router = useRouter()
  const { systemState, dispatchLoadingStart, dispatchLoadingEnd } = useStoreSystem()
  const { fields, errors, onChangeField, onResetFields, onClearFields, setFields } = useSettingsFinanceWalletForm()

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
    return await api.finance.wallet.post<FinanceWallet, FinanceWalletFormFieldsPost>({
      form: {
        // id: +fields.id,
        description: fields.description,
        // enable: fields.enable,
        // panel: fields.panel,
      }
    })
  }
  const handleUpdate = async () => {
    return await api.finance.wallet.put<FinanceWallet, FinanceWalletFormFieldsPut>({
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
        await api.finance.wallet.remove({
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
      if (isMounted.current) {
        return () => {
          isMounted.current = true
        }
      }
    }

    async function getData() {
      try {
        const { data } = await api.finance.wallet.id<FinanceWallet>({ id: Number(router.query.id) })
        setFields(data)
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
            Carteira: <u>{fields.description}</u>
          </>
        ) : (
          <>
            Nova carteira
          </>
        )}
      </AppTitle>

      <AppDivider />

      <SettingsFinanceWalletForm
        isLoading={systemState.loading}
        fields={fields}
        errors={errors}
        onSubmit={handleSubmit}
        onChangeField={onChangeField}
      />
    </>
  )
}
