export const envAppName = () => process.env.NEXT_PUBLIC_APP_NAME

export const envBaseUrl = () => process.env.NEXT_PUBLIC_BASE_URL

export const envKeyToken = () => process.env.NEXT_PUBLIC_KEY_TOKEN

export const $env = {
  envAppName,
  envBaseUrl,
  envKeyToken
}