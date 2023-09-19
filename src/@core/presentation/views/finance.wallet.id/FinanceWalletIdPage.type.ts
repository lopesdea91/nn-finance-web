import { IFinanceWallet, IFinanceWalletPeriod } from "@/@core/domain/entities/finance-wallet";

export interface PageData {
  item: IFinanceWallet
  periods: IFinanceWalletPeriod[]
}

export interface PageProps {
  item: PageData['item']
  periods: PageData['periods']
}