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
    timeout: 1000 * 20
  }
  return http(resuestParams, config)
}

const getTest2 = (data?: any) => {
  return http({
    url: '/tasks',
    method: 'post',
    data
  })
}
const cancelSubscribeTask = (data?: any) => {
  return http({
    url: '/tasks',
    method: 'post',
    data
  })
}
export { getTest, getTest2, cancelSubscribeTask }
