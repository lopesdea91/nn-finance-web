import { IFinanceItem } from '@/@core/domain/entities/finance-item'

export interface PageData {
  items: IFinanceItem[]
}

export interface PageProps {
  items: PageData['items']
}

export interface PageContext {
  reloadData: () => void
  data: PageData
}