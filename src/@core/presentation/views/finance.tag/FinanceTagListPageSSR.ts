import { ContextSSR, DataSSR } from '@/types/system'
import { authCookie } from '@/@core/infra/memory'
import { PageProps } from './FinanceTagListPage.type'
import { financeTagGatewayV1 } from '@/@core/infra/geteway'
import { handlerRequestSSR, http } from '@/@core/infra/http'
import { financeTagCookie } from '@/@core/infra/memory/cookie/FinanceTagCookie'

export const FinanceTagListPageSSR = async (ctx: ContextSSR) => {
  const dataSSR: DataSSR<PageProps> = {
    props: {
      items: []
    }
  }

  return await handlerRequestSSR<PageProps>(dataSSR, async () => {
    http.setToken(authCookie.setContext(ctx).hasCookie().getToken())

    const search = financeTagCookie.setContext(ctx).hasCookie().get()

    const resultItemsHitosry = await financeTagGatewayV1(http).page(search)

    dataSSR.props.items = resultItemsHitosry.data.items

    return dataSSR
  })
}
