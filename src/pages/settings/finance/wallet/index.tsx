import React, { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import api from "@/services/api"
import useLayoutStore from "@/hooks/useLayoutStore"
import { FinanceWalletListTable } from "@/components/table/FinanceWalletListTable"
import { usePageSettingsWallet } from "@/hooks/usePageStore"
import { FinanceWallet } from '@/types/entities/FinanceWallet'
import { AppButton, AppIcon } from "@/components/base"
import { LayoutContentTitle } from "@/components/layout/internal/LayoutContentTitle"
import { FinanceWalletFormSearch } from "@/components/form/FinanceWalletFormSearch"

const Page = () => {
  const router = useRouter()
  const { startLoading, endLoading } = useLayoutStore()
  const { search } = usePageSettingsWallet()
  const [items, setItems] = useState<FinanceWallet[]>([
    { id: 1, description: '', enable: 0, panel: 0, json: '' }
  ])

  const time = useRef<NodeJS.Timeout>()

  const getData = async () => {
    console.log('getData search', search)

    startLoading()

    const { status, data, ...rest } = await api.settings.wallet.page(search)

    endLoading()

    if (!status) {
      console.log('ERROR')
      return
    }

    setItems(data)
  }

  useEffect(() => {
    if (time.current) {
      clearTimeout(time.current)

      time.current = setTimeout(() => {
        getData()
      }, 350)

    } else {
      getData()
    }
  }, [search])

  return (
    <div className="page bg-white border-bottom p-2 rounded shadow-sm">
      <LayoutContentTitle
        text="Carteiras"
        endContent={(
          <AppButton type="button" className="px-3" onClick={() => router.push('/settings/finance/wallet/new')}>
            <AppIcon variant="new" />
          </AppButton>
        )}
      />

      <FinanceWalletFormSearch />

      <FinanceWalletListTable items={items} />
    </div>
  )
}

export default Page