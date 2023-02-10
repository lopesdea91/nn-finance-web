import { useEffect, useMemo, useState } from 'react'
import Router from "next/router"
import { api } from '@/services/api'
import { useStoreAuth } from '@/hooks/useStoreAuth'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import { useStoreFinance } from '@/hooks/useStoreFinance'
import { $ } from '@/utils'

export const useStorePrepare = () => {
  const { authState, dispatchSetUser } = useStoreAuth()
  const { dispatchSetPeriod, dispatchSetWalletPanelId } = useStoreSystem()
  const { dispatchSetFinanceWallet, dispatchSetFinanceOrigin, dispatchSetFinanceTag, dispatchSetFinanceList } = useStoreFinance()
  const [isPending, setIsPending] = useState<boolean>(() => !authState.user.id)

  useEffect(() => {
    if (!isPending) {
      return
    }

    const tokenEmpty = !$.getToken()

    if (tokenEmpty) {
      setIsPending(false)
      Router.push('/auth/sign-in')
    }

    async function handler() {
      try {
        const userResult = await api.user.data()

        const financeResult = await api.finance.data()

        dispatchSetUser(userResult.data.user)
        dispatchSetPeriod(userResult.data.period)
        dispatchSetWalletPanelId(financeResult.data.wallet_panel.id)
        dispatchSetFinanceWallet(financeResult.data.wallet)
        dispatchSetFinanceOrigin(financeResult.data.origin)
        dispatchSetFinanceTag(financeResult.data.tag)
        dispatchSetFinanceList({
          originType: financeResult.data.originType,
          status: financeResult.data.status,
          type: financeResult.data.type,
        })
      } catch (error) {
        console.log('onSubmit - error', error)
      } finally {
        setIsPending(false)
      }
    }

    handler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isLogged = useMemo(() => {
    return !!authState.user.id
  }, [authState.user])

  return {
    isPending,
    isLogged
  }
}
