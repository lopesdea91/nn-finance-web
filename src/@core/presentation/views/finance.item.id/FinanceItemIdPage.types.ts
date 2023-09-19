import { IFinanceItem } from '@/@core/domain/entities/finance-item'

export interface PageData {
  item: IFinanceItem
}

export interface PageProps {
  item: PageData['item']
}
