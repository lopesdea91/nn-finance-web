import { FinanceWallet, FinanceWalletShort } from './finance-wallet'
import { FinanceOrigin } from './finance-origin'
import { FinanceTag } from './finance-tag'
import { FinanceType } from './finance-type'
import { FinanceStatus } from './finance-status'
import { FinanceOriginType } from './finance-originType'

export interface FinanceDataResponse {
  // "user": User,
  "wallet_panel": FinanceWalletShort,
  "wallet": FinanceWallet[],
  "origin": FinanceOrigin[],
  "tag": FinanceTag[],
  "type": FinanceType[],
  "status": FinanceStatus[],
  "originType": FinanceOriginType[]
}