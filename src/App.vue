<template>
  <component :is="layout + '-layout'" v-if="layout" />
</template>

<script lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AuthLayout from './layout/AuthLayout.vue'
import MainLayout from './layout/MainLayout.vue'

export default {
  components: {
    MainLayout,
    AuthLayout,
  },
  setup() {
    const route = useRoute()

    return {
      layout: computed(() => route.meta.layout),
    }
  },
}
</script>
<style scoped></style>
