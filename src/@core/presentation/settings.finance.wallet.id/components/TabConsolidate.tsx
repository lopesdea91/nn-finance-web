import { http } from '@/@core/infra/http'
import { AppButton, AppButtonGroup, AppButtonIcon, AppDivider, AppText, AppTitle } from '@/components'
import { SystemStore } from '@/store/hook'
import { FinanceWalletPeriodsData } from '@/types/entities/finance-wallet'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { Months, WrapperMonths } from './_.styled'

export const TabConsolidate = () => {
  const router = useRouter()
  const system = SystemStore()
  const [data, setData] = useState<FinanceWalletPeriodsData[]>([])

  const getItems = useCallback(async () => {
    system.loadingStart()

    const result = await http.financeWallet.periodsData({ wallet_id: Number(router.query.id), format: 'group-periods' })

    if (!!result.error) {
      return
    }

    setData(result.data)

    system.loadingEnd()
  }, [])

  const consolidationMonth = useCallback(async (period: string) => {
    system.loadingStart()

    await http.financeWallet.processConsolidateMonth({
      period,
      wallet_id: Number(system.state.walletPanelId)
    })

    system.loadingEnd()
  }, [system.state.walletPanelId])

  useEffect(() => {
    getItems()
  }, [])

  return (
    <div>
      <AppTitle
        variant="h5"
        sx={{ mb: 1 }}
        contentEnd={
          <AppButtonGroup>
            <AppButtonIcon variant="sync"
              // onClick={() => handleSubmit()}
              disabled={true}
            />
          </AppButtonGroup>
        }
      >
        Consolidar
      </AppTitle>

      {data.map((el, i) => (
        <WrapperMonths key={el.year} sx={{ p: 1 }}>
          <AppText sx={{ mb: 1 }} variant='body1'>Ano: {el.year}</AppText>

          <AppDivider />

          <Months>
            {el.months.map(month => (
              <AppButton
                key={`${el.year}-${month.period}`}
                type="button"
                disabled={system.state.loading}
                onClick={() => consolidationMonth(month.period)}
              >
                {month.label}
              </AppButton>
            ))}
          </Months>
        </WrapperMonths>
      ))}
    </div>
  )
}
