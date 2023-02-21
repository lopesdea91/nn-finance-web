import { FinanceStatusId } from "@/types/enum"
import { baseApi } from "../../base"
import { requestConfig } from "../../config"

const requests = {
  ...baseApi({
    url: 'v1/finance/item'
  }),
  status<R>({ id, statusId }: { id: number, statusId: FinanceStatusId }) {
    const request = requestConfig()

    return request.get<R>(`v1/finance/item/${id}/status/${statusId}`)
  }
}

export default requests