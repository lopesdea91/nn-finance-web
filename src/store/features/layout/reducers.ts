import { Toast } from "@/types/layout"
import { financeStateSlice } from "./initialState"

type S = financeStateSlice

const reducers = {
  setTitlePage(state: S, action: { payload: string }) {
    state.titlePage = action.payload
  },
  addToast(state: S, action: { payload: Toast[] }) {
    action.payload.forEach(toast => state.toast.push(toast))
  },
  removeToast(state: S, action: { payload: Toast['id'] }) {
    state.toast = state.toast.filter(toast => toast.id !== action.payload)
  }
}

export default reducers