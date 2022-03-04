<template>
  <div class="container center">
    <app-message></app-message>

    <router-view></router-view>
  </div>
</template>

<script>
import AppMessage from '../components/ui/AppMessage.vue'
export default {
  setup() {
    document.title = `Вход | RA-Cloud`
  },
  components: { AppMessage },
}
</script>

<style></style>
