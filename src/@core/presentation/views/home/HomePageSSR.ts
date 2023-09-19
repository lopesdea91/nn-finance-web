import { ContextSSR, DataSSR } from '@/types/system'
import { systemCookie } from '@/@core/infra/memory/cookie/SystemCookie'
import { authCookie } from '@/@core/infra/memory'
import { handlerRequestError, handlerRequestErrorSSR, http } from '@/@core/infra/http'
import { financeConsolidationGatewayV1, financeItemGatewayV1 } from '@/@core/infra/geteway'
import { PageProps } from './HomePage.types'

export const HomePageSSR = async (ctx: ContextSSR) => {
  const dataSSR: DataSSR<PageProps> = {
    props: {
      finance: {
        monthBalance: {
          revenue: 0,
          expense: 0,
          available: 0
        },
        monthComposition: [],
        itemHistory: []
      }
    }
  }

  try {
    http.setToken(authCookie.setContext(ctx).getToken())
    
    const { financeConsolidationId, financeWalletId } = systemCookie.setContext(ctx).get()

    try {
      const resultMonthBalance = await financeConsolidationGatewayV1(http).monthBalance({
        consolidationId: financeConsolidationId,
        walletId: financeWalletId
      })

      dataSSR.props.finance.monthBalance = resultMonthBalance.data
    } catch (error) {
      handlerRequestError(error)
    }

    try {
      const resultMonthComposition = await financeConsolidationGatewayV1(http).monthComposition({
        consolidationId: financeConsolidationId,
        walletId: financeWalletId
      })

      dataSSR.props.finance.monthComposition = resultMonthComposition.data
    } catch (error) {
      handlerRequestError(error)
    }

    try {
      const resultItemsHitosry = await financeItemGatewayV1(http).page({
        walletId: financeWalletId,
        page: 1,
        limit: 15,
        order: 'updated',
        sort: 'desc'
      })

      dataSSR.props.finance.itemHistory = resultItemsHitosry.data.items
    } catch (error) {
      handlerRequestError(error)
    }
  } catch (error) {
    if (handlerRequestErrorSSR(error)) {
      dataSSR.redirect = {
        destination: '/auth/signIn',
        permanent: false
      }
    }
  }

  return dataSSR
}
