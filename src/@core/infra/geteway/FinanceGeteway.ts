import { AxiosStatic } from "axios";
import { FinanceDataResponse } from "@/types/entities/finance";

const url = '/v1/finance'

export class FinanceGeteway {
  constructor(private request: AxiosStatic) { }

  async data() {
    return await this.request.get<FinanceDataResponse>(`${url}/data`)
  }
}