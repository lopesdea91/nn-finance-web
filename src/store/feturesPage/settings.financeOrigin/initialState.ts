import { IPageSettingsFinanceOriginFormSearch, IPageSettingsFinanceOriginTable } from "@/types/pages/SettingsFinanceOrigin"
export interface settingsFinanceOriginState {
  formSearch: IPageSettingsFinanceOriginFormSearch
  table: IPageSettingsFinanceOriginTable
}
const state: settingsFinanceOriginState = {
  formSearch: {
    query: '',
    enable: 1,
    parent_id: null,
    wallet_id: null,
    type_id: [],
  },
  table: {
    items: [],
    total: 0,
    page: 0,
    limit: 15,
  }
}

export default state