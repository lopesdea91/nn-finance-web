import { FinanceOrigin } from '@/types/entities/finance-origin'
import { FinanceOriginType } from '@/types/entities/finance-originType'
import { FinanceStatus } from '@/types/entities/finance-status'
import { FinanceTag } from '@/types/entities/finance-tag'
import { FinanceType } from '@/types/entities/finance-type'
import { FinanceWallet } from '@/types/entities/finance-wallet'
import { FinanceExtractFormSearchFields } from '@/types/form/financeExtract'
import { FinanceOriginFormSearchFields } from '@/types/form/settingsFinanceOrigin'
import { FinanceTagFormSearchFields } from '@/types/form/settingsFinanceTag'
import { FinanceWalletFormSearchFields } from '@/types/form/settingsFinanceWallet'
import { createSlice } from '@reduxjs/toolkit'

export interface IState {
  // wallet
  wallet: FinanceWallet[],
  walletSearch: FinanceWalletFormSearchFields,
  // origin
  origin: FinanceOrigin[],
  originSearch: FinanceOriginFormSearchFields,
  // tag
  tag: FinanceTag[],
  tagSearch: FinanceTagFormSearchFields,
  // list
  originType: FinanceOriginType[],
  type: FinanceType[],
  status: FinanceStatus[],
  // extract
  extractSearch: FinanceExtractFormSearchFields,
}

const initialState: IState = {
  extractSearch: {
    type_preveiw: 'extract',
    _total: 0,
    _limit: 15,
    _q: '',
    page: 1,
    enable: 1,
    status_id: 1,
    type_id: null,
    origin_id: null,
    tag_ids: null,
    wallet_id: null
  },
  wallet: [],
  walletSearch: {
    _total: 0,
    _limit: 15,
    _q: '',
    page: 1,
    enable: 1,
    panel: 1,
  },
  origin: [],
  originSearch: {
    _total: 0,
    _limit: 15,
    _q: '',
    page: 1,
    enable: 1,
    type_id: [],
    wallet_id: null,
    parent_id: null,
  },
  tag: [],
  tagSearch: {
    _total: 0,
    _limit: 15,
    _q: '',
    page: 1,
    enable: 1,
    type_id: 1,
    wallet_id: null
  },
  originType: [],
  type: [],
  status: [],
}

const slice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    // Wallet
    setWallet(state, action: { payload: FinanceWallet[] }) {
      state.wallet = action.payload
    },
    setWalletSearch(state, action: { payload: FinanceWalletFormSearchFields }) {
      state.walletSearch = action.payload
    },
    // Origin  
    setOrigin(state, action: { payload: FinanceOrigin[] }) {
      state.origin = action.payload
    },
    setOriginSearch(state, action: { payload: FinanceOriginFormSearchFields }) {
      state.originSearch = action.payload
    },
    // Tag
    setTag(state, action: { payload: FinanceTag[] }) {
      state.tag = action.payload
    },
    setTagSearch(state, action: { payload: FinanceTagFormSearchFields }) {
      state.tagSearch = action.payload
    },
    // List
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
    setExtractSearch(state, action: { payload: FinanceExtractFormSearch }) {
      state.extractSearch = action.payload
    },
  }
})

export default slice.reducer

export const actionsFinanceSlice = slice.actions