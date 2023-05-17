import { http } from "@/@core/infra/http"
import { SystemStore } from "@/store/hook"
import { Enable, FinanceStatusId, FinanceTypeId } from "@/types/enum"
import { FinanceItemFormFieldsPost, FinanceItemFormFieldsPut } from "@/types/form/financeItem"
import { useRouter } from "next/router"
import { useState } from "react"
import { FormDataItemId } from "./components/Form"

export const FinanceItemMethods = () => {
  const [confirmDoDelete, setConfirmDoDelete] = useState(false)
  const router = useRouter()
  const systemStore = SystemStore()

  async function handleSubmit(fields: FormDataItemId) {
    systemStore.loadingStart()

    const id = Number(fields.id)

    const form: FinanceItemFormFieldsPost | FinanceItemFormFieldsPut = {
      enable: Number(fields.enable) as Enable,
      type_id: Number(fields.typeId) as FinanceTypeId,
      wallet_id: Number(fields.walletId),
      origin_id: +fields.originId,
      status_id: Number(fields.statusId) as FinanceStatusId,
      value: Number(fields.value),
      date: fields.date,
      sort: +fields.sort,
      tag_ids: fields.tagIds.map(el => el.id),
      obs: fields.obs,
      repeat: 'UNIQUE',
    }

    const { error } = id
      ? await handleUpdate(id, form)
      : await handleCreate(form)

    systemStore.loadingEnd()

    if (!!error) {
      // toast
      return
    }

    // if (queryData.isNew && !queryData.isCopy) {
    //   setFields({
    //     ...formDefault,
    //     date: dayjs().format('YYYY-MM-DD'),
    //     wallet_id: systemState.walletPanelId,
    //   })

    // toast.addToast({
    //   message: data.message,
    //   type: status ? 'success' : 'danger'
    // })

    // toast.addToast({
    //   message: data.message,
    //   type: status ? 'success' : 'danger'
    // })

    router.push('/finance/extract')
  }
  async function handleCreate(fields: FinanceItemFormFieldsPost) {
    return await http.financeItem.post({
      value: fields.value,
      date: fields.date,
      obs: String(fields.obs),
      sort: fields.sort,
      enable: fields.enable,
      origin_id: Number(fields.origin_id),
      status_id: fields.status_id,
      type_id: fields.type_id,
      tag_ids: fields.tag_ids,
      wallet_id: Number(fields.wallet_id),
      repeat: "UNIQUE",
    })
  }
  async function handleUpdate(id: number, fields: FinanceItemFormFieldsPut) {
    return await http.financeItem.put(
      id,
      {
        value: fields.value,
        date: fields.date,
        obs: String(fields.obs),
        sort: fields.sort,
        enable: fields.enable,
        origin_id: Number(fields.origin_id),
        status_id: fields.status_id,
        type_id: fields.type_id,
        tag_ids: fields.tag_ids,
        wallet_id: Number(fields.wallet_id),
        repeat: "UNIQUE",
      })
  }
  async function handleDelete(id: number) {
    if (!confirmDoDelete) {
      setConfirmDoDelete(p => !p)
      return
    }

    systemStore.loadingStart()

    const { error } = await http.financeItem.remove(id)

    systemStore.loadingEnd()

    if (!!error) {
      console.log('... error', error);

      return
    }

    router.push('/finance/extract')
  }

  return {
    handleSubmit,
    handleDelete,
    confirmDoDelete
  }
}