import {
  financeOriginObserver,
  financeOriginTypeObserver,
  financeStatusObserver,
  financeTagObserver,
  financeTypeObserver,
  financeWalletObserver,
  observer
} from '../domain/observer'
import {
  itemOriginMock1,
  itemOriginMock2,
  itemOriginTypeMock1,
  itemOriginTypeMock2,
  itemStatusMock1,
  itemStatusMock2,
  itemTagMock1,
  itemTagMock2,
  itemTypeMock1,
  itemTypeMock2,
  itemWalletMock1
} from './contents'
import { act } from './render'

export const observerMock = async () => {
  await act(() => {
    observer.publish(financeWalletObserver([itemWalletMock1]))
    observer.publish(financeOriginObserver([itemOriginMock1, itemOriginMock2]))
    observer.publish(financeOriginTypeObserver([itemOriginTypeMock1, itemOriginTypeMock2]))
    observer.publish(financeTagObserver([itemTagMock1, itemTagMock2]))
    observer.publish(financeTypeObserver([itemTypeMock1, itemTypeMock2]))
    observer.publish(financeStatusObserver([itemStatusMock1, itemStatusMock2]))
  })
}
