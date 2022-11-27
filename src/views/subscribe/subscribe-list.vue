<template>
  <div class="subscribe-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in list" :key="item._id" :title="item.taskTitle" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { getTest } from '@/api'
interface SubscribeItem {
  id: string
  title: string
}

const subscribeList = ref<SubscribeItem[]>([])
const list = ref<any[]>([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

const onLoad = async () => {
  const data = await getData()
  if (refreshing.value) {
    list.value = []
    refreshing.value = false
  }

  list.value.push(...data)
  loading.value = false

  if (list.value.length >= 40) {
    finished.value = true
  }
}

const onRefresh = () => {
  // 清空列表数据
  finished.value = false

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true
  onLoad()
}

const getData = async () => {
  try {
    let getTestRes = await getTest()
    let data = getTestRes.data

    return data || []
  } catch (err) {
    return []
  }
}

console.log(subscribeList)
</script>

<style lang="stylus" scoped>
.subscribe-list
  height calc(100vh - var(--van-tabbar-height))
  background #ccc
</style>
