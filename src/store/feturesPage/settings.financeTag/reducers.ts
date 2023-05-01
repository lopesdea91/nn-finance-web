import { FinanceTag, FinanceTagSearch } from "@/types/entities/finance-tag"
import { settingsFinanceTagState } from "./initialState"

type S = settingsFinanceTagState

export type setSearchAction = Partial<FinanceTagSearch>
export type setListAction = { items: FinanceTag[], total: number, lastPage: number }

const reducers = {
  setSearch(state: S, action: { payload: setSearchAction }) {
    state.search = {
      ...state.search,
      ...action.payload
    }
  },
  setList(state: S, action: { payload: setListAction }) {
    state.items = action.payload.items
    state.total = action.payload.total
    state.lastPage = action.payload.lastPage
  }
}

export default reducers