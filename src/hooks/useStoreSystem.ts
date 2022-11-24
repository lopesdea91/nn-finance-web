import { useRouter } from "vue-router";
import appStore from "@/store/AppStore";
import { SystemUser } from "@/types/storeApp";
import useApiCommon from "@/hooks/useApiCommon";
import api from "@/services/api";

interface SignInProps {
    user: SystemUser
    period: string
}

export default function useStoreSystem() {
    const apiCommon = useApiCommon()
    const router = useRouter();

    const signIn = async ({ user, period }: SignInProps) => {
        new Promise(() => {
            appStore.actions.setUser(user);
            appStore.actions.setPeriod(period);
            appStore.actions.setLogin(true);
        })
    }

    const prepareStore = async () => {
        if (!apiCommon.token) {
            router.push('/');
            return;
        }

        /**
         * validar o token
         * - se estiver valido, continua
         * - se não estiver valido, redirecionar para /login
         */

        const resultDataUser = await api.user.data();

        if (!resultDataUser.status) {
            console.log("fazer oo alerta");
            return;
        }

        await signIn({
            user: resultDataUser.data.user,
            period: resultDataUser.data.period,
        });

        router.push({ name: "dashboard" });
    }

    return {
        signIn,
        prepareStore
    }
}