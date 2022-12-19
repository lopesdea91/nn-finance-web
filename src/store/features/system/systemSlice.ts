import { User } from '@/types/system'
import { createSlice } from '@reduxjs/toolkit'

export interface IState {
    layoutPending: boolean,
    user: User,
    period: string,
    login: boolean,
}

const initialState: IState = {
    layoutPending: true,
    user: {
        id: null,
        name: '',
        email: ''
    },
    period: '',
    login: false,
}

const slice = createSlice({
    name: 'system',
    initialState,
    reducers: {
        layoutDone(state) {
            state.layoutPending = false
        },
        signIn(state, { payload: { user, period } }: { payload: { user: User, period: string } }) {
            state.login = true
            state.user = user
            state.period = period
        },
        signOut(state) {
            state.login = false
            state.user = {
                id: null,
                name: '',
                email: ''
            }
            state.period = ''
        },
    }
})

export default slice.reducer

export const {
    layoutDone,
    signIn,
    signOut
} = slice.actions