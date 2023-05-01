import { useAppDispatch, useAppSelector } from "@/store/hook"
import { FinanceWalletConsolidateMonth } from "@/types/entities/finance-wallet"
import { actionsPagePanelFinance } from "../feturesPage/panel.finance"

export const PagePanelFinanceStore = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(e => e.pagePanelFinance)

  function setData(value: FinanceWalletConsolidateMonth) {
    dispatch(actionsPagePanelFinance.setData(value))
  }

  return { state, setData }
}