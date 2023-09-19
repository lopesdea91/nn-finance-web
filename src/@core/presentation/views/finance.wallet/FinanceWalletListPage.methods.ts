import { loadingObserver, observer } from '@/@core/domain/observer'
import { observerKey } from '@/@core/domain/observerKey'
import { financeWalletGatewayV1 } from '@/@core/infra/geteway'
import { handlerRequest, http } from '@/@core/infra/http'
import { financeWalletCookie } from '@/@core/infra/memory'

export const pageMethods = {
  getItems: async (params: Object = {}) => {
    await handlerRequest({
      execut: async () => {
        await observer.publish(loadingObserver(true))

        const search = financeWalletCookie.hasCookie().get()

        const resultItemsHitosry = await financeWalletGatewayV1(http).page({ ...search, ...params })

        await observerKey.publish('tableWallet', resultItemsHitosry.data.items)
      },
      finally: async () => {
        await observer.publish(loadingObserver(false))
      }
    })
  }
}
