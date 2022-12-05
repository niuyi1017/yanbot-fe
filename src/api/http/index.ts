import type { RequestParams } from '@/types/http-types'
import axios, { type AxiosRequestConfig } from 'axios'
import { reqestInterceptor, handleRequestError } from './requestInterceptor'
import { responseInterceptor, handleHttpError } from './responseInterceptor'

const baseURL = import.meta.env.VITE_API_BASE_URL
const httpInstance = axios.create({
  baseURL,
  timeout: 1000 * 10
})

httpInstance.interceptors.request.use(reqestInterceptor, err => {
  const error = handleRequestError(err)
  return error
})
httpInstance.interceptors.response.use(responseInterceptor, err => {
  const error = handleHttpError(err)
  return error
})

const http = (requestParams: RequestParams, config?: AxiosRequestConfig) => {
  const _config = {
    url: requestParams.url,
    method: requestParams.method || 'get',
    params: requestParams.params,
    data: requestParams.data,
    ...config
  }
  return httpInstance.request(_config)
}
export default http
