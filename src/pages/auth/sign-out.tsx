import useApiCommon from "@/hooks/useApiCommon"
import useSystemStore from "@/hooks/useSystemStore"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Page = () => {
  const router = useRouter()
  const { signOutSystem } = useSystemStore()
  const { removeToken } = useApiCommon()


  useEffect(() => {
    signOutSystem()

    removeToken()

    router.push('/auth/sign-in');
  }, [])

  return <div></div>
}

export default Page