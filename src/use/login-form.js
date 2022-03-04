import { computed, watch } from 'vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export function useLoginForm() {
  const store = useStore()
  const { handleSubmit, isSubmitting, submitCount } = useForm()
  const router = useRouter()

  const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
    'email',
    yup
      .string()
      .trim()
      .required('Введите email')
      .email('Необходимо ввести корректный email')
  )

  const isTooManyAttempts = computed(() => submitCount.value >= 3)

  watch(isTooManyAttempts, (val) => {
    if (val) {
      setTimeout(() => {
        submitCount.value = 0
      }, 5000)
    }
  })

  const MIN_LENGTH = 6

  const { value: password, errorMessage: pError, handleBlur: pBlur } = useField(
    'password',
    yup
      .string()
      .trim()
      .required('Введите пароль')
      .min(MIN_LENGTH, `Пароль должен быть ${MIN_LENGTH} и более символов`)
  )

  const onSubmit = handleSubmit(async (values) => {
    try {
      await store.dispatch('auth/login', values)
      router.push('/')
    } catch (error) {}
  })

  return {
    email,
    password,
    eError,
    eBlur,
    pError,
    pBlur,
    onSubmit,
    isSubmitting,
    isTooManyAttempts,
  }
}
