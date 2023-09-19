import { IFinanceItem } from '../entities/finance-item'
import { valueInput, valueObserver } from './observer.type'

type IData = IFinanceItem[]

export const financeItemObserver = (value: valueInput<IData>): valueObserver => ({
  value,
  name: 'financeItem.data'
})