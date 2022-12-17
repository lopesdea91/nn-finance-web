import { createSlice } from '@reduxjs/toolkit'

export interface IState {
  menu: boolean
}

const initialState: IState = {
  menu: false
}

const slice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    menuSet(state, { payload }: { payload: boolean }) {
      state.menu = payload
    },
  }
})

export default slice.reducer

export const {
  menuSet
} = slice.actions