import { useAppDispatch, useAppSelector } from "@/store/hook"
import { actionsFinance } from "@/store/features/finance"
import { FinanceOrigin } from "@/types/entities/finance-origin"
import { FinanceOriginType } from "@/types/entities/finance-originType"
import { FinanceStatus } from "@/types/entities/finance-status"
import { FinanceTag } from "@/types/entities/finance-tag"
import { FinanceType } from "@/types/entities/finance-type"
import { FinanceWallet } from "@/types/entities/finance-wallet"
import { FinanceOriginFormSearchFields } from "@/types/form/settingsFinanceOrigin"
import { FinanceTagFormSearchFields } from "@/types/form/settingsFinanceTag"
import { FinanceWalletFormSearchFields } from "@/types/form/settingsFinanceWallet"

export const FinanceStore = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(e => e.finance)

  // Wallet  
  function setWallet(value: FinanceWallet[]) {
    dispatch(actionsFinance.setWallet(value))
  }
  function setWalletSearch(value: FinanceWalletFormSearchFields) {
    dispatch(actionsFinance.setWalletSearch(value))
  }

  // Origin  
  function setOrigin(value: FinanceOrigin[]) {
    dispatch(actionsFinance.setOrigin(value))
  }
  function setOriginSearch(value: FinanceOriginFormSearchFields) {
    dispatch(actionsFinance.setOriginSearch(value))
  }

  // Tag
  function setTag(value: FinanceTag[]) {
    dispatch(actionsFinance.setTag(value))
  }
  function setTagSearch(value: FinanceTagFormSearchFields) {
    dispatch(actionsFinance.setTagSearch(value))
  }

  // OriginType  
  function setOriginType(value: FinanceOriginType[]) {
    dispatch(actionsFinance.setOriginType(value))
  }

  // Type  
  function setType(value: FinanceType[]) {
    dispatch(actionsFinance.setType(value))
  }

  // Status  
  function setStatus(value: FinanceStatus[]) {
    dispatch(actionsFinance.setStatus(value))
  }

  return {
    state,
    setWallet, setWalletSearch,
    setOrigin, setOriginSearch,
    setTag, setTagSearch,
    setOriginType, setType, setStatus,
  }
}