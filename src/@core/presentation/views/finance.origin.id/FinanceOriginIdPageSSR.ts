import { ContextSSR, DataSSR } from '@/types/system'
import { PageProps } from './FinanceOriginIdPage.type'
import { handlerRequestErrorSSR, http } from '@/@core/infra/http'
import { authCookie } from '@/@core/infra/memory'
import { financeOriginGatewayV1 } from '@/@core/infra/geteway'

export const FinanceOriginIdPageSSR = async (ctx: ContextSSR) => {
  const dataSSR: DataSSR<PageProps> = {
    props: {
      item: {
        id: 0,
        description: '',
        parentId: 0,
        typeId: 0,
        walletId: 0
      }
    }
  }

  if (ctx.params?.id === 'new') {
    return dataSSR
  }

  if (ctx.params?.id && !Number.isInteger(+ctx.params?.id)) {
    dataSSR.redirect = {
      destination: '/finance/origin',
      permanent: false
    }
    return dataSSR
  }

  try {
    http.setToken(authCookie.setContext(ctx).getToken())

    const id = Number(ctx.params?.id)

    const { data } = await financeOriginGatewayV1(http).id(id)

    dataSSR.props.item.id = data.id
    dataSSR.props.item.description = data.description
    dataSSR.props.item.parentId = data.parentId
    dataSSR.props.item.typeId = data.typeId
    dataSSR.props.item.walletId = data.walletId
    dataSSR.props.item.trashed = data.trashed
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
