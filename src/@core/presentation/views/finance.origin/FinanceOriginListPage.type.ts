import { IFinanceOrigin } from '@/@core/domain/entities/finance-origin'

export interface PageData {
  items: IFinanceOrigin[]
}

export interface PageProps {
  items: PageData['items']
}

export interface PageContext {
  reloadData: () => void
  data: PageData
}