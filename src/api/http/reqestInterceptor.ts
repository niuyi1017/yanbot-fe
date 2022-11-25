//
// import { type AxiosRequestConfig } from 'axios'

const reqestInterceptor = (config: any) => {
  const token = 'Bearer ' + localStorage.getItem('token') || 'mock-token'
  console.log(config.headers)
  config.headers['Authorization'] = token
  return config
}

export default reqestInterceptor
