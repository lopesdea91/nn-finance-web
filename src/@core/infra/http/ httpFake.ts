import IHttpClient from './httpClient'

class HttpFake implements IHttpClient {
  async get<R>(url: string) {
    return { data: {} as R, status: 200 }
  }
  async post<R>(url: string, input: unknown) {
    return { data: input as R, status: 201 }
  }
  async put<R>(url: string, input: unknown) {
    return { data: input as R, status: 201 }
  }
  async delete(url: string) {
    return { data: { message: '' }, status: 204 }
  }
}

export default HttpFake
