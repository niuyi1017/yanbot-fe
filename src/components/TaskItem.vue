<template>
  <div class="task-item">
    <div class="task-title">{{ title }}</div>
    <van-button v-if="isSubscribe" round type="default" size="mini" @click="cancelSubscribe">取消订阅</van-button>
    <van-button v-else round type="primary" size="mini" @click="subscribe">订阅学校</van-button>
  </div>
</template>
<script setup lang="ts">
import { showConfirmDialog } from 'vant'
interface Props {
  title: string
  id: string
  isSubscribe: boolean
}
const { title = '--', isSubscribe, id } = defineProps<Props>()
const emit = defineEmits(['subscribe', 'cancelSubscribe'])

// 取消订阅
const cancelSubscribe = () => {
  showConfirmDialog({
    title: '确定要取消订阅吗',
    message: '取消订阅后将无法接收该任务的微信消息推送'
  })
    .then(() => {
      emit('cancelSubscribe', id)
    })
    .catch(() => {
      console.log('用户放弃取消订阅操作')
    })
}
// 订阅任务
const subscribe = () => {
  emit('subscribe', id)
}
</script>

<style lang="stylus" scoped>
.task-item{
  height 40px
  display flex
  align-items center
  justify-content space-between
  padding 0 20px


}
</style>
