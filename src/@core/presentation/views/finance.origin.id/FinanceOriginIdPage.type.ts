import { IFinanceOrigin } from "@/@core/domain/entities/finance-origin";

export interface PageData {
  item: IFinanceOrigin
}

export interface PageProps {
  item: PageData['item']
}