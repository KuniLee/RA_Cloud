<template>
  <div class="container center">
    <!--    <app-message></app-message>-->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
// import AppMessage from '../components/ui/AppMessage.vue'
export default {
  // components: { AppMessage },
  setup() {
    document.title = `Вход | RA-Cloud`
  },
}
</script>

<style></style>
