import { baseApi } from "../../base"

const requests = {
  ...baseApi({
    url: 'v1/finance/origin'
  })
}

export default requests