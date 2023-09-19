import { IFinanceItem } from '@/@core/domain/entities/finance-item'
import { IFinanceConsolidationMonthComposition } from '@/@core/domain/entities/finance-wallet-consolidation'

export interface PageData {
  finance: {
    monthBalance: {
      revenue: number
      expense: number
      available: number
    }
    monthComposition: IFinanceConsolidationMonthComposition[]
    itemHistory: IFinanceItem[]
  }
}

export interface PageProps {
  finance: PageData['finance']
}
