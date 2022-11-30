import { getWxUserProflieByCode, getWxUserProflieRefreshToken } from '@/api/wxAuth'

const USER_INFO_KEY = 'userInfo'
const REDIRECT_URI = encodeURIComponent('http://192.168.101.55:5173')

const useLogin = async () => {
  // 1.检查 storage 里有没有 useInfo && useInfo.refreshToken
  const userInfoStr = localStorage.getItem(USER_INFO_KEY) || '{}'
  const userInfo = JSON.parse(userInfoStr)
  console.log('userinfo', userInfo)
  if (userInfo && userInfo.authRefreshToken) {
    // 2. 如果 refreToken 存在，则通过 refreToken 来获取 用户信息
    const res = await getWxUserProflieRefreshToken({ refreshToken: userInfo.authRefreshToken })
    console.log('通过 refreToken 来获取 用户信息', res.data)
    if (res && res.data && res.data.openid) {
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(res.data))
    } else {
      console.log('通过 refreToken 来获取 用户信息失败，尝试通过 code 登录')
      const state = 1
      const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4e928e912965b7c8&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`
      window.location.href = url
    }
  } else {
    // 3. 如果 code 存在， 则通过获取 code 获取用户信息
    const { code, state } = getUrlParams(window.location.href)
    if (code) {
      console.log(code, state)
      try {
        const res = await getWxUserProflieByCode({ code, state })
        console.log('通过获取 code 获取用户信息', res.data)
        if (res && res.data && res.data.openid) {
          localStorage.setItem(USER_INFO_KEY, JSON.stringify(res.data))
        } else {
          console.log('通过获取 code 获取用户信息失败')
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      const state = 1
      const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4e928e912965b7c8&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`
      window.location.href = url
    }
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

export { useLogin }
