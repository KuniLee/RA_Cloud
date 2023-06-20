<template>
  <div v-if="message" :class="['alert', message.type]">
    <p v-if="title" class="alert-title">{{ title }}</p>
    <p>{{ message.value }}</p>
    <span class="alert-close" @click="close">&times;</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRootStore } from '../../stores/root'

const store = useRootStore()
const message = computed(() => store.message)

const title = computed(() => (message.value ? TITLE_MAP[message.value.type] : null))

const close = () => store.clearMessage()

const TITLE_MAP = {
  primary: 'Успешно!',
  danger: 'Ошибка!',
  warning: 'Внимание!',
}
</script>

<style></style>
