import { authSlice } from '../features/auth'
import { systemSlice } from '../features/system'
import { layoutSlice } from '../features/layout'
import { financeSlice } from '../features/finance'
import { pageFinanceExtractSlice } from '../feturesPage/finance.extract'
import { pagePanelFinanceSlice } from '../feturesPage/panel.finance'
import { pageSettingsFinanceWalletSlice } from '../feturesPage/settings.financeWallet'
import { pageSettingsFinanceOriginSlice } from '../feturesPage/settings.financeOrigin'
import { pageSettingsFinanceTagSlice } from '../feturesPage/settings.financeTag'

export const reducer = {
  [authSlice.name]: authSlice.reducer,
  [systemSlice.name]: systemSlice.reducer,
  [layoutSlice.name]: layoutSlice.reducer,
  [financeSlice.name]: financeSlice.reducer,
  [pageFinanceExtractSlice.name]: pageFinanceExtractSlice.reducer,
  [pagePanelFinanceSlice.name]: pagePanelFinanceSlice.reducer,
  [pageSettingsFinanceWalletSlice.name]: pageSettingsFinanceWalletSlice.reducer,
  [pageSettingsFinanceOriginSlice.name]: pageSettingsFinanceOriginSlice.reducer,
  [pageSettingsFinanceTagSlice.name]: pageSettingsFinanceTagSlice.reducer,
}