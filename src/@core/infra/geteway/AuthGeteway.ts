import { AxiosStatic } from "axios";
import { SignInPayload, SignInResponse } from "@/types/entities/auth";

const url = '/v1/auth'

export class AuthGeteway {
  constructor(private request: AxiosStatic) { }

  async signIn(form: SignInPayload) {
    return await this.request.post<SignInResponse>(`${url}/sign-in`, form)
  }
}