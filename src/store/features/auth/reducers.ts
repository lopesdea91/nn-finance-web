import { User } from "@/types/system"
import { authStateSlice } from "./initialState"

const reducers = {
  setUser(state: authStateSlice, action: { payload: User }) {
    state.user = action.payload
  },
}

export default reducers