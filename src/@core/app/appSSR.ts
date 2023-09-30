import App, { AppContext, AppInitialProps } from 'next/app'
import { IAppInitialData } from './app.types'
import { authCookie } from '../infra/memory'
import { http } from '../infra/http'
import { financeConsolidationGatewayV1, financeGatewayV1, userGatewayV1 } from '../infra/geteway'

export const MyAppSSR = async (appcontext: AppContext): Promise<AppInitialProps & { pageInitialData: IAppInitialData }> => {
  let initialData: IAppInitialData = {
    period: '',
    financeWalletId: 0,
    financeConsolidationId: 0,
    user: {
      id: 0,
      name: '',
      email: ''
  },
    finance: {
      wallet: [],
      origin: [],
      tag: [],
      status: [],
      type: [],
      originType: []
    }

  }
  
  const ctx = await App.getInitialProps(appcontext)

  const token = authCookie.setContext(appcontext.ctx).get()?.token

  if (!!token) {
    http.setToken(token)

    /** requests */
    const resultUser = await userGatewayV1(http).data()

    const resultFinance = await financeGatewayV1(http).data()

    const resultFinanceConsolidation = await financeConsolidationGatewayV1(http).monthConsolidation({
      period: resultUser.data.period,
      walletId: resultFinance.data.walletPanel.id
    })

    /** system data */
    initialData.period = resultUser.data.period
    initialData.financeWalletId = resultFinance.data.walletPanel.id
    initialData.financeConsolidationId = resultFinanceConsolidation.data.consolidationId

    /** user data */
    initialData.user = resultUser.data.user

    /** finance data */
    initialData.finance.wallet = resultFinance.data.wallet
    initialData.finance.origin = resultFinance.data.origin
    initialData.finance.tag = resultFinance.data.tag
    initialData.finance.type = resultFinance.data.type
    initialData.finance.status = resultFinance.data.status
    initialData.finance.originType = resultFinance.data.originType
  }

  return {
    ...ctx,
    pageInitialData: initialData
  }
}
