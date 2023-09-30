import {
  financeOriginObserver,
  financeOriginTypeObserver,
  financeStatusObserver,
  financeTagObserver,
  financeTypeObserver,
  financeWalletObserver,
  loadingObserver,
  observer,
  redirectObserver,
  systemFinanceConsolidationIdObserver,
  systemFinanceWalletIdObserver,
  systemPeriodObserver,
  userObserver
} from '@/@core/domain/observer'
import { authGatewayV1, financeConsolidationGatewayV1, financeGatewayV1, userGatewayV1 } from '@/@core/infra/geteway'
import { handlerLogRequestError, handlerRequest, handlerRequestError, http } from '@/@core/infra/http'
import { appCookie, authCookie, systemCookie } from '@/@core/infra/memory'

export const pageMethods = {
  async onSubmit(fields: { email: string; password: string }) {
    try {
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

      appCookie.up()

      authCookie.set({ token })

      /** fetch userData */
      try {
        const result = await userGatewayV1(http).data()

        const payload = systemCookie.get()?.period || result.data.period

        await observer.publish(systemPeriodObserver(payload))

        await observer.publish(userObserver(result.data.user))
      } catch (error) {
        handlerRequestError(error)('Erro ao buscar userData')
      }

      /** fetch financeData */
      try {
        const result = await financeGatewayV1(http).data()

        await observer.publish(financeWalletObserver(result.data.wallet))

        await observer.publish(financeOriginObserver(result.data.origin))

        await observer.publish(financeTagObserver(result.data.tag))

        await observer.publish(financeTypeObserver(result.data.type))

        await observer.publish(financeStatusObserver(result.data.status))

        await observer.publish(financeOriginTypeObserver(result.data.originType))

        const payload = (systemCookie.getByKey('financeWalletId') || result.data.walletPanel.id) as number

        await observer.publish(systemFinanceWalletIdObserver(payload))
      } catch (error) {
        handlerRequestError(error)('Erro ao buscar financeData')
      }

      /** fetch consolidation */
      try {
        const period = systemCookie.get()?.period

        if (!period) {
          alert('nao tem periodo')
        }

        const financeWalletId = systemCookie.getByKey('financeWalletId') as number

        const resultFinanceConsolidation = await financeConsolidationGatewayV1(http).monthConsolidation({
          period: period,
          walletId: financeWalletId
        })

        const payload = (systemCookie.getByKey('financeConsolidationId') ||
          resultFinanceConsolidation.data.consolidationId) as number

        await observer.publish(systemFinanceConsolidationIdObserver(payload))
      } catch (error) {
        handlerRequestError(error)('Erro ao buscar consolidationData')
      }

      await observer.publish(redirectObserver('/home'))
    } catch (error) {
      handlerLogRequestError(error)
    } finally {
      await observer.publish(loadingObserver(false))
    }
  }
}
