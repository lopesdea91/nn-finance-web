import { IFinanceTag } from '@/@core/domain/entities/finance-tag'

export interface PageData {
  items: IFinanceTag[]
}

export interface PageProps {
  items: PageData['items']
}

export interface PageContext {
  reloadData: () => void
  data: PageData
}