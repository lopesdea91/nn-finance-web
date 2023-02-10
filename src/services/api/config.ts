import axios from 'axios'
import { $ } from '@/utils'

// const token = $.getToken()
// axios.defaults.baseURL = $.nextBaseUrl()
// axios.defaults.headers['Content-Type'] = 'application/json'
// axios.defaults.headers['Accept'] = 'application/json'
// if (token) {
//   axios.defaults.headers['Authorization'] = token ? `Bearer ${token}` : ''
// }
// export const request = axios

export const requestConfig = () => {
  const token: string = $.getToken()

  axios.defaults.baseURL = $.nextBaseUrl()
  axios.defaults.headers['Content-Type'] = 'application/json'
  axios.defaults.headers['Accept'] = 'application/json'
  axios.defaults.headers['Authorization'] = token ? `Bearer ${token}` : ''

  return axios
}