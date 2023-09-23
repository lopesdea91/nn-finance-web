import React, { useCallback } from 'react'
import { redirectObserver, observer } from '@/@core/domain/observer'
import { handlerCatchError, http } from '@/@core/infra/http'
import { appCookie, authCookie } from '@/@core/infra/memory'
import { authService } from '@/@core/service/authService'
import { useRouter } from 'next/router'

export const usePrepareStore = () => {
  const router = useRouter()
  const [isPending, setStatus] = React.useState<boolean>(true)

  const handler = useCallback(async () => {
    const token = authCookie.getByKey('token')
    const routeCurrent = router.pathname

    try {
      if (!token) throw Error('unauthenticated')

      http.setToken(token)

      appCookie.up()

      await authService.signIn()

      // if(routeCurrent)
      // await observer.publish(new redirectObserver('/home'))
    } catch (err) {
      handlerCatchError(err)
    }

    setTimeout(() => setStatus(false), 1250)
  }, [])

  React.useEffect(() => {
    handler()
  }, [handler])

  return { isPending }
}
