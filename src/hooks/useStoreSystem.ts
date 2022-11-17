import appStore from "@/store/AppStore";
import { SystemUser } from "@/types/storeApp";
import { computed } from "vue";

interface SignInProps {
    user: SystemUser
    period: string
}
export default function useStoreSystem() {

    const token = computed(() => {
        return window.localStorage.getItem('nn-finance') || ''
    })

    const setToken = async (t: string) => {
        new Promise(() => {
            window.localStorage.setItem('nn-finance', t)
        })
    }

    const signIn = async ({ user, period }: SignInProps) => {
        new Promise(() => {
            appStore.actions.setUser(user);
            appStore.actions.setPeriod(period);
            appStore.actions.setLogin(true);
        })
    }

    return {
        token: token.value,
        setToken,
        signIn
    }
}