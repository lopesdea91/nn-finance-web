import { IPageSettingsFinanceTagFormSearch, IPageSettingsFinanceTagTable } from "@/types/pages/SettingsFinanceTag"
export interface settingsFinanceTagState {
  formSearch: IPageSettingsFinanceTagFormSearch
  table: IPageSettingsFinanceTagTable
}
const state: settingsFinanceTagState = {
  formSearch: {
    query: '',
    enable: 1,
    type_id: null,
    wallet_id: null,
  },
  table: {
    items: [],
    total: 0,
    page: 0,
    limit: 15,
  }
}

export default state