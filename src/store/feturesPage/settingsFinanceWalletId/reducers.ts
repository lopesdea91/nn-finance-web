import { settingsFinanceWalletIdState } from "./initialState"

const reducers = {
  setTab(state: settingsFinanceWalletIdState, action: { payload: number }) {
    state.tab = action.payload
  },
}

export default reducers