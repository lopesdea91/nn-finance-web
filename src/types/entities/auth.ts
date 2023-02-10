/** SignIn */
export interface SignInResponse {
  token: string
}
export interface SignInPayload {
  email: string,
  password: string
}