<template>
  <div v-if="sidebar" class="sidebar">
    <span class="sidebar-title">Сообщения</span>
    <span class="sidebar-close" @click="close">&times;</span>

    <div class="sidebar-content">
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus illo commodi soluta vero sint libero nesciunt
        aspernatur, reprehenderit sequi ducimus.
      </p>
      <p>{{ sidebar }}</p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const sidebar = computed(() => store.state.sidebar)

    return {
      sidebar,
      close() {
        store.commit('closeSidebar')
      },
    }
  },
}
</script>

<style></style>
