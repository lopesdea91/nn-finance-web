import { FinanceWalletConsolidateMonth } from "@/types/entities/finance-wallet"
import { IState } from "./initialState"

const reducers = {
  setData(state: IState, action: { payload: FinanceWalletConsolidateMonth }) {
    state.dataPage = action.payload
  },
}

export default reducers