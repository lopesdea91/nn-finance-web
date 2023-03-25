import { financeExtractState } from "./initialState"
import { FinanceExtractFormSearchFields } from "@/types/form/financeExtract"
import { FinanceItem } from "@/types/entities/finance-item"

export default {
  setSearch(state: financeExtractState, action: { payload: Partial<FinanceExtractFormSearchFields> }) {
    state.search = {
      ...state.search,
      ...action.payload
    }
  },
  setList(state: financeExtractState, action: { payload: { items: FinanceItem[], total: number, lastPage: number } }) {
    state.items = action.payload.items
    state.total = action.payload.total
    state.lastPage = action.payload.lastPage
  }
}