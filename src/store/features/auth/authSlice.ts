import { createSlice } from '@reduxjs/toolkit'
import { User } from '@/types/system'

export interface IState {
	user: User
}

const initialState: IState = {
	user: {
		id: null,
		name: '',
		email: ''
	},
}

const slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser(state, action: { payload: User }) {
			state.user = action.payload
		},
	}
})

export default slice.reducer

export const actionsAuthSlice = slice.actions