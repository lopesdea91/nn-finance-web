import { FinanceTagFormSearchFields } from "@/types/form/settingsFinanceTag"
import { FinanceTag } from "@/types/entities/finance-tag"

export interface settingsFinanceTagState {
  search: FinanceTagFormSearchFields
  items: FinanceTag[]
  total: number
  lastPage: number
}
const state: settingsFinanceTagState = {
  search: {
    _q: '',
    _limit: 15,
    page: 0,
    enable: 1,
    wallet_id: null,
    type_id: null,

  },
  items: [],
  total: 0,
  lastPage: 0,
}

export default state