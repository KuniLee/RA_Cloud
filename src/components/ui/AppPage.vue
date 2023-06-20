<template>
  <div v-if="back" class="breadcrumbs">
    <router-link class="text-black" to="/">Вернуться к списку заявок</router-link>
  </div>
  <div class="card">
    <h1 class="card-title">
      {{ title }}
      <slot name="header"></slot>
    </h1>
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  back: { type: Boolean, required: false, default: false },
})

document.title = `${props.title} | RA-Cloud`
</script>

<style></style>
