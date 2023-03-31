import { axiosConfig, AxiosConfigProps } from "@/services/api/config/index"
import { FinanceWallet, FinanceWalletSearch, FinanceWalletConsolidateMonth, FinanceWalletConsolidateMonthPayload, FinanceWalletConsolidateMonthResponse, FinanceWalletPeriodsDataPayload, FinanceWalletPeriodsData, FinanceWalletPeriodsDataResponse, FinanceWalletProcessConsolidateMonthPayload, FinanceWalletProcessConsolidateMonthResponse } from "@/types/entities/finance-wallet"
import { FinanceWalletFormFieldsPost, FinanceWalletFormFieldsPut } from "@/types/form/settingsFinanceWallet"
import { $utils } from "@/utils"
import { ApiPageResponse } from ".."

export const apiFinanceWallet = (props: AxiosConfigProps = {}) => {
  const axios = axiosConfig(props)
  let url = '/v1/finance/wallet'

  return {
    page: async ({ search }: { search?: Partial<FinanceWalletSearch> } = {}) => {
      let error = null
      let code = 200
      let status = false

      let data: ApiPageResponse<FinanceWallet> = {
        items: [],
        page: 1,
        total: 0,
        limit: 15,
        lastPage: 0,
      }

      try {
        const q = $utils.queryString({ _paginate: true, ...search })

        const result = await axios.get<ApiPageResponse<FinanceWallet>>(url + q)

        code = result.status
        status = true

        if (result.status === 200) {
          data.items = result.data.items// .map(parsePageResponse)
          data.page = result.data.page
          data.total = result.data.total
          data.limit = result.data.limit
          data.lastPage = result.data.lastPage
        }
      } catch (err) {
        error = err
        console.log('... err', err);
      }

      return { error, code, status, data }
    },
    get: async ({ search }: { search?: Partial<FinanceWalletSearch> } = {}) => {
      let error = null
      let code = 200
      let status = false
      let data: FinanceWallet[] | null = null

      try {
        const q = $utils.queryString(search)

        const result = await axios.get<FinanceWallet[]>(url + q)

        code = result.status
        status = true

        if (result.status === 200) {
          data = result.data
        }
      } catch (err) {
        error = err
        code = 500
        status = false
      }

      return { error, code, status, data }
    },
    id: async ({ id }: { id: number }) => {
      let error = null
      let code = 200
      let status = false
      let data: FinanceWallet | null = null

      try {
        const result = await axios.get<FinanceWallet>(`${url}/${id}`)

        code = result.status
        status = true

        if (result.status === 200) {
          data = result.data
        }
      } catch (err) {
        error = err
        code = 500
        status = false
      }

      return { error, code, status, data }
    },
    post: async ({ form }: { form: FinanceWalletFormFieldsPost }) => {
      let error = null
      let code = 201
      let status = true
      let data: { message: string } = { message: '' }

      try {
        const result = await axios.post<{ message: string }>(url, form)

        code = result.status
        status = true

        if (result.status === 201) {
          data = result.data
        }

      } catch (err) {
        error = err
        code = 500
        status = false
      }

      return { error, code, status, data }
    },
    put: async ({ id, form }: { id: number, form: FinanceWalletFormFieldsPut }) => {
      url += `/${id}`

      let error = null
      let code = 201
      let status = true
      let data: { message: string } = { message: '' }

      try {
        const result = await axios.put<{ message: string }>(url, form)

        code = result.status
        status = true

        if (result.status === 201) {
          data = result.data
        }

      } catch (err) {
        error = err
        code = 500
        status = false
      }

      return { error, code, status, data }
    },
    remove: async ({ id }: { id: number }) => {
      url += `/${id}`

      let error = null
      let code = 204
      let status = true

      try {
        const result = await axios.delete<{ message: string }>(url)

        code = result.status
        status = true

      } catch (err) {
        error = err
        code = 500
        status = false
      }

      return { error, code, status }
    },
    enabled: async ({ id }: { id: number }) => {
      url += `/${id}/enabled`

      let error = null
      let code = 200
      let status = true

      try {
        const result = await axios.get<{ message: string }>(url)

        code = result.status
        status = true

      } catch (err) {
        error = err
        code = 500
        status = false
      }

      return { error, code, status }
    },
    disabled: async ({ id }: { id: number }) => {
      url += `/${id}/disabled`

      let error = null
      let code = 200
      let status = true

      try {
        const result = await axios.get<{ message: string }>(url)

        code = result.status
        status = true

      } catch (err) {
        error = err
        code = 500
        status = false
      }

      return { error, code, status }
    },
    consolidateMonth: async ({ period, wallet_id }: FinanceWalletConsolidateMonthPayload) => {
      url += '/consolidate-month'
      url += $utils.queryString({ period, wallet_id })

      let error = null
      let code = 200
      let status = false
      let data: FinanceWalletConsolidateMonth = {
        balance: {
          available: '0',
          estimate: '0',
          expense: { value: '0' },
          revenue: { value: '0' }
        },
        status: [],
        tag: [],
        origin: [],
        invoice: [],
      }

      try {
        const result = await axios.get<FinanceWalletConsolidateMonthResponse>(url)

        code = result.status
        status = true

        if (result.status === 200) {
          result.data.balance.available = Number(result.data.balance.available).toFixed(2)
          result.data.balance.estimate = Number(result.data.balance.estimate).toFixed(2)
          result.data.balance.expense.value = Number(result.data.balance.expense.value).toFixed(2)
          result.data.balance.revenue.value = Number(result.data.balance.revenue.value).toFixed(2)

          data.balance = result.data.balance
          data.status = result.data.status.map(el => {

            return el
          })
          data.tag = result.data.tag.map(el => {
            const n = Number(el.sum).toFixed(2)
            el.sum = el.type_id === 1 ? n : `-${n}`

            return el
          })
          data.origin = result.data.origin.map(el => {
            el.sum = Number(el.sum).toFixed(2)
            return el
          })
          data.invoice = result.data.invoice
        }
      }
      catch (err) {
        error = err
      }

      return { error, code, status, data }
    },
    processConsolidateMonth: async ({ form }: FinanceWalletProcessConsolidateMonthPayload) => {
      url += '/consolidate-month'

      let error = null
      let code = 200
      let status = false
      let data: FinanceWalletProcessConsolidateMonthResponse = {
        message: ''
      }

      try {
        const result = await axios.post<FinanceWalletProcessConsolidateMonthResponse>(url, form)

        code = result.status
        status = true

        if (result.status === 200) {
          data.message
        }
      }
      catch (err) {
        error = err
      }

      return { error, code, status, data }
    },
    periodsData: async ({ wallet_id, format }: FinanceWalletPeriodsDataPayload) => {
      url += '/periods-data'
      url += $utils.queryString({ wallet_id, format })

      let error = null
      let code = 200
      let status = false
      let data: FinanceWalletPeriodsData[] = []

      try {
        const result = await axios.get<FinanceWalletPeriodsDataResponse>(url)

        code = result.status
        status = true

        if (result.status === 200) {
          data = result.data.items
        }
      }
      catch (err) {
        error = err
      }

      return { error, code, status, data }
    }
  }
}