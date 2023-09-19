import { ContextSSR, DataSSR } from '@/types/system'
import { authCookie } from '@/@core/infra/memory'
import { PageProps } from './FinanceWalletListPage.type'
import { financeWalletGatewayV1 } from '@/@core/infra/geteway'
import { handlerRequestSSR, http } from '@/@core/infra/http'
import { financeWalletCookie } from '@/@core/infra/memory/cookie'

export const FinanceWalletListPageSSR = async (ctx: ContextSSR) => {
  const dataSSR: DataSSR<PageProps> = {
    props: {
      items: []
    }
  }

  return await handlerRequestSSR<PageProps>(dataSSR, async () => {
    http.setToken(authCookie.setContext(ctx).hasCookie().getToken())

    const search = financeWalletCookie.setContext(ctx).hasCookie().get()

    const resultItemsHitosry = await financeWalletGatewayV1(http).page(search)

    dataSSR.props.items = resultItemsHitosry.data.items

    return dataSSR
  })
}
