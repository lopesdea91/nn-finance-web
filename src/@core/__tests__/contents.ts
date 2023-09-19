import { IFinanceOrigin } from '../domain/entities/finance-origin'
import { IFinanceOriginType } from '../domain/entities/finance-originType'
import { IFinanceStatus } from '../domain/entities/finance-status'
import { IFinanceTag } from '../domain/entities/finance-tag'
import { IFinanceType } from '../domain/entities/finance-type'
import { IFinanceWallet } from '../domain/entities/finance-wallet'

export const itemWalletMock1: IFinanceWallet = {
  id: 1,
  description: 'wallet 1',
  panel: 1,
  trashed: 1
}
export const itemWalletMock2: IFinanceWallet = {
  id: 2,
  description: 'wallet 2',
  panel: 0,
  trashed: 1
}
export const itemOriginMock1: IFinanceOrigin = {
  id: 1,
  description: 'origin 1',
  // type?: IFinanceType
  typeId: 1,
  // wallet?: IFinanceWalletShort
  walletId: 1,
  // parent?: IFinanceOriginShort | null
  parentId: null,
  trashed: 1
}
export const itemOriginMock2: IFinanceOrigin = {
  id: 2,
  description: 'origin 2',
  // type?: IFinanceType
  typeId: 1,
  // wallet?: IFinanceWalletShort
  walletId: 1,
  // parent?: IFinanceOriginShort | null
  parentId: null,
  trashed: 1
}
export const itemOriginTypeMock1: IFinanceOriginType = {
  id: 1,
  description: 'origin type 1'
}
export const itemOriginTypeMock2: IFinanceOriginType = {
  id: 2,
  description: 'origin type 2'
}
export const itemTagMock1: IFinanceTag = {
  id: 1,
  description: 'tag 1',
  typeId: 1,
  walletId: 1
}
export const itemTagMock2: IFinanceTag = {
  id: 2,
  description: 'tag 2',
  typeId: 2,
  walletId: 1
}
export const itemTypeMock1: IFinanceType = {
  id: 1,
  description: 'receita'
}
export const itemTypeMock2: IFinanceType = {
  id: 2,
  description: 'despesa'
}
export const itemStatusMock1: IFinanceStatus = {
  id: 1,
  description: 'Ok'
}
export const itemStatusMock2: IFinanceStatus = {
  id: 2,
  description: 'Pending'
}
