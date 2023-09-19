import {
  redirectObserver,
  financeOriginObserver,
  financeOriginTypeObserver,
  financeStatusObserver,
  financeTagObserver,
  financeTypeObserver,
  financeWalletObserver,
  observer,
  userObserver,
  systemFinanceConsolidationIdObserver,
  systemFinanceWalletIdObserver,
  systemPeriodObserver
} from '../domain/observer'
import { financeConsolidationGatewayV1, financeGatewayV1, userGatewayV1 } from '../infra/geteway'
import { handlerRequestError, http } from '../infra/http'
import { appCookie, systemCookie } from '../infra/memory'

export const authService = {
  signIn: async () => {
    /** fetch userData */
    try {
      const result = await userGatewayV1(http).data()

      await observer.publish(systemPeriodObserver((systemCookie.getByKey('period') || result.data.period) as string))

      await observer.publish(userObserver(result.data.user))
    } catch (err) {
      handlerRequestError(err)('Erro ao buscar userData')
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
    } catch (err) {
      handlerRequestError(err)('Erro ao buscar financeData')
    }

    /** fetch consolidation */
    try {
      const period = systemCookie.getByKey('period') as string

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
    } catch (err) {
      handlerRequestError(err)('Erro ao buscar consolidationData')
    }
  },

  signOut: async () => {
    appCookie.reset()

    await new Promise((res) => setTimeout(res, 750))

    await observer.publish(redirectObserver('/auth/signIn'))
  }
}
