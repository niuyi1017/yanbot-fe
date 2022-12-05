<template>
  <div class="subscribe-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false">
        <div class="items-wrapper" v-if="subscribeList && subscribeList.length">
          <task-item
            v-for="item in subscribeList"
            :key="item._id"
            :title="item.taskTitle"
            :id="item._id"
            :isSubscribe="true"
            @cancelSubscribe="handleCancleSubscribe">
          </task-item>
        </div>
        <div v-else class="no-data">
          暂无订阅数据<br />
          请在 “学校” 页选择学校进行订阅
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getTasks } from '@/api'
interface SubscribeItem {
  _id: string
  taskTitle: string
}

const subscribeList = ref<SubscribeItem[]>([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

const onLoad = async () => {
  const data = await getData()
  if (refreshing.value) {
    subscribeList.value = []
    refreshing.value = false
  }

  subscribeList.value.push(...data)
  loading.value = false

  if (subscribeList.value.length >= 40) {
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

onMounted(() => {
  onLoad()
})

const handleCancleSubscribe = (id: string) => {
  console.log(id)
}

const getData = async () => {
  try {
    let getTasksRes = await getTasks()
    let data = getTasksRes.data

    return data || []
  } catch (err) {
    return []
  }
}
</script>

<style lang="stylus" scoped>
.subscribe-list
  height calc(100vh - var(--van-tabbar-height))
  // background #ccc
  .van-pull-refresh{
    min-height 100%
  }
  .no-data
    display flex
    justify-content center
    align-items center
    height calc(100vh - var(--van-tabbar-height))
    text-align center
</style>
