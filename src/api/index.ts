import type { RequestParams } from '@/types/http-types'
import type { AxiosRequestConfig } from 'axios'
import http from './http'

const getTest = (data?: any) => {
  const resuestParams: RequestParams = {
    url: '/tasks',
    method: 'get',
    params: data,
    data
  }
  const config: AxiosRequestConfig = {
    timeout: 200000
  }
  return http(resuestParams, config)
}

export { getTest }
