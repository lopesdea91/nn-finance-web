import { FinanceWalletConsolidateMonth } from "@/types/entities/finance-wallet"
import { IState } from "./initialState"

export default {
  setData(state: IState, action: { payload: FinanceWalletConsolidateMonth }) {
    state.dataPage = action.payload
  },
}