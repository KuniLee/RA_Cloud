<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Войти в систему</h1>
    <div :class="['form-control', { invalid: eError }]">
      <label for="email">Email</label>
      <input id="email" v-model="email" placeholder="Тест: test@mail.ru пароль: 123456" type="email" @blur="eBlur" />
      <small v-if="eError">{{ eError }}</small>
    </div>

    <div :class="['form-control', { invalid: pError }]">
      <label for="password">Пароль</label>
      <input id="password" v-model="password" type="password" @blur="pBlur" />
      <small v-if="pError">{{ pError }}</small>
    </div>
    <button class="btn primary" type="submit" :disabled="isSubmitting || isTooManyAttempts">Войти</button>
    <div v-if="isTooManyAttempts" class="text-danger">Вы слишком часто пытаетесь войти, попробуйте позже</div>
  </form>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
import { useLoginForm } from '../use/login-form'
import { error, ERROR_CODES } from '../utils/error.js'
import { useRootStore } from '../stores/root.js'

const { setMessage } = useRootStore()

export default {
  setup() {
    const route = useRoute()

    if (route.query.message) {
      setMessage({
        value: error(route.query.message as keyof typeof ERROR_CODES),
        type: 'warning',
      })
    }

    return { ...useLoginForm() }
  },
}
</script>

<style></style>
