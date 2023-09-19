import { ContextSSR, DataSSR } from '@/types/system'
import { PageProps } from './FinanceItemIdPage.types'
import { handlerRequestErrorSSR, http } from '@/@core/infra/http'
import { authCookie } from '@/@core/infra/memory'
import { financeItemGatewayV1 } from '@/@core/infra/geteway'

export const FinanceItemIdPageSSR = async (ctx: ContextSSR) => {
  const dataSSR: DataSSR<PageProps> = {
    props: {
      item: {
        id: 0,
        value: 0,
        date: '',
        sort: 0,
        obs: '',
        // origin?: IFinanceOriginShort
        originId: null,
        // status?: IFinanceStatus
        statusId: null,
        // type?: IFinanceType
        typeId: null,
        tagIds: [],
        // wallet?: IFinanceWalletShort
        walletId: null
        // trashed?: boolean
      }
    }
  }

  if (ctx.params?.id === 'new') {
    return dataSSR
  }

  if (ctx.params?.id && !Number.isInteger(+ctx.params?.id)) {
    dataSSR.redirect = {
      destination: '/finance/item',
      permanent: false
    }
    return dataSSR
  }

  try {
    http.setToken(authCookie.setContext(ctx).getToken())

    const id = Number(ctx.params?.id)

    const { data } = await financeItemGatewayV1(http).id(id)

    dataSSR.props.item = data
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
