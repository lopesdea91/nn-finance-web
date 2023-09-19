import { create } from 'zustand'
import { IFinanceWallet } from '@/@core/domain/entities/finance-wallet'
import { IFinanceType } from '@/@core/domain/entities/finance-type'
import { IFinanceOrigin } from '@/@core/domain/entities/finance-origin'
import { IFinanceTag } from '@/@core/domain/entities/finance-tag'
import { IFinanceOriginType } from '@/@core/domain/entities/finance-originType'
import { IFinanceStatus } from '@/@core/domain/entities/finance-status'

interface IFinanceWalletListStore {
  list: IFinanceWallet[]
  setData: (p: IFinanceWallet[]) => void
}
export const useFinanceWalletListStore = create<IFinanceWalletListStore>()((set, get) => ({
  list: [],
  setData: (payload: IFinanceWallet[]) => {
    set((state) => ({ ...state, list: payload }))
  }
}))

interface IFinanceOriginListStore {
  list: IFinanceOrigin[]
  setData: (p: IFinanceOrigin[]) => void
}
export const useFinanceOriginListStore = create<IFinanceOriginListStore>()((set, get) => ({
  list: [],
  setData: (payload: IFinanceOrigin[]) => {
    set((state) => ({ ...state, list: payload }))
  }
}))

interface IFinanceTagListStore {
  list: IFinanceTag[]
  setData: (p: IFinanceTag[]) => void
}
export const useFinanceTagListStore = create<IFinanceTagListStore>()((set, get) => ({
  list: [],
  setData: (payload: IFinanceTag[]) => {
    set((state) => ({ ...state, list: payload }))
  }
}))

interface IFinanceOriginTypeListStore {
  list: IFinanceOriginType[]
  setData: (p: IFinanceOriginType[]) => void
}
export const useFinanceOriginTypeListStore = create<IFinanceOriginTypeListStore>()((set, get) => ({
  list: [],
  setData: (payload: IFinanceOriginType[]) => {
    set((state) => ({ ...state, list: payload }))
  }
}))

interface IFinanceTypeListStore {
  list: IFinanceType[]
  setData: (p: IFinanceType[]) => void
}
export const useFinanceTypeListStore = create<IFinanceTypeListStore>()((set, get) => ({
  list: [],
  setData: (payload: IFinanceType[]) => {
    set((state) => ({ ...state, list: payload }))
  }
}))

interface IFinanceStatusListStore {
  list: IFinanceStatus[]
  setData: (p: IFinanceStatus[]) => void
}
export const useFinanceStatusListStore = create<IFinanceStatusListStore>()((set, get) => ({
  list: [],
  setData: (payload: IFinanceStatus[]) => {
    set((state) => ({ ...state, list: payload }))
  }
}))
