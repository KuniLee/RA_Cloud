<template>
  <the-navbar></the-navbar>
  <div class="container with-nav">
    <app-message></app-message>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import TheNavbar from '../components/TheNavbar.vue'
import AppMessage from '../components/ui/AppMessage.vue'

export default {
  components: {
    TheNavbar,
    AppMessage,
  },
}
</script>

<style></style>
