import { baseApi } from "../../base"

const requests = {
  ...baseApi({
    url: 'v1/finance/item'
  })
}

export default requests