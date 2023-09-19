import { IFinanceOrigin } from '@/@core/domain/entities/finance-origin'
import { financeOriginObserver, loadingObserver, observer, redirectObserver } from '@/@core/domain/observer'
import { observerKey } from '@/@core/domain/observerKey'
import { financeOriginGatewayV1 } from '@/@core/infra/geteway'
import { handlerRequest, http } from '@/@core/infra/http'

export const pageMethods = {
  onSubmit: async (data: IFinanceOrigin) => {
    await handlerRequest({
      execut: async () => {
        await observer.publish(loadingObserver(true))

        const body = {
          description: data.description,
          typeId: data.typeId,
          walletId: data.walletId,
          parentId: data.parentId
        }

        const result = !!data.id
          ? await financeOriginGatewayV1(http).put(Number(data.id), body)
          : await financeOriginGatewayV1(http).post(body)

        await pageMethods.updateStore()

        await observerKey.publish('feedbackForm', {
          type: 'success',
          message: result.data.message
        })
      },
      catch: async () => {
        await observerKey.publish('feedbackForm', {
          type: 'error',
          message: 'Algo de errado não esta certo!'
        })
      },
      finally: async () => {
        await observer.publish(loadingObserver(false))
      }
    })
  },
  onDelete: async (id: number) => {
    await handlerRequest({
      execut: async () => {
        observer.publish(loadingObserver(true))

        const result = await financeOriginGatewayV1(http).remove(id)

        await pageMethods.updateStore()

        await observerKey.publish('feedbackForm', {
          type: 'success',
          message: result.data.message
        })

        await observer.publish(redirectObserver('/finance/origin'))
      },
      catch: async () => {
        await observerKey.publish('feedbackForm', {
          type: 'error',
          message: 'Algo de errado não esta certo!'
        })
      },
      finally: async () => {
        await observer.publish(loadingObserver(false))
      }
    })
  },
  onRestore: async (id: number) => {
    await handlerRequest({
      execut: async () => {
        observer.publish(loadingObserver(true))

        const result = await financeOriginGatewayV1(http).restore(id)

        await pageMethods.updateStore()

        await observerKey.publish('feedbackForm', {
          type: 'success',
          message: result.data.message
        })
      },
      catch: async () => {
        await observerKey.publish('feedbackForm', {
          type: 'error',
          message: 'Algo de errado não esta certo!'
        })
      },
      finally: async () => {
        await observer.publish(loadingObserver(false))
      }
    })
  },
  updateStore: async () => {
    await handlerRequest({
      execut: async () => {
        const { data } = await financeOriginGatewayV1(http).get()
        observer.publish(financeOriginObserver(data))
      }
    })
  }
}
