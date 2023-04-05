import React, { useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import { useForm } from '@/hooks/useForm'
import { api } from '@/services/api'
import { FinanceItemFormFields } from '@/types/form/financeItem'
import { AppButtonGroup, AppButtonIcon, AppDivider, AppTitle } from '@/components/base'
import { Enable, FinanceStatusId, FinanceTypeId } from '@/types/enum'
import { ContextSSR } from '@/types/system'
import { $utils } from '@/utils'
import { FinanceTagShort } from '@/types/entities/finance-tag'
import { Form } from './components/Form'
import { useAppSelector } from '@/store/hook'

const formDefault: FinanceItemFormFields = {
  id: null,
  value: 0,
  date: dayjs().format('YYYY-MM-DD'),
  obs: '',
  sort: 0,
  enable: 1,
  origin_id: null,
  status_id: 2,
  type_id: 2,
  tag_ids: [],
  wallet_id: null
}

type Props = {
  unauthenticated: boolean
  data: FinanceItemFormFields
}
export const FinanceItemPage = (pros: Props) => {
  const isMounted = useRef<boolean>(false)
  const router = useRouter()
  const { loadingPageStart, loadingPageEnd } = useStoreSystem()
  const { systemState } = useAppSelector((e) => ({
    systemState: e.system
  }))

  const { fields, errors, onChangeField, onResetFields, onClearFields, setFields, confirmDoDelete, toggleConfirmDoDelete } = useForm<FinanceItemFormFields>({
    ...formDefault,
    ...pros.data,
    wallet_id: systemState.walletPanelId,
  }, {})

  const queryData = $utils.parseQueryUrlForm({ id: router.query.id, copy: router.query.copy })

  const handleSubmit = async () => {
    loadingPageStart()

    const id = !!fields.id

    const { status } = id ? await handleUpdate() : await handleCreate()

    loadingPageEnd()

    if (status) {
      setFields({
        ...formDefault,
        date: dayjs().format('YYYY-MM-DD'),
        wallet_id: systemState.walletPanelId,
      })
    }

    // toast.addToast({
    //   message: data.message,
    //   type: status ? 'success' : 'danger'
    // })

    if (queryData.isEdit || queryData.isCopy) {
      router.push('/finance/extract')
    }
  }
  const handleCreate = async () => {
    return await api.financeItem().post({
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
    return await api.financeItem().put({
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

    loadingPageStart()

    const { status } = await api.financeItem().remove({
      id: Number(fields.id)
    })

    // toast.addToast({
    //   message: `Carteira excluida com sucesso!`,
    //   type: 'success'
    // })

    if (status) {
      router.push('/finance/extract')
      return
    }

    loadingPageEnd()
  }

  const title = useMemo(() => {
    return fields.id ? <>Item: <u>{fields.obs}</u></> : <>Novo Item</>
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields.id])

  async function getData() {
    loadingPageStart()

    const { data } = await api.financeItem().id({ id: queryData.id })

    setFields({
      id: queryData.isEdit ? data?.id : null,
      value: data?.value,
      date: data?.date,
      obs: data?.obs,
      sort: data?.sort,
      enable: data?.enable,
      tag_ids: data?.tag_ids,
      type_id: data?.type.id as FinanceTypeId,
      origin_id: data?.origin.id,
      status_id: data?.status.id,
      wallet_id: data?.wallet.id,
    })

    loadingPageEnd()
  }

  useEffect(() => {
    if (isMounted.current) {
      setFields({
        ...formDefault,
        wallet_id: systemState.walletPanelId,
      })
    }

    return () => {
      isMounted.current = true
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id, router.query.isCopy])

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

      <Form
        isLoading={systemState.loading}
        fields={fields}
        errors={errors}
        onSubmit={handleSubmit}
        onChangeField={onChangeField}
      />
    </>
  )
}


export const FinanceItemGetServerSideProps = async (ctx: ContextSSR) => {
  const { isCopy, isEdit, id } = $utils.parseQueryUrlForm({ id: ctx.query.id, copy: ctx.query.copy })

  if (isCopy || isEdit) {
    const data: FinanceItemFormFields = {
      ...formDefault,
    }

    const result = await api.financeItem({ ctx }).id({ id: id })

    if (result.status) {
      data.id = isEdit ? result.data?.id as number : null
      data.value = result.data?.value as number
      data.date = result.data?.date as string
      data.obs = result.data?.obs
      data.sort = result.data?.sort as number
      data.enable = result.data?.enable as Enable
      data.origin_id = result.data?.origin.id as number
      data.status_id = result.data?.status.id as FinanceStatusId
      data.type_id = result.data?.type.id as FinanceTypeId
      data.tag_ids = result.data?.tag_ids as FinanceTagShort[]
    }

    return {
      props: {
        unauthenticated: result.code === 401,
        data
      }
    }
  }

  return {
    props: {}
  }
}
