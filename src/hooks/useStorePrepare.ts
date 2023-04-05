import { useEffect, useMemo, useState } from 'react'
import { useRouter } from "next/router"
import { api } from '@/services/api'
import { useStoreAuth } from '@/hooks/useStoreAuth'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import { useStoreFinance } from '@/hooks/useStoreFinance'
import { $cookie } from '@/utils'

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
  const { authState, dispatchSetUser } = useStoreAuth()
  const { setPeriod, setWalletPanelId } = useStoreSystem()
  const { dispatchSetFinanceWallet, dispatchSetFinanceOrigin, dispatchSetFinanceTag, dispatchSetFinanceList } = useStoreFinance()
  const [isPending, setIsPending] = useState<boolean>(() => !authState.user.id)
  const router = useRouter()

  async function handler() {
    if (routesPublic.includes(router.asPath)) {
      setTimeout(() => setIsPending(false), 250)
      return
    }

    if (!$cookie.get({ key: 'token' })) {
      if (!routesPublic.includes(router.asPath)) router.push('/auth/sign-in')
      setTimeout(() => setIsPending(false), 250)
      return
    }

    try {
      const userResult = await api.user().data()

      const financeResult = await api.finance().data()

      const { period, walletPanelId } = $cookie.all<{ period: string, walletPanelId: number }>()

      $cookie.set({
        key: 'data_user',
        value: JSON.stringify({
          id: userResult.data.user.id,
          name: userResult.data.user.name,
        }),
        options: {
          path: '/'
        },
        keyCrypto: true,
        valueCrypto: true
      })

      !period && $cookie.set({
        key: 'period',
        value: userResult.data.period,
        options: {
          path: '/'
        },
        // keyCrypto: true,
        // valueCrypto: true
      })

      dispatchSetUser(userResult.data.user)
      setPeriod(period || userResult.data.period)

      setWalletPanelId(walletPanelId || financeResult.data.wallet_panel.id)
      dispatchSetFinanceWallet(financeResult.data.wallet)
      dispatchSetFinanceOrigin(financeResult.data.origin)
      dispatchSetFinanceTag(financeResult.data.tag)
      dispatchSetFinanceList({
        originType: financeResult.data.originType,
        status: financeResult.data.status,
        type: financeResult.data.type,
      })

      !walletPanelId && $cookie.set({
        key: 'walletPanelId',
        value: String(financeResult.data.wallet_panel.id),
        options: {
          path: '/'
        },
        // keyCrypto: true,
        // valueCrypto: true
      })

      // if (!routesPublic.includes(router.asPath)) {
      //   router.push('/panel/finance')
      // }

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
    if (!authState.user.id || !isPending) {
      handler()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { isPending }
}
