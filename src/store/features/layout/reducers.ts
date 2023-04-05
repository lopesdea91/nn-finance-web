import { financeStateSlice } from "./initialState"

export default {
  setTitlePage(state: financeStateSlice, action: { payload: string }) {
    state.titlePage = action.payload
  }
}