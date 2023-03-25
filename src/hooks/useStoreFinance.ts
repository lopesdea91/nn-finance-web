import { setWallet, setOrigin, setTag, setListFinance } from '@/store/features/finance'
import { useAppDispatch, useAppSelector } from "@/store/hook"
import { FinanceWallet } from '@/types/entities/finance-wallet'
import { FinanceOrigin } from '@/types/entities/finance-origin'
import { FinanceTag } from '@/types/entities/finance-tag'
import { FinanceOriginType } from '@/types/entities/finance-originType'
import { FinanceType } from '@/types/entities/finance-type'
import { FinanceStatus } from '@/types/entities/finance-status'

export const useStoreFinance = () => {
  const dispatch = useAppDispatch()

  const financeState = useAppSelector(state => state.finance)

  const dispatchSetFinanceWallet = (value: FinanceWallet[]) => {
    dispatch(setWallet(value))
  }

  const dispatchSetFinanceOrigin = (value: FinanceOrigin[]) => {
    dispatch(setOrigin(value))
  }

  const dispatchSetFinanceTag = (value: FinanceTag[]) => {
    dispatch(setTag(value))
  }

  const dispatchSetFinanceList = (value: {
    originType: FinanceOriginType[],
    type: FinanceType[],
    status: FinanceStatus[],
  }) => {
    dispatch(setListFinance(value))
  }

  return {
    financeState,
    dispatchSetFinanceWallet,
    dispatchSetFinanceOrigin,
    dispatchSetFinanceTag,
    dispatchSetFinanceList,
  }
}