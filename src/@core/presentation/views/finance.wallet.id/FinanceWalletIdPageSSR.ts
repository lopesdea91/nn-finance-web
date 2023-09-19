import { ContextSSR, DataSSR } from '@/types/system'
import { PageProps } from './FinanceWalletIdPage.type'
import { handlerRequestSSR, http } from '@/@core/infra/http'
import { authCookie } from '@/@core/infra/memory'
import { financeWalletGatewayV1 } from '@/@core/infra/geteway'
import { checkParamIdIsNew, checkParamIdSSR } from '@/@core/utils'

export const FinanceWalletIdPageSSR = async (ctx: ContextSSR) => {
  const dataSSR: DataSSR<PageProps> = {
    props: {
      item: {
        id: 0,
        description: '',
        panel: 0
      },
      periods: []
    }
  }

  if (checkParamIdIsNew(ctx.params)) {
    return dataSSR
  }

  if (checkParamIdSSR(ctx.params)) {
    dataSSR.redirect = {
      destination: '/finance/wallet',
      permanent: false
    }
    return dataSSR
  }

  return await handlerRequestSSR(dataSSR, async () => {
    http.setToken(authCookie.setContext(ctx).hasCookie().getToken())

    const id = Number(ctx.params?.id)

    const resultWallet = await financeWalletGatewayV1(http).id(id)

    dataSSR.props.item.id = resultWallet.data.id
    dataSSR.props.item.description = resultWallet.data.description
    dataSSR.props.item.panel = resultWallet.data.panel
    dataSSR.props.item.trashed = resultWallet.data.trashed

    const resultPeriods = await financeWalletGatewayV1(http).periodsData(id)

    dataSSR.props.periods = resultPeriods.data

    return dataSSR
  })
}
