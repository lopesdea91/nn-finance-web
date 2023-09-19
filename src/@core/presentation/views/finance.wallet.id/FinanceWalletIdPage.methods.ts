import { IFinanceWallet } from '@/@core/domain/entities/finance-wallet'
import { financeWalletObserver, loadingObserver, observer, redirectObserver } from '@/@core/domain/observer'
import { observerKey } from '@/@core/domain/observerKey'
import { financeConsolidationGatewayV1, financeWalletCompositionGatewayV1, financeWalletGatewayV1 } from '@/@core/infra/geteway'
import { handlerRequest, http } from '@/@core/infra/http'

export const pageMethods = {
  onSubmit: async (data: IFinanceWallet) => {
    await handlerRequest({
      execut: async () => {
        await observer.publish(loadingObserver(true))

        const body = {
          description: data.description,
          panel: data.panel
        }

        const result = !!data.id
          ? await financeWalletGatewayV1(http).put(Number(data.id), body)
          : await financeWalletGatewayV1(http).post(body)

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

        const result = await financeWalletGatewayV1(http).remove(id)

        await pageMethods.updateStore()

        await observerKey.publish('feedbackForm', {
          type: 'success',
          message: result.data.message
        })

        await observer.publish(redirectObserver('/finance/wallet'))
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

        const result = await financeWalletGatewayV1(http).restore(id)

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
        const { data } = await financeWalletGatewayV1(http).get()
        observer.publish(financeWalletObserver(data))
      }
    })
  },
  consolidationPeriod: async (period: string, walletId: number) => {
    await handlerRequest({
      execut: async () => {
        observer.publish(loadingObserver(true))

        await financeConsolidationGatewayV1(http).processMonth({ period, walletId })

        await observerKey.publish('feedbackConsolidation', {
          type: 'success',
          message: 'periodo consolidado!'
        })
      },
      catch: async () => {
        await observerKey.publish('feedbackConsolidation', {
          type: 'error',
          message: 'Algo de errado não esta certo!'
        })
      },
      finally: async () => {
        await observer.publish(loadingObserver(false))
      }
    })
  }
}
