<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Войти в систему</h1>

    <div :class="['form-control', { invalid: eError }]">
      <label for="email">Email</label>
      <input id="email" v-model="email" placeholder="Тест: test@mail.ru пароль: 123456" type="email" @blur="eBrur" />
      <small v-if="eError">{{ eError }}</small>
    </div>

    <div :class="['form-control', { invalid: pError }]">
      <label for="password">Пароль</label>
      <input id="password" v-model="password" type="password" @blur="pBrur" />
      <small v-if="pError">{{ pError }}</small>
    </div>
    <button class="btn primary" type="submit" :disabled="isSubmitting || isTooManyAttempts">Войти</button>
    <div v-if="isTooManyAttempts" class="text-danger">Вы слишком часто пытаетесь войти, попробуйте позже</div>
  </form>
</template>

<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useLoginForm } from '../use/login-form'
import { error } from '../utils/error.js'
export default {
  setup() {
    const route = useRoute()
    const store = useStore()

    if (route.query.message) {
      store.dispatch(
        'setMessage',
        {
          value: error(route.query.message),
          type: 'warning',
        },
        { root: true }
      )
    }

    return { ...useLoginForm() }
  },
}
</script>

<style></style>
