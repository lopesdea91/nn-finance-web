import useApiCommon from "@/hooks/useApiCommon";
import useSystemStore from "@/hooks/useSystemStore"
import api from "@/services/api";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode
}
const LoadingInitial = ({ children }: Props) => {
  const isReady = useRef(true)
  const router = useRouter()
  const { token } = useApiCommon()
  const { state, layoutIsReady, signInSystem } = useSystemStore()

  const dataUser = useCallback(async () => {
    try {
      const resultDataUser = await api.user.data();

      if (!resultDataUser.status) {
        return;
      }

      signInSystem({
        user: resultDataUser.data.user,
        period: resultDataUser.data.period
      })

      if (
        router.asPath === '/' ||
        router.asPath === '/auth/sign-in' ||
        router.asPath === '/dashboard'
      ) {
        router.push('/dashboard');
      }

    } catch (error) {
      router.push('/auth/sign-in');
    }
  }, [])

  useEffect(() => {
    if (isReady.current) {
      token
        ? dataUser()
        : router.push('/auth/sign-in')

      layoutIsReady()

      isReady.current = false
    }
  }, [])

  return state.layoutPending
    ? <div className="vw-100 vh-100 d-flex align-items-center justify-content-center">'Loading initial'</div>
    : <>
      {children}
    </>
}

export { LoadingInitial }
