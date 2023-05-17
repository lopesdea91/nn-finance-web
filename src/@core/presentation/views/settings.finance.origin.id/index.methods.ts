import { http } from "@/@core/infra/http"
import { FinanceStore, SystemStore } from "@/store/hook"
import { FinanceOrigin } from "@/types/entities/finance-origin"
import { Enable, FinanceTypeId } from "@/types/enum"
import { FinanceOriginFormFieldsPost, FinanceOriginFormFieldsPut } from "@/types/form/settingsFinanceOrigin"
import { useRouter } from "next/router"
import { FormOriginIdProps } from "./components/Form"

const sortDataGet = (a: FinanceOrigin, b: FinanceOrigin) => {
  return a.description < b.description ? -1 : a.description > b.description ? 1 : 0
}

export const SettingsFinanceOriginIdMethods = () => {
  const router = useRouter()
  const systemStore = SystemStore()
  const financeStore = FinanceStore()

  const handleSubmit = async (fields: FormOriginIdProps['defaultValues']) => {
    systemStore.loadingStart()

    const id = Number(fields.id)

    const form: FinanceOriginFormFieldsPost | FinanceOriginFormFieldsPut = {
      description: fields.description,
      enable: Number(fields.enable) as Enable,
      type_id: Number(fields.typeId) as FinanceTypeId,
      wallet_id: Number(fields.walletId),
      parent_id: Number(fields.parentId),
    }

    const result = !!id
      ? await handleUpdate(id, form)
      : await handleCreate(form)

    // toast

    if (!result.error) {
      systemStore.loadingEnd()
      return
    }

    const resultGet = await http.financeOrigin.get({
      enable: 1
    })

    if (resultGet.error) {
      // toast
    } else {
      financeStore.setOrigin(
        (resultGet.data as FinanceOrigin[]).sort(sortDataGet)
      )
    }

    systemStore.loadingEnd()
  }
  const handleCreate = async (fields: FinanceOriginFormFieldsPost) => {
    return await http.financeOrigin.post({
      description: fields.description,
      enable: fields.enable,
      type_id: fields.type_id,
      wallet_id: fields.wallet_id,
      parent_id: fields.parent_id || null,
    })
  }
  const handleUpdate = async (id: number, fields: FinanceOriginFormFieldsPut) => {
    return await http.financeOrigin.put(id, {
      description: fields.description,
      enable: fields.enable,
      type_id: fields.type_id,
      wallet_id: fields.wallet_id,
      parent_id: fields.parent_id || null,
    })
  }
  const handleDelete = async (id: number) => {
    const confirm = window.confirm('ao confirmar será excluido permanente! deseja continuar?')

    if (confirm) {
      try {
        systemStore.loadingStart()

        await http.financeOrigin.remove(id)

        // toast.addToast({
        //   message: `Carteira excluida com sucesso!`,
        //   type: 'success'
        // })
      } catch (error) {
        // toast.addToast({
        //   message: 'algo de ruim aconteceu, tente novamente depois!',
        //   type: 'error'
        // })
      } finally {
        systemStore.loadingEnd()
      }
    }
  }

  return {
    handleSubmit,
    handleCreate,
    handleUpdate,
    handleDelete,
  }
}