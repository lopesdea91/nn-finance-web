/** SignIn */
export interface SignInPayload {
  email: string,
  password: string
}
export interface SignInResponse {
  token: string
}