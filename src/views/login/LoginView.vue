<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const handleWechatLogin = () => {
  const redirect_uri = encodeURI('http://h5.yanbot.niuy.xyz/login')
  // const redirect_uri = encodeURI('http://192.168.101.55:5173/login')
  const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4e928e912965b7c8&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
  console.log(redirect_uri)
  window.location.href = url
}
const checkCode = () => {
  const router = useRouter()
  const { code, state } = router.currentRoute.value.query
  console.log(code, state)
}
onMounted(() => {
  checkCode()
})
</script>
<template>
  <div class="login-page">
    <van-button @click="handleWechatLogin">微信登录</van-button>
  </div>
</template>
