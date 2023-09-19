import { ContextSSR, DataSSR } from '@/types/system'
import { authCookie } from '@/@core/infra/memory'
import { PageProps } from './FinanceItemListPage.type'
import { financeItemGatewayV1 } from '@/@core/infra/geteway'
import { handlerRequestError, handlerRequestErrorSSR, http } from '@/@core/infra/http'
import { financeItemCookie } from '@/@core/infra/memory/cookie'

export const FinanceItemListPageSSR = async (ctx: ContextSSR) => {
  const dataSSR: DataSSR<PageProps> = {
    props: {
      items: []
    }
  }

  try {
    http.setToken(authCookie.setContext(ctx).getToken())

    const search = financeItemCookie.setContext(ctx).get()

    if (!search) throw Error('422')

    try {
      const resultItemsHitosry = await financeItemGatewayV1(http).page(search)
      dataSSR.props.items = resultItemsHitosry.data.items
    } catch (error) {
      handlerRequestError(error)
    }
  } catch (err) {
    if (handlerRequestErrorSSR(err)) {
      dataSSR.redirect = {
        destination: '/auth/signIn',
        permanent: false
      }
    }
  }

  return dataSSR
}
