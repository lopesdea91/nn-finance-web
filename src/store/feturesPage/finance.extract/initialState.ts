import { FinanceItem } from "@/types/entities/finance-item"
import { LoadingThunkType } from "@/types/enum"
import { FinanceExtractFormSearchFields } from "@/types/form/financeExtract"

export interface financeExtractState {
  search: FinanceExtractFormSearchFields
  items: FinanceItem[]
  total: number
  lastPage: number
  loading: LoadingThunkType
}
const state: financeExtractState = {
  search: {
    _q: '',
    _limit: 15,
    page: 0,
    enable: 1,
    status_id: 1,
    type_id: null,
    origin_id: null,
    wallet_id: null,
    tag_ids: null,
    type_preveiw: 'extract',
    period: ''
  },
  items: [],
  total: 0,
  lastPage: 0,
  loading: 'idle'
}

export default state