<script setup lang="ts">
import { onMounted } from 'vue'
import { test } from '@/api/index'
const getTest = async () => {
  try {
    let res = await test()
    console.log(res)
  } catch (err) {
    console.log(err)
  }
}
onMounted(async () => {
  await getTest()
})
</script>
<template>
  <div class="login-page">login...</div>
</template>
