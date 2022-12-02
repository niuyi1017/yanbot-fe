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
