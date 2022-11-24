<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
interface Props {
  name: string
  count?: number
}
const { name, count = 100 } = defineProps<Props>()
console.log(name, count)

const year: Ref<string | number> = ref('2020')

year.value = 2020 // 成功！

// 得到的类型：Ref<string | number>
const month = ref<string | number>('2020')

month.value = 20201 // 成功！
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- <van-button type="primary">主要按钮</van-button> -->
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
