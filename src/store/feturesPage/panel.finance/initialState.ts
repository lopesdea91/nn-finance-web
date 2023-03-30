import { FinanceWalletConsolidateMonth } from "@/types/entities/finance-wallet"

export interface IState {
  dataPage: FinanceWalletConsolidateMonth
}

const initialState: IState = {
  dataPage: {
    balance: {
      available: '0',
      estimate: '0',
      expense: { value: '0' },
      revenue: { value: '0' }
    },
    status: [],
    tag: [],
    origin: [],
    invoice: [],
  },
}

export default initialState