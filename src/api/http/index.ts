import type { RequestParams } from '@/types/http-types'
import axios, { type AxiosRequestConfig } from 'axios'
import reqestInterceptor from './reqestInterceptor'

const baseURL = import.meta.env.VITE_API_BASE_URL

const httpInstance = axios.create({ baseURL: baseURL })
httpInstance.interceptors.request.use(reqestInterceptor, (err) => {
  return Promise.reject(err)
})

const http = (requestParams: RequestParams, config?: AxiosRequestConfig) => {
  const _config = {
    url: requestParams.url,
    method: requestParams.method || 'get',
    params: requestParams.params,
    data: requestParams.data,
    ...config
  }
  console.log(_config)
  return httpInstance.request(_config)
}
export default http
