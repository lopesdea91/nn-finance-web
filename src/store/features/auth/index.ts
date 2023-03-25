import { createSlice } from '@reduxjs/toolkit'

import initialState from './initialState'
import reducers from './reducers'

const slice = createSlice({
	name: 'auth',
	initialState,
	reducers
})

export default slice.reducer

export const actionsAuthSlice = slice.actions