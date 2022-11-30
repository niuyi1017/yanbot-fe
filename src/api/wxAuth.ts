// import type { RequestParams } from '@/types/http-types'
// import type { AxiosRequestConfig } from 'axios'
import http from './http'
const getWxUserProflieByCode = (params?: any) => {
  return http({
    url: '/wx/userInfo',
    method: 'get',
    params
  })
}
const getWxUserProflieRefreshToken = (params?: any) => {
  return http({
    url: '/wx/userInfo',
    method: 'get',
    params
  })
}
export { getWxUserProflieByCode, getWxUserProflieRefreshToken }
