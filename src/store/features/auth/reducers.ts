import { User } from "@/types/system"
import { authStateSlice } from "./initialState"

export default {
  setUser(state: authStateSlice, action: { payload: User }) {
    state.user = action.payload
  },
}