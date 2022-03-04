<template>
  <div class="question" @click="isOpen = !isOpen">
    <div class="question-title">{{ question.title }}</div>
    <div v-if="isOpen" class="question-boby">
      {{ question.text }}
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  props: ['question'],
  setup() {
    const isOpen = ref(false)
    return { isOpen }
  },
}
</script>

<style></style>
