import { financeExtractState } from "./initialState"
import { FinanceExtractFormSearchFields } from "@/types/form/financeExtract"
import { FinanceItem } from "@/types/entities/finance-item"

const reducers = {
  setSearch(state: financeExtractState, action: { payload: FinanceExtractFormSearchFields }) {
    state.search = action.payload
  },
  setList(state: financeExtractState, action: { payload: { items: FinanceItem[], total: number, lastPage: number } }) {
    state.items = action.payload.items
    state.total = action.payload.total
    state.lastPage = action.payload.lastPage
  }
}

export default reducers