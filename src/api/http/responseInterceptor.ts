import type { AxiosError, AxiosResponse } from 'axios'
import { showFailToast } from 'vant'

const handleBusinessError = (response: AxiosResponse) => {
  console.log('handleBusinessError: response', response)
  return Promise.reject(new Error())
}
const handleHttpError = (error: AxiosError) => {
  showFailToast(error.message)
  return Promise.reject(error)
}
const responseInterceptor = (response: AxiosResponse) => {
  if (response && response.data && response.data.success) {
    return response.data
  } else {
    const error = handleBusinessError(response)
    return error
  }
}

export { responseInterceptor, handleHttpError }
