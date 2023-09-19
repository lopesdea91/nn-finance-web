import { loadingObserver, observer } from '@/@core/domain/observer'
import { observerKey } from '@/@core/domain/observerKey'
import { financeOriginGatewayV1 } from '@/@core/infra/geteway'
import { handlerRequest, http } from '@/@core/infra/http'
import { financeOriginCookie } from '@/@core/infra/memory'

export const pageMethods = {
  getItems: async (params: Object = {}) => {
    await handlerRequest({
      execut: async () => {
        await observer.publish(loadingObserver(true))

        const search = financeOriginCookie.get()

        const resultItemsHitosry = await financeOriginGatewayV1(http).page({ ...search, ...params })

        await observerKey.publish('tableOrigin', resultItemsHitosry.data.items)
      },
      finally: async () => {
        await observer.publish(loadingObserver(false))
      }
    })
  }
}
