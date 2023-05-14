import { FinanceOrigin } from "@/types/entities/finance-origin"
import { FinanceOriginType } from "@/types/entities/finance-originType"
import { FinanceStatus } from "@/types/entities/finance-status"
import { FinanceTag } from "@/types/entities/finance-tag"
import { FinanceType } from "@/types/entities/finance-type"
import { FinanceWallet } from "@/types/entities/finance-wallet"
import { FinanceOriginFormSearchFields } from "@/types/form/settingsFinanceOrigin"
import { FinanceTagFormSearchFields } from "@/types/form/settingsFinanceTag"
import { FinanceWalletFormSearchFields } from "@/types/form/settingsFinanceWallet"

export interface financeStateSlice {
  // wallet
  wallet: FinanceWallet[]
  walletSearch: FinanceWalletFormSearchFields
  // origin
  origin: FinanceOrigin[]
  originSearch: FinanceOriginFormSearchFields
  // tag
  tag: FinanceTag[]
  tagSearch: FinanceTagFormSearchFields
  // list
  originType: FinanceOriginType[]
  type: FinanceType[]
  status: FinanceStatus[]
  // extract
}

const initialState: financeStateSlice = {
  /** wallet */
  wallet: [],
  walletSearch: {
    _limit: 15,
    _q: '',
    page: 1,
    enable: 1,
    panel: 1,
  },
  /** origin */
  origin: [],
  originSearch: {
    _limit: 15,
    _q: '',
    page: 1,
    enable: 1,
    type_id: [],
    wallet_id: null,
    parent_id: null,
  },
  /** tag */
  tag: [],
  tagSearch: {
    _limit: 15,
    _q: '',
    page: 1,
    enable: 1,
    type_id: 1,
    wallet_id: null
  },
  /** lists */
  originType: [],
  type: [],
  status: [],
}

export default initialState
