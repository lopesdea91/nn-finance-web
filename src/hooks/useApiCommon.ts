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

    const removeToken = () => {
        window.localStorage.removeItem(nameToken)
    }

    return {
        token,
        setToken,
        removeToken
    }
}

export default useApiCommon