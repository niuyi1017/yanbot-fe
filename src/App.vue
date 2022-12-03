<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useLogin } from './utils/login'
import TabBar from '@/components/TabBar.vue'
import type { TabItem } from './types/app-types'

const tabbarItems: TabItem[] = [
  {
    text: '订阅',
    isActived: true,
    defaultIcon: 'star-o',
    activedIcon: 'star',
    url: '/subscribe-list'
  },
  {
    text: '学校',
    isActived: false,
    defaultIcon: 'shop-o',
    activedIcon: 'shop',
    url: '/school-list'
  }
]
onMounted(async () => {
  await useLogin()
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="$route.name" />
    </keep-alive>
  </router-view>
  <TabBar :tab-items="tabbarItems"></TabBar>
</template>

<style scoped></style>
