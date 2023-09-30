import {
  IFinanceOrigin,
  IFinanceOriginType,
  IFinanceStatus,
  IFinanceTag,
  IFinanceType,
  IFinanceWallet,
  IUser
} from '@/@core/domain/entities'
import { NextPage } from 'next'
import { AppProps } from 'next/app'

export interface IAppInitialData {
  period: string
  financeWalletId: number
  financeConsolidationId: number
  user: IUser
  finance: {
    wallet: IFinanceWallet[]
    origin: IFinanceOrigin[]
    tag: IFinanceTag[]
    type: IFinanceType[]
    status: IFinanceStatus[]
    originType: IFinanceOriginType[]
  }
}

export type LayoutType = 'auth' | 'private' | 'dashboard' | 'settings'

export type PageLayout<P = {}, IP = P> = NextPage<P, IP> & {
  layout?: LayoutType
}
export type IAppProps = AppProps & {
  pageInitialData: IAppInitialData
  Component: PageLayout
}
