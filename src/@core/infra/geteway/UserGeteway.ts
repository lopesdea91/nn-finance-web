import { AxiosStatic } from "axios";
import { UserDataResponse } from "@/types/entities/user";

const url = '/v1/user'

export class UserGeteway {
  constructor(private request: AxiosStatic) { }

  async data() {
    return await this.request.get<UserDataResponse>(`${url}/data`)
  }
}