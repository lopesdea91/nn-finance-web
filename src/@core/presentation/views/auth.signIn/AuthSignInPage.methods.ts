import { loadingObserver, observer, redirectObserver } from '@/@core/domain/observer'
import { authGatewayV1 } from '@/@core/infra/geteway'
import { handlerRequest, http } from '@/@core/infra/http'
import { appCookie, authCookie } from '@/@core/infra/memory'
import { authService } from '@/@core/service/authService'

export const pageMethods = {
  async onSubmit(fields: { email: string; password: string }) {
    handlerRequest({
      execut: async () => {
        await observer.publish(loadingObserver(true))

        const result = await authGatewayV1(http).signIn({
          email: fields.email,
          password: fields.password
        })

        if (result.status !== 201) {
          throw Error('Email ou senha Inválido')
        }

        const { token } = result.data

        http.setToken(token)

        authCookie.setToken(token)

        appCookie.reset()
        appCookie.init()

        await authService.signIn()

        await observer.publish(redirectObserver('/home'))
      },
      finally: async () => {
        await observer.publish(loadingObserver(false))
      }
    })
  }
}
