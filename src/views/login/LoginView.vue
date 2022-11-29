<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getWxUserProflieByCode } from '@/api/wxAuth'

const wxUserProfile = ref('')

const handleWechatLogin = () => {
  // const redirect_uri = encodeURIComponent('http://h5.yanbot.niuy.xyz/login')
  const redirect_uri = encodeURIComponent('http://192.168.101.55:5173/login')
  const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4e928e912965b7c8&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
  window.location.href = url
}
const checkCode = async () => {
  const router = useRouter()
  const { code, state } = router.currentRoute.value.query
  console.log(code, state)
  if (code) {
    try {
      let res = await getWxUserProflieByCode({ code, state })
      console.log(res)
      wxUserProfile.value = JSON.stringify(res.data)
    } catch (err) {
      console.log(err)
    }
  }
}
onMounted(() => {
  checkCode()
})
</script>
<template>
  <div class="login-page">
    <van-button @click="handleWechatLogin">微信登录</van-button>
    {{ wxUserProfile }}
  </div>
</template>
