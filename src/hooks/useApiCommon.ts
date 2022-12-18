// const KEY_TOKEN = import.meta.env.VITE_KEY_TOKEN

export type NameApi = 'finance'

const useApiCommon = (name: NameApi = 'finance') => {
    const inClient = typeof window !== "undefined"

    const namesApi = {
        finance: String(process.env.NEXT_PUBLIC_KEY_TOKEN_FINANCE)
    }
    const nameToken = namesApi[name]

    const token = inClient ? window.localStorage.getItem(nameToken) : ''

    const setToken = (t: string) => {
        if (inClient) {
            window.localStorage.setItem(nameToken, t)
        }
    }

    return {
        token,
        setToken
    }
}

export default useApiCommon