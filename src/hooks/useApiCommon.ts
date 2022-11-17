const KEY_TOKEN = import.meta.env.VITE_KEY_TOKEN

export default () => {
    const token = window.localStorage.getItem(KEY_TOKEN)

    const setToken = async (t: string) => {
        new Promise(() => {
            window.localStorage.setItem(KEY_TOKEN, t)
        })
    }

    return {
        token,
        setToken
    }
}