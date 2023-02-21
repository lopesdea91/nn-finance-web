import React, { useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/router'
import { AppButtonGroup, AppButtonIcon, AppDivider, AppTitle } from '@/components/base'
import { useFinanceItemForm } from '@/hooks/useForm'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import { api } from '@/services/api'
import { FinanceItem } from '@/types/entities/finance-item'
import { FinanceItemFormFieldsPost, FinanceItemFormFieldsPut } from '@/types/form/financeItem'
import { FinanceItemForm } from '@/components/form/FinanceItemForm'
import { FinanceTypeId } from '@/types/enum'

export default function Page() {
  const isMounted = useRef<boolean>(false)
  const router = useRouter()
  const { systemState, dispatchLoadingStart, dispatchLoadingEnd } = useStoreSystem()
  const { fields, errors, onChangeField, onResetFields, onClearFields, setFields, confirmDoDelete, toggleConfirmDoDelete } = useFinanceItemForm()

  const queryData = useMemo(() => ({
    isNew: router.query.id === 'new',
    isEdit: router.query.id !== 'new',
    isCopy: !!router.query.copy,
    id: Number(router.query.copy || router.query.id)
  }), [router.query.id])

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
      if (!queryData.isNew) {
        router.push('/finance/extract')
        return
      }

      dispatchLoadingEnd()
    }
  }
  const handleCreate = async () => {
    return await api.finance.item.post<FinanceItem, FinanceItemFormFieldsPost>({
      form: {
        value: fields.value,
        date: fields.date,
        obs: String(fields.obs),
        sort: fields.sort,
        enable: fields.enable,
        origin_id: Number(fields.origin_id),
        status_id: fields.status_id,
        type_id: fields.type_id,
        tag_ids: fields.tag_ids.map(el => el.id),
        wallet_id: Number(fields.wallet_id),
        repeat: "UNIQUE",
      }
    })
  }
  const handleUpdate = async () => {
    return await api.finance.item.put<FinanceItem, FinanceItemFormFieldsPut>({
      id: Number(fields.id),
      form: {
        value: fields.value,
        date: fields.date,
        obs: String(fields.obs),
        sort: fields.sort,
        enable: fields.enable,
        origin_id: Number(fields.origin_id),
        status_id: fields.status_id,
        type_id: fields.type_id,
        tag_ids: fields.tag_ids.map(el => el.id),
        wallet_id: Number(fields.wallet_id),
        repeat: "UNIQUE",
      }
    })
  }
  const handleDelete = async () => {

    if (!confirmDoDelete) {
      toggleConfirmDoDelete()
      return
    }

    try {
      dispatchLoadingStart()

      await api.finance.item.remove({
        id: Number(fields.id)
      })

      router.push('/finance/extract')

      // toast.addToast({
      //   message: `Carteira excluida com sucesso!`,
      //   type: 'success'
      // })
    } catch (error) {
      dispatchLoadingEnd()
      // toast.addToast({
      //   message: 'algo de ruim aconteceu, tente novamente depois!',
      //   type: 'error'
      // })
    }
  }

  const title = useMemo(() => {
    return fields.id ? <>Item: <u>{fields.obs}</u></> : <>Novo Item</>
  }, [fields.id])

  useEffect(() => {
    if (isMounted.current || (!queryData.isEdit && !queryData.isCopy)) {
      return () => {
        isMounted.current = true
      }
    }

    async function getData() {
      try {
        dispatchLoadingStart()
        const { data } = await api.finance.item.id<FinanceItem>({ id: queryData.id })

        setFields({
          id: queryData.isEdit ? data.id : null,
          value: data.value,
          date: data.date,
          obs: data.obs,
          sort: data.sort,
          enable: data.enable,
          tag_ids: data.tag_ids,
          type_id: data.type.id as FinanceTypeId,
          origin_id: data.origin.id,
          status_id: data.status.id,
          wallet_id: data.wallet.id,
        })
      } catch (error) {
        console.log('getData - error', error)
      } finally {
        dispatchLoadingEnd()
      }
    }

    getData()
  }, [])

  useEffect(() => {
    onClearFields()
  }, [router.query.id, router.query.isCopy])

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
              variant={confirmDoDelete ? "trash" : "remove"}
              onClick={() => handleDelete()}
              disabled={systemState.loading || queryData.isNew}
            />
            <AppButtonIcon
              variant="reset"
              onClick={() => onResetFields()}
              disabled={systemState.loading || queryData.isNew}
            />
          </AppButtonGroup>
        }
      >
        {systemState.loading ? 'carregando ...' : title}
      </AppTitle>

      <AppDivider />

      <FinanceItemForm
        isLoading={systemState.loading}
        fields={fields}
        errors={errors}
        onSubmit={handleSubmit}
        onChangeField={onChangeField}
      />
    </>
  )
}
