import { create } from 'zustand'

interface IStore {
  data: {
    period: string
    financeWalletId: number
    financeConsolidationId: number
  }
  setData: (p: IStore['data']) => void
  setPeriod: (p: string) => void
  setFinanceWallet: (p: number) => void
  setFinanceConsolidation: (p: number) => void
}
export const useSystemStore = create<IStore>()((set) => ({
  data: {
    period: '',
    financeWalletId: 0,
    financeConsolidationId: 0
  },
  setData: (payload: IStore['data']) =>
    set((state) => {
      return { ...state, data: payload }
    }),

  setPeriod: (payload: string) =>
    set((state) => {
      let newData = JSON.parse(JSON.stringify(state))
      newData.data.period = payload

      return newData
    }),

  setFinanceWallet: (payload: number) =>
    set((state) => {
      let newData = JSON.parse(JSON.stringify(state))
      newData.data.financeWalletId = payload

      return newData
    }),

  setFinanceConsolidation: (payload: number) =>
    set((state) => {
      let newData = JSON.parse(JSON.stringify(state))
      newData.data.financeConsolidationId = payload

      return newData
    })
}))
