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

  async function handleSubmit(fields: FormOriginIdProps['defaultValues']) {
    systemStore.loadingStart()

    const id = Number(fields.id)

    const form: FinanceOriginFormFieldsPost | FinanceOriginFormFieldsPut = {
      description: fields.description,
      enable: Number(fields.enable) as Enable,
      type_id: Number(fields.typeId) as FinanceTypeId,
      wallet_id: Number(fields.walletId),
      parent_id: Number(fields.parentId),
    }

    try {
      const { code } = !!id
        ? await handleUpdate(id, form)
        : await handleCreate(form)

      if (code === 201) {
        router.push('/settings/finance/origin')
      }
    } catch (error) {
      console.log('... error', error);
    }

    const { data } = await http.financeOrigin.get({
      enable: 1
    })

    if (data)
      financeStore.setOrigin(data.sort(sortDataGet))

    systemStore.loadingEnd()
  }
  async function handleCreate(fields: FinanceOriginFormFieldsPost) {
    return await http.financeOrigin.post({
      description: fields.description,
      enable: fields.enable,
      type_id: fields.type_id,
      wallet_id: fields.wallet_id,
      parent_id: fields.parent_id || null,
    })
  }
  async function handleUpdate(id: number, fields: FinanceOriginFormFieldsPut) {
    return await http.financeOrigin.put(id, {
      description: fields.description,
      enable: fields.enable,
      type_id: fields.type_id,
      wallet_id: fields.wallet_id,
      parent_id: fields.parent_id || null,
    })
  }
  async function handleDelete(id: number) {
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