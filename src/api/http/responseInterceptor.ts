import type { AxiosError, AxiosResponse } from 'axios'
import { showFailToast } from 'vant'
import { getWxUserProflieRefreshToken } from '@/api/wxAuth'
import axios from 'axios'
import { errorCode } from './errorCode'

// 响应拦截器
const responseInterceptor = (response: AxiosResponse) => {
  if (response && response.data && response.data.success) {
    return response.data
  } else {
    const result = handleBusinessError(response)
    return result
  }
}

// 业务错误 处理函数
const handleBusinessError = async (response: AxiosResponse) => {
  console.log('handleBusinessError: response', response)
  const { code } = response.data
  if ([10041, 10000, 10051].includes(code)) {
    return handleAccessTokenError(response)
  } else {
    showFailToast(errorCode[code])
    return Promise.reject(new Error(code))
  }
}

// http 请求错误 处理函数
const handleHttpError = (error: AxiosError) => {
  showFailToast(error.message)
  return Promise.reject(error)
}

// accessToken 失效 处理函数 （换取新的 accessToken 并重新发送原请求）
async function handleAccessTokenError(response: AxiosResponse) {
  const USER_INFO_KEY = 'userInfo'
  console.log('accessToken 失效，根据 refreshToken 重新换取 accessToken')
  const userInfoStr = localStorage.getItem(USER_INFO_KEY) || '{}'
  const userInfo = JSON.parse(userInfoStr)

  try {
    const res = await getWxUserProflieRefreshToken({ refreshToken: userInfo.refreshToken })
    if (res && res.data && res.data.openid) {
      localStorage.setItem(USER_INFO_KEY, JSON.stringify({ refreshTokenTime: new Date().getTime(), ...res.data }))
      console.log(`refreshToken 重新换取 accessToken 成功： ${res.data.accessToken}`)
      console.log('正在重发 上一个 请求：', response.config)
      const _config: any = { ...response.config }
      _config.headers.Authorization = `new accessToken`
      const newRes = await axios({ ..._config })
      console.log(newRes)
      if (newRes && newRes.data.success) {
        return Promise.resolve(newRes.data)
      } else {
        showFailToast(newRes.data.message)
        return Promise.reject(new Error(newRes.data.message))
      }
    }
  } catch (error) {
    console.log('通过 refreToken 来获取 用户信息失败，请尝试通过 code 登录')
    showFailToast(`通过 refreToken 来获取 用户信息失败，请尝试通过 code 登录`)
    return Promise.reject(error)
  }
}

export { responseInterceptor, handleHttpError }
