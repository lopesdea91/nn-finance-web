import { loadingObserver, observer } from '@/@core/domain/observer'
import { observerKey } from '@/@core/domain/observerKey'
import { financeTagGatewayV1 } from '@/@core/infra/geteway'
import { handlerRequest, http } from '@/@core/infra/http'
import { financeTagCookie } from '@/@core/infra/memory'

export const pageMethods = {
  getItems: async (params: Object = {}) => {
    await handlerRequest({
      execut: async () => {
        await observer.publish(loadingObserver(true))

        const search = financeTagCookie.get()
  
        const resultItemsHitosry = await financeTagGatewayV1(http).page({ ...search, ...params })
  
        await observerKey.publish('tableTag', resultItemsHitosry.data.items)
      },
      finally: async () => {
        await observer.publish(loadingObserver(false))
      }
    })
  }
}
