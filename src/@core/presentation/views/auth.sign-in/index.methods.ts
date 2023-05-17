import { AxiosError } from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import { http } from "@/@core/infra/http"
import { AuthStore, FinanceStore, SystemStore } from "@/store/hook"
import { FormData } from "./components/SignInForm"
import { $memory } from "@/@core/infra/memory"

export const AuthSignInPageMethods = () => {
  const [messageSubmit, setMessageSubmit] = useState<string>('')
  const router = useRouter()
  const authStore = AuthStore()
  const financeStore = FinanceStore()
  const systemStore = SystemStore()

  async function signIn(fields: FormData) {
    const resultSignIn = await http.auth.signIn({
      email: fields.email,
      password: fields.password
    })

    $memory.cookie.set('token', resultSignIn.data.token)

    http.setToken(resultSignIn.data.token)
  }
  async function userData() {
    const userResult = await http.user.data()

    authStore.setUser(userResult.data.user)

    $memory.cookie.set('period', userResult.data.period)

    systemStore.setPeriod(userResult.data.period)
  }
  async function financeData() {
    const financeResult = await http.finance.data()

    $memory.cookie.set('walletPanelId', String(financeResult.data.wallet_panel.id))
    systemStore.setWalletPanelId(financeResult.data.wallet_panel.id)

    financeStore.setWallet(financeResult.data.wallet)
    financeStore.setOrigin(financeResult.data.origin)
    financeStore.setTag(financeResult.data.tag)
    financeStore.setOriginType(financeResult.data.originType)
    financeStore.setType(financeResult.data.type)
    financeStore.setStatus(financeResult.data.status)
  }
  async function onSubmit(fields: FormData) {
    try {
      setMessageSubmit('')

      await signIn(fields)
      await userData()
      await financeData()

      $memory.init()

      router.push('/panel/finance')

    } catch (err) {
      $memory.reset();

      http.setToken('')

      authStore.setUser({
        id: 0,
        email: '',
        name: ''
      })

      systemStore.setPeriod('')
      systemStore.setWalletPanelId(0)

      financeStore.setWallet([])
      financeStore.setOrigin([])
      financeStore.setTag([])
      financeStore.setOriginType([])
      financeStore.setType([])
      financeStore.setStatus([])

      const { response } = (err as AxiosError<{ message: string }>)

      setMessageSubmit(String(response?.data.message))
    }
  }

  return {
    onSubmit,
    messageSubmit
  }
}