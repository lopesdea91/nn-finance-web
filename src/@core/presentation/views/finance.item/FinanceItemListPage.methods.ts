import { loadingObserver, observer } from '@/@core/domain/observer'
import { observerKey } from '@/@core/domain/observerKey'
import { financeItemGatewayV1 } from '@/@core/infra/geteway'
import { handlerCatchError, http } from '@/@core/infra/http'
import { financeItemCookie } from '@/@core/infra/memory'

export const pageMethods = {
  getItems: async (params: Object = {}) => {
    try {
      await observer.publish(loadingObserver(true))

      // await new Promise((res) => setTimeout(res, 2500))

      const search = financeItemCookie.get()

      // if (!search) throw Error('422')

      const resultItemsHitosry = await financeItemGatewayV1(http).page({
        ...search,
        ...params,
        tagIds: search?.tagIds?.map((e) => e.id)
      })

      await observerKey.publish('tableItem', resultItemsHitosry.data.items)
    } catch (err) {
      handlerCatchError(err)
    } finally {
      await observer.publish(loadingObserver(false))
    }
  }
}
