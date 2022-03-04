<template>
  <nav class="navbar">
    <img src="img\icons\RA_знак.png" alt="RA-cloud" />
    <h3>RA-cloud</h3>

    <ul class="navbar-menu">
      <li>
        <router-link to="/">Окно</router-link>
      </li>
      <!-- <li>
        <router-link to="#">Заявки</router-link>
      </li> -->
      <li>
        <router-link to="/help">Помощь</router-link>
      </li>
      <!-- <li>
        <a href="#" @click.prevent="openSidebar">Сообщение</a>
      </li> -->
      <li>
        <a href="#" @click.prevent="logout">Выйти</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  setup() {
    const router = useRouter()
    const store = useStore()

    return {
      logout: () => {
        store.commit('auth/logout')
        router.push('/auth')
      },
      openSidebar: () => store.commit('openSidebar'),
    }
  },
}
</script>

<style></style>
