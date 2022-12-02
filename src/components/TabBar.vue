<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
interface TabItem {
  text: string
  isActived: boolean
  defaultIcon: string
  activedIcon: string
  url: string
}
interface Props {
  tabItems: TabItem[]
}
const activeTab = ref<number>(0)
const { tabItems } = defineProps<Props>()

const router = useRouter()
const handleTabChange = (index: number) => {
  activeTab.value = index
  router.push(tabItems[index].url || '/')
}

const findPathIndex = (path: string) => {
  let index = tabItems.findIndex(item => item.url === path)
  return index
}
onMounted(() => {
  const currentpath = router.currentRoute.value.path
  activeTab.value = findPathIndex(currentpath)
})
watch(
  () => router.currentRoute.value.path,
  newValue => {
    activeTab.value = findPathIndex(newValue)
  }
)
</script>
<template>
  <van-tabbar v-model="activeTab" @change="handleTabChange" v-if="activeTab !== -1">
    <van-tabbar-item
      v-for="(item, index) in tabItems"
      :key="index"
      :icon="activeTab === index ? item.activedIcon : item.defaultIcon">
      {{ item.text }}
    </van-tabbar-item>
  </van-tabbar>
</template>
