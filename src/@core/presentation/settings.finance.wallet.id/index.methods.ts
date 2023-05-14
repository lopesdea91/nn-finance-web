import { http } from "@/@core/infra/http"
import { FinanceStore, SystemStore } from "@/store/hook"
import { FinanceWallet } from "@/types/entities/finance-wallet"
import { Enable } from "@/types/enum"
import { FinanceWalletFormFieldsPost, FinanceWalletFormFieldsPut } from "@/types/form/settingsFinanceWallet"
import { useRouter } from "next/router"
import { FormDataWalletId } from "./components/Form"

const sortDataGet = (a: FinanceWallet, b: FinanceWallet) => {
  return a.description < b.description ? -1 : a.description > b.description ? 1 : 0
}

export const SettingsFinanceWalletIdMethods = () => {
  const systemStore = SystemStore()
  const financeStore = FinanceStore()
  const router = useRouter()

  const handleSubmit = async (fields: FormDataWalletId) => {
    systemStore.loadingStart()

    const id = Number(fields.id)

    const form: FinanceWalletFormFieldsPost | FinanceWalletFormFieldsPut = {
      description: fields.description,
      enable: Number(fields.enable) as Enable,
      panel: Number(fields.panel) as Enable,
      // json: fields.json,
    }

    const result = !!id
      ? await handleUpdate(id, form)
      : await handleCreate(form)

    // toast

    if (!result.error) {
      systemStore.loadingEnd()
      return
    }

    const resultGet = await http.financeWallet.get({
      enable: 1
    })

    if (resultGet.error) {
      // toast
    } else {
      financeStore.setWallet(
        (resultGet.data as FinanceWallet[]).sort(sortDataGet)
      )
    }

    systemStore.loadingEnd()
  }
  const handleCreate = async (fields: FinanceWalletFormFieldsPost) => {
    return http.financeWallet.post({
      // id: +fields.id,
      description: fields.description,
      // enable: fields.enable,
      // panel: fields.panel,
    })
  }
  const handleUpdate = async (id: number, fields: FinanceWalletFormFieldsPut) => {
    return http.financeWallet.put(id, {
      description: fields.description,
      enable: fields.enable,
      panel: fields.panel,
      // json: fields.json ? JSON.stringify(fields.json) : '',
    })
  }
  const handleDelete = async (id: number) => {
    const confirm = window.confirm('ao confirmar será excluido permanente! deseja continuar?')

    if (confirm) {
      systemStore.loadingStart()

      const { error } = await http.financeWallet.remove(id)

      // toast.addToast({
      //   message: !error ? `Carteira excluida com sucesso!` : 'algo de ruim aconteceu, tente novamente depois!',
      //   type: !error ? 'success': 'error'
      // })

      systemStore.loadingEnd()
    }
  }

  return {
    handleSubmit,
    handleCreate,
    handleUpdate,
    handleDelete,
  }
}