import { useEffect, useState } from 'react'
import { useRouter } from "next/router"
import { FinanceStore, SystemStore } from '@/store/hook'
import { AuthStore } from '@/store/hook/Auth'
import { http } from '@/@core/infra/http'
import { $memory } from '@/@core/infra/memory'

const routesPublic = [
  // '/auth/sign-in',
  '/auth/sign-up',
  '/auth/sign-out',
  '/teste/teste1',
  '/teste/teste2',
  '/teste/teste3',
  '/teste/teste4',
  '/teste/teste5',
  '/teste/teste6',
]

export const useStorePrepare = () => {
  const authStore = AuthStore()
  const financeStore = FinanceStore()
  const systemStore = SystemStore()

  const router = useRouter()
  const [isPending, setIsPending] = useState<boolean>(() => !authStore.state.user.id)

  async function userData() {
    const userResult = await http.user.data()

    authStore.setUser(userResult.data.user)

    systemStore.setPeriod(userResult.data.period)
  }
  async function financeData() {
    const financeResult = await http.finance.data()

    systemStore.setWalletPanelId(financeResult.data.wallet_panel.id)

    financeStore.setWallet(financeResult.data.wallet)
    financeStore.setOrigin(financeResult.data.origin)
    financeStore.setTag(financeResult.data.tag)
    financeStore.setOriginType(financeResult.data.originType)
    financeStore.setType(financeResult.data.type)
    financeStore.setStatus(financeResult.data.status)
  }
  async function handler() {
    if (routesPublic.includes(router.asPath)) {
      setTimeout(() => setIsPending(false), 250)
      return
    }

    const token = $memory.cookie.get<string>('token')

    if (!token) {
      if (!routesPublic.includes(router.asPath)) router.push('/auth/sign-in')

      setTimeout(() => setIsPending(false), 250)
      return
    }

    try {
      $memory.cookie.set('token', token)

      http.setToken(token)

      await userData()
      await financeData()

      $memory.init()

    } catch (error) {
      console.log('onSubmit - error', error)

      if (!routesPublic.includes(router.asPath)) router.push('/auth/sign-in')

    } finally {
      if (router.asPath === '/auth/sign-in')
        router.push('/panel/finance')

      setTimeout(() => setIsPending(false), 250)
    }
  }

  useEffect(() => {
    if (!authStore.state.user.id || !isPending) {
      handler()
    }
  }, [])

  return { isPending }
}
