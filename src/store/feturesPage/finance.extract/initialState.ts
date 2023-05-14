import { IPageFinanceExtractFormSearch, IPageFinanceExtractTable } from "@/types/pages/FinanceExtract"
export interface financeExtractState {
  formSearch: IPageFinanceExtractFormSearch
  table: IPageFinanceExtractTable
}
const state: financeExtractState = {
  formSearch: {
    query: '',
    enable: 1,
    status_id: 1,
    type_id: null,
    origin_id: null,
    tag_ids: [],
    type_preveiw: 'extract',
  },
  table: {
    items: [],
    total: 0,
    page: 0,
    limit: 15,
  }
}

export default state