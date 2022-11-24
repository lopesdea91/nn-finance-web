import { reactive, readonly } from 'vue'

interface State {
    menuOpen: boolean,
}

const _state = reactive<State>({
    menuOpen: false,
})

const state = readonly(_state)

const actions = {
    setMenu: (newValue: boolean) => {
        _state.menuOpen = newValue
    },
    resetMenu: () => {
        _state.menuOpen = false
    },
    resizeOn: () => {
        window.addEventListener("resize", actions.resetMenu);
    },
    resizeOff: () => {
        window.removeEventListener("resize", actions.resetMenu);
    }
}

export default { state, actions }