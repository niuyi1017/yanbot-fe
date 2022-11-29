import type { RequestParams } from '@/types/http-types'
import type { AxiosRequestConfig } from 'axios'
import http from './http'

const getTasks = (data?: any) => {
  const resuestParams: RequestParams = {
    url: '/tasks',
    // url: '/userInfo',
    method: 'get',
    params: data,
    data
  }
  const config: AxiosRequestConfig = {
    timeout: 1000 * 20
  }
  return http(resuestParams, config)
}
const cancelSubscribeTask = (data?: any) => {
  return http({
    url: '/tasks',
    method: 'post',
    data
  })
}

export { getTasks, cancelSubscribeTask }
