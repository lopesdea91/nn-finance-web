import { FinanceTag, FinanceTagSearch } from "@/types/entities/finance-tag"
import { settingsFinanceTagState } from "./initialState"

type S = settingsFinanceTagState

export default {
  setSearch(state: S, action: { payload: Partial<FinanceTagSearch> }) {
    state.search = {
      ...state.search,
      ...action.payload
    }
  },
  setList(state: S, action: { payload: { items: FinanceTag[], total: number, lastPage: number } }) {
    state.items = action.payload.items
    state.total = action.payload.total
    state.lastPage = action.payload.lastPage
  }
}