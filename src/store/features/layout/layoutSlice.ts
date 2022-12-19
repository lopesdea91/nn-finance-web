import { createSlice } from '@reduxjs/toolkit'

export interface IState {
  menu: boolean
  loading: boolean
}

const initialState: IState = {
  menu: false,
  loading: false,
}

const slice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setMenu(state, { payload }: { payload: boolean }) {
      state.menu = payload
    },
    setLoading(state, { payload }: { payload: boolean }) {
      state.loading = payload
    },
  }
})

export default slice.reducer

export const {
  setMenu,
  setLoading
} = slice.actions