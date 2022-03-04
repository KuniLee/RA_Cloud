<template>
  <the-navbar></the-navbar>
  <the-side-bar></the-side-bar>
  <div class="container with-nav">
    <app-message></app-message>
    <router-view></router-view></div
></template>

<script>
import TheNavbar from '../components/TheNavbar.vue'
import TheSideBar from '../components/TheSideBar.vue'
import AppMessage from '../components/ui/AppMessage.vue'

export default {
  components: { TheNavbar, AppMessage, TheSideBar },
}
</script>

<style></style>
