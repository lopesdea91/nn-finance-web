import { useTitlePage } from "@/hooks"
import { Page } from '@/@core/presentation/shared';

export default function FinanceInvoicePage() {
  useTitlePage('Finança faturas')

  return (
    <Page>invoice</Page>
  )
}