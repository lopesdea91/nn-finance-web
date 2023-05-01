import { FinanceOrigin, FinanceOriginSearch } from "@/types/entities/finance-origin"
import { settingsFinanceOriginState } from "./initialState"

type S = settingsFinanceOriginState

const reducers = {
  setSearch(state: S, action: { payload: Partial<FinanceOriginSearch> }) {
    state.search = {
      ...state.search,
      ...action.payload
    }
  },
  setList(state: S, action: { payload: { items: FinanceOrigin[], total: number, lastPage: number } }) {
    state.items = action.payload.items
    state.total = action.payload.total
    state.lastPage = action.payload.lastPage
  }
}

export default reducers