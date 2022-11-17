import { reactive, readonly } from 'vue'
import { SystemUser } from '@/types/storeApp'

interface State {
    login: boolean,
    // token: string,
    period: string,
    user: {
        id: number,
        name: string,
        email: string
    }
}

const _state = reactive<State>({
    login: false,
    // token: '',
    period: '',
    user: {
        id: 0,
        name: '',
        email: ''
    }
})

const state = readonly(_state)

const actions = {
    setUser(user: SystemUser) {
        _state.user.id = user.id
        _state.user.name = user.name
        _state.user.email = user.email
    },
    // setToken(token: string){
    //     _state.token = token
    // },
    setPeriod(p: string) {
        _state.period = p
    },
    setLogin(value: boolean) {
        _state.login = value
    },
    retStore() {
        _state.login = false
        // _state.token = ''
        _state.user.id = 0
        _state.user.name = ''
        _state.user.email = ''
    },
}

export default { state, actions }