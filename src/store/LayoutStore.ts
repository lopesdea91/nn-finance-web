import { reactive, readonly } from 'vue'

interface State {
    menuOpen: boolean,
}

const _state = reactive<State>({
    menuOpen: false,
})

const state = readonly(_state)

const actions = {
}

export default { state, actions }