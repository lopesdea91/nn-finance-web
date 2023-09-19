import { IFinanceWallet } from "@/@core/domain/entities/finance-wallet";

export interface PageData {
  items: IFinanceWallet[]
}

export interface PageProps {
  items: PageData['items']
}

export interface PageContext {
  reloadData: () => Promise<void>
  data: PageData
}