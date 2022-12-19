import React, { useCallback, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import api from '@/services/api'
import useLayoutStore from '@/hooks/useLayoutStore'
import { formValidate } from '@/validation/formValidate'
import { AppInput, AppSelect } from '../base'
import { enableContent } from '@/content/enable.content'
import { FinanceWallet } from '@/types/entities/FinanceWallet'

const initialFields = {
  id: null,
  description: '',
  json: '',
  enable: 1,
  panel: 0
}
const rule = {
  description: { required: 'Campo obrigatório' },
}

export const FinanceWalletForm = React.forwardRef(({ }, ref) => {
  const route = useRouter()
  const { state, startLoading, endLoading } = useLayoutStore()
  const { fields, setFields, errors, register, handleSubmit, onChangeField, onResetFields, onClearFields } = formValidate<FinanceWallet>(initialFields, rule)

  const currentId = useMemo<number | null>(() => {
    const id = Number(route.query.id)
    const hasId = Number.isInteger(id)
    return hasId ? id : null
  }, [])

  const getId = useCallback(async () => {
    startLoading()

    const { status, data, message } = await api.settings.wallet.id({ id: Number(currentId) })

    endLoading()

    if (!status) {
      console.log('ERROR', message)
      return
    }

    setFields({
      id: data.id,
      description: data.description,
      enable: data.enable,
      panel: data.panel,
    })
  }, [])

  const handleCreate = async () => {
    startLoading()

    const { status, data, message } = await api.settings.wallet.post({
      description: fields.description
    })

    endLoading()

    if (!status) {
      console.log('ERROR', message)
      return
    }

    setFields({
      id: data.id,
      description: data.description,
      enable: data.enable,
      panel: data.panel,
    })
  }
  const handleUpdate = async () => {
    startLoading()

    const { status, data, message } = await api.settings.wallet.put({
      id: Number(fields.id),
      description: fields.description,
      enable: fields.enable,
      panel: fields.panel,
      json: JSON.stringify({}) //JSON.stringify(fields.json),
    })

    endLoading()
  }
  const handleDelete = async () => {
    const confirm = window.confirm('Deseja mesmo excluir?')

    if (confirm) {

      console.log('fazer o delete')

      // startLoading()

      // const { status, data, message } = await api.settings.wallet.del(fields.id)

      // endLoading()

      // if (!status) {
      //   console.log('ERROR', message)
      //   return
      // }
    }
  }
  const onSubmit = async () => {
    fields.id
      ? await handleUpdate()
      : await handleCreate()
  }

  React.useImperativeHandle(ref, () => ({
    resetForm: onResetFields,
    clearForm: onClearFields,
    delete: handleDelete,
    submit: onSubmit
  }))

  useEffect(() => {
    const currentId = Number(route.query.id)
    const hasId = Number.isInteger(currentId)
    hasId && getId()
  }, [])

  return (
    <form
      id="settings-finance-wallet-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="row row-cols-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 mb-2 px-2">
        <AppInput
          label="Descrição"
          type="text"
          {...register("description", rule.description)}
          value={fields.description}
          onChange={($event) => onChangeField([
            { key: 'description', value: $event?.target.value }
          ])}
          error={errors?.description?.message}
          disabled={state.loading}
        />

        <AppSelect
          label="Status"
          {...register("enable", {})}
          value={fields.enable}
          onChange={($event) => onChangeField([
            { key: 'enable', value: $event?.target.value }
          ])}
          error={errors?.enable?.message}
          disabled={state.loading}
        >
          {enableContent.map(({ value, label, ...rest }) => <option key={value} value={value} {...rest}>{label}</option>)}
        </AppSelect>

        <AppSelect
          label="Painel"
          {...register("panel", {})}
          value={fields.panel}
          onChange={($event) => onChangeField([
            { key: 'panel', value: $event?.target.value }
          ])}
          error={errors?.panel?.message}
          disabled={state.loading}
        >
          {enableContent.map(({ value, label, ...rest }) => <option key={value} value={value} {...rest}>{label}</option>)}
        </AppSelect>
      </div>
    </form>
  )
})