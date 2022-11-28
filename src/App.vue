<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { ref } from 'vue'

interface TabbarItems {
  text: string
  isActived: boolean
  defaultIcon: string
  activedIcon: string
  url: string
}

const activeTab = ref<number>(0)
const tabbarItems = ref<TabbarItems[]>([
  {
    text: '订阅',
    isActived: true,
    defaultIcon: 'star-o',
    activedIcon: 'star',
    url: '/'
  },
  {
    text: '学校',
    isActived: false,
    defaultIcon: 'shop-o',
    activedIcon: 'shop',
    url: '/school-list'
  }
])
const router = useRouter()
const handleTabChange = (index: number) => {
  activeTab.value = index
  router.push(tabbarItems.value[index].url || '/')
}
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="$route.name" />
    </keep-alive>
  </router-view>

  <van-tabbar v-model="activeTab" @change="handleTabChange">
    <van-tabbar-item
      v-for="(item, index) in tabbarItems"
      :key="index"
      :icon="activeTab === index ? item.activedIcon : item.defaultIcon">
      {{ item.text }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<style scoped></style>
