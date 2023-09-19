import { IFinanceTag } from "@/@core/domain/entities/finance-tag";

export interface PageData {
  item: IFinanceTag
}

export interface PageProps {
  item: PageData['item']
}