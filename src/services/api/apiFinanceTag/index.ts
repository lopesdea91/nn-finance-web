import { axiosConfig, AxiosConfigProps } from "@/services/api/config/index"
import { $utils } from "@/utils"
import { FinanceTag, FinanceTagSearch } from "@/types/entities/finance-tag"
import { ApiPageResponse } from ".."
import { FinanceTagFormFieldsPost, FinanceTagFormFieldsPut } from "@/types/form/settingsFinanceTag"

export const apiFinanceTag = (props: AxiosConfigProps = {}) => {
  const axios = axiosConfig(props)
  let url = '/v1/finance/tag'

  return {
    page: async ({ search }: { search?: Partial<FinanceTagSearch> } = {}) => {

      const q = $utils.queryString({ _paginate: true, ...search })

      let error = null
      let code = 200
      let status = false

      let data: ApiPageResponse<FinanceTag> = {
        items: [],
        page: 1,
        total: 0,
        limit: 15,
        lastPage: 0,
      }

      try {
        const result = await axios.get<ApiPageResponse<FinanceTag>>(url + q)

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
    get: async ({ search }: { search?: Partial<FinanceTagSearch> } = {}) => {
      let error = null
      let code = 200
      let status = false
      let data: FinanceTag[] | null = null

      try {
        const q = $utils.queryString(search)

        const result = await axios.get<FinanceTag[]>(url + q)

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
      let data: FinanceTag | null = null

      try {
        const result = await axios.get<FinanceTag>(`${url}/${id}`)

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
    post: async ({ form }: { form: FinanceTagFormFieldsPost }) => {
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
    put: async ({ id, form }: { id: number, form: FinanceTagFormFieldsPut }) => {
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
  }
}