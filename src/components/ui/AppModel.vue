<template>
  <div class="modal-backdrop" @click="$emit('close')">
    <div class="closeModal"></div>
  </div>

  <div class="modal">
    <h3 v-if="title">{{ title }}</h3>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineEmits(['close'])
defineProps<{ title: string }>()
</script>

<style></style>
