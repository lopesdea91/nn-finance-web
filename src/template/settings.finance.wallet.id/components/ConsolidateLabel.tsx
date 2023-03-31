import { AppButton, AppText } from '@/components/base'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import { api } from '@/services/api'
import { FinanceWalletPeriodsData } from '@/types/entities/finance-wallet'
import React from 'react'
import styled from 'styled-components'

interface ConsolidateLabelProps extends FinanceWalletPeriodsData { };

export const ConsolidateLabel = ({ year, months }: ConsolidateLabelProps) => {
  const { loading, loadingStart, loadingEnd, walletPanelId } = useStoreSystem()

  const consolidationMonth = async (period: string) => {
    loadingStart()

    await api.financeWallet().processConsolidateMonth({
      form: {
        period,
        wallet_id: Number(walletPanelId)
      }
    })

    loadingEnd()
  }

  return (
    <>
      <AppText sx={{ mb: 1 }} variant='body1'>{year}</AppText>

      <Months>
        {months.map(month => (
          <AppButton
            disabled={loading}
            type="button"
            onClick={() => consolidationMonth(month.period)}
          >
            {month.label}
          </AppButton>
        ))}
      </Months>
    </>
  )
}

const Months = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`