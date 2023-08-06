export default interface IHttpClient {
  get: <R>(url: string) => Promise<{ data: R; status: number }>
  post: <R>(url: string, input: unknown) => Promise<{ data: R; status: number }>
  put: <R>(url: string, input: unknown) => Promise<{ data: R; status: number }>
  delete: (url: string) => Promise<{ data: { message: string }; status: number }>
}
