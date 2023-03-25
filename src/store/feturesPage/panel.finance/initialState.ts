import { FinanceWalletConsolidateMonth } from "@/types/entities/finance-wallet"
import { LoadingThunkType } from "@/types/enum"

export interface IState {
  dataPage: FinanceWalletConsolidateMonth
  loading: LoadingThunkType
}

const initialState: IState = {
  dataPage: {
    balance: {
      available: 0,
      estimate: 0,
      expense: { value: 0 },
      revenue: { value: 0 }
    },
    invoice: [],
    origin: [],
    tag: []
  },
  loading: 'idle'
}

export default initialState