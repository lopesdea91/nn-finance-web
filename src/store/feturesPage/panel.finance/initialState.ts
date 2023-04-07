import { FinanceWalletConsolidateMonth } from "@/types/entities/finance-wallet"

export interface IState {
  dataPage: FinanceWalletConsolidateMonth
}

const initialState: IState = {
  dataPage: {
    balance: {
      available: '0',
      estimate: '0',
      expense: '0',
      revenue: '0'
    },
    composition: [],
    originTransactional: [],
    invoice: [],
    tag: [],
    status: [],
  },
}

export default initialState