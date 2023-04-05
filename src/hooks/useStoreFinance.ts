import { actionsFinanceSlice } from '@/store/features/finance'
import { useAppDispatch } from "@/store/hook"
import { FinanceWallet } from '@/types/entities/finance-wallet'
import { FinanceOrigin } from '@/types/entities/finance-origin'
import { FinanceTag } from '@/types/entities/finance-tag'
import { FinanceOriginType } from '@/types/entities/finance-originType'
import { FinanceType } from '@/types/entities/finance-type'
import { FinanceStatus } from '@/types/entities/finance-status'

export const useStoreFinance = () => {
  const dispatch = useAppDispatch()

  const setFinanceWallet = (value: FinanceWallet[]) => {
    dispatch(actionsFinanceSlice.setWallet(value))
  }

  const setFinanceOrigin = (value: FinanceOrigin[]) => {
    dispatch(actionsFinanceSlice.setOrigin(value))
  }

  const setFinanceTag = (value: FinanceTag[]) => {
    dispatch(actionsFinanceSlice.setTag(value))
  }

  const setFinanceList = (value: {
    originType: FinanceOriginType[],
    type: FinanceType[],
    status: FinanceStatus[],
  }) => {
    dispatch(actionsFinanceSlice.setListFinance(value))
  }

  return {
    setFinanceWallet,
    setFinanceOrigin,
    setFinanceTag,
    setFinanceList,
  }
}