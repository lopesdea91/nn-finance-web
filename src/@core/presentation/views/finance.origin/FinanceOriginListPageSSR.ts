import { ContextSSR, DataSSR } from '@/types/system'
import { authCookie } from '@/@core/infra/memory'
import { PageProps } from './FinanceOriginListPage.type'
import { financeOriginGatewayV1 } from '@/@core/infra/geteway'
import { handlerRequestSSR, http } from '@/@core/infra/http'
import { financeOriginCookie } from '@/@core/infra/memory/cookie'

export const FinanceOriginListPageSSR = async (ctx: ContextSSR) => {
  const dataSSR: DataSSR<PageProps> = {
    props: {
      items: []
    }
  }

  return await handlerRequestSSR<PageProps>(dataSSR, async () => {
    http.setToken(authCookie.setContext(ctx).hasCookie().getToken())

    const search = financeOriginCookie.setContext(ctx).hasCookie().get()

    const resultItemsHitosry = await financeOriginGatewayV1(http).page(search)

    dataSSR.props.items = resultItemsHitosry.data.items

    return dataSSR
  })
}
