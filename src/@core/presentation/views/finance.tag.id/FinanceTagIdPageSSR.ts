import { ContextSSR, DataSSR } from '@/types/system'
import { PageProps } from './FinanceTagIdPage.type'
import { handlerRequestSSR, http } from '@/@core/infra/http'
import { authCookie } from '@/@core/infra/memory'
import { financeTagGatewayV1 } from '@/@core/infra/geteway'
import { checkParamIdIsNew, checkParamIdSSR } from '@/@core/utils'

export const FinanceTagIdPageSSR = async (ctx: ContextSSR) => {
  const dataSSR: DataSSR<PageProps> = {
    props: {
      item: {
        id: 0,
        description: '',
        typeId: 0,
        walletId: 0
      }
    }
  }

  if (checkParamIdIsNew(ctx.params)) {
    return dataSSR
  }

  if (checkParamIdSSR(ctx.params)) {
    dataSSR.redirect = {
      destination: '/finance/tag',
      permanent: false
    }
    return dataSSR
  }

  return await handlerRequestSSR(dataSSR, async () => {
    http.setToken(authCookie.setContext(ctx).getToken())
  
    const id = Number(ctx.params?.id)
  
    const { data } = await financeTagGatewayV1(http).id(id)
  
    dataSSR.props.item.id = data.id
    dataSSR.props.item.description = data.description
    dataSSR.props.item.typeId = data.typeId
    dataSSR.props.item.walletId = data.walletId
    dataSSR.props.item.trashed = data.trashed

    return dataSSR
  })
}
