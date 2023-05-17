import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const AuthSignOutPage = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/auth/sign-in')
    }, 250)
  }, [])

  return null
}

