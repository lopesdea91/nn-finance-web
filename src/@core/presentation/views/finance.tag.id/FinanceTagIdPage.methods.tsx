import { IFinanceTag } from "@/@core/domain/entities/finance-tag"
import { financeTagObserver, loadingObserver, observer, redirectObserver } from "@/@core/domain/observer"
import { observerKey } from "@/@core/domain/observerKey"
import { financeTagGatewayV1 } from "@/@core/infra/geteway"
import { handlerCatchError, handlerRequest, http } from "@/@core/infra/http"
import { IFinanceTypeId } from "@/types/enum"

export const pageMethods = {
  onSubmit: async (data: IFinanceTag) => {
    await handlerRequest({
      execut: async () => {
        await observer.publish(loadingObserver(true))
    
        const body = {
          description: data.description,
          typeId: data.typeId as IFinanceTypeId,
          walletId: data.walletId
        }
    
        const result = !!data.id
          ? await financeTagGatewayV1(http).put(Number(data.id), body)
          : await financeTagGatewayV1(http).post(body)
    
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
  
        const result = await financeTagGatewayV1(http).remove(id)
  
        await pageMethods.updateStore()
  
        await observerKey.publish('feedbackForm', {
          type: 'success',
          message: result.data.message
        })
  
        await observer.publish(redirectObserver('/finance/tag'))
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
  
        const result = await financeTagGatewayV1(http).restore(id)
  
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
        const { data } = await financeTagGatewayV1(http).get()
        observer.publish(financeTagObserver(data))
      }
    })
  }
}