import { FinanceOriginFormSearchFields } from "@/types/form/settingsFinanceOrigin"
import { FinanceOrigin } from "@/types/entities/finance-origin"

export interface settingsFinanceOriginState {
  search: FinanceOriginFormSearchFields
  items: FinanceOrigin[]
  total: number
  lastPage: number
}
const state: settingsFinanceOriginState = {
  search: {
    _q: '',
    _limit: 15,
    page: 0,
    enable: 1,
    parent_id: null,
    wallet_id: null,
    type_id: null,
  },
  items: [],
  total: 0,
  lastPage: 0,
}

export default state