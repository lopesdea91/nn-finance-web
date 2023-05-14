import { financeExtractState } from "./initialState"

type S = financeExtractState

export type ReducerPayloadProps = {
  setFormSearch: S['formSearch'],
  setTable: S['table'],
}

const reducers = {
  setFormSearch(state: S, action: { payload: ReducerPayloadProps['setFormSearch'] }) {
    state.formSearch = action.payload
  },
  setTable(state: S, action: { payload: ReducerPayloadProps['setTable'] }) {
    state.table.items = action.payload.items
    state.table.total = action.payload.total
    state.table.page = action.payload.page
    state.table.limit = action.payload.limit
  },
  setTablePage(state: S, action: { payload: ReducerPayloadProps['setTable']['page'] }) {
    state.table.page = action.payload
  },
  setTableLimit(state: S, action: { payload: ReducerPayloadProps['setTable']['limit'] }) {
    state.table.limit = action.payload
  }
}

export default reducers