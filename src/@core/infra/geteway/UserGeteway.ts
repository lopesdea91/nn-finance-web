import { AxiosStatic } from "axios";

const url = '/v1/user'

export class UserGeteway {
  constructor(private request: AxiosStatic) { }

  async data() {
    return await this.request.get<IDataResponse>(`${url}/data`)
  }
  async updateData(form: IUpdateData) {
    return await this.request.put<{ message: string }>(`${url}/data`, {
      name: form.name,
      email: form.email,
    })
  }
  async updateSecury(form: IUpdateSecury) {
    return await this.request.put<{ message: string }>(`${url}/data`, {
      password: form.password
    })
  }
}

interface IDataResponse {
  user: {
    id: number
    name: string
    email: string
  }
}
interface IUpdateData {
  name: string
  email: string
}
interface IUpdateSecury {
  password: string
}