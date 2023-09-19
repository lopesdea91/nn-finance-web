import { loadingObserver, observer, redirectObserver } from '@/@core/domain/observer'
import { observerKey } from '@/@core/domain/observerKey'
import { financeItemGatewayV1 } from '@/@core/infra/geteway'
import { handlerCatchError, http } from '@/@core/infra/http'
import { FinanceItemRepeat, IFinanceStatusId, IFinanceTypeId } from '@/types/enum'

export const pageMethods = {
  onSubmit: async (data: onSubmitData) => {
    try {
      await observer.publish(loadingObserver(true))

      const body = {
        value: data.value,
        date: data.date,
        sort: data.sort,
        balance: 1 as (1 | 0),
        obs: data.obs,
        originId: data.originId as number,
        statusId: data.statusId as IFinanceStatusId,
        tagIds: data.tagIds.map((e) => e.id),
        typeId: data.typeId as IFinanceTypeId,
        walletId: data.walletId as number,
        repeat: 'UNIQUE' as FinanceItemRepeat
      }

      const result = !!data.id
        ? await financeItemGatewayV1(http).put(Number(data.id), body)
        : await financeItemGatewayV1(http).post(body)

      await observerKey.publish('feedbackForm', {
        type: 'success',
        message: result.data.message
      })
    } catch (error) {
      handlerCatchError(error)

      await observerKey.publish('feedbackForm', {
        type: 'error',
        message: 'Algo de errado não esta certo!'
      })
    } finally {
      await observer.publish(loadingObserver(false))
    }
  },
  onDelete: async (id: number) => {
    try {
      observer.publish(loadingObserver(true))

      const result = await financeItemGatewayV1(http).remove(id)

      await observerKey.publish('feedbackForm', {
        type: 'success',
        message: result.data.message
      })

      await observer.publish(redirectObserver('/finance/tag'))
    } catch (error) {
      handlerCatchError(error)

      await observerKey.publish('feedbackForm', {
        type: 'error',
        message: 'Algo de errado não esta certo!'
      })
    } finally {
      await observer.publish(loadingObserver(false))
    }
  },
  onRestore: async (id: number) => {
    try {
      observer.publish(loadingObserver(true))

      const result = await financeItemGatewayV1(http).restore(id)

      await observerKey.publish('feedbackForm', {
        type: 'success',
        message: result.data.message
      })
    } catch (error) {
      handlerCatchError(error)

      await observerKey.publish('feedbackForm', {
        type: 'error',
        message: 'Algo de errado não esta certo!'
      })
    } finally {
      await observer.publish(loadingObserver(false))
    }
  }
}

type onSubmitData = {
  id: number
  value: number
  date: string
  sort: number
  obs?: string
  originId: number
  statusId: number
  typeId: number
  tagIds: {
    id: number
    label: string
  }[]
  walletId: number
}
