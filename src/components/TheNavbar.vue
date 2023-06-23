<template>
  <nav class="navbar">
    <img src="/src/assets/icons/RA_знак.png" alt="RA-cloud" />
    <h3>RA-cloud</h3>

    <ul class="navbar-menu">
      <li>
        <a href="#" @click.prevent="logout">Выйти</a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
const store = useAuthStore()
const router = useRouter()

const logout = () => {
  store.logout()
  router.push('/auth')
}
</script>

<style></style>
