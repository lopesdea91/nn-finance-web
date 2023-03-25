import { axiosConfig, AxiosConfigProps } from "@/services/api/config/index"
import { baseApi } from "@/services/api/base"
import { FinanceStatusId } from "@/types/enum"
import { FinanceItem } from "@/types/entities/finance-item"
import { $utils } from "@/utils"
import { FinanceExtractFormSearchFields } from "@/types/form/financeExtract"
import { ApiPageResponse } from ".."
import { FinanceItemFormFieldsPost, FinanceItemFormFieldsPut } from "@/types/form/financeItem"
import dayjs from "dayjs"

export const apiFinanceItem = (props: AxiosConfigProps = {}) => {
  const axios = axiosConfig(props)
  let url = '/v1/finance/item'

  return {
    // get({ search, params }: { search?: Partial<Record<string, string | number>>, params?: Record<string, string | number> } = {}) {
    //   const q = $utils.queryString({ ...search, ...params })

    //   return axios.get<FinanceItem[]>(url + q)
    // },
    page: async ({ search }: { search?: Partial<FinanceExtractFormSearchFields> } = {}) => {
      const q = $utils.queryString({ _paginate: true, ...search })

      let error = null
      let code = 200
      let status = false

      let data: ApiPageResponse<FinanceItem> = {
        items: [],
        page: 1,
        total: 0,
        limit: 15,
        lastPage: 0,
      }

      try {
        const result = await axios.get<ApiPageResponse<FinanceItem>>(url + q)

        code = result.status
        status = true

        if (result.status === 200) {
          data.items = result.data.items.map(parsePageResponse)
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
    id: async ({ id }: { id: number }) => {
      let error = null
      let code = 200
      let status = false
      let data: FinanceItem | null = null

      try {
        const result = await axios.get<FinanceItem>(`${url}/${id}`)

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
    post: async ({ form }: { form: FinanceItemFormFieldsPost }) => {
      let error = null
      let code = 201
      let status = true
      let data: { message: string } = { message: '' }

      if (form.obs === '') {
        delete form.obs
      }

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
    put: async ({ id, form }: { id: number, form: FinanceItemFormFieldsPut }) => {
      url += `/${id}`

      let error = null
      let code = 201
      let status = true
      let data: { message: string } = { message: '' }

      if (form.obs === '') {
        delete form.obs
      }

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
    status<R>({ id, statusId }: { id: number, statusId: FinanceStatusId }) {
      return axios.get<R>(`v1/finance/item/${id}/status/${statusId}`)
    }
  }
}

const parsePageResponse = (item: FinanceItem): FinanceItem => {
  return {
    ...item,
    date: dayjs(item.date).format('DD/MM/YYYY')
  }
}