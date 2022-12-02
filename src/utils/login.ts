import { getWxUserProflieByCode, getWxUserProflieRefreshToken } from '@/api/wxAuth'

const USER_INFO_KEY = 'userInfo'
const REDIRECT_URI = encodeURIComponent('http://192.168.0.102:5173')
const EXPIRES_IN = 29 // resfreshToken 过期时间 （天）

const useLogin = async () => {
  const { code, state } = getUrlParams(window.location.href)
  const userInfoStr = localStorage.getItem(USER_INFO_KEY) || '{}'
  const userInfo = JSON.parse(userInfoStr)
  const isRefreshTokenWork = (new Date().getTime() - userInfo.refreshTokenTime) / (1000 * 60 * 60 * 24) < EXPIRES_IN

  console.log('userinfo', userInfo)

  if (code) {
    try {
      const res = await getWxUserProflieByCode({ code, state })
      console.log('通过获取 code 获取用户信息', res.data)
      if (res && res.data && res.data.openid) {
        localStorage.setItem(USER_INFO_KEY, JSON.stringify({ refreshTokenTime: new Date().getTime(), ...res.data }))
        const currentPath = window.location.pathname
        window.location.href = currentPath
      } else {
        console.log('通过获取 code 获取用户信息失败')
      }
    } catch (err) {
      console.log(err)
    }
  } else if (userInfo && userInfo.refreshToken) {
    if (!isRefreshTokenWork) {
      const res = await getWxUserProflieRefreshToken({ refreshToken: userInfo.refreshToken })
      console.log('通过 refreToken 来获取 用户信息', res.data)
      if (res && res.data && res.data.openid) {
        localStorage.setItem(USER_INFO_KEY, JSON.stringify({ refreshTokenTime: new Date().getTime(), ...res.data }))
      } else {
        console.log('通过 refreToken 来获取 用户信息失败，尝试通过 code 登录')
        const state = 'refreshToken'
        toGetAuthCode(state)
      }
    }
  } else {
    const state = 'code'
    toGetAuthCode(state)
  }
}

const getUrlParams = (url: string) => {
  const obj: any = {}
  const queryStr = url.split('?')
  if (queryStr && queryStr[1]) {
    const paramsStr = queryStr[1]
    const paramsArr = paramsStr.split('&')
    for (let i = 0, len = paramsArr.length; i < len; i++) {
      const arr = paramsArr[i].split('=')
      obj[arr[0]] = arr[1]
    }
  }
  return obj
}

const toGetAuthCode = (state: any) => {
  const currentPath = window.location.pathname
  const redirectUrl = REDIRECT_URI + currentPath
  const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4e928e912965b7c8&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`
  window.location.href = url
}

export { useLogin }
