<template>
  <h1>Работает</h1>
  <h2>{{ msg }}</h2>
  <button @click="log">Клик</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const msg = ref<'Hello' | 'Lol'>('Hello')

const log = () => {
  msg.value = 'Lol'
}
</script>
<style scoped></style>
