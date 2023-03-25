import { FinanceOrigin } from '@/types/entities/finance-origin'
import { FinanceOriginType } from '@/types/entities/finance-originType'
import { FinanceStatus } from '@/types/entities/finance-status'
import { FinanceTag } from '@/types/entities/finance-tag'
import { FinanceType } from '@/types/entities/finance-type'
import { FinanceWallet } from '@/types/entities/finance-wallet'
import { FinanceOriginFormSearchFields } from '@/types/form/settingsFinanceOrigin'
import { FinanceTagFormSearchFields } from '@/types/form/settingsFinanceTag'
import { FinanceWalletFormSearchFields } from '@/types/form/settingsFinanceWallet'
import { financeStateSlice } from "./initialState"

export default {
  // Wallet
  setWallet(state: financeStateSlice, action: { payload: FinanceWallet[] }) {
    state.wallet = action.payload
  },
  setWalletSearch(state: financeStateSlice, action: { payload: FinanceWalletFormSearchFields }) {
    state.walletSearch = action.payload
  },
  // Origin  
  setOrigin(state: financeStateSlice, action: { payload: FinanceOrigin[] }) {
    state.origin = action.payload
  },
  setOriginSearch(state: financeStateSlice, action: { payload: FinanceOriginFormSearchFields }) {
    state.originSearch = action.payload
  },
  // Tag
  setTag(state: financeStateSlice, action: { payload: FinanceTag[] }) {
    state.tag = action.payload
  },
  setTagSearch(state: financeStateSlice, action: { payload: FinanceTagFormSearchFields }) {
    state.tagSearch = action.payload
  },
  // List
  setListFinance(state: financeStateSlice, action: {
    payload: {
      originType: FinanceOriginType[],
      type: FinanceType[],
      status: FinanceStatus[],
    }
  }) {
    state.originType = action.payload.originType
    state.type = action.payload.type
    state.status = action.payload.status
  }
}