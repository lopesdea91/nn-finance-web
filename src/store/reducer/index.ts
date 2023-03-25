import featureAuth from '../features/auth'
import featureSystem from '../features/system'
import featureFinance from '../features/finance'
import featurePageFinanceExtract from '../feturesPage/finance.extract'
import featurePagePanelFinance from '../feturesPage/panel.finance'
import featurePageSettingsFinanceWallet from '../feturesPage/settings.financeWallet'
import featurePageSettingsFinanceOrigin from '../feturesPage/settings.financeOrigin'
import featurePageSettingsFinanceTag from '../feturesPage/settings.financeTag'

export const reducers = {
  auth: featureAuth,
  system: featureSystem,
  finance: featureFinance,
  pageFinanceExtract: featurePageFinanceExtract,
  pagePanelFinance: featurePagePanelFinance,
  pageSettingsFinanceWallet: featurePageSettingsFinanceWallet,
  pageSettingsFinanceOrigin: featurePageSettingsFinanceOrigin,
  pageSettingsFinanceTag: featurePageSettingsFinanceTag,
}