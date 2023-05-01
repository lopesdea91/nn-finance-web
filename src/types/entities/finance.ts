import { FinanceOrigin } from "@/types/entities/finance-origin"
import { FinanceOriginType } from "@/types/entities/finance-originType"
import { FinanceStatus } from "@/types/entities/finance-status"
import { FinanceTag } from "@/types/entities/finance-tag"
import { FinanceType } from "@/types/entities/finance-type"
import { FinanceWallet, FinanceWalletShort } from "@/types/entities/finance-wallet"

export interface FinanceDataResponse {
  "wallet_panel": FinanceWalletShort,
  "wallet": FinanceWallet[],
  "origin": FinanceOrigin[],
  "tag": FinanceTag[],
  "type": FinanceType[],
  "status": FinanceStatus[],
  "originType": FinanceOriginType[]
}