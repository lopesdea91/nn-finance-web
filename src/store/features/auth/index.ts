import { createSlice } from '@reduxjs/toolkit'

import initialState from './initialState'
import reducers from './reducers'

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers
})

export const actionsAuthSlice = authSlice.actions