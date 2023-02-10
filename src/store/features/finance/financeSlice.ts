import { FinanceOrigin } from '@/types/entities/finance-origin'
import { FinanceOriginType } from '@/types/entities/finance-originType'
import { FinanceStatus } from '@/types/entities/finance-status'
import { FinanceTag } from '@/types/entities/finance-tag'
import { FinanceType } from '@/types/entities/finance-type'
import { FinanceWallet } from '@/types/entities/finance-wallet'
import { createSlice } from '@reduxjs/toolkit'

export interface IState {
  wallet: FinanceWallet[],
  origin: FinanceOrigin[],
  tag: FinanceTag[],
  originType: FinanceOriginType[],
  type: FinanceType[],
  status: FinanceStatus[],
}

const initialState: IState = {
  wallet: [],
  origin: [],
  tag: [],
  originType: [],
  type: [],
  status: [],
}

const slice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    setWallet(state, action: { payload: FinanceWallet[] }) {
      state.wallet = action.payload
    },
    setOrigin(state, action: { payload: FinanceOrigin[] }) {
      state.origin = action.payload
    },
    setTag(state, action: { payload: FinanceTag[] }) {
      state.tag = action.payload
    },
    setLists(state, action: {
      payload: {
        originType: FinanceOriginType[],
        type: FinanceType[],
        status: FinanceStatus[],
      }
    }) {
      state.originType = action.payload.originType
      state.type = action.payload.type
      state.status = action.payload.status
    },
  }
})

export default slice.reducer

export const actionsFinanceSlice = slice.actions