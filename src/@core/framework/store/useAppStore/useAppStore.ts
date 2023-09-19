import { create } from 'zustand'

interface IStore {
  data: {
    loading: boolean
  }
  setData: (p: IStore['data']) => void
  setLoading: (p: boolean) => void
}
export const useAppStore = create<IStore>()((set) => ({
  data: {
    loading: false
  },
  setData: (payload: IStore['data']) =>
    set((state) => {
      return { ...state, data: payload }
    }),

  setLoading: (payload: boolean) =>
    set((state) => {
      let newData: IStore = JSON.parse(JSON.stringify(state))
      newData.data.loading = payload

      return newData
    })
}))
