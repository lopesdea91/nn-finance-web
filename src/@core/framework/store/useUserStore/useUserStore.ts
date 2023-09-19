import { create } from 'zustand'
import { IUser } from '@/@core/domain/entities/user'

interface IUserStore {
  data: IUser
  setData: (p: IUser) => void
}
export const useUserStore = create<IUserStore>()((set) => ({
  data: {
    id: null,
    name: '',
    email: ''
  },
  setData: (payload: IUser) =>
    set((state) => {
      return {
        ...state,
        data: payload
      }
    })
}))
