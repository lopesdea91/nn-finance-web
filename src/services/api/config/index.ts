import { NextPageContext } from 'next'
import axios from 'axios'
import { $env, $cookie } from '@/utils'

export type AxiosConfigProps = {
  ctx?: Pick<NextPageContext, 'req'> | null
}

export const axiosConfig = ({ ctx }: AxiosConfigProps = {}) => {
  const token: string = $cookie.get<string>({ ctx, key: 'token' })
  const baseUrl = $env.envBaseUrl()

  axios.defaults.baseURL = baseUrl
  axios.defaults.headers['Content-Type'] = 'application/json'
  axios.defaults.headers['Accept'] = 'application/json'
  axios.defaults.headers['Authorization'] = token ? `Bearer ${token}` : ''

  return axios
}