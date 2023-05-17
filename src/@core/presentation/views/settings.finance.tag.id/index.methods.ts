import { useRouter } from "next/router"
import { http } from "@/@core/infra/http"
import { FinanceStore, SystemStore } from "@/store/hook"
import { FinanceTag } from "@/types/entities/finance-tag"
import { Enable, FinanceTypeId } from "@/types/enum"
import { FinanceTagFormFieldsPost, FinanceTagFormFieldsPut } from "@/types/form/settingsFinanceTag"
import { FormDataTagId } from "./components/Form"

const sortDataGet = (a: FinanceTag, b: FinanceTag) => {
  return a.description < b.description ? -1 : a.description > b.description ? 1 : 0
}
export const SettingsFinanceTagIdMethods = () => {
  const router = useRouter()
  const systemStore = SystemStore()
  const financeStore = FinanceStore()

  const handleSubmit = async (fields: FormDataTagId) => {
    systemStore.loadingStart()

    const id = Number(fields.id)

    const form: FinanceTagFormFieldsPost | FinanceTagFormFieldsPut = {
      description: fields.description,
      enable: Number(fields.enable) as Enable,
      type_id: Number(fields.typeId) as FinanceTypeId,
      wallet_id: Number(fields.walletId),
    }

    const result = !!id
      ? await handleUpdate(id, form)
      : await handleCreate(form)

    // toast

    if (!result.error) {
      systemStore.loadingEnd()
      return
    }

    const resultGet = await http.financeTag.get({
      enable: 1
    })

    if (resultGet.error) {
      // toast
    } else {
      financeStore.setTag(
        (resultGet.data as FinanceTag[]).sort(sortDataGet)
      )
    }

    systemStore.loadingEnd()
  }
  const handleCreate = async (fields: FinanceTagFormFieldsPost) => {
    return await http.financeTag.post(
      {
        description: fields.description,
        enable: fields.enable,
        type_id: fields.type_id,
        wallet_id: fields.wallet_id,
      }
    )
  }
  const handleUpdate = async (id: number, fields: FinanceTagFormFieldsPut) => {
    return await http.financeTag.put(
      id,
      {
        description: fields.description,
        enable: fields.enable,
        type_id: fields.type_id,
        wallet_id: fields.wallet_id,
      }
    )
  }
  const handleDelete = async (id: number) => {
    const confirm = window.confirm('ao confirmar será excluido permanente! deseja continuar?')

    if (confirm) {
      systemStore.loadingStart()

      await http.financeTag.remove(id)

      // toast.addToast({
      //   message: !error ? `Tag excluida com sucesso!` : 'algo de ruim aconteceu, tente novamente depois!',
      //   type: !error ? 'success': 'error'
      // })

      systemStore.loadingEnd()
    }
  }

  return {
    handleSubmit,
    handleDelete,
  }
}