
import { useEffect, useState } from 'react'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import { api } from '@/services/api'
import { FinanceConsolidateMonthBalance } from '@/types/entities/finance'
import { BalanceItem, BalanceTitle, BalanceValue, BalanceWrapper } from './styled'
import { AppText } from '@/components/base'

type DataPage = FinanceConsolidateMonthBalance & {}

export default function Page() {
  const { systemState } = useStoreSystem()
  const [dataPage, setDataPage] = useState<DataPage>({
    available: 0,
    estimate: 0,
    expense: { value: 0 },
    revenue: { value: 0 }
  })

  useEffect(() => {
    async function getData() {
      try {
        const result = await api.finance.wallet.consolidateMonth({
          period: systemState.period,
          wallet_id: Number(systemState.walletPanelId)
        })

        setDataPage({
          available: result.data.balance.available,
          estimate: result.data.balance.estimate,
          expense: result.data.balance.expense,
          revenue: result.data.balance.revenue,
        })
      } catch (error) {
        console.log('useEffect getData', error)
      }
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemState.period])

  return (
    <div>
      <AppText variant='h5'>Balanço</AppText>
      <BalanceWrapper>
        <BalanceItem>
          <BalanceTitle>Receita</BalanceTitle>
          <BalanceValue>{dataPage.revenue.value}</BalanceValue>
        </BalanceItem>

        <BalanceItem>
          <BalanceTitle>Despesa</BalanceTitle>
          <BalanceValue>{dataPage.expense.value}</BalanceValue>
        </BalanceItem>

        <BalanceItem>
          <BalanceTitle>Disponivel</BalanceTitle>
          <BalanceValue>{dataPage.available}</BalanceValue>
        </BalanceItem>

        <BalanceItem>
          <BalanceTitle>Estimado</BalanceTitle>
          <BalanceValue>{dataPage.estimate}</BalanceValue>
        </BalanceItem>
      </BalanceWrapper>

      {/* 
      <AppText variant='h5'>Origem</AppText>
      <OriginWrapper>
        <BalanceItem>
          <BalanceTitle>Receita</BalanceTitle>
          <BalanceValue>{dataPage.revenue.value}</BalanceValue>
        </BalanceItem>
      </OriginWrapper> 
      */}
    </div >
  )
}
